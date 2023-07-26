

export const getCookie = (cookieName: string) => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(cookieName))
    ?.split('=')[1];

  return cookieValue || '';
}
