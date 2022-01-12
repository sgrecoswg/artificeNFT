import React from 'react';


const Avatar = ({ saveAvatarFile, source }) => {

    return (
        <div className="artist-avatar-container">
            <div className="image-upload">
                <label htmlFor="avatar-file-input">
                    <img className="artist-avatar" src={source}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                        }} />
                </label>
                <input id="avatar-file-input" type="file" onChange={saveAvatarFile} />
            </div>
        </div>
        );
}

export default Avatar;