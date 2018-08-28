
const AccessToken = artifacts.require('AccessToken')
const assertRevert = require('./helpers/assertRevert')
const { BigNumber } = web3

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should()

contract('AccessToken', (accounts) => {
  let contract
  const creator = accounts[0]
  const unauthorized = accounts[4]

  beforeEach(async () => {
    contract = await AccessToken.new()
  })

  it('Returns the correct token name', async () => {
    const name = await contract.name()
    assert.equal(name, 'Access Token')
  })

  it('Returns the correct token symbol', async () => {
    const symbol = await contract.symbol()
    assert.equal(symbol, 'ACCESS')
  })

  it('whenNotPaused modifier allows contract to be paused and unpaused', async () => {
    await contract.pause({ from: creator })
    await assertRevert(contract.buyBronzeSubscription({ value: 999 }))
    await contract.unpause({ from: creator })
    await contract.setBronzeAmount(1001, { from: creator })
    const amount = await contract.bronzeAmount()
    amount.should.be.bignumber.equal(1001)
  })

  it('ownlyOwner modifier allows owner to perform actions', async () => {
    await contract.setBronzeAmount(1001, { from: creator })
    const amount = await contract.bronzeAmount()
    amount.should.be.bignumber.equal(1001)
  })

  it('ownlyOwner modifier does not allow non owner to perform actions', async () => {
    await assertRevert(contract.setBronzeAmount(1001, { from: unauthorized }))
  })

  it('Allow Bronze subscription price to be set', async () => {
    await contract.setBronzeAmount(1000)
    const amount = await contract.bronzeAmount()
    amount.should.be.bignumber.equal(1000)
  })

  it('Allows purchase of a Bronze subscription', async () => {
    await contract.setBronzeAmount(1000)
    const token = await contract.buyBronzeSubscription({ value: 1000 })
  })

  it('Revert on Bronze subscription purchase without enough ether', async () => {
    await contract.setBronzeAmount(1000)
    await assertRevert(contract.buyBronzeSubscription({ value: 999 }))
  })

  it('Allow Silver subscription price to be set', async () => {
    await contract.setSilverAmount(2000)
    const amount = await contract.silverAmount()
    amount.should.be.bignumber.equal(2000)
  })

  it('Allows purchase of a Silver subscription', async () => {
    await contract.setSilverAmount(2000)
    const token = await contract.buySilverSubscription({ value: 2000 })
  })

  it('Revert on Silver subscription purchase without enough ether', async () => {
    await contract.setSilverAmount(1000)
    await assertRevert(contract.buySilverSubscription({ value: 999 }))
  })

  it('Allow Gold subscription price to be set', async () => {
    await contract.setGoldAmount(3000)
    const amount = await contract.goldAmount()
    amount.should.be.bignumber.equal(3000)
  })

  it('Allows purchase of a Gold subscription', async () => {
    await contract.setGoldAmount(3000)
    const token = await contract.buyGoldSubscription({ value: 3000 })
  })

  it('Revert on Gold subscription purchase without enough ether', async () => {
    await contract.setGoldAmount(3000)
    await assertRevert(contract.buyGoldSubscription({ value: 2999 }))
  })
})
