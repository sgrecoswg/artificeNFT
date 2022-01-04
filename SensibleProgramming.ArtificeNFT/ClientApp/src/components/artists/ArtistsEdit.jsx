import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { getArtist, updateArtist } from '../../api';
import _ from 'lodash';
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

const ArtistsEdit = () => {
    const user = useContext(UserContext);
    const [artist, setArtist] = useState({});
    const { id } = useParams();

    useEffect(() => {
        console.log('ArtistsEdit');
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

    useEffect(() => {//just to see what happened
        console.log('Artist changed', artist);
    }, [artist]);


    const handleChange = (propChanged,value) => {
        try {
            let _copy = _.cloneDeep(artist);//create a copy we can modify
            _copy[propChanged] = value;
            setArtist(_copy);//overwrite the previous version
        } catch (error) {
            //log error, for now log to console
            console.error('Error updating artist!', error);
        }
    }

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
            <Button className="action-button" size="sm" variant="secondary">
                <BsPencil/>Edit
            </Button>
        </div>
            <div className="form-group" style={{marginTop:'50px'}}>
                <label>Name:*</label>
                <input className="form-control" defaultValue={ artist.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
                <label>About:</label>
                <textarea className="form-control" defaultValue={artist.about} onChange={(e) => handleChange('about', e.target.value)} />
            </div>
            <Button as={Link}
                to={`/artist/${artist.id}`}
                className="action-button"
                size="sm"
                variant="secondary">
                Cancel
            </Button>
            <Button variant="success" onClick={updateArtists}>Save</Button>

    </div>);
};

export default ArtistsEdit;
