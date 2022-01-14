import React from 'react';

const Avatar = ({ source }) => {
    
    return (
        <div className="artist-avatar-container">                  
            <img className="artist-avatar" src={source}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${process.env.PUBLIC_URL}/images/defaultuser.png`;
                }} />
        </div>
        );
}

export default Avatar;