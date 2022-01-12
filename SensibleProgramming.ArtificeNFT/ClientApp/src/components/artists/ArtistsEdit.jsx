import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { getArtist, updateArtist, uploadAvatar } from '../../api';
import _ from 'lodash';
import { BsPencil } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import Avatar from '../common/Avatar';

const ArtistsEdit = () => {
    const { id } = useParams();
    const user = useContext(UserContext);
    const [artist, setArtist] = useState({});
    const [artistAvatarFileBlob, setArtistAvatarFileBlob] = useState();
    const [artistAvatarFile, setArtistAvatarFile] = useState();
    const [artistAvatarFileName, setArtistAvatarFileName] = useState();
    const [artistBackGroundFileBlob, setArtistBackGroundFileBlob] = useState();
    const [artistBackGroundFile, setArtistBackGroundFile] = useState();
    const [artistBackGroundFileName, setArtistBackGroundFileName] = useState();

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

    /**
     * Saves the changes to the artist
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
                if (artistAvatarFileBlob) uploadAvatarToServer();
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

    /**
     * Saves the selected file to a blob, a file, and the name is set
     * @param {any} e
     */
    const saveAvatarFile = (e) => {
        setArtistAvatarFileBlob(URL.createObjectURL(e.target.files[0]));
        setArtistAvatarFile(e.target.files[0]);
        setArtistAvatarFileName(e.target.files[0].name);
    }

    /**
     * Uploads the avatar file to the server
     * */
    const uploadAvatarToServer = async () => {
        const formdata = new FormData();
        formdata.append("formFile", artistAvatarFile);
        formdata.append("formFileName", artistAvatarFileName);
        try {
            let response = await uploadAvatar(artist.id,formdata);
            console.log('uploadAvatar response', response);
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
        } catch (e) {
            console.error('Error saving avatar',e);
        }
    }


    /**
     * Saves the selected file to a blob, a file, and the name is set
     * @param {any} e
     */
    const saveBackGroundFile = (e) => {
        setArtistBackGroundFileBlob(URL.createObjectURL(e.target.files[0]));
        setArtistBackGroundFile(e.target.files[0]);
        setArtistBackGroundFileName(e.target.files[0].name);
    }

    /**
     * Uploads the avatar file to the server
     * */
    const uploadBackGroundToServer = async () => {
        const formdata = new FormData();
        formdata.append("formFile", artistAvatarFile);
        formdata.append("formFileName", artistAvatarFileName);
        //try {
        //    let response = await uploadAvatar(artist.id, formdata);
        //    console.log('uploadAvatar response', response);
        //    switch (response.status) {
        //        case "success":
        //            setArtist(response.items);
        //            break;
        //        case "warn":
        //            console.warn(response.message);
        //            break;
        //        case "error":
        //            console.error(response);
        //            break;
        //        default:
        //            break
        //    }
        //} catch (e) {
        //    console.error('Error saving avatar', e);
        //}
    }
       

    return (
    <div className="artist-container">
            <div className="artist-bg" style={{ backgroundImage: `url("${process.env.PUBLIC_URL}/images/users/${artist.id}/bg.jpg")` }}></div>
            <Avatar saveAvatarFile={saveAvatarFile} source={artistAvatarFileBlob || `${process.env.PUBLIC_URL}/images/users/${artist.id}/avatar.jpg`}/>
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