const xlsx = require('xlsx');
const fs = require('fs');
const UuidV4 = require('uuid/v4');
const normalizeText = require('./normalizeText');

module.exports = async (path) => {
  const file = await xlsx.readFile(path);
  const cells = file.Sheets[file.Props.SheetNames[0]];
  const keys = Object.keys(cells);
  keys.pop();
  keys.shift();

  // Construct An array of arrays from Excel file
  const cellsArray = [];
  let line = [];
  for (let i = 1; i < keys.length; i++) {
    const cellName = keys[i];
    const linNum = cellName.substring(1);
    if (linNum > 1) {
      const colNum = cellName.split('')[0];
      const content = cells[cellName].v;
      line.push(content);
      if (colNum === 'E') {
        cellsArray.push(line);
        line = [];
      }
    }
  };

  //Transform into array of objects
  const cellsObj = [];
  for (let i = 0; i < cellsArray.length; i++) {
    const line = cellsArray[i];
    const norm = await normalizeText(line[1], 'it');
    const { normalized, tags, topic, type } = norm;
    const newLine = {
      uuid: UuidV4(),
      default_title: line[0],
      expressions: [{
        uuid: UuidV4(),
        text: line[1],
        normalized,
        tags,
        topic,
        type,
      }],
      default_response: line[2],
      category_name: line[3],
      default_suggest: line[4],
    }
    cellsObj.push(newLine)
  }

  //Merges expressions of objects with same title into one single object
  const items = [];
  for (let i = 0; i < cellsObj.length; i++) {
    const line = cellsObj[i];
    if (currentItem = items.find(e => e.default_title === line.default_title)) {
      currentItem.expressions.push(line.expressions[0])
    } else {
      items.push(line)
    }
  }

  const result = [{
    "uuid": UuidV4(),
    "name": "Smalltalk",
    "description": "description",
    "language": "it",
    "category": "Smalltalk",
    items,
  }];

  const data = JSON.stringify(result);

  fs.writeFile('resources/smalltalk_it_res.json', data, (err) => {
    if (err) throw err;
  });

  return result;
}