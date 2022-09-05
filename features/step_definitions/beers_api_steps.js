const axios=require('axios')
const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

let response 
let data 
let maltList
let firstMalt

Given('I call the punk api with beer id {int}', async function (id) {
    response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`)
    data = response.data
    });

// This step is redundant. The Given step will fail for a non-200 response code unless it's caught
Then('I expect a {int} status response', function (statusCode) {
    assert.strictEqual(response.status, statusCode)
    });

Then('The malt is “Extra Pale”', function () {
    maltList = data[0].ingredients.malt
    firstMalt = maltList[0]
    assert.strictEqual(maltList.length, 1)
    assert.strictEqual(firstMalt.name, "Extra Pale")
    });

Then('The malt value is {float} and the unit is “kilograms”', function (expectedMaltValue) {
    const maltValue = firstMalt.amount.value
    const maltUnit = firstMalt.amount.unit
    assert.strictEqual(maltValue, expectedMaltValue)
    assert.strictEqual(maltUnit, "kilograms")
    });