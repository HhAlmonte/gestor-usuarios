import alertService from "../helpers/sweet-alert";

// AuthService.js
class AuthService {
  async login(email, password) {
    try {
      const response = await fetch("https://localhost:7004/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      localStorage.setItem('name', data.name);

      return data.token;
    } catch (error) {
      throw error;
    }
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem("token");
  }

  saveTokenToLocalStorage(token) {
    localStorage.setItem("token", token);
  }
  
  removeTokenFromLocalStorage() {
    localStorage.removeItem("token");
  }
}

const authService = new AuthService();
export default authService;
