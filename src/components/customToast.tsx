import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const CustomToast = ({ visible, text, ...props }: any) => {
  const none: any = "none";

  return (
    <ToastContainer
      position="bottom-end"
      className="bg-transparent p-3"
      style={{ display: !visible && none }}
    >
      <Toast {...props} autohide>
        <Toast.Body
          style={{ borderRadius: 5, color: "white", fontSize: 16 }}
          className="bg-transparent"
        >
          {text}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
