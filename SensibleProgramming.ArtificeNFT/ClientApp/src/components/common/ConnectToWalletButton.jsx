import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'reactstrap';
import { ethers } from 'ethers';
import { UserContext } from '../../UserContext'
import { getArtist } from '../../api';

const ConnectToWalletButton = () => {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);
    const [artist, setArtist] = useState({});
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
            let _address = accounts[0];
            //let _foundArtists = await getArtist(_address);
            context.value = accounts[0];
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
            let response = await getArtist(currentAccount);
            console.log('ConnectToWalletButton get artists by wallet response', response);
            switch (response.status) {
                case "success":
                    setArtist(response.items);
                    break;
                case "warn":
                    console.warn(response.message);
                    break;
                case "error":
                    console.error(response);
                    break;
                default:
                    break
            }
            setIsLoadingData(false);
        }

        checkWalletIsConnected();
        if (currentAccount && currentAccount.length > 0) {
            console.log('currentAccount', currentAccount);
             getData();
        }
       
    }, []);

    return (<>
        {currentAccount && currentAccount.length > 0?
            <NavDropdown
                title={
                <div className="float-left artist-avatar-container-login">
                    <img className="artist-avatar-login"
                        alt={`${artist.name} avatar`}
                        src={`${process.env.PUBLIC_URL}/images/users/${context.value}/avatar.jpg`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                        }} />
                </div>
            }  id="basic-nav-dropdown">
                <NavDropdown.Item href={`/artist/${context.value}`}>Your Profile</NavDropdown.Item>
               
            </NavDropdown>
            :
            connectWalletButton()
        }
       </> );
}

export default ConnectToWalletButton;

/*
  <NavDropdown.Item href="/">Your Collection</NavDropdown.Item>
                <NavDropdown.Item href="/">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Log out</NavDropdown.Item>
 */