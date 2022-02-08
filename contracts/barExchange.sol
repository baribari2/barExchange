//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;


import './barToken.sol';
contract barExchange {
    barToken public bartoken;
    uint public rate = 10 ** 4;

    event TokenBought (address indexed buyer, address token, uint buyAmount);
    event TokenSold (address indexed seller, address token, uint sellAmount);

    function buyToken() public payable {
        uint buyAmount = msg.value * rate;
        //require (bartoken.balanceOf(address(this)) >= buyAmount, 'Insufficient balance');
        bartoken.transfer(msg.sender, buyAmount);

        emit TokenBought(msg.sender, address(bartoken), buyAmount);
    }


    // @notice Users can call this function to sell tokens
    // @param '_sellAmount' is how much of 'barToken' the user wants to sell
    function sellToken(uint _sellAmount) public payable{
        uint etherTokenAmount = _sellAmount / rate;
        require(address(bartoken).balance >= etherTokenAmount, 'Insufficient balance');
        require(bartoken.balanceOf(msg.sender) >= _sellAmount, 'Insufficient balance');
        
        bartoken.transferFrom(payable(msg.sender), address(this), etherTokenAmount);
        payable(msg.sender).transfer(_sellAmount);

        emit TokenSold(msg.sender, address(bartoken), etherTokenAmount);
    }
}