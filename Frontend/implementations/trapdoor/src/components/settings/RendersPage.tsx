import React from 'react';
import FileExplorer from '../fileExplorer/FileExplorer';
import SettingsPageWrapper from './SettingsPageWrapper';

interface RendersPageProperties {
}

const RendersPage = ({
}: RendersPageProperties) => {
  
  return (<>
  <SettingsPageWrapper title="Stage Cloud Data - Renders" className="renders-page-wrapper">
    <FileExplorer
      allowDownloads={true}
      baseBucketPath='Renders'
    />
  </SettingsPageWrapper>
  </>)
}

export default RendersPage;