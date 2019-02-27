const cheerio = require('cheerio');

module.exports = page => {
  try {
    const $ = cheerio.load(page);
    const rating = $('.rating-info .i-stars')
      .attr('title')
      .trim()
      .split(' ')[0];
    const reviewCount = $('.rating-info .review-count')
      .text()
      .trim()
      .split(' ')[0];

    const yelpData = {
      rating,
      reviewCount
    };

    return Promise.resolve(yelpData);
  } catch (error) {
    return Promise.reject(`Error parsing page: ${JSON.stringify(error)}`);
  }
};
