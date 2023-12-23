README file:

# Ethereum Proof: Intermediate Course Module 2 Project by Metacrafters

Welcome to my project for the ETH Proof: Intermediate course Module 2 by Metacrafters. This project involves creating a simple Ethereum smart contract with various functions and customizing the provided frontend application to display the values returned by these functions.

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

## Explore the Project

Explore the functionalities provided by the smart contract through the frontend interface. The application will interact with the deployed smart contract, showcasing the values returned by various functions.
