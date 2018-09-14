pragma solidity ^0.4.24;

contract BosiCrowdsaleConfig {
    uint256 public CONFIG_START_TIME = 1544955605; // TODO replace with actual start time
    uint256 public CONFIG_END_TIME = 1550312405; // TODO replace with actual end time
    uint256 public CONFIG_MIN_CONTRIBUTION = 1 ether; // TODO replace with actual min contrib.
    uint256 public CONFIG_MAX_CONTRIBUTION_NO_WHITELIST = 65 ether; // TODO replace with actual max contrib.
    uint256 public CONFIG_HARDCAP = 100000 ether; // TODO replace with actual hardcap
    uint256 public CONFIG_SOFTCAP = 10000 ether; // TODO replace with actual softcap
    uint256 public CONFIG_TOKENS_PER_ETHER = 3000; // TODO replace with actual rate
    address public CONFIG_MULTISIG_WALLET = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c; // TODO replace with actual address

}