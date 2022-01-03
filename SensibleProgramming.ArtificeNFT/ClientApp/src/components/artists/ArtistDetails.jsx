import React, { useEffect, useState, useContext } from 'react';
import { useParams  } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import { getArtist, updateArtist } from '../../api';

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

    /**
     * Saves changes to the artists to the db     * 
     * */
    const updateArtists = async () => {
        let response = await updateArtist({
            Id: artist.id,
            Name: artist.name,
            About: artist.about,
            BackgroundImageUrl: artist.backgroundImageUrl,
            AvatarImageUrl: artist.avatarImageUrl,
        });
        console.log('updateArtistsresponse', response);
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
                to="/artists/join"
                className="action-button"
                size="sm"
                variant="secondary"
                onClick={updateArtists}
            >
                <BsPencil />Edit
            </Button>
        </div>
    );
};

export default ArtistDetails;
