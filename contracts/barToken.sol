//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract barToken {
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name = 'barToken';
    string public symbol = 'BAR';
    uint8 public decimale = 18;

    event Transfer (address indexed sender, address indexed recipient, uint amount);
    event Approval (address indexed owner, address indexed spender, uint value);

    function transfer( address recipient, uint amount) external payable returns(bool) {
        require(balanceOf[msg.sender] >= msg.value, 'Insufficient balance');
        balanceOf[msg.sender] -= msg.value;
        balanceOf[recipient] += msg.value;

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns(bool){
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }


    function transferFrom(address sender, address recipient, uint amount) external returns(bool){
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;

        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint (uint amount) external {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;

        emit Transfer(address(0), msg.sender, amount);
    }

    function burn (uint amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;

        emit Transfer(msg.sender, address(0), amount);

    }

}