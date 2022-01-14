import React, {  useState } from 'react';
import { BsPencil } from 'react-icons/bs';

const EditableAvatar = ({ save, source }) => {

    const [artistAvatarFileBlob, setArtistAvatarFileBlob] = useState();

    /**
   * Saves the selected file to a blob, a file, and the name is set
   * @param {any} e
   */
    const saveAvatarFile = (e) => {
        setArtistAvatarFileBlob(URL.createObjectURL(e.target.files[0]));
        save(e.target.files[0]);
    }

    return (
        <div className="artist-avatar-container">
            <div className="image-upload">                
                <img className="artist-avatar" src={artistAvatarFileBlob || source}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                    }} />
            </div>
            <label htmlFor="avatar-file-input" className="overlay">
                <div><BsPencil color="white" /></div>
            </label>            
            <input id="avatar-file-input" type="file" onChange={saveAvatarFile} />
        </div>
        );
}

export default EditableAvatar;