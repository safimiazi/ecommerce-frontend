/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Form, Button, Modal, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";

import ReusableForm from "../../../../components/Reusable/ReusableForm";
import {
  useAttributeOptionDeleteMutation,
  useAttributeOptionPostMutation,
  useAttributeOptionPutMutation,
  useGetattributeOptionDataQuery,
} from "../../../../redux/api/attributeOptionApi/AttributeOptionApi";

const AttributeOption = () => {
  const [form] = Form.useForm();
  const [Edit, setEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetattributeOptionDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const [attributeOptionPost, { isLoading: isPostLoading }] =
    useAttributeOptionPostMutation();
  const [attributeOptionPut, { isLoading: isEditLoading }] =
    useAttributeOptionPutMutation();
  const [attributeOptionDelete, { isLoading: isDeleteLoading }] =
    useAttributeOptionDeleteMutation();
  const [initialValues, setiInitialValues] = useState<any | null>(null);

  const handleEdit = (editData: any) => {
    setEdit(editData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await attributeOptionDelete({ id }).unwrap();
      notification.success({
        message: res?.message,
        placement: "topRight",
      });
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };
  const isDarkMode = false;
  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"} ` },
      },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this About?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)} // Executes delete on confirm
            okText="Yes, Delete"
            cancelText="Cancel"
            // okButtonProps={{ danger: true }}
          >
            <Button type="primary" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          <Button loading={isDeleteLoading} onClick={() => handleEdit(row)}>
            Edit
          </Button>
        </div>
      ),
    },

    {
      header: "NAME",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.name}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "TYPE",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.type}</span>
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (Edit && Edit !== null) {
      const initialValues = {
        name: Edit.name,
        type: Edit.type,
      };
      setiInitialValues(initialValues);
    }
  }, [Edit]);


  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields(); // ফর্ম রিসেট করে নতুন ফর্ম ফিল্ড খালি করবে
      setEdit(null); // Edit মোড রিসেট করে দিবে
      setiInitialValues(null); // initialValues রিসেট হবে
    }
  }, [isModalOpen]);
  





  //   const fields = [
  //     {
  //       name: "name",
  //       label: "Full Name",
  //       type: "text",
  //       placeholder: "Enter your name",
  //       rules: [{ required: true, message: "Name is required!" }],
  //     },
  //     {
  //       name: "email",
  //       label: "Email Address",
  //       type: "text",
  //       placeholder: "Enter your email",
  //       rules: [
  //         { required: true, type: "email", message: "Enter a valid email!" },
  //       ],
  //     },
  //     {
  //       name: "age",
  //       label: "Age",
  //       type: "number",
  //       placeholder: "Enter your age",
  //     },
  //     {
  //       name: "gender",
  //       label: "Gender",
  //       type: "radio",
  //       options: [
  //         { label: "Male", value: "male" },
  //         { label: "Female", value: "female" },
  //       ],
  //     },
  //     {
  //       name: "country",
  //       label: "Country",
  //       type: "select",
  //       placeholder: "Select your country",
  //       rules: [{ required: true, message: "Country is required!" }],
  //       options: [
  //         { label: "Bangladesh", value: "bd" },
  //         { label: "India", value: "in" },
  //       ],
  //     },
  //     {
  //       name: "acceptTerms",
  //       label: "Accept Terms & Conditions",
  //       type: "checkbox",
  //     },
  //   ];

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Attribute Option Name",
      rules: [{ required: true, message: "Name is required!" }],
    },
    {
      name: "type",
      label: "Type",

      type: "radio",
      options: [
        { label: "Color", value: "color" },
        { label: "Other", value: "other" },
      ],
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      console.log("Form Submitted:", values);
      
      let res;
      if (Edit) {
        res = await attributeOptionPut({
          data: values,
          id: Edit._id,
        }).unwrap();
        console.log("result:", res);
 
      } else {
        res = await attributeOptionPost(values).unwrap();
        notification.success({
          message: "Success!",
          description: "Attribute option added successfully.",
          placement: "topRight",
        });
      }
  
      console.log("Form Submitted:", res);
      setIsModalOpen(false); // সাবমিশন সফল হলে মডাল ক্লোজ করবে
      form.resetFields(); // ফর্ম রিসেট করবে
    } catch (error: any) {
      console.error("Error:", error);
      notification.error({
        message: "Error!",
        description: error?.data?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };




  
  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Attribute Option
        </Button>

        <CustomTable
          columns={customColumns}
          data={data?.data?.result || []}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) =>
            setPagination({ pageIndex, pageSize })
          }
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>

      <Modal
        title={Edit ? "Edit Attribute Option" : "Add Attribute Option"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ReusableForm
          fields={fields}
          form={form}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default AttributeOption;
