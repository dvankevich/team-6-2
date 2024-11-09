import Modal from "react-modal";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    maxWidth: "80%", // Максимальна ширина модалки
    maxHeight: "80%", // Максимальна висота модалки
    padding: "0px",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    borderRadius: "15px", // Додаємо округлі кути
  },
};
Modal.setAppElement("#root");
const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={src} alt={alt} />
    </Modal>
  );
};

export default ImageModal;
