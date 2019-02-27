const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = async (yelpData, businessName) => {
  const date = JSON.stringify(new Date());

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      businessName: businessName,
      reviewCount: yelpData.reviewCount,
      rating: yelpData.rating,
      scrapedAt: date
    }
  };

  await dynamoDb.put(params, (error, data) => {
    if (error) {
      console.error(`Error saving data to DyanmoDB: ${JSON.stringify(error)}`);
      return Promise.reject(
        `Error saving data to DyanmoDB: ${JSON.stringify(error)}`
      );
    } else {
      console.log(`Done`);
      return Promise.resolve(data);
    }
  }).promise();
};
