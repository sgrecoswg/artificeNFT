import { useEffect,useState } from 'react';
import './App.css';
import {ethers} from 'ethers';
//import contract from './contracts/NFTCollectible.json';

const contractAddress = '0x91f159a7406c5e583A6D915d94Be0E844f2E3e2E';
const abi = contract.abi;


function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async() => {
    const {ethereum} = window;
      if(!ethereum){
        console.log('No meta mask'); 

      }else{
        console.log('Walet exists');    
      }

      const accounts  =await ethereum.request({method:'eth_accounts'});
      if(accounts.length !== 0){
          const account = accounts[0];
          setCurrentAccount(accounts[0]);
      }
   }

  const connectWalletHandler = async() => {
    const {ethereum} = window;
    if(!ethereum){
      console.log('No meta mask'); 

    }

    try{
      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      console.log('found accoutns',accounts[0]);
      setCurrentAccount(accounts[0]);

    }catch(e){
      console.error(e);
    }

   }

  const mintNftHandler = () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress,abi,signer);
        console.log('init payment');
        let nftTxn = await nftContract.mintNFTs(1,{value:ethers.utils.parseEther("0.01")});
        console.log('miniting.....');
        await nftTxn.wait();
        console.log('minted',`https://ropsten.etherscan.io/tx/${nftTxn.hash}`);

      }
      else{ console.error('Etgereum not here...');}
    }catch(e){
      console.error(e);
    }

   }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Scrappy Squirrels Tutorial</h1>
      <div>
        {currentAccount ? mintNftButton() :  connectWalletButton()}
      </div>
    </div>
  );

}

export default App;
