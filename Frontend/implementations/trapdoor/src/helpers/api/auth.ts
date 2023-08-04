import { getCookie } from ".."

export const getCSRFTokenCookie = (): string => {
  return getCookie("XSRF-TOKEN");
}

export const authenticatedJSONGet = async (url: string) => {
  console.log('helpers/auth.ts: authenticatedJSONGet: url: ', url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": getCSRFTokenCookie()
    }
  })
  .then(response => response.json())
  .catch(error => console.error(`Error in authenticated get for url: ${url}`, error));
  console.log('helpers/auth.ts: authenticatedJSONGet: response: ', response);
  return response;
}

export const authenticatedJSONPost = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": getCSRFTokenCookie()
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch(error => console.error(`Error in authenticated post for url: ${url}`, error));
  
  return response;
}

export const authenticatedFormPost = async (url: string, body: FormData): Promise<Response | void> => { 
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "CSRF-Token": getCSRFTokenCookie()
    },
    body: body
  })
  .catch(error => console.error(`Error in authenticated post for url: ${url}`, error));
  
  return response;
}

export const getCurrentUser = async () => {
  const response = await authenticatedJSONGet("/api/v1/user");
  console.log('helpers/auth.ts: getCurrentUser: response: ', response);
  return response;
}

export const getCompanyData = async (uid: string, companyID: string) => {
  const response = await authenticatedJSONGet(`/api/v1/user/${uid}/${companyID}`);
  console.log('helpers/auth.ts: getCompanyData: response: ', response);
  return response;
}