const AWS = require('aws-sdk');

module.exports = businessName => {
  const lambda = new AWS.Lambda({
    region: 'us-east-2'
  });

  const params = {
    FunctionName: 'yelp-scraper-dev-scrape',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(businessName)
  };

  return lambda.invoke(params, (error, data) => {
    if (error) {
      console.error(JSON.stringify(error));
      return new Error(`Error scraping: ${JSON.stringify(error)}`);
    } else {
      console.log(data);
      return JSON.stringify(data);
    }
  });
};
