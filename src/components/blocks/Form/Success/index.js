import Popup from "../../../ui/Popup";
import Button from "../../../ui/Button";

const Success = ({ text, isOpen, setOpen }) => {
  const handlePopupClose = () => {
    setOpen(false);
  };

  return (
    <Popup isOpen={isOpen} onClose={handlePopupClose} description={text}>
      <Button
        onClick={handlePopupClose}
        style={{ marginTop: 25 }}
        variant="red"
      >
        Закрыть
      </Button>
    </Popup>
  );
};

export default Success;
