const environnment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environnment];
const db = require('knex')(config);
const lodash = require('lodash');
const { omit } = lodash;

module.exports = async (data) => {
  data.forEach(bundle => {
    const bundleData = omit(bundle, ['items']);
    db('lib_bundles').insert(bundleData).then(() => {

      bundle.items.forEach(item => {
        const itemData = omit(item, ['expressions']);
        itemData.bundle_uuid = bundle.uuid;
        db('lib_items').insert(itemData).then(() => {

          item.expressions.forEach(expression => {
            const expressionData = { ...expression, item_uuid: item.uuid };
            db('lib_expressions').insert(expressionData).then(() => 'succes' );
          });
        });
      });
    });
  });
};