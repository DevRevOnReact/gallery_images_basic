import React from 'react';

function Image({ image }) {
    return (
        <div className="image-card">
            <img src={image.urls.regular} alt={image.alt_description} />
            <div className="image-details">
                <h2>{image.user.username}</h2>
                <p>{image.description}</p>
            </div>
        </div>
    );
}

export default Image;
