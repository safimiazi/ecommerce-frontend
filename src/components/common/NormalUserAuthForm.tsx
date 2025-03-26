import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  changeStatus,
  closeModal,
} from "../../redux/features/auth/loginRegistrationSlice";

const PhoneAuthForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.loginRegistration);

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    dispatch(closeModal());
  };

  // Bangladeshi Phone Number Validation
  const validatePhoneNumber = (_: any, value: string) => {
    const phoneRegex = /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/; // BD phone number format
    if (!value) {
      return Promise.reject("Please enter your phone number!");
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject("Enter a valid Bangladeshi phone number!");
    }
    return Promise.resolve();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ validator: validatePhoneNumber }]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {status === "login" ? "Login" : "Register"}
      </Button>

      <div style={{ textAlign: "center", marginTop: 10 }}>
        {status === "login" ? (
          <p>
            Don't have an account?{" "}
            <Button
              type="link"
              onClick={() => dispatch(changeStatus("registration"))}
            >
              Register
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Button type="link" onClick={() => dispatch(changeStatus("login"))}>
              Login
            </Button>
          </p>
        )}
      </div>
    </Form>
  );
};

export default PhoneAuthForm;
