import React from 'react';

interface StageLogoProperties {
  className?: string,
  loading?: boolean,
  includeText?: boolean,
  horizontal?: boolean,
}

const StageLogo = ({
  className,
  loading,
  includeText,
  horizontal,
}: StageLogoProperties) => {
  return (
    <div className={`stage-logo-wrapper ${horizontal && 'horizontal'}`}>
      <div className={`stage-logo-spinner ${loading && 'loading'} ${className}`}>
        <div className="stage-logo-circle-background"></div>
        <div className="stage-logo-circle-foreground">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="stage-logo-inner-shape"></div>
      </div>
      {includeText && (
        <div className='stage-logo-text'>Stage</div>
      )}
    </div>
  )
}

export default StageLogo;