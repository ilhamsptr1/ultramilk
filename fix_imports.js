const fs = require('fs');

const filesToUpdate = [
    'src/components/FlavorSlider.tsx',
    'src/components/Navbar.tsx',
    'src/components/Preloader.tsx',
    'src/components/VideoPin.tsx',
    'src/sections/FooterSection.tsx',
    'src/sections/HeroSection.tsx',
    'src/sections/NutritionSection.tsx'
];

filesToUpdate.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('import { getAssetPath }')) {
        content = `import { getAssetPath } from "@/utils/paths";\n` + content;
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed import in ${file}`);
    }
});
