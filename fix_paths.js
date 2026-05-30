const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace src="\videos\..." with src="/videos/..."
    if (content.includes('src="\\videos\\')) {
        content = content.replace(/src="\\videos\\([^"]+)"/g, (match, p1) => {
            changed = true;
            return `src="/videos/${p1.replace(/\\/g, '/')}"`;
        });
    }

    // Replace src="/images/..." and src="/videos/..." in getAssetPath
    const regex1 = /src="(\/(images|videos)\/[^"]+)"/g;
    if (regex1.test(content)) {
        content = content.replace(regex1, (match, p1) => {
            changed = true;
            return `src={getAssetPath("${p1}")}`;
        });
    }

    // Handle template literals: src={`/images/${...}`}
    const regex2 = /src=\{\`(\/(images|videos)\/[^\`]+)\`\}/g;
    if (regex2.test(content)) {
        content = content.replace(regex2, (match, p1) => {
            changed = true;
            return `src={getAssetPath(\`${p1}\`)}`;
        });
    }

    if (changed) {
        // Add import if not present
        if (!content.includes('getAssetPath')) {
            content = `import { getAssetPath } from "@/utils/paths";\n` + content;
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
