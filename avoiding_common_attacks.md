# Avoiding Common Attacks

This contract is built upon a library of well tested contracts by OpenZeppelin for ERC-721 tokens as well as Ownable and Pausable functionality.

The `withdraw` function uses the withdraw pattern and the `onlyOwner` modifer to guard against malicious withdrawals.