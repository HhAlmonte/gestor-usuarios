import Swal from 'sweetalert2';

const showAlert = (type, title, text) => {
  return Swal.fire({
    icon: type,
    title,
    text,
  });
};

const alertService = {
  success: (title, text) => showAlert('success', title, text),
  error: (title, text) => showAlert('error', title, text),
  warning: (title, text) => showAlert('warning', title, text),
  info: (title, text) => showAlert('info', title, text),
};

export default alertService;
