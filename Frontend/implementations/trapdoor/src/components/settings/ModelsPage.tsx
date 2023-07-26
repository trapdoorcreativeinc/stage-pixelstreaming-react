import React from 'react';
import FileExplorer from '../fileExplorer/FileExplorer';
import SettingsPageWrapper from './SettingsPageWrapper';

interface ModelsPageProperties {
}

const ModelsPage = ({
}: ModelsPageProperties) => {
  
  return (<>
  <SettingsPageWrapper title="Stage Cloud Data - Models" className="models-page-wrapper">
    <FileExplorer
      allowUploads={true}
      baseBucketPath='Models'
    />
  </SettingsPageWrapper>
  </>)
}

export default ModelsPage;