import React from 'react';
import { Link } from 'react-router-dom';
import StageLogo from '../components/StageLogo';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <div className='landing-page__content'>
        <div className='landing-page__logo'>
          <StageLogo
            includeText={true}
            orientation='vertical'
            logoSize='large'
            mode='light'
          >
            <div>Streaming</div>
          </StageLogo>
        </div>
        <div className='landing-page__buttons'>
          <Link to='/session' className='button light'>
            Start Session
          </Link>
          <Link to='/start' className='button light '>
            Start a Multi User Session
          </Link>
          <Link to='/' className='button light disabled' aria-disabled>
            Join a Multi User Session
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LandingPage;