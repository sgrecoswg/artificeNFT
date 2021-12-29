import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext'

const Gallery = () => {
    const user = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        console.log('MintNFT');
    }, []);

    return (<div>Mint NFT - {id}</div>);
};

export default Gallery;