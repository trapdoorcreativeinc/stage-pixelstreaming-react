import React, { useEffect } from 'react';
import SingleFile from './SingleFile';
import FileUploader from './FileUploader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { SideLoadingContext } from '../../contexts/SideLoadingContext';
import { readDirectory } from '../../helpers/api/fileManagement';

const getFiles = async (
  baseBucketPath: string, 
  path: string,
  uid: string,
  setLoading: Function,
  setLocalFiles: Function,
) => {
  try {
    setLoading({
      type: 'START_LOADING_WITH_MESSAGE',
      message: 'Loading Data...'
    });
    const res = await readDirectory('Users', uid, `/${baseBucketPath}/${path}`);
    console.log('getFiles -- Response', res);
    let folderPaths: string[] = [];
    if (res?.CommonPrefixes) {
      folderPaths = res.CommonPrefixes.map((folder: any) => {
        folder['Key'] = folder['Prefix'];
        return folder;
      });
    }
    const filteredFiles = res?.Contents?.filter((file: any) => {
      return file.Key !== `Users/${uid}/${baseBucketPath}/${path}`;
    }) || [];
    console.log('getFiles -- Folder Paths', folderPaths);
    console.log('getFiles -- Filtered Files', filteredFiles);
    const temp = [...folderPaths, ...filteredFiles].map((file: any) => ({
      ...file,
      Name: file.Key.split(`/${baseBucketPath}/`)[1],
    }));
    console.log('getFiles -- Files', temp);
    setLocalFiles(temp);
    setLoading({ type: 'STOP_LOADING' });
  }
  catch (err) {
    console.log('Error getting files', err);
    setLoading({ type: 'STOP_LOADING' });
  }

}

interface FileExplorerProperties {
  allowUploads?: boolean;
  allowDownloads?: boolean;
  baseBucketPath?: string;
  deletable?: boolean;
}

const FileExplorer = ({
  allowUploads = false,
  allowDownloads = false,
  baseBucketPath = 'Models',
  deletable = true,
}: FileExplorerProperties) => {
  const { userAuth } = React.useContext(UserAuthContext);
  const { sideLoadingData, setSideLoadingData } = React.useContext(SideLoadingContext);
  const [currentPath, setCurrentPath] = React.useState('');
  const [files, setFiles] = React.useState([]);

  useEffect(() => {
    if (userAuth.currentUser.auth?.uid) {
      getFiles(baseBucketPath, currentPath, userAuth.currentUser.auth?.uid, setSideLoadingData, setFiles);
    }
  }, [baseBucketPath, currentPath, userAuth.currentUser.auth?.uid, setSideLoadingData, setFiles])

  return (<>
    <div className="file-explorer-wrapper">
      <div className="file-explorer">
        <div className='file-explorer__header'>
          <span onClick={() => setCurrentPath('')}>{baseBucketPath}</span>
          {currentPath.split('/').map((folder, index) => {
            let pathToDirectory = currentPath.split('/').slice(0, index + 1).join('/');
            return (<>
              <span className='spacer' key={`header-splitter-${index}`}>/</span>
              <span key={`header-folder-${index}`}
                onClick={() => setCurrentPath(pathToDirectory)}
              >{folder}</span>
            </>)
          })}
        </div>
        <div className="file-explorer__files">
          {files.map((file) => (
            <SingleFile
              name={file.Name}
              type={file.Prefix ? 'folder' : file.Name.split('.').pop() || ''}
              size={file.Size || 0}
              key={file.Key}
              lastModified={file.LastModified}
              deletable={deletable}
              downloadable={allowDownloads}
              openFolder={() => {
                console.log('Open folder', file);
                setCurrentPath(file.Name);
              }}
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