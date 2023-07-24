import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';
import StageLogo from './StageLogo';

interface SessionSelectorProperties {
  setShowSessionSelector: Function,
  signalingServer: string,
  setSignalingServer: Function,
}

const SessionSelector = ({
  setShowSessionSelector,
  signalingServer,
  setSignalingServer,
}: SessionSelectorProperties) => {
  const [loadingSession, setLoadingSession] = useState(false);
  return (<>
    <div className={`session-selector-wrapper ${!loadingSession && 'split-half'}`}>
      <div className='session-selector-left'>
        <div className='session-selector__header'>
          <StageLogo includeText={!loadingSession} loading={loadingSession} horizontal={loadingSession} />
          {loadingSession ? (
            <div>Stage</div>
          ): (
            <div className="sub-text">Streaming</div>
          )}
        </div>
        { loadingSession && (
          <div className='session-selector__loading-text'>
            <h1>Setting up your<br/>personalized experience</h1>
            <p>Looks like all Stage resources are currently in use.<br/>We'll start an additional Stage session for you right away.<br/>Thanks for your patience as this could take a minute or two.</p>
          </div>
        )}
      </div>
      <div className='session-selector-right'>
      {!loadingSession ? (
          <div className='session-selector__navigation'>
            {/* <input className='session-selector__input' type='text' value={signalingServer} onChange={(e) => setSignalingServer(e.target.value)} /> */}
            <button className='session-selector__button'
              onClick={() => {
                setLoadingSession(true);
                // setShowSessionSelector(false);
              }}
            >
              Start Session
            </button>
            <button className='session-selection__prompt__button'>
              Start a Multi User Session
            </button>
            <button className='session-selection__prompt__button'>
              Join a Multi User Session
            </button>
          </div>
      ) : (
        <div className='session-selector__image-wrapper'>
          <LoadingScreen />
        </div>
      )}
      </div>
    </div>
  </>)
}

export default SessionSelector;