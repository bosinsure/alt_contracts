pragma solidity ^0.4.24;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/HasNoTokens.sol";
import "./Vesting.sol";

contract BosiToken is MintableToken, HasNoTokens, Vesting{
    string public name = "BOSI Token";
    string public symbol = "BOSI";
    uint public decimals = 18;
    uint public INITIAL_SUPPLY = 990000000 * (10 ** decimals);

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}
