// ApplicationRecordsView.js
import { Table, Pagination } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Shared/Navbar";
import logService from "../../services/log-service";

const ApplicationRecordsView = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async (page) => {
    try {
      const logs = await logService.getLogs(page);
      setLogs(logs.items);
      setTotalPages(logs.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h3 className="mt-4 mb-4">Logs de la aplicación</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>IP</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.ip}</td>
                <td>{log.message}</td>
                <td>{formatDate(log.date)}</td>
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
    </>
  );
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
  return formattedDate;
};

export default ApplicationRecordsView;
