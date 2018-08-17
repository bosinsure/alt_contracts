pragma solidity ^0.4.24;

contract BosiCrowdsaleConfig {
    uint256 public CONFIG_START_TIME = 1544955605;
    uint256 public CONFIG_END_TIME = 1550312405;
    uint256 public CONFIG_MIN_CONTRIBUTION = 1 ether;
    uint256 public CONFIG_MAX_CONTRIBUTION_NO_WHITELIST = 65 ether;
    uint256 public CONFIG_HARDCAP = 100000 ether;
    uint256 public CONFIG_SOFTCAP = 10000 ether;
    uint256 public CONFIG_TOKENS_PER_ETHER = 3000;
    address public CONFIG_MULTISIG_WALLET = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;

}