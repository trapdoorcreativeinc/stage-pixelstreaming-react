import React from 'react';
import StageLogo from '../components/StageLogo';
import LoadingScreen from '../components/LoadingScreen';

const LoadingPage = () => {

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