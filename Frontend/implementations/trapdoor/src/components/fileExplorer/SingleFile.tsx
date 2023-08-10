import React from "react";
import { formatBytes } from "../../helpers/fileManagement";
import { formatDate, trimFileName } from "../../helpers/api/fileManagement";

interface SingleFileProperties {
  name: string;
  type: string;
  size?: number;
  lastModified?: string;
  deletable?: boolean;
  downloadable?: boolean;
  onDelete?: () => void;
  onDownload?: () => void;
  openFolder?: () => void;
}

const SingleFile = ({
  name,
  type,
  size,
  lastModified,
  deletable = false,
  downloadable = false,
  onDelete,
  onDownload,
  openFolder
}: SingleFileProperties) => {
  return (<>
  <div className={`single-file-wrapper ${type === 'folder' && 'folder'} `}
    onClick={() => {
      if (type === 'folder') {
        console.log('open folder');
        openFolder && openFolder();
      }
    }}
  >
    <div className="single-file__left">
      <div className="single-file__icon">
        <span className={`material-icons ${type}`}>
          {type === 'folder' ? 'folder' : 'insert_drive_file'}
        </span>
      </div>
      <div className="single-file__information">
        <div className="single-file__name">{trimFileName(name)}</div>
        <div className="single-file__sub-information">
          <div className="single-file__size">{type !== 'folder' && formatBytes(size)}</div>
          <div className="single-file__last-modified">{lastModified ? formatDate(lastModified) : ''}</div>
        </div>
      </div>
    </div>
    <div className="single-file__right">
      <div className="single-file__actions">
        {deletable && (
          <span className="material-icons"
            onClick={onDelete}
          >delete</span>
        )}
        {downloadable && type !== 'folder' && (
          <span className="material-icons"
            onClick={onDownload}
          >file_download</span>
        )}
      </div>
    </div>
  </div>
  </>)
}

export default SingleFile;