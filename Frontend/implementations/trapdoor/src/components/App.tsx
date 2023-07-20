// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useState } from 'react';
import { PixelStreamingWrapper } from './PixelStreamingWrapper';
import SideNav from './SideNav';

export const App = () => {
  const [signalingServer, setSignalingServer] = useState('ws://localhost:80');
  const [showSessionSelector, setShowSessionSelector] = useState(true);

  const wasDisconnected = () => {
    setShowSessionSelector(true);
  }
  return (
    <div className='app'>
      {showSessionSelector ? (
        <div className='session-selection__prompt'>
          <div className='session-selection__prompt__header'>
            <img className='session-selection__prompt__logo' src={require('../assets/images/Stage_Vertical_WhiteFilled.svg')} />
          </div>
          <div className='session-selection__prompt__navigation'>
            <input className='session-selection__prompt__input' type='text' value={signalingServer} onChange={(e) => setSignalingServer(e.target.value)} />
            <button className='session-selection__prompt__button'
              onClick={() => {
                setShowSessionSelector(false);
              }}
            >
              Start in Single User Mode
            </button>
            {/* <button className='session-selection__prompt__button'>
                            Start a Multi User Session
                        </button>
                        <button className='session-selection__prompt__button'>
                            Join a Multi User Session
                        </button> */}
          </div>
        </div>
      ) : (
        <PixelStreamingWrapper
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: signalingServer,
            StartVideoMuted: true,
            HoveringMouse: true,
          }}
          wasDisconnected={wasDisconnected}
        />
      )}
      <SideNav />
      <div className='trapdoor-logo'>
        <img src={require('../assets/images/TD_Horizontal_White.svg')} />
      </div>
    </div>
  );
};
