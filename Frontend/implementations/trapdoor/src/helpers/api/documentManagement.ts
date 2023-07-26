import { authenticatedFormPost, getCSRFTokenCookie } from "../auth";
import axios, { AxiosProgressEvent } from "axios";


export const uploadFile = async (
  parentDirectory: string, 
  userId: string, 
  path: string, 
  file: File, 
  progressCallback: (progress: number, file: File) => void, 
  finishedCallback: (file: File) => void
) => {
  const formData = new FormData();
  formData.append("fileSize", file.size.toString());
  formData.append("isFolder", false.toString());
  formData.append("userId", userId);
  formData.append("currentPath", path);
  formData.append("webkitRelativePath", file.webkitRelativePath || file.name);

  console.log(`trying to upload to url: /api/v1/aws/upload/${parentDirectory}/${userId}`);

  await axios({
    method: "POST",
    url: `/api/v1/aws/upload/${parentDirectory}/${userId}`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then(async (response) => {
    console.log('Response from request for upolad url: ', response);
    if (response.status === 200 && response.data?.url) {
      await axios({
        method: "PUT",
        url: response.data.url,
        data: file,
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => { 
          console.log('progressEvent: ', progressEvent);
          const totalLength = progressEvent.event?.lengthComputable ? progressEvent.total : progressEvent.event?.target?.getResponseHeader('content-length') || progressEvent.event?.target?.getResponseHeader('x-decompressed-content-length');
          if (totalLength !== null) {
            const progress = Math.round((progressEvent.loaded * 100) / totalLength);
            progressCallback(progress, file);
          }
        }
      })
      .then((response) => {
        console.log('Response from request for upload file: ', response);
        if (response.status !== 200) {
          alert(`Error uploading file: ${file.name}. Please try again later. If the problem persists, please contact support.`);
        }
      })
      .catch((error) => {
        console.error(`Error uploading file: ${file.name}`, error);
        alert(`Error uploading file: ${file.name}. Please try again later. If the problem persists, please contact support.`);
      })
    }
    else {
      alert(`Error uploading file: ${file.name}. Please try again later. If the problem persists, please contact support.`);
    }
  })
  .catch((error) => {
    console.error(`Error uploading file: ${file.name}`, error);
    alert(`Error uploading file: ${file.name}. Please try again later. If the problem persists, please contact support.`);
  })

  finishedCallback(file);
}