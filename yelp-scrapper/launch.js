const request = require('request-promise');
const AWS = require('aws-sdk');

const list = [
  'law-offices-of-mary-margaret-bush-oakland',
  'brandy-hos-hunan-food-san-francisco-6',
  'piacere-san-carlos'
];

function deployScrapper(businessName) {
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
}

function swarm(arr) {
  arr.forEach(businessName => {
    deployScrapper(businessName);
  });
}

swarm(list);
