const toJson = require('./functions/toJSON');
const registerToDb = require('./functions/registerToDb');

const proceed = async (path) => {
  const data = await toJson(path)
  await registerToDb(data);
  console.log('Succes');
};

proceed('./resources/smalltalk_it.xlsx');