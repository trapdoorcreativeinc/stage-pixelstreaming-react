import React from 'react';

interface SettingsPageWrapperProperties {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SettingsPageWrapper = ({
  title,
  children,
  className,
}: SettingsPageWrapperProperties) => {
  return (<>
    <div className={`settings-page-wrapper ${className}`}>
      <h2>{title}</h2>
      {children}
    </div>
  </>)
}

export default SettingsPageWrapper;