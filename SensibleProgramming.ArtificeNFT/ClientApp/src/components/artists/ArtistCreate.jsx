import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'

const ArtistCreate = () => {
    const user = useContext(UserContext);
    const [artist, setArtist] = useState({});

    useEffect(() => {
        console.log('ArtistCreate');
    }, []);

    return (<div>Artist Create</div>);
};

export default ArtistCreate;