const axios=require('axios')
const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('I call the punk api with beer id {int}', async function (id) {
    this.response = await axios.get(`https://api.punkapi.com/v2/beers/${id}`)
    this.data = this.response.data
    });

// This step is redundant. The Given step will fail for a non-200 response code unless it's caught
Then('I expect a {int} status response', function (statusCode) {
    assert.strictEqual(this.response.status, statusCode)
    });

Then('The malt is “Extra Pale”', function () {
    maltList = this.data[0].ingredients.malt
    this.firstMalt = maltList[0]
    assert.strictEqual(maltList.length, 1)
    assert.strictEqual(this.firstMalt.name, "Extra Pale")
    });

Then('The malt value is {float} and the unit is “kilograms”', function (expectedMaltValue) {
    const maltValue = this.firstMalt.amount.value
    const maltUnit = this.firstMalt.amount.unit
    assert.strictEqual(maltValue, expectedMaltValue)
    assert.strictEqual(maltUnit, "kilograms")
    });