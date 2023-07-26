import axios from "axios";
export const tokenValidation = async (token) => {
  if (token === null) {
    return false;
  } else {
    let response = await validateJwtTokenCall({
      jwttoken: token?.toString(),
    });

    if (response) {
      return response?.data.responseCode === 200 ? true : false;
    }
  }
};
const baseurl = "basehere here ";
export const validateJwtTokenCall = async (token) => {
  return axios.post(`${baseurl}/validate`, token);
};
