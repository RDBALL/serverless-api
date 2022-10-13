'use strict';

require('dynamoose');
const HandleRead = require('./schema.js');

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;
    let data;
    if (id) {
      const list = await HandleRead.query('id').eq(id).exec();
      data = list[0];
    } else {
      data = await HandleRead.scan().exec();
      console.log('Database list ----->:', data);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      response: error.message,
    };
  }
};