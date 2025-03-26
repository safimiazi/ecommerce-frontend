/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal } from "../../redux/features/auth/loginRegistrationSlice";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, status } = useSelector(
    (state: RootState) => state.loginRegistration
  );
  return (
    <Modal
      title={status === "login" ? "Login" : "Registration"}
      open={isModalOpen}
      onCancel={() => dispatch(closeModal())}
      footer={null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default AuthModal;
