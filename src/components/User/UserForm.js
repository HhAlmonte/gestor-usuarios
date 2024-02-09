import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const UserForm = ({ show, onHide, onSave, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      // Si estás editando, carga los datos del usuario en el formulario
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>{user ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label style={{ color: "black" }}>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-2"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label style={{ color: "black" }}>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese el correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mb-2"
              required
            />
          </Form.Group>

          {user ? null : (
            <Form.Group controlId="formPassword">
              <Form.Label style={{ color: "black" }}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Button variant="primary" className="mt-3" type="submit">
            {user ? "Guardar cambios" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;
