// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useState } from 'react';
import { PixelStreamingWrapper } from './PixelStreamingWrapper';
import SideNav from './SideNav';
import SessionSelector from './SessionSelector';

const App = () => {
  const [signalingServer, setSignalingServer] = useState('ws://localhost:80');
  const [showSessionSelector, setShowSessionSelector] = useState(true);

  const wasDisconnected = () => {
    setShowSessionSelector(true);
  }
  return (
    <div className='app'>
      {showSessionSelector ? (
        <SessionSelector
          setShowSessionSelector={setShowSessionSelector}
          signalingServer={signalingServer}
          setSignalingServer={setSignalingServer}
        />
      ) : (
        <PixelStreamingWrapper
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: signalingServer,
            StartVideoMuted: true,
            HoveringMouse: true,
          }}
        />
      )}
      <SideNav />
      <div className='trapdoor-logo'>
        <img src={require('../assets/images/TD_Horizontal_White.svg')} />
      </div>
    </div>
  );
};

export default App;