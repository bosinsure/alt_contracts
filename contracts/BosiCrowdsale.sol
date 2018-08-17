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

    constructor (BosiToken _token)
        public
        Crowdsale(tokens_per_ether, multisig_wallet, _token)
        RefundableCrowdsale(softcap)
        TimedCrowdsale(start_time, end_time) 
        CappedCrowdsale(hardcap)
        {
        }


    // constructor
    //     (
    //         uint256 _openingTime,
    //         uint256 _closingTime,
    //         uint256 _rate,
    //         address _wallet,
    //         BosiToken _token,
    //         uint256 _goal,
    //         uint256 _cap
    //     )
    //     public
    //     Crowdsale(_rate, _wallet, _token)
    //     RefundableCrowdsale(_goal)
    //     TimedCrowdsale(_openingTime, _closingTime) 
    //     CappedCrowdsale(_cap)
    //     {

    //     }
}