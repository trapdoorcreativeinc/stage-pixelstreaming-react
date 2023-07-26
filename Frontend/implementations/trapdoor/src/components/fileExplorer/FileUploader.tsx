import React, { HTMLAttributes, createRef, useState } from "react";
import StageLogo from "../StageLogo";
import { formatBytes } from "../../helpers/fileManagement";

interface FileUploaderProperties {
  className?: string;
  path: string;
  callback: () => void;
  baseBucketPath: string;
}

export class FileUploaderFile {
  blob: File;
  uploadProgress: number;
  constructor(blob: File, uploadProgress = 100) {
    this.blob = blob;
    this.uploadProgress = uploadProgress;
  }
}

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
    mozdirectory?: string;
  }
}

const findFileToUpdate = (files: File[], file: File) => {
  const fileToUpdate = files[
    files.findIndex((f) => {
      if (file.webkitRelativePath !== '') {
        if (f.webkitRelativePath !== file.webkitRelativePath) {
          return true;
        }
      } else {
        if (f.name === file.name) {
          return true;
        }
      }
      return false;
    })
  ];

  return fileToUpdate;
}

const FileUploader = ({
  className,
  path,
  callback,
  baseBucketPath,
}: FileUploaderProperties) => {
  const [filesToUpload, setFilesToUpload] = useState<FileUploaderFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = createRef<HTMLInputElement>();
  const folderInputRef = createRef<HTMLInputElement>();
  const dropFileInputRef = createRef<HTMLInputElement>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Files changed', e.target.files);
    setUploadStatus('');
    const newFiles = Array<FileUploaderFile>();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        if (file.name !== '.DS_Store') {
          newFiles.push(new FileUploaderFile(file));
        }
      })
      setFilesToUpload(newFiles);
    }
  }
  const startDraggingOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  }
  const stopDraggingOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  }

  return (<>
    <div className={`file-uploader-wrapper ${className}`}>
      <div className="file-uploader__status">
        {uploadStatus}
      </div>
      {!uploading && filesToUpload.length === 0 && (
      <div className={`file-uploader__dropzone ${isDraggingOver && 'dragging-over'}`}
        onDrag={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragOver={startDraggingOver}
        onDragEnter={startDraggingOver}
        onDragLeave={stopDraggingOver}
        onDragEnd={stopDraggingOver}
        onDrop={(e) => {
          console.log('Dropped', e.dataTransfer.files);
          stopDraggingOver(e);
          let length = e.dataTransfer.files.length;
          const fileList = new DataTransfer();
          let folderAttempted = false;
          for (let i = 0; i < length; i++) {
            const entry = e.dataTransfer.items[i].webkitGetAsEntry();
            if (entry.isFile) {
              fileList.items.add(e.dataTransfer.files[i]);
            } else {
              folderAttempted = true;
            }
          }
          folderAttempted && alert('It looks like you tried to drag and drop a folder(s). These folders weren\'t uploaded. Please click \'Upload a Folder\' instead.');
          fileInputRef.current.files = fileList.files;
          fileInputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
        }}
      >
        <div className='file-uploader__dropzone__text'>
          <span className='material-icons'>upload_file</span>
          <p>Drag and drop 
            <label>
              <input type="file" 
                onChange={onFileInputChange}
                multiple
                disabled={uploading}
                ref={fileInputRef}
              />
              <span>&nbsp;files here</span>
            </label>
            &nbsp;or&nbsp;
            <label>
              <input type="file" 
                onChange={onFileInputChange}
                directory='true'
                webkitdirectory='true'
                mozdirectory='true'
                multiple
                disabled={uploading}
                ref={folderInputRef}
              />
              <span>Click here to Upload a Folder</span>
            </label>
          </p>
        </div>
      </div>
      )}
      {filesToUpload.length > 0 && (
        <div className="file-uploader__files">
          {filesToUpload.map((file, index) => {
            return (
              <div className="file-uploader__file" key={index}>
                <div className="file-uploader__file__information">
                  <div className="file-uploader__file__information__left">
                    <div className="file-uploader__file__name">{file.blob.name}</div>
                  </div>
                  <div className="file-uploader__file__information__right">
                    <div className="file-uploader__file__size">{formatBytes(file.blob.size)}</div>
                    <StageLogo 
                      loading={file.uploadProgress < 100}
                      orientation={'horizontal'}
                      logoSize="small"
                      mode="light"
                      checkmark={file.uploadProgress === 100}
                      className="file-uploader__spinner__logo"
                    />
                  </div>
                </div>
                <div className="file-uploader__file__progress">
                  <div className={`file-uploader__file__progress__bar ${file.uploadProgress === 100 && 'completed'}`} style={{width: `${file.uploadProgress}%`}}></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  </>)
}

export default FileUploader;