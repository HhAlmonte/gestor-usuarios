import alertService from "../helpers/sweet-alert";
import authService from "../services/auth-service";

const token = authService.getTokenFromLocalStorage();

const getUsers = async (page) => {
    try {
        const response = await fetch(`https://localhost:7004/api/User/getUsers?page=${page}`
              ,{
                headers: {
                  'Authorization': `Bearer ${token}`
                } 
              }
              );
        
        const data = await response.json();
        return data;
      } catch (error) {
        alertService.error("Error al traer los datos");
        return [];
      }
};

const addUser = async (userData) => {
  try {
    const response = await fetch(`https://localhost:7004/api/Auth/register`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alertService.error("Error al agregar el usuario");
    throw error; 
  }
};

const editUser = async (userId, userData) => {
  try {
    const user = {
      id: userId,
      name: userData.name,
      password: userData.password,
      email: userData.email
    };
    const response = await fetch(`https://localhost:7004/api/User/updateUser`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alertService.error("Error al editar el usuario");
    throw error; 
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`https://localhost:7004/api/User/deleteUser?id=${userId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alertService.error("Error al eliminar el usuario");
    throw error; 
  }
};

export default {
  getUsers,
  addUser,
  editUser,
  deleteUser,
};