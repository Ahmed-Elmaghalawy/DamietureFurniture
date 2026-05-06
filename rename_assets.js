const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '_furniture_pictures');

// Step 1: Rename files
function crawlAndRename(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      crawlAndRename(fullPath);
    } else {
      let newName = entry.name;
      // Replace space and '(' with '_', remove ')'
      newName = newName.replace(/[ (]/g, '_').replace(/\)/g, '').replace(/_+/g, '_');
      
      if (newName !== entry.name) {
        const newPath = path.join(dir, newName);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${entry.name} -> ${newName}`);
      }
    }
  }
}

if (fs.existsSync(baseDir)) {
  crawlAndRename(baseDir);
} else {
  console.log(`Directory ${baseDir} does not exist`);
}

// Step 2: Update code files
const codeFiles = ['index.html', 'store.html', 'store.js', 'script.js', 'styles.css'];

for (const file of codeFiles) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Match 'file (1).jpg' or 'file%20(1).jpg'
    // Regex explanation:
    // file     : literal 'file'
    // (?: |%20): non-capturing group for space or '%20'
    // \(       : literal '('
    // (\d+)    : capture group for one or more digits
    // \)       : literal ')'
    // \.jpg    : literal '.jpg'
    const oldContent = content;
    content = content.replace(/file(?: |%20)\((\d+)\)\.jpg/g, 'file_$1.jpg');
    
    if (content !== oldContent) {
      fs.writeFileSync(file, content);
      console.log(`Updated references in ${file}`);
    }
  }
}
