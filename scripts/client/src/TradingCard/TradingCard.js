import React, { useState } from 'react';
import { ethers } from 'ethers';
import './TradingCard.css';
import barExchange from '../../src/artifacts/contracts/barExchange.sol/barExchange.json';
import { NonceManager } from "@ethersproject/experimental"

function Tradingcard(props) {
    const [buyAmount, setBuyAmount] = useState('0');
    const abi = barExchange.abi;
    

    
    
    async function buyTokens(e) {
        
        e.preventDefault();
        if (typeof window.ethereum !== 'undefined'){
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
                                                  
            const exchange = new ethers.Contract('0x5FC8d32690cc91D4c39d9d3abcBD16989F875707', abi, signer);
            const buytoken = await exchange.buyToken(overrides);
            buytoken.wait();

        }
        
    }

  return ( 
    <div className='container-wrapper'>
        <div className='card-container'>
            <div className='card-header'>
                <button className='buy-tokens' type='button' onClick={buyTokens}>BUY</button>
                <button className='sell-tokens' type='button' >SELL</button>
                <form className='token1-input' onChange={e => setBuyAmount({ buyAmount: e.target.value })}>
                    <label className='token1-input-label'>$BAR</label>
                    <input className='token1-input-bar' type='text'/>
                    <div className='current-price1'>
                        <button className='bar-price'>Purchase</button>
                    </div>
                </form>
                <form className='token2-input'>
                    <label className='token2-input-label'>$ETH</label>
                    <input className='token2-input-bar' type='text'/>
                    <div className='current-price2'>
                        <button className='eth-price'>Purchase</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Tradingcard;
