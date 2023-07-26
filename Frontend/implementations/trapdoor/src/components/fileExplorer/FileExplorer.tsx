import React from 'react';
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
  return (<>
    <div className="file-explorer-wrapper">
      {allowUploads && (
        <FileUploader
          className="file-explorer__uploader"
          path={''}
          callback={() => {}}
          baseBucketPath={baseBucketPath}
        />
      )}
      {/* <table className="file-explorer__files">
        <thead className='file-explorer__files__header'>
          <tr>
            <th className='file-explorer__files__header__name'>Name</th>
            <th className='file-explorer__files__header__size'>Size</th>
            <th className='file-explorer__files__header__last-modified'>Last Modified</th>
            <th className='file-explorer__files__header__actions'>Actions</th>
          </tr>
        </thead>
        {testFileData.map((file) => (
          <SingleFile
            name={file.name}
            type={file.type}
            size={file.size}
            lastModified={file.lastModified}
            deletable={true}
            downloadable={true}
          />
        ))}
      </table> */}
    </div>
  </>)
}

export default FileExplorer;