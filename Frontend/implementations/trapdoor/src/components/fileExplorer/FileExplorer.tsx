import React, { useEffect } from 'react';
import SingleFile from './SingleFile';
import FileUploader from './FileUploader';
import { UserAuthContext } from '../../contexts/UserAuthContext';
import { SideLoadingContext } from '../../contexts/SideLoadingContext';
import { deleteFile, deleteFolder, downloadFile, readDirectory } from '../../helpers/api/fileManagement';

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
  baseBucketPath?: 'Models' | 'Renders';
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
  const [fileToDelete, setFileToDelete] = React.useState(null);
  const [deleting, setDeleting] = React.useState(false);

  const deleteFileOrFolder = async () => {
    setDeleting(true);
    if (fileToDelete) {
      if (fileToDelete.Key.charAt(fileToDelete.Key.length - 1) === '/') {
        // Delete folder
        console.log('Delete folder', fileToDelete);
        await deleteFolder('Users', userAuth.currentUser.auth?.uid, fileToDelete.Key.split(userAuth.currentUser.auth?.uid)[1]);
      }
      else {
        // Delete file
        console.log('Delete file', fileToDelete);
        await deleteFile('Users', userAuth.currentUser.auth?.uid, fileToDelete.Key.split(userAuth.currentUser.auth?.uid)[1]);
      }
    }
    setFiles((prev) => {
      const temp = [...prev];
      const fileToRemove = temp.findIndex((file) => file.Key === fileToDelete.Key);
      temp.splice(fileToRemove, 1);
      return temp;
    })
    setFileToDelete(null);
    setDeleting(false);
  }

  useEffect(() => {
    if (userAuth.currentUser.auth?.uid) {
      getFiles(baseBucketPath, currentPath, userAuth.currentUser.auth?.uid, setSideLoadingData, setFiles);
    }
  }, [baseBucketPath, currentPath, userAuth.currentUser.auth?.uid, setSideLoadingData, setFiles])

  // useEffect(() => {
  //   if (fileToDelete) {
  //     console.log('Delete file', fileToDelete);

  //     setFileToDelete(null);
  //   }
  // }, [fileToDelete])

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
              onDelete={() => {
                console.log('Delete file', file);
                setFileToDelete(file);
              }}
              onDownload={async () => {
                console.log('Download file', file);
                const splitFileName = file.Key.split(userAuth.currentUser.auth?.uid);
                const parentDirectory = splitFileName[0];
                let fileSuffix = splitFileName[1];
                await downloadFile(parentDirectory, userAuth.currentUser.auth?.uid, fileSuffix, (loadingStatus: boolean) => {
                  setSideLoadingData({
                    type: loadingStatus ? 'START_LOADING' : 'STOP_LOADING'
                  })
                })
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
    {fileToDelete && (
    <div className='file-explorer__modal'>
      <div className='file-explorer__modal__content'>
        <div className='file-explorer__modal__content__header'>
          <span>Delete File</span>
          <span className='material-icons' onClick={() => setFileToDelete(null)}>close</span>
        </div>
        <div className='file-explorer__modal__content__body'>
          <span>Are you sure you want to delete <i>{fileToDelete.Name}</i>?</span>
        </div>
        <div className='file-explorer__modal__content__footer'>
          <button className={`light`} disabled={deleting} onClick={() => setFileToDelete(null)}>Cancel</button>
          <button className='danger' disabled={deleting} onClick={() => deleteFileOrFolder()}>{deleting ? 'Deleting...' : 'Delete'}</button>
        </div>
      </div>
    </div>
    )}
  </>)
}

export default FileExplorer;