/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select, Radio, Checkbox, Button } from "antd";
import { useEffect } from "react";

const ReusableForm = ({ fields,initialValues, form, onSubmit }: any) => {

    // Set existing values when initialValues change
    useEffect(() => {
        if(initialValues !== null) {
            form.setFieldsValue(initialValues);

        }
      }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
    >
      {fields?.map((field: any) => {
        switch (field.type) {
          case "text":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Input placeholder={field.placeholder} />
              </Form.Item>
            );
          case "number":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Input type="number" placeholder={field.placeholder} />
              </Form.Item>
            );
          case "select":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Select
                mode={field.mode}
                  options={field.options}
                  placeholder={field.placeholder}
                />
              </Form.Item>
            );
          case "radio":
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Radio.Group options={field.options} optionType="button" />
              </Form.Item>
            );
          case "checkbox":
            return (
              <Form.Item
                key={field.name}
                name={field.name}
                valuePropName="checked"
              >
                <Checkbox>{field.label}</Checkbox>
              </Form.Item>
            );
          default:
            return null;
        }
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ?  "Edit": "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReusableForm;
