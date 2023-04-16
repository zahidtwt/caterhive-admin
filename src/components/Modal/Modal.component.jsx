import Modal from '@mui/material/Modal';

const CustomModal = ({ children, open, setOpen }) => {
  if (!children) return;
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
