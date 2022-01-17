import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import mintNFT from './utils/ExpanseNFT.json';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {

  const [ metamaskAccount, setMetamaskAccount ] = useState('');
  const [ isMining, setIsMining ] = useState(false);
  const [ lastMintedNFT, setLastMintedNFT ] = useState('');
  const [ lastTokenId, setLastTokenId ] = useState(0);
  
  const CONTRACT_ADDRESS = '0xFED565B6B3917aFC51FfDA9F7cD539a5B53AEE26';
  
  const checkIfWalletIsConnected = async () => {
  
    const { ethereum } = window;
    
    if (!ethereum){
      console.error('[-] MetaMask not detected!  Please install metamask extension!');
      alert('MetaMask not detected!  Get it here https://metamask.io/');
      return;
    }
    
    console.log('[+] MetaMask detected!');
    
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length !== 0){
      const account = accounts[0];
      console.log(`[+] Using MetaMask Account: ${account}`);
      setMetamaskAccount(account);
    }else {
      console.log('[-] Error no MetaMask accounts found!');
    }
  }
  
  const callMintNFT = async () => {    
    try {
      const { ethereum } = window;
      
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, mintNFT.abi, signer);
        
        contract.on('NewNFTMinted', (from, tokenId) => {
          console.log(from, tokenId);
          setLastTokenId(tokenId);
        })
        console.log('[+] Setup event listener');

        
        let txn = await contract.mintNFT();
        
        setIsMining(true);
        console.log('[*] Mining started.....please wait.');
        
        await txn.wait();
        setIsMining(false);
        
        debugger
        setLastMintedNFT(txn.hash)
        console.log(`[+] Mining completed!\nTransaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
      }else {
        console.error('[-] Ethereum object not present!  Install MetaMask!');
      }
    } catch (err) {
      console.log(`[-] Error: ${err}`);
      alert('SHizz... something went wrong with the bits in the blocks all chained together!\nSorry!');
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
