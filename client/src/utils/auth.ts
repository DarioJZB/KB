import { jwtDecode } from 'jwt-decode';
//JwtPayload

class AuthService {
  
  getProfile() {
    const token = this.getToken();
    if (!token) throw new Error("No token found");

    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp ? decodedToken.exp < currentTime : false;
  }

  getToken(): string {
    return localStorage.getItem("token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("token", idToken)
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export default new AuthService();
