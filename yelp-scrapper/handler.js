'use strict';
const getPage = require('./utils/getPage');
const parsePage = require('./utils/parsePage');
const saveRatingsToDB = require('./utils/saveRatingsToDB');
const deployScrapers = require('./utils/deployScrapers');

module.exports.scrape = async (event, context) => {
  // 1. fetch yelp page
  const page = await getPage(event);
  // 2. parse the page
  const yelpData = await parsePage(page);
  // 3. save ratings data
  try {
    await saveRatingsToDB(yelpData, event);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Scraped ${event}`
      })
    };
  } catch (error) {
    return new Error(`Error scraping ${error}: ${JSON.stringify(error)}`);
  }
};

module.exports.launch_scrapers = async (event, context) => {
  // list business name
  const fakeDatabaseResults = [
    'law-offices-of-mary-margaret-bush-oakland',
    'brandy-hos-hunan-food-san-francisco-6',
    'piacere-san-carlos'
  ];
  
  // launch a lambda for each business name
  await fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName);
  });
}
