'use strict';

require('dynamoose');

const DeletePerson = require('./schema.js');

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;
    console.log('Item removed from database ----->:', id);
    let deleteDbItem = await DeletePerson.delete({ id: id });
    return {
      status: 200,
      response: 'Database item removed',
      body: JSON.stringify(deleteDbItem),
    };
  } catch (error) {
    return {
      statusCode: 500,
      response: error.message,
    };
  }
};