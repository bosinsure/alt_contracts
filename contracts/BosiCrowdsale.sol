pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./BosiToken.sol";
import "./BosiCrowdsaleConfig.sol";

contract BosiCrowdsale is RefundableCrowdsale, CappedCrowdsale, BosiCrowdsaleConfig {

    uint256 public start_time = CONFIG_START_TIME;
    uint256 public end_time = CONFIG_END_TIME;
    uint256 public tokens_per_ether = CONFIG_TOKENS_PER_ETHER;
    address public multisig_wallet = CONFIG_MULTISIG_WALLET;
    uint256 public hardcap = CONFIG_HARDCAP;
    uint256 public softcap = CONFIG_SOFTCAP;

    uint256 public weiRaisedFromOthers;


    // TODO for deployment of actual contract, use start and end time off config file
    constructor (uint256 _start_time, uint256 _end_time, BosiToken _token) public
        Crowdsale(tokens_per_ether, multisig_wallet, _token)
        RefundableCrowdsale(softcap)
        TimedCrowdsale(_start_time, _end_time) 
        CappedCrowdsale(hardcap)
    {
        start_time = _start_time;
        end_time = _end_time;
    }

    // sets wei amount raised from others (Fiat and alt coins)
    function setWeiRaisedFromOthers(uint256 _weiRaisedFromOthers) public onlyOwner {
        weiRaisedFromOthers = _weiRaisedFromOthers;
    }

    // @return true if crowdsale event has ended either due to time or hardcap
    function hasSaleEnded() public view returns (bool) {
        bool capReached = weiRaised.add(weiRaisedFromOthers) >= hardcap;
        return capReached || now > end_time;
    }
}