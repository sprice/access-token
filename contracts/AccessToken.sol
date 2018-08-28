pragma solidity 0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";


/** @title Access Token. */
contract AccessToken is ERC721Token, Ownable, Pausable {

  /**
   * @dev Constructor function
   */
  constructor() public ERC721Token("Access Token", "ACCESS") { }

  // Mapping from token id to subscription level.
  mapping(uint256 => string) internal tokenSubscriptionLevels;

  // Subscription costs, in wei
  uint256 public bronzeAmount;
  uint256 public silverAmount;
  uint256 public goldAmount;

  uint256 balance;

  /** @dev Purchase a bronze subscription.
    */
  function buyBronzeSubscription()
    external
    whenNotPaused
    payable
  {
    if (msg.value < bronzeAmount) {
      revert("Bronze value amount required");
    }
    balance += msg.value;
    uint256 _tokenId = totalSupply() + 1;
    mint(msg.sender, _tokenId, "bronze");
  }

  /** @dev Purchase a silver subscription.
    */
  function buySilverSubscription()
    external
    whenNotPaused
    payable
  {
    if (msg.value < silverAmount) {
      revert("Silver value amount required");
    }
    balance += msg.value;
    uint256 _tokenId = totalSupply() + 1;
    mint(msg.sender, _tokenId, "silver");
  }

  /** @dev Purchase a gold subscription.
    */
  function buyGoldSubscription()
    external
    whenNotPaused
    payable
  {
    if (msg.value < goldAmount) {
      revert("Gold value amount required");
    }
    balance += msg.value;
    uint256 _tokenId = totalSupply() + 1;
    mint(msg.sender, _tokenId, "gold");
  }

  /** @dev Check the level of a subscription.
    * @param _tokenId Token id.
    * @return level Subscription level.
    */
  function getSubscriptionLevel(
    uint256 _tokenId
  )
    public
    view
    returns (string)
  {
    string storage level = tokenSubscriptionLevels[_tokenId];
    return level;
  }

  /** @dev Set the purchase amount of the bronze subscription.
    * @param _amount Amount to set.
    */
  function setBronzeAmount(
    uint256 _amount
  )
    public
    whenNotPaused
    onlyOwner
  {
    bronzeAmount = _amount;
  }

  /** @dev Set the purchase amount of the silver subscription.
    * @param _amount Amount to set.
    */
  function setSilverAmount(
    uint256 _amount
  )
    public
    whenNotPaused
    onlyOwner
  {
    silverAmount = _amount;
  }

  /** @dev Set the purchase amount of the gold subscription.
    * @param _amount Amount to set.
    */
  function setGoldAmount(
    uint256 _amount
  )
    public
    whenNotPaused
    onlyOwner
  {
    goldAmount = _amount;
  }

  /** @dev Destroy a token
    * @param _owner Address of token owner.
    * @param _tokenId Token id.
    */
  function burn(
    address _owner,
    uint256 _tokenId
  )
    public
    whenNotPaused
    onlyOwner
  {
    super._burn(_owner, _tokenId);
  }

  /** @dev Withdraw contract funds
    * @return Withdraw success.
    */
  function withdraw()
    public
    onlyOwner
    returns (bool)
  {
    uint256 amount = balance;
    if (amount > 0) {
      balance = 0;

      msg.sender.transfer(amount);
    }
    return true;
  }

  /** @dev Create a new subscription token.
    * @param _to Address of token owner.
    * @param _tokenId Token id.
    * @param _subscriptionLevel Subscription level.
    */
  function mint(
    address _to,
    uint256 _tokenId,
    string _subscriptionLevel
  )
    internal
  {
    super._mint(_to, _tokenId);
    tokenSubscriptionLevels[_tokenId] = _subscriptionLevel;
  }

}
