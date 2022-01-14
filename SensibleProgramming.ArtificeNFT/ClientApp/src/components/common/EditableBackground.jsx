import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';

const EditableBackground = ({ save, source }) => {

    const [artistBackGroundFileBlob, setArtistBackGroundFileBlob] = useState();

    /**
    * Saves the selected file to a blob, a file, and the name is set
    * @param {any} e
    */
    const saveBackGroundFile = (e) => {
        setArtistBackGroundFileBlob(URL.createObjectURL(e.target.files[0]));
        save(e.target.files[0]);
    }

    return (
        <div className="artist-bg">
            <div className="image-upload">
                <img className="artist-bg-img"
                    src={artistBackGroundFileBlob || source}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                    }} />
            </div>
            <label htmlFor="bg-file-input" className="overlay">
                <div><BsPencil color="white" /></div>
            </label>
            <input id="bg-file-input" type="file" onChange={saveBackGroundFile} />
        </div>
        );
}

export default EditableBackground;