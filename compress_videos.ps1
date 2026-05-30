$videosDir = "e:\web kopi 3d\spylt-gsap-website\public\videos"
$backupDir = "e:\web kopi 3d\spylt-gsap-website\public\videos_backup"

# Create backup directory
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir | Out-Null
}

# Videos to compress (the heavy ones)
$videos = @(
    "review1.mp4",
    "review2.mp4",
    "review3.mp4",
    "review4.mp4",
    "review5.mp4",
    "20260510_232032.mp4"
)

foreach ($video in $videos) {
    $inputPath = Join-Path $videosDir $video
    $backupPath = Join-Path $backupDir $video
    $tempOutput = Join-Path $videosDir ("compressed_" + $video)

    if (-not (Test-Path $inputPath)) {
        Write-Host "SKIP: $video not found"
        continue
    }

    # Backup original
    Write-Host "Backing up $video..."
    Copy-Item $inputPath $backupPath -Force

    # Compress: 720p, 1Mbps video, 96kbps audio, H.264
    Write-Host "Compressing $video..."
    & ffmpeg -i $inputPath -vf "scale=-2:720" -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 96k -movflags +faststart -y $tempOutput

    if ($LASTEXITCODE -eq 0) {
        # Replace original with compressed version
        Remove-Item $inputPath -Force
        Rename-Item $tempOutput $video
        
        $originalSize = [math]::Round((Get-Item $backupPath).Length / 1MB, 2)
        $newSize = [math]::Round((Get-Item (Join-Path $videosDir $video)).Length / 1MB, 2)
        Write-Host "DONE: $video - $originalSize MB -> $newSize MB"
    } else {
        Write-Host "ERROR: Failed to compress $video"
        if (Test-Path $tempOutput) { Remove-Item $tempOutput -Force }
    }
}

Write-Host "`nAll done!"
