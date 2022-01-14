import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link  } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import { getArtist } from '../../api';
import Avatar from '../common/Avatar';

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


    return (
        <div className="artist-container">            
            <div className="artist-bg" style={{ backgroundSize:"cover", backgroundImage: `url("${process.env.PUBLIC_URL}/images/users/${artist.id}/background.jpg")` }}></div>
          
            <Avatar source={`${process.env.PUBLIC_URL}/images/users/${artist.id}/avatar.jpg`}/>
            <div><h3>{artist.name}</h3></div>
            <div>{user.value}</div>
            <p>{ artist.about }</p>
            {user.value === artist.id ?
                <div style={{display:'flex'}}>                     
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
