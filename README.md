README file:

# Ethereum Proof: Intermediate Course Module 
# Wealth Management Smart Contract

## Overview

This Solidity smart contract, named `WealthManagement`, serves as a wealth management system, allowing account owners to manage their funds, request loans, and change secret keys. Below, you'll find details about the contract's structure, variables, functions, and usage.

## Contract Details

- **Solidity Version:** 0.8.9
- **Contract Name:** WealthManagement

## Contract Variables

- `accountOwner`: Ethereum address of the account owner.
- `accountFunds`: Total funds available in the account.
- `secretKey`: Integer representing the secret key associated with the account.
- `loanAmount`: Amount of the requested loan.
- `loanDuration`: Duration of the loan in months.
- `monthlyInstallment`: Monthly installment amount for the loan.

## Events

### `FundsAdded`

- **Parameters:** `amount` - Amount of funds added to the account.

### `FundsWithdrawn`

- **Parameters:** `amount` - Amount of funds withdrawn from the account.

### `KeyChanged`

- **Parameters:** `newKey` - New secret key assigned to the account.

### `LoanRequested`

- **Parameters:**
  - `requestedAmount`: Amount of the loan requested.
  - `termInMonths`: Duration of the loan in months.
  - `monthlyInstallment`: Monthly installment amount for the loan.

## Constructor

- **Parameters:**
  - `initialFunds`: Initial funds deposited into the account.
  - `key`: Secret key associated with the account.
- **Details:**
  - Initializes `accountOwner` with the deployer's address.
  - Sets initial funds and secret key.

## Functions

### `getAccountFunds`

- **Visibility:** Public
- **Returns:** `uint256`
- **Details:** Retrieves the current account funds.

### `addFunds`

- **Visibility:** Public
- **Parameters:** `amount` - Amount of funds to be added.
- **Details:**
  - Adds funds to the account.
  - Emits a `FundsAdded` event.

### `withdrawFunds`

- **Visibility:** Public
- **Parameters:** `withdrawalAmount` - Amount of funds to be withdrawn.
- **Details:**
  - Withdraws funds from the account.
  - Emits a `FundsWithdrawn` event.
  - Throws an `InsufficientFunds` error if the withdrawal amount exceeds the account balance.

### `changeSecretKey`

- **Visibility:** Public
- **Parameters:** `newKey` - New secret key to be set.
- **Details:**
  - Changes the secret key associated with the account.
  - Emits a `KeyChanged` event.

### `getSecretKey`

- **Visibility:** Public
- **Returns:** `uint256`
- **Details:** Retrieves the secret key associated with the account.

### `requestLoan`

- **Visibility:** Public
- **Parameters:**
  - `requestedAmount`: Amount of the loan requested.
  - `termInMonths`: Duration of


## Getting Started

To run this project on your computer, follow the steps below after cloning the GitHub repository.

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start Local Ethereum Node:**
   Open two additional terminals in your VS Code.
   In the second terminal, start a local Ethereum node by running:

   ```bash
   npx hardhat node
   ```

3. **Deploy Smart Contract:**
   In the third terminal, deploy the smart contract to the local Ethereum network:

   ```bash
   npx hardhat run --network localhost scripts/deploy.js
   ```

4. **Launch Frontend Application:**
   Go back to the first terminal and run the following command to launch the frontend application:
   ```bash
   npm run dev
   ```

After completing these steps, the project will be running locally, typically accessible at http://localhost:3000/.

