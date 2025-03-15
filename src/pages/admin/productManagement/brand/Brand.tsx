/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Form, Button, Modal, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";

import ReusableForm from "../../../../components/Reusable/ReusableForm";

import Swal from "sweetalert2";
import {
  useBrandDeleteMutation,
  useBrandPostMutation,
  useBrandPutMutation,
  useGetbrandDataQuery,
} from "../../../../redux/api/brandApi/BrandApi";

const Brand = () => {
  const [form] = Form.useForm();
  const [Edit, setEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetbrandDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const [BrandPost, { isLoading: isPostLoading }] = useBrandPostMutation();
  const [BrandPut, { isLoading: isEditLoading }] = useBrandPutMutation();
  const [BrandDelete, { isLoading: isDeleteLoading }] =
    useBrandDeleteMutation();
  const [initialValues, setiInitialValues] = useState<any | null>(null);

  const handleEdit = (editData: any) => {
    setEdit(editData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await BrandDelete({ id }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      setTimeout(() => {
        refetch();
      }, 500);
    } catch (error: any) {
      Swal.fire({
        title: "Good job!",
        text: `${error.message}`,
        icon: "error",
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
      header: "Brand OPTIONS",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-wrap gap-1 text-sm">
            {row.BrandOption.map((item: any) => (
              <span
                key={item._id}
                className="capitalize bg-gray-200 px-2 py-1 rounded"
              >
                {item.name}
              </span>
            ))}
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
        BrandOption: Edit.BrandOption.map((item: any) => item._id),
      };
      setiInitialValues(initialValues);
    }
  }, [Edit]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      setEdit(null);
      setiInitialValues(null);
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

  //   ];

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Brand Option Name",
      rules: [{ required: true, message: "Name is required!" }],
    },
    {
      name: "isFeatured",
      label: " Is Featured In Homepage",
      type: "checkbox",
      rules: [{ required: true, message: "Please check this" }],

    },
    {
      name: "images",
      label: "Upload Images",
      type: "image", // ✅ Now supports images
      rules: [{ required: true, message: "Please upload product images" }],
      maxCount: 5, // Optional: Max number of images allowed
    },
  ];

  const handleSubmit = async (values: any) => {
    try {

        const formData = new FormData();

        // Append form fields
        formData.append("name", values.name);
      
  
        // Append images
        values.images.forEach((file : any) => {
          formData.append("images", file.originFileObj);
        });




      let res;
      if (Edit) {
        res = await BrandPut({
          data: values,
          id: Edit._id,
        }).unwrap();

        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      } else {
        res = await BrandPost(values).unwrap();
        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      }
      setIsModalOpen(false); // সাবমিশন সফল হলে মডাল ক্লোজ করবে
      form.resetFields(); // ফর্ম রিসেট করবে
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data.message}`,
        icon: "error",
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Brand
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
        title={Edit ? "Edit Brand" : "Add Brand"}
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

export default Brand;
