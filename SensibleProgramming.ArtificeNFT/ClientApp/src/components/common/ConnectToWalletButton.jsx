import React, { useContext, useEffect, useState } from 'react';
import { Spinner,Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { UserContext } from '../../UserContext'

const ConnectToWalletButton = () => {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    let context = useContext(UserContext);

    const checkWalletIsConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.warn('No meta mask');
        } else {
            console.info('Wallet exists');
        }

        setIsLoadingData(true);
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0) {
            console.log('wallet', accounts[0]);            
            //setContext({ address: accounts[0] });
            context = accounts[0];
            console.log('context', context);
            setCurrentAccount(accounts[0]);
        }
        setIsLoadingData(false);
    }

    const connectWalletHandler = async () => {
        //const { ethereum } = window;
        //if (!ethereum) {
        //    console.log('No meta mask');
        //}

        //try {
        //    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        //    console.log('found accoutns', accounts);
        //    //setCurrentAccount(accounts);

        //} catch (e) {
        //    console.error(e);
        //}
        const provider = new ethers.providers.Web3Provider(
            window.ethereum,
            "any"
        );
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log('found signer', signer);

        (async function () {
            let userAddress = await signer.getAddress();
            setCurrentAccount(userAddress);
            console.log("Your wallet is " + userAddress);
        })();

    }

    const connectWalletButton = () => {
        return (
            <Button variant="dark" onClick={connectWalletHandler} className=''>
                Connect Wallet
            </Button>
        )
    }

    useEffect(() => {
        
        async function getData() {
            setIsLoadingData(true);
            //let response = await getArtists();
            //console.log('ArtistsList response', response);
            //switch (response.status) {
            //    case "success":
            //        setArtists(response.items);
            //        break;
            //    case "warn":
            //        console.warn(response.message);
            //        break;
            //    case "error":
            //        console.error(response);
            //        break;
            //    default:
            //        break
            //}
            setIsLoadingData(false);
        }

        checkWalletIsConnected();
        if (currentAccount && currentAccount.length > 0) {
             getData();
        }
       
    }, []);

    return (<>
        {currentAccount?
            <label>Connected</label>
            :
            connectWalletButton()
        }
       </> );
}

export default ConnectToWalletButton;