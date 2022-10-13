'use strict';

require('dynamoose');
const CreatePerson = require('./schema.js');
const Chance = require('chance');
const chance = new Chance;

exports.handler = async (event) => {
  try {
    const {name, age } = JSON.parse(event.body);
    const id = chance.guid();

    const record = new CreatePerson({ id, name, age });
    const data = await record.save();
    console.log('New person added to database --->',data);
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