/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Radio, Checkbox, Button, Upload } from "antd";
import { useEffect, useState } from "react";

const ReusableForm = ({ fields,initialValues, form, onSubmit }: any) => {
  const [fileList, setFileList] = useState<any[]>(initialValues?.images || []);

    // Set existing values when initialValues change
    useEffect(() => {
        if(initialValues !== null) {
            form.setFieldsValue(initialValues);
  
      setFileList(initialValues.images || []);
    
        }
      }, [initialValues, form]);

  const handleFinish = (values: any) => {
    values.images = fileList.map((file) => file.originFileObj || file);

    onSubmit(values);
  };


  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    form.setFieldsValue({ images: fileList });
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
                rules={field.rules}

                valuePropName="checked"
              >
                <Checkbox>{field.label}</Checkbox>
              </Form.Item>
            );

            case "image": // ✅ Added dynamic image upload field
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={() => false} // Prevent automatic upload
                  onChange={handleUploadChange}
                  multiple
                >
                  {fileList.length >= field.maxCount ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
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
