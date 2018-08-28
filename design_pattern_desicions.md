# Design Patterns

## Fail Early, Fail Loud

Where needed, the contract fails by calling `revert()`.

* buyBronzeSubscription
* buySilverSubscription
* buyGoldSubscription

## Restricting Access

Certain functions are restricted to the owner of the contract using `onlyOwner`.

* setBronzeAmount
* setSilverAmount
* setGoldAmount
* burn

Certain functions are restricted to the contract itself using `internal`.

* mint

## Circuit Breaker

The Pausable library is used which allows the contract owner to pause the contract.
The `whenNotPaused` modifier is used on functions which will only work if the
contract is not paused. Note that `mint` does not have `whenNotPaused`. It is
an internal function and the functions which call it do have this modifier.

## Mortal (not used)

While useful, a self destruct pattern was explicitly ommitted as its use would show
that users tokens have the possibility of being removed from the blockchain.
