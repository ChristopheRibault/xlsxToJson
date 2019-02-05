const xlsx = require('xlsx');
const fs = require('fs');

const file = xlsx.readFile('./smalltalk_it.xlsx');
const cells = file.Sheets[file.Props.SheetNames[0]];
const keys = Object.keys(cells)

const lastCol = cells['!ref'].substr(cells['!ref'].lastIndexOf(':') + 1, 1)

const cellsArray = [];
let line = [];

// Construct An array of arrays from Excel file
for (let i = 1; i < keys.length - 1; i++) {
  const cellName = keys[i];
  const linNum = cellName.substring(1);
  if (linNum > 1) {
    const colNum = cellName.split('')[0];
    const content = cells[cellName].v;
    line.push(content);
    if (colNum === lastCol) {
      cellsArray.push(line);
      line = [];
    }
  }
};

//Constructs the result JSON
const items = [];
let currentTitle = '';
let item = {};

for (let i = 0; i < cellsArray.length; i++) {
  const line = cellsArray[i];
  const title = line[0];
  if (title !== currentTitle){
    items.push(item);
    currentTitle = title;
      item.title = title
      item.default_response = line[2],
      item.category_name = line[3],
      item.default_suggest = line[4],
      item.expressions = [{text : line[1], normalized_text: 'xxx'}]
  } else {
    item.expressions.push({text : line[1], normalized_text: 'xxx'});
  }  
}

const result = [{
  "bundle_uuid": "xxxx",
  "name": "Smalltalk",
  "description": "description",
  "language": "it",
  "category": "Smalltalk",
  items,
}]

const data = JSON.stringify(result);

fs.writeFile('smalltalk_it_res.json', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
