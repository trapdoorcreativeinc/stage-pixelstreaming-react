import { FileUploaderFile } from "../../components/fileExplorer/FileUploader";
import { authenticatedFormPost, getCSRFTokenCookie } from "./auth";
import axios, { AxiosProgressEvent } from "axios";


export const formatDate = (date: string) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const day = new Date(date).toLocaleDateString("en-US", { timeZone });
  return day;
}

export const trimFileName = (fileName: string) => {
  const splitName = fileName.split('/');
  return splitName[splitName.length - 1] || splitName[splitName.length - 2];
}

export const uploadMultipleFiles = async (
  parentDirectory: string,
  userId: string,
  path: string,
  files: FileUploaderFile[],
  fileProgressCallback: (progress: number, file: FileUploaderFile) => void,
  fileFinishedCallback: (file: FileUploaderFile) => void,
  allFilesFinishedCallback: () => void,
  errorCallback: (file: FileUploaderFile) => void
) => {
  try {
    for (const file of files) {
      await uploadFile(parentDirectory, userId, path, file, fileProgressCallback, fileFinishedCallback);
    }
  }
  catch (error) {
    console.error('Error uploading multiple files: ', error);
    errorCallback(error);
  }
  allFilesFinishedCallback();
}

export const uploadFile = async (
  parentDirectory: string, 
  userId: string, 
  path: string, 
  file: FileUploaderFile, 
  progressCallback: (progress: number, file: FileUploaderFile) => void, 
  finishedCallback: (file: FileUploaderFile) => void
) => {
  const formData = new FormData();
  formData.append("fileSize", file.blob.size.toString());
  formData.append("isFolder", false.toString());
  formData.append("userId", userId);
  formData.append("currentPath", path);
  formData.append("webkitRelativePath", file.blob.webkitRelativePath || file.blob.name);

  console.log(`trying to upload to url: /api/v1/aws/upload/${parentDirectory}/${userId}`);

  await axios({
    method: "POST",
    url: `/api/v1/aws/upload/${parentDirectory}/${userId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then(async (response) => {
    console.log('Response from request for upload url: ', response.data);
    if (response.status === 200 && response.data?.url) {
      await axios({
        method: "PUT",
        url: response.data.url,
        data: file.blob,
        headers: { "Content-Type": file.blob.type },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => { 
          console.log('progressEvent: ', progressEvent);
          const totalLength = progressEvent.event?.lengthComputable 
          ? progressEvent.total 
          : progressEvent.event?.target?.getResponseHeader('content-length') || 
            progressEvent.event?.target?.getResponseHeader('x-decompressed-content-length');
          if (totalLength !== null) {
            const progress = Math.round((progressEvent.loaded * 100) / totalLength);
            progressCallback(progress, file);
          }
        }
      })
      .then((response) => {
        console.log('Response from request for upload file: ', response);
        if (response.status !== 200) {
          alert(`Error uploading file: ${file.blob.name}. Please try again later. If the problem persists, please contact support.`);
        }
      })
      .catch((error) => {
        console.error(`Error uploading file: ${file.blob.name}`, error);
        alert(`Error uploading file: ${file.blob.name}. Please try again later. If the problem persists, please contact support.`);
      })
    }
    else {
      alert(`Error uploading file: ${file.blob.name}. Please try again later. If the problem persists, please contact support.`);
    }
  })
  .catch((error) => {
    console.error(`Error uploading file: ${file.blob.name}`, error);
    alert(`Error uploading file: ${file.blob.name}. Please try again later. If the problem persists, please contact support.`);
  })

  finishedCallback(file);
}

export const readDirectory = async (parentDirectory: string, userId: string, path: string) => {
  const data = await fetch (`/api/v1/aws/read-directory/${parentDirectory}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": getCSRFTokenCookie(),
    },
    body: JSON.stringify({
      path,
      delimiter: "/",
    }),
  })
  .then((data) => {
    return data.json();
  })
  .catch((error) => {
    console.error("Error reading directory: ", error);
    return null;
  });
  return data;
}


export const downloadFile = async (parentDirectory: string, userId: string, pathSuffix: string, loadingCallback: Function) => {
  loadingCallback(true);
  const encodedPathSuffix = encodeURIComponent(pathSuffix);
  await fetch(`/api/v1/aws/download/${parentDirectory}${userId}/${encodedPathSuffix}`)
  .then((response) => response.json())
  .then(async (json) => {
    console.log("json: ", json);
    if (json && json.url) {
      console.log("response.url: ", json.url);
      try {
        // const a = document.createElement("a");
        // a.href = json.url;
        // a.download = trimFileName(pathSuffix);
        // document.body.appendChild(a);
        // a.click();
        // a.parentNode.removeChild(a);
        // window.URL.revokeObjectURL(json.url);
        fetch(json.url)
        .then((data) => data.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = trimFileName(pathSuffix);
          document.body.appendChild(a);
          a.click();
          a.parentNode.removeChild(a);
          window.URL.revokeObjectURL(url);
          loadingCallback(false);
        })
        .catch((error) => {
          console.error("Error downloading file: ", error);
          alert("Error downloading file. Please try again later. If the problem persists, please contact support.");
          loadingCallback(false);
        });
      }
      catch (error) {
        console.error("Error downloading file: ", error);
        alert("Error downloading file. Please try again later. If the problem persists, please contact support.");
        loadingCallback(false);
      }
    }
    else {
      alert("Error downloading file. Please try again later. If the problem persists, please contact support.");
      loadingCallback(false);
    }
  })
}

export const deleteFile = async (parentDirectory: string, userId: string, pathSuffix: string) => {
  await fetch(`/api/v1/aws/delete-file/${parentDirectory}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": getCSRFTokenCookie(),
    },
    body: JSON.stringify({
      path: pathSuffix,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => {
      console.error("Error deleting file: ", error);
    });
}

export const deleteFolder = async (parentDirectory: string, userId: string, pathSuffix: string) => {
  const directory = await readDirectory(parentDirectory, userId, pathSuffix);
  // delete each file one by one
  console.log("directory: ", directory);
  try {
    if (directory?.Contents?.length > 0) {
      for (const file of directory?.Contents) {
        deleteFile(parentDirectory, userId, file?.Key?.split(userId)[1]);
      }
    }
    if (directory?.CommonPrefixes?.length > 0) {
      for (const folder of directory?.CommonPrefixes) {
        await deleteFolder(parentDirectory, userId, folder?.Prefix?.split(userId)[1]);
      }
    }
  }
  catch (error) {
    console.error("Error deleting folder: ", error);
    alert("Error deleting folder. Please try again later. If the problem persists, please contact support.");
  }
}