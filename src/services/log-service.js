import alertService from "../helpers/sweet-alert";
import authService from "../services/auth-service";


const token = authService.getTokenFromLocalStorage();

const getLogs = async (page) => {
  try {
    const response = await fetch(`https://localhost:7004/api/Log/getLogs?page=${page}`
        ,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
    const data = await response.json();
    return data;
  } catch (error) {
    alertService.error("Error al traer los datos");
    return [];
  }
};

export default {
  getLogs,
};
