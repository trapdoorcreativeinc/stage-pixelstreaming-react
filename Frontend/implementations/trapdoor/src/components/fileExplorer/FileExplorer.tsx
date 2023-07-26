import React, { useEffect } from 'react';
import SingleFile from './SingleFile';
import FileUploader from './FileUploader';

const testFileData = [{
  name: 'Test Folder 1',
  type: 'folder',
}, {
  name: 'Test Folder 2',
  type: 'folder',
}, {
  name: 'Test Folder 3',
  type: 'folder',
}, {
  name: 'Test File 1',
  type: 'glb',
  size: 123456,
  lastModified: 123456789,
}, {
  name: 'Test File 2',
  type: 'glb',
  size: 123456,
  lastModified: 123456789,
}, {
  name: 'Test File 3',
  type: 'glb',
  size: 123456,
  lastModified: 123456789,
}]

interface FileExplorerProperties {
  allowUploads?: boolean;
  allowDownloads?: boolean;
  baseBucketPath?: string;
}

const FileExplorer = ({
  allowUploads = false,
  allowDownloads = false,
  baseBucketPath = 'Models',
}: FileExplorerProperties) => {
  const [currentPath, setCurrentPath] = React.useState(baseBucketPath);
  const [files, setFiles] = React.useState([]);
  useEffect(() => {
    
  }, [])
  return (<>
    <div className="file-explorer-wrapper">
      <div className="file-explorer">
        <div className='file-explorer__header'>
          <div onClick={() => setCurrentPath(baseBucketPath)}>{baseBucketPath}</div>
          <span>/</span>
          <div>Test Folder</div>
        </div>
        <div className="file-explorer__files">
          {testFileData.map((file) => (
            <SingleFile
              name={file.name}
              type={file.type}
              size={file.size}
              lastModified={file.lastModified}
              deletable={true}
              downloadable={false}
            />
          ))}
        </div>
      </div>
      {allowUploads && (
        <FileUploader
          className="file-explorer__uploader"
          path={''}
          callback={() => {}}
          baseBucketPath={baseBucketPath}
        />
      )}
    </div>
  </>)
}

export default FileExplorer;