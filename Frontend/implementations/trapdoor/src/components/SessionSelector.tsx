

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
  return (
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
  )
}

export default SessionSelector;