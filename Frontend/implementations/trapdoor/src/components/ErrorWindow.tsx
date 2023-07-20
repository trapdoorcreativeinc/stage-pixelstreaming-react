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
    </div>
  </div>
);

export default ErrorWindow;