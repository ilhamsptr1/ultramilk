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
    if (content.includes('"use client";') && !content.startsWith('"use client";')) {
        content = content.replace(/"use client";\r?\n?/g, '');
        content = '"use client";\n' + content;
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed use client in ${file}`);
    }
});
