// Copyright Epic Games, Inc. All Rights Reserved.

import React from 'react';
import { PixelStreamingWrapper } from './PixelStreamingWrapper';
import SideNav from './SideNav';

export const App = () => {
    return (
        <div className='app'>
            <PixelStreamingWrapper
                initialSettings={{
                    AutoPlayVideo: true,
                    AutoConnect: true,
                    ss: 'ws://localhost:80',
                    StartVideoMuted: true,
                    HoveringMouse: true,
                }}
            />
            <SideNav />
        </div>
    );
};
