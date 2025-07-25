const CryptoJS = require("crypto-js");

export const secretKey = process.env.NEXT_PUBLIC_APP_SECRETKEY;
export const encryptObjData = (name, value, minutes) => {
  let encJsonObj = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  return setCookie(name, encJsonObj, minutes);
};

export const encryptData = (value) => {
  let encJsonObj = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  return encJsonObj;
};
export const decryptData = (value) => {
  let bytes = CryptoJS.AES.decrypt(value, secretKey);
  let mainObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return mainObj;
};
export const decryptAuthCookie = () => {
  const cookieText = getCookie("CheckAuth");
  if (cookieText) {
    let bytes = CryptoJS.AES.decrypt(cookieText, secretKey);
    let mainText = bytes.toString(CryptoJS.enc.Utf8);
    if (mainText === process.env.NEXT_PUBLIC_AUTHKEY) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const decryptObjData = (name) => {
  let cookieObj = getCookie(name);
  let bytes = CryptoJS.AES.decrypt(cookieObj, secretKey);
  let mainObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return mainObj;
};
export const decryptText = (name) => {
  let cookieText = getCookie(name);
  let bytes = CryptoJS.AES.decrypt(cookieText, secretKey);
  let mainText = bytes.toString(CryptoJS.enc.Utf8);
  return mainText;
};
export const getCookie = (name) => {
  if (typeof window !== "undefined") {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return null;
  }
};

export const setCookie = (name, value, minutes) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + minutes * 60 * 1000); // Convert minutes to milliseconds
  const expires = "expires=" + expiryDate.toUTCString();
  if (typeof window !== "undefined") {
    document.cookie = name + "=" + value + ";" + expires + "; path=/;secure;";
  }
};

// Function to delete a cookie by name
const deleteCookie = (cookieName) => {
  if (typeof window !== "undefined") {
    document.cookie =
      cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

// Function to remove all cookies
export const deleteAllCookies = () => {
  if (typeof window !== "undefined") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      var cookieName = cookie.split("=")[0];
      deleteCookie(cookieName);
    }
  }
};
