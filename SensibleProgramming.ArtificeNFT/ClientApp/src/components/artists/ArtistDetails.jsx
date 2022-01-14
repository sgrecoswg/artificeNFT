import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useRouteMatch  } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { BsPencil,BsX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { getArtist, deleteArtist } from '../../api';

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

    useEffect(() => {
        console.log('ArtistDetails user changed', user);
       
    }, [user]);

    console.log('user', user);

    /**
   * Removes an artist from the db   
   */
    const deleteArtists = async () => {
        if (window.confirm('Are you sure you want to delete this artists?')) {
            let response = await deleteArtist(artist.id);
            switch (response.status) {
                case "success":
                    console.info(response.message);
                    //setArtists(artists.filter(x => x.id !== id));
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
    }

    return (
        <div className="artist-container">            
            <div className="artist-bg" style={{ backgroundImage: `url("${process.env.PUBLIC_URL}/images/users/${artist.id}/background.jpg")` }}></div>
            <div className="artist-avatar-container">              
                <img className="artist-avatar" src={`${process.env.PUBLIC_URL}/images/users/${artist.id}/avatar.jpg`}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                    }} />
            </div>            
            <div><h3>{artist.name}</h3></div>
            <p>{ artist.about }</p>
            {user.value === artist.id ?
                <div style={{display:'flex'}}>
                      <Button
                        onClick={deleteArtists}
                        className="action-button"
                        size="sm"
                        variant="secondary">
                        <BsX />Delete Profile
                    </Button>
                    <Button as={Link}
                        to={`/artist/edit/${artist.id}`}
                        className="action-button"
                        size="sm"
                        variant="secondary">
                        <BsPencil />Edit
                    </Button>
                </div>
               :''
            }
            
        </div>
    );
};

export default ArtistDetails;
