import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useRouteMatch  } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { getArtist } from '../../api';

const ArtistDetails = () => {
    const user = useContext(UserContext);
    const { id } = useParams();
    const [artist, setArtist] = useState({});
    console.log('ArtistDetails', id);

    useEffect(() => {
        console.log('ArtistDetails');
        async function getData() {

            let response = await getArtist(id);
            console.log('getArtist by id response', response);
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
        }

        getData();
    }, []);

    

    return (
        <div className="artist-container">            
            <div className="artist-bg" style={{ backgroundImage: `url("${artist.backgroundImageUrl}")` }}></div>
            <div className="artist-avatar-container">              
                <img className="artist-avatar" src={artist.avatarImageUrl || `${process.env.PUBLIC_URL}/images/defaultuser.png`} />
            </div>            
            <div><h3>{artist.name}</h3></div>
            <p>
                { artist.about }
            </p>
            <Button as={Link}
                to={`/artist/edit/${artist.id}`}
                className="action-button"
                size="sm"
                variant="secondary">
                <BsPencil />Edit
            </Button>
        </div>
    );
};

export default ArtistDetails;
