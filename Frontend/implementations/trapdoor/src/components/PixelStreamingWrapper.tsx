// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useEffect, useRef, useState } from 'react';
import {
  Config,
  AllSettings,
  PixelStreaming,
  Flags,
  NumericParameters
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import AfkWarning from './AfkWarning';
import ErrorWindow from './ErrorWindow';

export interface PixelStreamingWrapperProps {
  initialSettings?: Partial<AllSettings>;
  wasDisconnected: Function;
}

export const PixelStreamingWrapper = ({
  initialSettings,
  wasDisconnected,
}: PixelStreamingWrapperProps) => {
  // A reference to parent div element that the Pixel Streaming library attaches into:
  const videoParent = useRef<HTMLDivElement>(null);

  // Pixel streaming library instance is stored into this state variable after initialization:
  const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

  // A boolean state variable that determines if the Click to play overlay is shown:
  const [clickToPlayVisible, setClickToPlayVisible] = useState(true);

  const [streamDisconnectModalVisible, setStreamErrorModalVisible] = useState(false);
  const [streamDisconnectModalMessage, setStreamErrorModalMessage] = useState('');

  const [streamRunning, setStreamRunning] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  // Run on component mount:
  useEffect(() => {
    console.log('PixelStreamingWrapper mounted');
    if (videoParent.current) {
      console.log('PixelStreamingWrapper mounted - videoParent.current', videoParent.current);
      // Attach Pixel Streaming library to videoParent element:
      const config = new Config({ initialSettings });
      config.setFlagEnabled(Flags.AFKDetection, true);
      config.setNumericSetting(NumericParameters.AFKTimeoutSecs, 60);

      const streaming = new PixelStreaming(config, {
        videoElementParent: videoParent.current
      });

      // register a playStreamRejected handler to show Click to play overlay if needed:
      streaming.addEventListener('playStreamRejected', () => {
        console.log('PixelStreamingWrapper::playStreamRejected');
      });

      streaming.addEventListener('videoEncoderAvgQP', (e) => {
        console.log('PixelStreamingWrapper::Data -- VideoEncoderAvgQPEvent', e.data.avgQP);
      })
      streaming.addEventListener('webRtcSdp', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcSdpEvent');
      })
      streaming.addEventListener('webRtcAutoConnect', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcAutoConnectEvent', e);
      })
      streaming.addEventListener('webRtcConnecting', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcConnectingEvent', e);
      })
      streaming.addEventListener('webRtcConnected', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcConnectedEvent');
      })
      streaming.addEventListener('webRtcFailed', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcFailedEvent', e);
      })
      streaming.addEventListener('webRtcDisconnected', (e) => {
        console.log('PixelStreamingWrapper::webRtc -- WebRtcDisconnectedEvent', e.data);
        setStreamErrorModalMessage(e.data.eventString);
        setStreamErrorModalVisible(true);
      })
      streaming.addEventListener('dataChannelOpen', (e) => {
        console.log('PixelStreamingWrapper::Data -- DataChannelOpenEvent', e.data);
      })
      streaming.addEventListener('dataChannelClose', (e) => {
        console.log('PixelStreamingWrapper::Data -- DataChannelCloseEvent', e.data);
      })
      streaming.addEventListener('dataChannelError', (e) => {
        console.log('PixelStreamingWrapper::Setup -- DataChannelErrorEvent', e);
      })
      streaming.addEventListener('videoInitialized', (e) => {
        console.log('PixelStreamingWrapper::streamLifecycle -- VideoInitializedEvent');
      })
      streaming.addEventListener('streamLoading', (e) => {
        console.log('PixelStreamingWrapper::streamLifecycle -- StreamLoadingEvent', e);
      })
      streaming.addEventListener('playStreamError', (e) => {
        console.log('PixelStreamingWrapper::streamLifecycle -- PlayStreamErrorEvent', e);
      })
      streaming.addEventListener('playStream', (e) => {
        console.log('PixelStreamingWrapper::streamLifecycle -- PlayStreamEvent', e);
      })
      streaming.addEventListener('playStreamRejected', (e) => {
        console.log('PixelStreamingWrapper::streamLifecycle -- PlayStreamRejectedEvent', e.data.reason);
      })
      streaming.addEventListener('loadFreezeFrame', (e) => {
        console.log('PixelStreamingWrapper::Setup -- LoadFreezeFrameEvent', e);
      })
      streaming.addEventListener('hideFreezeFrame', (e) => {
        console.log('PixelStreamingWrapper::Setup -- HideFreezeFrameEvent', e);
      })
      streaming.addEventListener('statsReceived', (e) => {
        console.log('PixelStreamingWrapper::Data -- StatsReceivedEvent', e.data.aggregatedStats);
      })
      streaming.addEventListener('streamerListMessage', (e) => {
        console.log('PixelStreamingWrapper::StreamerListMessageEvent -- Data', e.data);
        const streamerIdIndex = e.data.messageStreamerList.ids.indexOf("SFU");
        if (streamerIdIndex > -1) {
        // if (e.data.messageStreamerList.ids.length > 1) {
          console.log('PixelStreamingWrapper::StreamerListMessageEvent -- setting StreamerId', "SFU")
          streaming.config.setSettings({'StreamerId':  "SFU"})
        }
        else if (e.data.messageStreamerList.ids.length === 1) {
          console.log('PixelStreamingWrapper::StreamerListMessageEvent -- setting StreamerId', e.data.messageStreamerList.ids[0])
          streaming.config.setSettings({'StreamerId':  e.data.messageStreamerList.ids[0]})
        } 
      })
      streaming.addEventListener('latencyTestResult', (e) => {
        console.log('PixelStreamingWrapper::Setup -- LatencyTestResultEvent', e);
      })
      streaming.addEventListener('initialSettings', (e) => {
        console.log('PixelStreamingWrapper::Data -- InitialSettingsEvent', e.data.settings);
      })
      streaming.addEventListener('settingsChanged', (e) => {
        console.log('PixelStreamingWrapper::Data -- SettingsChangedEvent', e.data);
      })
      streaming.addEventListener('xrSessionStarted', (e) => {
        console.log('PixelStreamingWrapper::Setup -- XrSessionStartedEvent', e);
      })
      streaming.addEventListener('xrSessionEnded', (e) => {
        console.log('PixelStreamingWrapper::Setup -- XrSessionEndedEvent', e);
      })
      streaming.addEventListener('xrFrame', (e) => {
        console.log('PixelStreamingWrapper::Setup -- XrFrameEvent', e);
      })
      


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
    <>
    <AfkWarning 
      pixelStreamingInstance={pixelStreaming}
    />
    {streamDisconnectModalVisible && !reconnecting && (
      <ErrorWindow>
        <>
          <h1>Stream Disconnected</h1>
          {streamDisconnectModalMessage === "Websocket disconnect (1005) " ? (
            <p>It looks like something went wrong with Stage. We are getting another instance ready for you, but it could take a few minutes.</p>
          ) : (
            <p>{streamDisconnectModalMessage}</p>
          )}
          <p>Don't worry! We saved your work before disconnecting. You can find it in the menu under Sessions - Last Session</p>
          <button onClick={() => {
            setStreamErrorModalVisible(false);
            wasDisconnected();
          }}>Reconnect</button>
        </>
      </ErrorWindow>
    )}
    <div className='pixel-streaming-wrapper'>
      <div className='pixel-streaming-wrapper__video' ref={videoParent} onPaste={(e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('onPaste', e.clipboardData.getData('Text'));
      }} />
      {clickToPlayVisible && (
        <div className='pixel-streaming-wrapper__prompt'
          onClick={() => {
            pixelStreaming?.play();
            setClickToPlayVisible(false);
          }} 
        >
          <div className='pixel-streaming-wrapper__prompt__header'>
            <img className='pixel-streaming-wrapper__prompt__logo' src={require('../assets/images/Stage_Vertical_WhiteFilled.svg')} />
          </div>
          <div className='pixel-streaming-wrapper__prompt__navigation'>
            <div className='play-button-header'>Streaming</div>
            <div className='play-button-wrapper'>
              <div className='material-icons'>play_circle_outline</div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};
