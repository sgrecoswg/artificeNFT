import React from 'react';
import { BsPencil } from 'react-icons/bs';

const Avatar = ({ saveAvatarFile, source }) => {
    /*
                     <label htmlFor="avatar-file-input">
                    <img className="artist-avatar" src={source}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                        }} />
                </label>
     */
    return (
        <div className="artist-avatar-container">
            <div className="image-upload">                
                <img className="artist-avatar" src={source}
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

export default Avatar;