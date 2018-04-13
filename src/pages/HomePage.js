import React from 'react';
import HeadlinesGrid from '../containers/HeadlinesGrid';
//TODO import news story timeline too

const HomePage = ({ children }) => {
    return (
        <div>
            <HeadlinesGrid />
        </div>
    )
}

export default HomePage