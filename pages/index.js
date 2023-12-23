import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import WealthManagementABI from "../artifacts/contracts/Assessment.sol/WealthManagement.json";
import { Web3Provider } from "@ethersproject/providers";

export default function WealthManagementApp() {
  const [ethereumWallet, setEthereumWallet] = useState(undefined);
  const [userAccount, setUserAccount] = useState(undefined);
  const [wealthManagementContract, setWealthManagementContract] = useState(undefined);
  const [accountFunds, setAccountFunds] = useState(undefined);
  const [securityCodeInput, setSecurityCodeInput] = useState("1234");
  const [ confirmCode , setConfirmCode ] = useState( "" )
  const [newSecurityCodeInput, setNewSecurityCodeInput] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanDuration, setLoanDuration] = useState("");

  const contractAddress = "0x2B2812a2639f0B27C1a2968eAae8eaF3B4bFB536";
  const wealthManagementABI = WealthManagementABI.abi;

  const getEthereumWallet = async () => {
    if (window.ethereum) {
      setEthereumWallet(window.ethereum);
    }

    if (ethereumWallet) {
      const accounts = await ethereumWallet.request({ method: "eth_accounts" });
      handleUserAccount(accounts[0]);
    }
  };

  const handleUserAccount = (account) => {
    if (account) {
      console.log("User account connected: ", account);
      setUserAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectUserAccount = async () => {
    if (!ethereumWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethereumWallet.request({
      method: "eth_requestAccounts",
    });
    handleUserAccount(accounts[0]);
    getWealthManagementContract();
  };

  const getWealthManagementContract = () => {
    const provider = new Web3Provider(ethereumWallet);
    const signer = provider.getSigner();
    const wealthManagement = new ethers.Contract(contractAddress, wealthManagementABI, signer);
    setWealthManagementContract(wealthManagement);
  };

  const getAccountFunds = async () => {
    if (wealthManagementContract) {
      try {
        const funds = await wealthManagementContract.getAccountFunds();
        setAccountFunds(funds.toBigInt());
      } catch (error) {
        console.error("Error fetching account funds:", error.message);
      }
    }
  };

  const addFunds = async () => {
    if (wealthManagementContract) {
      let tx = await wealthManagementContract.addFunds(10); // Add 10 ETH
      await tx.wait();
      getAccountFunds();
      showAlert("Funds added successfully! Added 10 ETH.");
    }
  };

  const withdrawFunds = async () => {
    if (wealthManagementContract) {
      let tx = await wealthManagementContract.withdrawFunds(10); // Withdraw 10 ETH
      await tx.wait();
      getAccountFunds();
      showAlert("Funds withdrawn successfully! Withdrawn 10 ETH.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleSecurityCodeInputChange = (e) => {
    setSecurityCodeInput(e.target.value);
  };
  const handleChangeCode = ( e ) =>{
    setConfirmCode( e.target.value )
  }

  const handleNewSecurityCodeInputChange = (e) => {
    setNewSecurityCodeInput(e.target.value);
  };

  const validateSecurityCode = () => {
    return securityCodeInput === confirmCode ;
  };

  const changeSecurityCode = async () => {
    if (validateSecurityCode()) {
      // Update the security code
      await wealthManagementContract.changeSecretKey(newSecurityCodeInput);
      showAlert("Security code changed successfully!");
      setSecurityCodeInput("");
      setNewSecurityCodeInput("");
    } else {
      showAlert("Security codes do not match. Security code change failed.");
    }
  };

  const requestLoan = async () => {
    if (wealthManagementContract) {
      if (loanAmount && loanDuration) {
        let tx = await wealthManagementContract.requestLoan(loanAmount, loanDuration);
        await tx.wait();
        showAlert(`Loan requested successfully! Loan Amount: ${loanAmount}, Duration: ${loanDuration} months.`);
      } else {
        showAlert("Please enter loan amount and duration before requesting.");
      }
    }
  };

  const initializeUser = () => {
    if (!ethereumWallet) {
      return <p>Please install MetaMask to use this Wealth Management system.</p>;
    }

    if (!userAccount) {
      return (
        <button className="button" onClick={connectUserAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (accountFunds === undefined) {
      getAccountFunds();
    }

    return (
      <div>
        <p>User Account: {userAccount}</p>
        <p>Your Funds: {accountFunds} ETH</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Security Code"
            // value={securityCodeInput}
            onChange={handleSecurityCodeInputChange}
          />
          <button className="button" onClick={addFunds}>
            Add Funds (10 ETH)
          </button>
          <button className="button" onClick={withdrawFunds}>
            Withdraw Funds (10 ETH)
          </button>
        </div>
        <style jsx>{`
          .input-container {
            width: 28em;
            display: flex;
            flex-direction: column;
            gap: 0.5em;
          }

          .button {
            padding: 10px;
            background-color: #3498db;
            color: #ecf0f1;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .button:hover {
            background-color: #2980b9;
          }

          input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            font-size: 14px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
          }

          p {
            margin: 0;
            margin-bottom: 5px;
            font-size: 1.2rem;
            font-weight: 700;
            color: black;
          }
        `}</style>
      </div>
    );
  };

  const securityCodeSection = () => {
    return (
      <div>
        <h2>Change Security Code</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter Current Security Code"
            // value={securityCodeInput}
            onChange={handleChangeCode}
          />
          <input
            type="text"
            placeholder="Enter New Security Code"
            value={newSecurityCodeInput}
            onChange={handleNewSecurityCodeInputChange}
          />
          <button className="button" onClick={changeSecurityCode}>
            Change Security Code
          </button>
        </div>
        <style jsx>{`
          .input-container {
            width: 28em;
            display: flex;
            flex-direction: column;
            gap: 0.5em;
          }

          .button {
            padding: 10px;
            background-color: #3498db;
            color: #ecf0f1;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .button:hover {
            background-color: #2980b9;
          }

          input {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            font-size: 14px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
          }

          h2 {
            color: black;
            margin-bottom: 10px;
          }

          p {
            margin: 0;
            margin-bottom: 5px;
          }
        `}</style>
      </div>
    );
  };

  useEffect(() => {
    getEthereumWallet();
  }, []);

  return (
    <main className="container">
      <div className="content">
        {initializeUser()}
        {securityCodeSection()}
        <div>
          <h2>Request Loan</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter Loan Amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Loan Duration (in months)"
              value={loanDuration}
              onChange={(e) => setLoanDuration(e.target.value)}
            />
            <button className="button" onClick={requestLoan}>
              Request Loan
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ecf0f1;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          width: 100%;
          height: 100vh;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          background-color: #ecf0f1;
          width: 100%;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .input-container {
          width: 28em;
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }

        .button {
          padding: 10px;
          background-color: #3498db;
          color: #ecf0f1;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #2980b9;
        }

        input {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          font-size: 14px;
          border: 1px solid #bdc3c7;
          border-radius: 5px;
        }

        p {
          margin: 0;
          margin-bottom: 5px;
          font-size: 1.2rem;
          font-weight: 700;
          color: black;
        }

        h2 {
          color: black;
          margin-bottom: 10px;
        }
      `}</style>
    </main>
  );
}
