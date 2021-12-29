import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext'

const ArtistHomePage = () => {
    const user = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        console.log('ArtistHomePage');
    }, []);

    return (<div>Artist Home - {id}</div>);
};

export default ArtistHomePage;