import { Table, Pagination, Modal, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Shared/Navbar";
import UserForm from "../../components/User/UserForm";
import userService from "../../services/user-service";
import alertService from "../../helpers/sweet-alert";
import Swal from 'sweetalert2';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (page) => {
    try {
      const users = await userService.getUsers(page);
      setUsers(users.items);
      setTotalPages(users.totalPages);
    } catch (error) {
      alertService.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleShowForm = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleSaveUser = async (formData) => {
    try {
      if (selectedUser) {
        await userService.editUser(selectedUser.id, formData);
        alertService.success('El usuario se modificó correctamente')
      } else {
        await userService.addUser(formData);
        alertService.success('El usuario se agregó exitosamente')
      }
      fetchUsers(currentPage);
      handleCloseForm();
    } catch (error) {
      alertService.error(error)
    }
  };

  const deleteUser = async (userId) => {
    const confirmResult = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if(confirmResult.isConfirmed){
      await userService.deleteUser(userId);
      fetchUsers(currentPage);
      alertService.success('El usuario se eliminó correctamente');
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mt-4">Usuarios</h3>
        <Button variant="primary" onClick={() => handleShowForm()} className="mb-2">
          Agregar
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electronico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowForm(user)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="mt-4 center">
          {Array.from({ length: totalPages })?.map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <UserForm
        title="Formulario de usuario"
        show={showForm}
        onHide={handleCloseForm}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </>
  );
};

export default UserList;
