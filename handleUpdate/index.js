'use strict';

require('dynamoose');
const HandleUpdate = require('./schema.js');

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters && event.queryStringParameters.id;
    const {name, age} = JSON.parse(event.body);
    const data = await HandleUpdate.update({id: id},{ name: name, age: age });
    console.log('Updated database item --->',data);
    return {
      status: 200,
      response: 'Item updated',
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      status: 500,
      response: error.message,
    };
  }
};