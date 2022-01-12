import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../UserContext'
import { Link, useRouteMatch } from 'react-router-dom';
import { getArtists } from '../../api';
import { BsEye,BsX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import  LoadingSpinner  from '../common/LoadingSpinner';


const ArtistsList = () => {
    const user = useContext(UserContext);
    const [artists, setArtists] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
   
    useEffect(() => {
        async function getData() {
            setIsLoadingData(true);
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
            setIsLoadingData(false);
        }
        getData();
    }, []);

  
    
    return (
        <div>
            <h1>Artists</h1>            
            <div className="artists-list">
                {isLoadingData ? <LoadingSpinner message="Loading artists" /> :
                    artists.map((a) => {
                        return (
                            <Link to={`/artist/${a.id}`} key={a.id} className="artists-list-item">
                                <div className="artist-avatar-container-sm">
                                    <img className="artist-avatar-sm"
                                        src={`${process.env.PUBLIC_URL}/images/users/${a.id}/avatar.jpg`}
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror  = null;
                                            currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                                        }} />
                                </div>
                                <div>{a.name}</div>
                            </Link>
                        );
                    })
                }               
            </div>           
        </div>);
};

export default ArtistsList;
/**/