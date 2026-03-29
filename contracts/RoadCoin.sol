// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RoadCoin (ROAD)
 * @dev The currency of BlackRoad OS.
 * 
 * PS-SHA∞ secured off-chain (RoadChain ledger).
 * ERC-20 on Base (Coinbase L2) for on-chain transfers.
 * 
 * Total supply: 1,000,000,000 ROAD
 * - 100M to founder (vested)
 * - 200M to treasury (ecosystem rewards)
 * - 700M reserved for earn-to-use rewards
 * 
 * Earn: tutor +1, video +5, music +2, social +0.5, chat +0.1
 * Spend: premium inference, custom agents, extended memory
 * Stake: governance votes + priority access
 * 
 * BlackRoad OS, Inc. — Delaware C-Corp — EIN 41-2663817
 * Remember the Road. Pave Tomorrow.
 */
contract RoadCoin is ERC20, ERC20Burnable, Ownable {
    
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1B ROAD
    uint256 public constant FOUNDER_ALLOCATION = 100_000_000 * 10**18; // 100M
    uint256 public constant TREASURY_ALLOCATION = 200_000_000 * 10**18; // 200M
    
    // Reward rates (in ROAD * 10^18)
    mapping(string => uint256) public rewardRates;
    
    // Staking
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakeTimestamp;
    uint256 public totalStaked;
    
    // Events
    event Earned(address indexed user, uint256 amount, string action);
    event Spent(address indexed user, uint256 amount, string item);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardRateUpdated(string action, uint256 rate);
    
    constructor(address founder, address treasury) ERC20("RoadCoin", "ROAD") Ownable(msg.sender) {
        // Mint founder allocation
        _mint(founder, FOUNDER_ALLOCATION);
        
        // Mint treasury allocation
        _mint(treasury, TREASURY_ALLOCATION);
        
        // Set default reward rates
        rewardRates["tutor.solve"] = 1 * 10**18;
        rewardRates["video.upload"] = 5 * 10**18;
        rewardRates["cadence.track"] = 2 * 10**18;
        rewardRates["canvas.create"] = 1 * 10**18;
        rewardRates["social.post"] = 5 * 10**17; // 0.5
        rewardRates["agent.task"] = 5 * 10**17; // 0.5
        rewardRates["game.score"] = 2 * 10**17; // 0.2
        rewardRates["chat.message"] = 1 * 10**17; // 0.1
        rewardRates["search.query"] = 5 * 10**16; // 0.05
        rewardRates["node.hosting"] = 10 * 10**18;
        rewardRates["referral"] = 50 * 10**18;
    }
    
    /// @notice Mint reward tokens for a user action
    /// @param to The address to receive tokens
    /// @param action The action that triggered the reward (e.g., "tutor.solve")
    function earn(address to, string calldata action) external onlyOwner {
        uint256 amount = rewardRates[action];
        require(amount > 0, "Unknown action");
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Supply cap reached");
        _mint(to, amount);
        emit Earned(to, amount, action);
    }
    
    /// @notice Mint specific amount (for Coinbase purchases, welcome bonuses, faucet)
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Supply cap reached");
        _mint(to, amount);
    }
    
    /// @notice Burn tokens when spending on premium features
    function spend(uint256 amount, string calldata item) external {
        _burn(msg.sender, amount);
        emit Spent(msg.sender, amount, item);
    }
    
    /// @notice Stake tokens for governance and priority access
    function stake(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _transfer(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        stakeTimestamp[msg.sender] = block.timestamp;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }
    
    /// @notice Unstake tokens
    function unstake(uint256 amount) external {
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");
        stakedBalance[msg.sender] -= amount;
        totalStaked -= amount;
        _transfer(address(this), msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }
    
    /// @notice Update reward rate for an action
    function setRewardRate(string calldata action, uint256 rate) external onlyOwner {
        rewardRates[action] = rate;
        emit RewardRateUpdated(action, rate);
    }
    
    /// @notice Get user level based on total earned (approximation using balance + spent)
    function getLevel(address user) external view returns (uint256) {
        uint256 total = balanceOf(user) + stakedBalance[user];
        if (total == 0) return 0;
        uint256 level = 1;
        uint256 threshold = 1 * 10**18;
        while (total >= threshold && level < 20) {
            level++;
            threshold *= 2;
        }
        return level;
    }
}
