const axios=require('axios')
const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('I call the punk api with beer id {int}', async function (id) {
    const {status, data} = await axios.get(`https://api.punkapi.com/v2/beers/${id}`)
    this.status = status
    this.maltList = data[0].ingredients.malt
    this.firstMalt = this.maltList[0]
    this.maltValue = this.firstMalt.amount.value
    this.maltUnit = this.firstMalt.amount.unit
    });

// This step is redundant. The Given step will fail for a non-200 response code unless it's caught
Then('I expect a {int} status response', function (statusCode) {
    assert.strictEqual(this.status, statusCode)
    });

Then('The malt is “Extra Pale”', function () {
    assert.strictEqual(this.maltList.length, 1)
    assert.strictEqual(this.firstMalt.name, "Extra Pale")
    });

Then('The malt value is {float} and the unit is “kilograms”', function (expectedMaltValue) {
    assert.strictEqual(this.maltValue, expectedMaltValue)
    assert.strictEqual(this.maltUnit, "kilograms")
    });