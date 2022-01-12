import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { saveArtist } from '../../api';
import _ from 'lodash';
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

const ArtistCreate = () => {
    const publicWalletAddress= useContext(UserContext);
    const [artist, setArtist] = useState({
        name: '',
        about: '',
        backgroundImageUrl: '',
        avatarImageUrl:''
    });

    useEffect(() => {//just to see what happened
        console.log('Artist changed', artist);
    }, [artist]);

    /**
     * Handles/assigns property changes on the artists from inputs
     * @param {any} propChanged
     * @param {any} value
     */
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
     * Adds a new artists to the db
     * */
    const createArtists = async () => {

        let newArtist = {
            Name: artist.name,
            About: artist.about,
            BackgroundImageUrl: artist.backgroundImageUrl,
            AvatarImageUrl: artist.avatarImageUrl,
            PublicAddress: publicWalletAddress.value
        };
        
        let response = await saveArtist(newArtist);
        console.log('createArtists response', response);
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
            <input className="form-control" onChange={(e) => handleChange('name', e.target.value)} />
        </div>
            <div className="form-group">
            <label>About:</label>
            <textarea className="form-control" onChange={(e) => handleChange('about', e.target.value)} />
        </div>
            <Button variant="success" onClick={createArtists}>Save</Button>
            <Button as={Link} to="/artists" variant="secondary">Cancel</Button>
    </div>);
};

export default ArtistCreate;

/*
  <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-pencil">
                        <path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path>
                    </svg>
 */