import React from 'react';
// import Palette from 'react-palette'
import ImagePalette from 'react-image-palette';
import Image from "react-graceful-image";
// import Image from 'react-progressive-image';
// import FadeIn from 'react-lazyload-fadein'

const forImage = ({ backgroundColor }) => (
    <div style={{padding: '16px', color: backgroundColor}}>
        hello there
    </div>
)

const byImage = ({ backgroundColor }) => (
    <Image
        src="path_to_image"
        className="content-image"
        alt="My awesome image"
        placeholderColor="#0083FE"
    />
)

const cors = 'https://cors-anywhere.herokuapp.com/'


const ImageProvider = ({ imgURL, className }) => {
    return (
        <ImagePalette
            crossOrigin
            image={cors + imgURL}
            default={{backgroundColor: 'violet'}}
        >
        {({ backgroundColor }) => (
            <Image
                src={imgURL}
                className={className}
                alt="My awesome image"
                placeholderColor={backgroundColor}
            />
        )}
        </ImagePalette>
    )
}

export default ImageProvider;
