import decodeToken from "./decodeToken";

const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const decoded = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
};

export default isTokenExpired