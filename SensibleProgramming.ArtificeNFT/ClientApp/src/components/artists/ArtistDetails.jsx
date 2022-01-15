import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link  } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { BsPencil, BsTwitter, BsInstagram, BsWindowDock } from 'react-icons/bs';
import { Button, Tabs, Tab } from 'react-bootstrap';
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
                    let _artist = response.items;
                    for (var urls in _artist.otherUrls) {
                        _artist[urls] = _artist.otherUrls[urls];
                    }
                    setArtist(_artist);
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
            <div className="artist-bg" style={{ backgroundSize:"cover", backgroundImage: `url("${process.env.PUBLIC_URL}/images/users/${artist.id}/background.jpg")` }}></div>
            <Avatar source={`${process.env.PUBLIC_URL}/images/users/${artist.id}/avatar.jpg`}/>
            <div><h3>{artist.name}</h3></div>
            <div>{user.value}</div>
            <p>{artist.about}</p>

            <div style={{ display: 'flex', flexDirection:'row', color:'black', fontSize:'2em' }}>
                <Link style={{ color: 'black', padding:'5px' }} to={{ pathname: artist.twitter }} ><BsTwitter /></Link>
                <Link style={{ color: 'black', padding: '5px' }} to={{ pathname: artist.instagram }}><BsInstagram /></Link>
                <Link style={{ color: 'black', padding: '5px' }} to={{ pathname: artist.other }}><BsWindowDock /></Link>
            </div>
            
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
            <Tabs defaultActiveKey="Collected" id="" className="mb-3" style={{ width: '100%' }}>
                <Tab eventKey="Collected" title="Collected">
                   Collected  hfgjfghjfgh
                </Tab>
                <Tab eventKey="Created" title="Created">
                    Created fghfghfghdfghdsfgseswet
                </Tab>
                <Tab eventKey="History" title="History">
                    History ewtwergtertswertgerdter
                </Tab>
            </Tabs>
        </div>
    );
};

export default ArtistDetails;
