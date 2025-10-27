const fs = require('fs');
const path = require('path');

// Read the main usecases.json file
const usecasesPath = path.join(__dirname, '../content/usecases.json');
const usecasesData = JSON.parse(fs.readFileSync(usecasesPath, 'utf8'));

// Create individual files for each use case
const outputDir = path.join(__dirname, '../content/usecases');

usecasesData.usecases.forEach(usecase => {
  const filename = `${usecase.id}.json`;
  const filepath = path.join(outputDir, filename);

  // Write each use case to its own file
  fs.writeFileSync(filepath, JSON.stringify(usecase, null, 2), 'utf8');
  console.log(`Created: ${filename}`);
});

console.log(`\n✅ Successfully split ${usecasesData.usecases.length} use cases into individual files`);
