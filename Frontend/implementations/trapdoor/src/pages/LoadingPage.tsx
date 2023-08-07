import React, { useContext, useEffect } from 'react';
import StageLogo from '../components/StageLogo';
import LoadingScreen from '../components/LoadingScreen';
import { StreamStatusContext } from '../contexts/StreamStatusContext';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const { streamStatusData, setStreamStatusData } = useContext(StreamStatusContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimeout(() => {
      setStreamStatusData({type: 'UPDATE_STREAM_URL', url: 'ws://localhost:80'})
      navigate('/start')
    }, 5000)
  }, [])
  return (
    <div className='loading-page'>
      <div className='loading-page__content'>
        <div className='loading-page__logo'>
          <StageLogo
            includeText={true}
            orientation='vertical'
            logoSize='small'
            mode='light'
            loading={true}
          />
        </div>
        <div className='loading-page__text'>
          <h1>Setting up your<br/>personalized experience</h1>
          <p>Looks like all Stage resources are currently in use.<br/>We'll start an additional Stage session for you right away.<br/>Thanks for your patience as this could take a minute or two.</p>
        </div>
      </div>
      <LoadingScreen />
    </div>
  )
}
export default LoadingPage;