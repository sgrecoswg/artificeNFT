import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'
import { Link, useRouteMatch } from 'react-router-dom';
import { getArtists, deleteArtist } from '../../api';
import { BsEye,BsX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

const ArtistsList = () => {
    const user = useContext(UserContext);
    //const { url, path  } = useRouteMatch();
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        console.log('ArtistsList');
        async function getData() {      
            let response = await getArtists();
            console.log('ArtistsList response', response);
            switch (response.status) {
                case "success":
                    setArtists(response.items);
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
     * Removes an artist from the db
     * @param {any} id
     */
    const deleteArtists = async (id) => {
        if (window.confirm('Are you sure you want to delete this artists?')) {
            let response = await deleteArtist(id);
            switch (response.status) {
                case "success":
                    setArtists(artists.filter(x => x.id !== id));
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
        <div>
            <h1>Artists</h1>            
            <div className="artists-list">
            {artists.map((a) => {
                return (
                    <Link to={`/artist/${a.id}`} key={a.id} className="artists-list-item">
                        <div className="artist-avatar-container-sm">
                            <img className="artist-avatar-sm" src={a.avatarImageUrl || `${process.env.PUBLIC_URL}/images/defaultuser.png`} />                          
                        </div>
                        <div>{a.name}</div>
                    </Link>                   
                    );
            })}
            </div>
            <div><Link to="/artists/join"><Button variant="secondary">Join</Button></Link></div>
        </div>);
};

export default ArtistsList;