import React, { useEffect, useState } from 'react';
import {
  PixelStreaming,
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import ErrorWindow from './ErrorWindow';

interface AfkWarningProperties {
  pixelStreamingInstance: PixelStreaming,
}

const AfkWarning = ({
  pixelStreamingInstance,
}: AfkWarningProperties) => {
  const [showAfkWarning, setShowAfkWarning] = useState(false);
  const [afkWarningCountDown, setAfkWarningCountDown] = useState(0);
  const [afkWarningDismissFunction, setAfkWarningDismissFunction] = useState<Function | null>(null); 

  useEffect(() => {
    if (pixelStreamingInstance) {
      pixelStreamingInstance.addEventListener('afkWarningActivate', (e) => {
        console.log('AfkWarning::afkWarningActivate', e.data.countDown);
        setShowAfkWarning(true);
        setAfkWarningCountDown(e.data.countDown);
        setAfkWarningDismissFunction((oldVal) => {
          return e.data.dismissAfk;
        });
      });
      pixelStreamingInstance.addEventListener('afkWarningUpdate', (e) => {
        console.log('AfkWarning::afkWarningUpdate', e.data.countDown);
        setAfkWarningCountDown(e.data.countDown);
      });
      pixelStreamingInstance.addEventListener('afkWarningDeactivate', () => {
        console.log('AfkWarning::afkWarningDeactivate');
        setShowAfkWarning(false);
      });
      pixelStreamingInstance.addEventListener('afkTimedOut', (e) => {
        console.log('AfkWarning::afkTimedOut', e);
        setShowAfkWarning(false);
      });
    }
  }, [pixelStreamingInstance]);

  if (showAfkWarning) {
    return (
      <ErrorWindow>
        <>
        <h1>Are you still there?</h1>
            <p>It looks like you aren't currently using Stage. To save resources, we will be disconnecting you in {afkWarningCountDown} seconds. If you are still using Stage, please click the button below.</p>
            <button className='action' onClick={() => {
              console.log('AfkWarning::buttonClick -- dismiss afk warning')
              afkWarningDismissFunction();
            }}>I'm still here!</button>
        </>
      </ErrorWindow>
    )
  }
  else return <></>;
}

export default AfkWarning;