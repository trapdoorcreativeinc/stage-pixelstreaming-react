// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useEffect, useRef, useState } from 'react';
import {
  Config,
  AllSettings,
  PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
}

export const PixelStreamingWrapper = ({
  initialSettings
}: PixelStreamingWrapperProps) => {
  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);

  // Pixel streaming library instance is stored into this state variable after initialization:
  const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

  // A boolean state variable that determines if the Click to play overlay is shown:
  const [clickToPlayVisible, setClickToPlayVisible] = useState(true);

  // Run on component mount:
  useEffect(() => {
    console.log('PixelStreamingWrapper mounted');
    if (videoParent.current) {
      console.log('PixelStreamingWrapper mounted - videoParent.current', videoParent.current);
      // Attach Pixel Streaming library to videoParent element:
      const config = new Config({ initialSettings });
      const streaming = new PixelStreaming(config, {
        videoElementParent: videoParent.current
      });

      streaming.videoElementParent.addEventListener('paste', (e) => {
        console.log('paste', e);
      });

      // register a playStreamRejected handler to show Click to play overlay if needed:
      streaming.addEventListener('playStreamRejected', () => {
        setClickToPlayVisible(true);
      });

      // Save the library instance into component state so that it can be accessed later:
      setPixelStreaming(streaming);

      // Clean up on component unmount:
      return () => {
        try {
          streaming.disconnect();
        } catch { }
      };
    }
  }, []);

  return (
    <div className='pixel-streaming-wrapper'>
      <div className='pixel-streaming-wrapper__video' ref={videoParent} onPaste={(e) => {
        e.preventDefault();
        console.log('onPaste', e);
      }} />
      {clickToPlayVisible && (
        <div className='pixel-streaming-wrapper__prompt'>
          <div className='pixel-streaming-wrapper__prompt__header'>
            <img className='pixel-streaming-wrapper__prompt__logo' src={require('../assets/images/favicon.png')} />
          </div>
          <div className='pixel-streaming-wrapper__prompt__navigation'>
            <button className='pixel-streaming-wrapper__prompt__button'
              onClick={() => {
                pixelStreaming?.play();
                setClickToPlayVisible(false);
              }}
            >
              Start in Single User Mode
            </button>
            <button className='pixel-streaming-wrapper__prompt__button'>
              Start a Multi User Session
            </button>
            <button className='pixel-streaming-wrapper__prompt__button'>
              Join a Multi User Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
