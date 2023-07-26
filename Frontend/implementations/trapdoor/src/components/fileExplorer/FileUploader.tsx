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
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = createRef<HTMLInputElement>();
  const folderInputRef = createRef<HTMLInputElement>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (<>
    <div className={`file-uploader-wrapper ${className}`}>
      <div className="file-uploader__input">
        <label className="button action">
          <input type="file" 
            onChange={onFileInputChange}
            multiple
            disabled={uploading}
            ref={fileInputRef}
          />
          <span className="material-icons">upload_file</span>
          <span>Upload File(s)</span>
        </label>
        <label className="button action">
          <input type="file" 
            onChange={onFileInputChange}
            directory='true'
            webkitdirectory='true'
            mozdirectory='true'
            multiple
            disabled={uploading}
            ref={fileInputRef}
          />
          <span className="material-icons">drive_folder_upload</span>
          <span>Upload Folder</span>
        </label>
      </div>
      <div className="file-uploader__status">
        {uploadStatus}
      </div>
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