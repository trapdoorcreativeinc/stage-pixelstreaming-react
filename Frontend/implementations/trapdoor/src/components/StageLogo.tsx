import React from 'react';

interface StageLogoProperties {
  className?: string,
  loading?: boolean,
  includeText?: boolean,
  orientation?: 'vertical' | 'horizontal',
  logoSize?: 'small' | 'large',
  checkmark?: boolean,
  mode?: 'light' | 'dark',
  children?: React.ReactNode,
}

const StageLogo = ({
  className,
  loading,
  includeText,
  orientation = 'vertical',
  logoSize = 'large',
  checkmark,
  mode = 'dark',
  children,
}: StageLogoProperties) => {
  return (
    <div className={`stage-logo-wrapper ${orientation} ${logoSize} ${mode}`}>
      <div className={`stage-logo-spinner ${loading && 'loading'} ${checkmark && 'checkmark'} ${className}`}>
        <div className="stage-logo-circle-background"></div>
        <div className="stage-logo-circle-foreground">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`stage-logo-inner-shape`}></div>
      </div>
      {includeText && (
        <div className='stage-logo-text'>Stage</div>
      )}
      <div className='stage-logo-subtext'>
        {children}
      </div>
    </div>
  )
}

export default StageLogo;