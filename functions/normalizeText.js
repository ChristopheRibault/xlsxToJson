const NlpSdk = require('@clevy/nlpapi-internal-sdk').default;
const NlpService = new NlpSdk({ NLPAPI_URL: 'localhost:8100' });

module.exports = async (text, language) => {
  const normalized_text = await NlpService.getAllNormalizationDatas(text, language, [], []);
  return normalized_text;
}
