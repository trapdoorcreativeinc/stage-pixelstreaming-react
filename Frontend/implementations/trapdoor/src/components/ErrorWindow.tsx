import React from 'react';

interface ErrorWindowProperties {
  children: React.ReactNode,
}

const ErrorWindow = ({
  children
}: ErrorWindowProperties) => (
  <div className="error-window-wrapper">
    <div className='error-window-content'>
      {children}
      {/* <br/>
      <button>
        Default
      </button>
      <button disabled>
        Default
      </button>
      <br/>
      <button className='danger'>
        Danger
      </button>
      <button className='danger' disabled>
        Danger
      </button>
      <br/>
      <button className='warning'>
        Warning
      </button>
      <button className='warning' disabled>
        Warning
      </button>
      <br/>
      <button className='info'>
        Info
      </button>
      <button className='info' disabled>
        Info
      </button>
      <br/>
      <button className='success'>
        Success
      </button>
      <button className='success' disabled>
        Success
      </button>
      <br/>
      <button className='action'>
        Action
      </button>
      <button className='action' disabled>
        Action
      </button>
      <br/>
      <button className='light'>
        Light
      </button>
      <button className='light' disabled>
        Light
      </button>
      <br/>
      <button className='grey'>
        Grey
      </button>
      <button className='grey' disabled>
        Grey
      </button>
      <br/>
      <button className='dark'>
        Dark
      </button>
      <button className='dark' disabled>
        Dark
      </button> */}
    </div>
  </div>
);


export default ErrorWindow;