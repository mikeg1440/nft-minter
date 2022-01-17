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
