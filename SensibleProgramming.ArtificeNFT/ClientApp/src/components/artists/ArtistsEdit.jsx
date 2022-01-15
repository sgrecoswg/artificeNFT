import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { UserContext } from '../../UserContext'
import { getArtist, updateArtist, uploadAvatar, uploadBackground, deleteArtist } from '../../api';
import _ from 'lodash';
import { BsX } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import EditableAvatar from '../common/EditableAvatar';
import EditableBackground from '../common/EditableBackground';


const ArtistsEdit = () => {
    const { id } = useParams();
    const user = useContext(UserContext);
    const [artist, setArtist] = useState({});
    //const [artistAvatarFileBlob, setArtistAvatarFileBlob] = useState();
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

    useEffect(() => {//just to see what happened
        console.log('Artist changed', artist);
    }, [artist]);

    const OtherUrlsComponent = () => {
        let _temp = [];
        for(var url in artist.otherUrls) {
            _temp.push(url);
        }
        /*
       
         
         */
        return (<> 
            {_temp.map((t,i) => {
                return (
                    <div className="form-group" key={`otherUrls_${i}`}>
                        <label>{t}:</label>
                        <input className="form-control" defaultValue={artist[t]} onChange={(e) => handleChange(t, e.target.value)} />
                    </div >
                    );
                })
            }
        </>);
    }

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

        let dict = new Object();
        dict["twitter"] = artist.twitter;
        dict["instagram"] = artist.instagram;
        dict["other"] = artist.other;

        let response = await updateArtist({
            Id: artist.id,
            Name: artist.name,
            About: artist.about,
            BackgroundImageUrl: artist.backgroundImageUrl,
            AvatarImageUrl: artist.avatarImageUrl,
            Email: artist.email,
            OtherUrls: dict
        });
        console.log('updateArtistsresponse', response);
        switch (response.status) {
            case "success":
                let _artist = response.items;
                for (var urls in _artist.otherUrls) {
                    _artist[urls] = _artist.otherUrls[urls];
                }
                setArtist(_artist);

                if (artistAvatarFile) await uploadAvatarToServer();
                if (artistBackGroundFile) await uploadBackGroundToServer();
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
    const saveAvatarFile = (file) => {
        //setArtistAvatarFileBlob(URL.createObjectURL(file));
        setArtistAvatarFile(file);
        setArtistAvatarFileName(file.name);
    }

    /**
     * Uploads the avatar file to the server
     * */
    const uploadAvatarToServer = async () => {
        let formdata = new FormData();
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
    const saveBackGroundFile = (file) => {
        //setArtistBackGroundFileBlob(URL.createObjectURL(file));
        setArtistBackGroundFile(file);
        setArtistBackGroundFileName(file);
    }

    /**
     * Uploads the avatar file to the server
     * */
    const uploadBackGroundToServer = async () => {
        let bgFormData = new FormData();
        bgFormData.append("formFile", artistBackGroundFile);
        bgFormData.append("formFileName", artistBackGroundFileName);
        try {
            let response = await uploadBackground(artist.id, bgFormData);
            console.log('uploadBackground response', response);
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
            console.error('Error saving avatar', e);
        }
    }


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

    /*
      <div className="form-group">
                <label>Twitter:</label>
                <textarea className="form-control" defaultValue={artist.twitter} onChange={(e) => handleChange('twitter', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Instagram:</label>
                <textarea className="form-control" defaultValue={artist.instagram} onChange={(e) => handleChange('instagram', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Other:</label>
                <textarea className="form-control" defaultValue={artist.other} onChange={(e) => handleChange('other', e.target.value)} />
            </div>
          
     */
    return (
    <div className="artist-container">
            <EditableBackground save={saveBackGroundFile} source={`${process.env.PUBLIC_URL}/images/users/${artist.id}/background.jpg`}/>
            <EditableAvatar save={saveAvatarFile} source={`${process.env.PUBLIC_URL}/images/users/${artist.id}/avatar.jpg`} />
            <div className="form-group" style={{marginTop:'50px'}}>
                <label>Name:*</label>
                <input className="form-control" defaultValue={ artist.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
                <label>About:</label>
                <textarea className="form-control" defaultValue={artist.about} onChange={(e) => handleChange('about', e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <textarea className="form-control" defaultValue={artist.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>

          

            <OtherUrlsComponent/>

           

            <div style={{ display: 'flex' }}>
                <Button as={Link}
                    to={`/artist/${artist.id}`}
                    className="action-button"
                    size="sm"
                    variant="secondary">
                    Cancel
                </Button>
                <Button variant="success" onClick={updateArtists}>Save</Button>
                <Button
                    onClick={deleteArtists}
                    className="action-button"
                    size="sm"
                    variant="secondary">
                    <BsX />Delete Profile
                    </Button>
                </div>
    </div>);
};

export default ArtistsEdit;