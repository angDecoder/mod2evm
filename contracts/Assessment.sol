// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract WealthManagement {
    address payable public accountOwner;
    uint256 public accountFunds;
    uint256 public secretKey;
    uint256 public loanAmount;
    uint256 public loanDuration; // in months
    uint256 public monthlyInstallment;

    event FundsAdded(uint256 amount);
    event FundsWithdrawn(uint256 amount);
    event KeyChanged(uint256 newKey);
    event LoanRequested(uint256 requestedAmount, uint256 termInMonths, uint256 monthlyInstallment);

    constructor(uint256 initialFunds, uint256 key) payable {
        accountOwner = payable(msg.sender);
        accountFunds = initialFunds;
        secretKey = key;
    }

    function getAccountFunds() public view returns (uint256) {
        return accountFunds;
    }

    function addFunds(uint256 amount) public payable {
        require(msg.sender == accountOwner, "You are not the account owner");
        uint256 previousFunds = accountFunds;

        // perform transaction
        accountFunds += amount;

        // assert transaction completed successfully
        assert(accountFunds == previousFunds + amount);

        // emit the event
        emit FundsAdded(amount);
    }

    error InsufficientFunds(uint256 balance, uint256 withdrawalAmount);

    function withdrawFunds(uint256 withdrawalAmount) public {
        require(msg.sender == accountOwner, "You are not the account owner");
        uint256 previousFunds = accountFunds;
        if (accountFunds < withdrawalAmount) {
            revert
                InsufficientFunds({
                    balance: accountFunds,
                    withdrawalAmount: withdrawalAmount
                });
        }

        // withdraw the given amount
        accountFunds -= withdrawalAmount;

        // assert the balance is correct
        assert(accountFunds == (previousFunds - withdrawalAmount));

        // emit the event
        emit FundsWithdrawn(withdrawalAmount);
    }

    function changeSecretKey(uint256 newKey) public {
        require(msg.sender == accountOwner, "You are not the account owner");
        secretKey = newKey;

        // emit the event
        emit KeyChanged(newKey);
    }

    function getSecretKey() public view returns (uint256) {
        require(msg.sender == accountOwner, "You are not the account owner");
        return secretKey;
    }

    function requestLoan(uint256 requestedAmount, uint256 termInMonths) public {
        require(msg.sender == accountOwner, "You are not the account owner");
        require(requestedAmount > 0, "Loan amount must be greater than 0");
        require(termInMonths > 0, "Loan term must be greater than 0");

        loanAmount = requestedAmount;
        loanDuration = termInMonths;
        monthlyInstallment = (requestedAmount / termInMonths);

        // emit the event
        emit LoanRequested(requestedAmount, termInMonths, monthlyInstallment);
    }
}
