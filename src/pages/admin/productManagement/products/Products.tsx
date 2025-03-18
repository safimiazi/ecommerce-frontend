/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import MaxWidth from "../../../../wrapper/MaxWidth";
import {
  useGetproductDataQuery,
  useProductDeleteMutation,
  useProductPostMutation,
  useProductPutMutation,
} from "../../../../redux/api/productApi/ProductApi";
import { useGetCategoryDataQuery } from "../../../../redux/api/categoryApi/CategoryApi";
import ReusableForm from "../../../../components/Reusable/ReusableForm";
import Swal from "sweetalert2";

const Products = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [initialValues, setiInitialValues] = useState<any | null>(null);
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [Edit, setEdit] = useState<any | null>(null);
  const { data: productData, refetch } = useGetproductDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });
  const { data: categories } = useGetCategoryDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const [productPost, { isLoading: isPostLoading }] = useProductPostMutation();
  const [productPut, { isLoading: isEditLoading }] = useProductPutMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [productDelete, { isLoading: isDeleteLoading }] =
  useProductDeleteMutation();
const [fileList, setFileList] = useState<any[]>([]);



  useEffect(() => {
    if (Edit && Edit !== null) {
      const initialValues = {
        name: Edit.name,
      };
      setiInitialValues(initialValues);
    }
  }, [Edit]);

  useEffect(() => {
    if (!openProductDrawer) {
      form.resetFields();
      setEdit(null);
      setiInitialValues(null);
    }
  }, [openProductDrawer]);


  useEffect(() => {
    if (Edit === null) {
      setLoading(isPostLoading);
    } else if (Edit !== null) {
      setLoading(isEditLoading);
    }
  }, [isEditLoading, isPostLoading]);
 


  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };


  const handleAddOrUpdate = async (values: any) => {
    try {
      const formData = new FormData();

      // Append form fields
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", String(values.price));
      formData.append("category", values.categoryId);
      formData.append("stock", String(values.stock));

      // Append images
      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      let res;
      if (editingProduct) {
        res = await productPut({
          formData,
          id: editingProduct._id,
        }).unwrap();
      } else {
        res = await productPost(formData).unwrap();
      }

      notification.success({
        message: res?.message,
        placement: "topRight",
      });

      refetch();
      form.resetFields();
      setEditingProduct(null);
      setOpenProductDrawer(false);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setOpenProductDrawer(true);
    form.setFieldsValue(product);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await productDelete({ id }).unwrap();
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

  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(row._id)} // Executes delete on confirm
            okText="Yes, Delete"
            cancelText="Cancel"
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
      Cell: ({ row }: any) => <span>{row.name}</span>,
    },

    {
      header: "IMAGES",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          {row?.images?.map((image: string) => (
            <img key={image} src={image} width={80} height={80} />
          ))}
        </div>
      ),
    },
    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div>
          {new Date(row.createdAt).toLocaleDateString("en", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      ),
    },
  ];

  const deleteMultiple = async (ids: string[]) => {};

  const handleSubmit = async (values: any) => {
    try {
      let res;
      if (Edit) {
        res = await update({
          data: values,
          id: Edit._id,
        }).unwrap();

        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      } else {
        res = await create(values).unwrap();
        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      }
      form.resetFields();
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data?.errorSource[0]?.message || error?.data?.message}`,
        icon: "error",
      });
    }
  };
  
   const fields = [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your name",
        rules: [{ required: true, message: "Name is required!" }],
      },
      {
        name: "email",
        label: "Email Address",
        type: "text",
        placeholder: "Enter your email",
        rules: [
          { required: true, type: "email", message: "Enter a valid email!" },
        ],
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter your age",
      },
      {
        name: "gender",
        label: "Gender",
        type: "radio",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },

      {
        name: "acceptTerms",
        label: "Accept Terms & Conditions",
        type: "checkbox",
      },
    ];


  return (
    <MaxWidth>
      <Button type="primary" onClick={() => setOpenProductDrawer(true)}>
        Add New Product
      </Button>
      <CustomTable
        columns={customColumns}
        data={productData?.data?.result || []}
        pagination={pagination}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={productData?.data?.meta?.total || 0}
        onBulkDelete={(selectedIds) => {
          deleteMultiple(selectedIds);
        }}
        enableBulkDelete={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Drawer
        title={`${editingProduct ? "Edit Product" : "New Product"}`}
        placement="right"
        closable
        onClose={() => {
          setOpenProductDrawer(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        open={openProductDrawer}
        width={500}
      >
        <ReusableForm
          fields={fields}
          form={form}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Drawer>
    </MaxWidth>
  );
};

export default Products;
