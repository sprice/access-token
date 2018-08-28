# ERC-721 Access Tokens

## About

This project implements an ERC-721 Unique/Non Fungible Token (NFT) that serves to provide different
levels of access to content depending on the type of token.

When a visitor first visits the app they can view all free content. Once they log in with their Metamask account
They can purchase a Bronze, Silver, or Gold token.

A Bronze token will give the user access to all Bronze content, a Silver token to all Bronze and Silver content,
and a Gold token to all content.

When the administrator logs in to the app they can set the price of each of the tokens as well as pause the contract (circuit breaker).

The UI of the app is built with Drizzle and so the UI will automatically update based on contract changes. While the contract is waiting
for a transaction to complete there will be a "loading" icon next to updateable values. 

Please note that when pausing and unpausing the contract, while the UI will automatically update, there will be no "loading" icon.

Please note that the Drizzle react components nearly always update the UI automatically, but sometimes they don't. I have noticed that
when setting the subscription price there is the odd time that the price is not automatically updated.

## Stretch Goals

This contract is deployed to Rinkeby (see `deployed_addresses.md`).

This project is hosted on the [Rinkeby test network on IPFS](https://www.eternum.io/ipfs/QmTovouWcYM4nZZpVogsod2qdLjBgJMAftXMpCzfBCV3Tt/build_webpack/#/)

To use the IPFS Dapp, log into Metamask on the Rinkeby network and log in to the site. You will see that if visit the token page on Etherscan, and then purchase some tokens, the total supply of tokens on Etherscan will increase.

## Installation

The following are requirements for installation:

* [node](https://nodejs.org/en/download/current/)
* [npm](https://nodejs.org/en/download/current/)

This project is built and tested using `node@10.9.0`, and `npm@6.2.0`.

```
$ git clone https://github.com/sprice/access-token.git
$ cd access-token
$ npm install
```

## Smart Contract Compilation, Testing, and Migration

### About the tests

This project includes 14 tests for the smart contract.

Tests were written to cover each major aspect of the contract: Setting the price of tokens, purchasing tokens with enough Ether and not enough Ether.
Tests were also written to check some of the modifiers used including `onlyOwner` and `whenNotPaused`.

The following are requirements for compiling, testing, and migrating the included smart contracts.

* [ganache-cli](https://www.npmjs.com/package/ganache-cli)
* [truffle](https://www.npmjs.com/package/truffle)

This project is built and tested using `ganache-cli@6.1.8`, and `truffle@4.1.14`.

```
# In one terminal window (at any location)
$ ganache-cli -b 3
# Make a note of the HD Wallet Mnemonic. This will be used to sign into Metaamsk.
```

```
# In another terminal window (in the project root)
$ truffle compile
$ truffle test
$ truffle migrate
```

## Signing into Metamask

When developing DApps with Metamsk it is common to sign in and out of different wallet accounts on a test network. This can sometimes cause the internal state of Metamsk
to become unstable. It's important to reset Metamask before beginning.

1. Ensure the [Metamask](https://metamask.io/) Chrome extension is installed.
1. Use the latest beta version of Metamask.
1. If already signed into Metamask, reset the accont. `Settings -> Reset Account`
1. If already signed into Metamask, Logout of your account.
1. In the Metamask extenstion, click `Import using account seed phrase`. This will open a new Chrome tab and you will likely need to click this same link again.
1. Enter the Ganache mnemonic that you recorded when starting up the ganache-cli which is still running. Enter a password.
1. In Metamask, connect to the Private Network (Localhost 8545).
1. You are now signed into Metamask using an account provisioned with test Ether

## Running the local development server

This project is scaffolded using the [Drizzle Truffle Box](https://truffleframework.com/boxes/drizzle). It is built with React and includes a development server.

```
$ npm start
```

This will launch a development server at `http://localhost:3000/`

Visit the development server and you can interact with the Dapp.

## Configuring and using the app

When you log in with the ganache provided Ethereum account in Metamask as outlined above, you will be the owner/admin of the contract.

The first thing to do is Login to the app and then visit the `Admin` page and set the price for each type of subscription. You can then
purchase a subscription token on the `Buy Tokens` page which will give you access to more content. All content is available on the `Home` page.

## Smart contract libraries used

The Solidity smart contracts for this app use a number of library contracts from OpenZeppelin.

* ERC721Token.sol
* Ownable.sol
* Pausable.sol
