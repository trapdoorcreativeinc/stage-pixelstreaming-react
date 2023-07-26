import React from "react";
import { formatBytes } from "../../helpers/fileManagement";

interface SingleFileProperties {
  name: string;
  type: string;
  size?: number;
  lastModified?: number;
  deletable?: boolean;
  downloadable?: boolean;
  onDelete?: () => void;
  onDownload?: () => void;
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
}: SingleFileProperties) => {
  return (<>
  <div className="single-file-wrapper">
    <div className="single-file__icon">
      <span className="material-icons">
        {type === 'folder' ? 'folder' : 'insert_drive_file'}
      </span>
    </div>
    <div className="single-file__information">
      <div className="single-file__name">{name}</div>
      <div className="single-file__sub-information">
        <div className="single-file__size">{formatBytes(size)}</div>
        <div className="single-file__last-modified">{lastModified}</div>
      </div>
    </div>
    <div className="single-file__actions">
      {deletable && (
        <button className="single-file__delete">
          <span className="material-icons">delete</span>
        </button>
      )}
      {downloadable && (
          <span className="material-icons"
            onClick={onDownload}
          >file_download</span>
      )}
    </div>
  </div>
  </>)
}

export default SingleFile;