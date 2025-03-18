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
    name: "productName",
    label: "Product Name",
    type: "text",
    placeholder: "Enter product name",
    rules: [{ required: true, message: "Product name is required!" }],
  },
  {
    name: "skuCode",
    label: "SKU Code",
    type: "text",
    placeholder: "Enter SKU code",
    rules: [{ required: true, message: "SKU code is required!" }],
  },
  {
    name: "productBrand",
    label: "Product Brand",
    type: "select",
    placeholder: "Select a brand",
    options: [], // Dynamically populate from API
    rules: [{ required: true, message: "Product brand is required!" }],
  },
  {
    name: "productCategory",
    label: "Product Category",
    type: "select",
    placeholder: "Select a category",
    options: [], // Fetch categories from API
    rules: [{ required: true, message: "Product category is required!" }],
  },
  {
    name: "productGeneric",
    label: "Generic Name",
    type: "select",
    placeholder: "Select a generic name",
    options: [], // Fetch generics from API
    rules: [{ required: true, message: "Generic name is required!" }],
  },
  {
    name: "productWeight",
    label: "Product Weight",
    type: "text",
    placeholder: "Enter product weight",
    rules: [{ required: true, message: "Product weight is required!" }],
  },
  {
    name: "productUnit",
    label: "Unit",
    type: "select",
    placeholder: "Select unit",
    options: [], // Fetch units from API
    rules: [{ required: true, message: "Unit is required!" }],
  },
  {
    name: "productPurchasePoint",
    label: "Purchase Point",
    type: "text",
    placeholder: "Enter purchase point",
    rules: [{ required: true, message: "Purchase point is required!" }],
  },
  {
    name: "productTags",
    label: "Product Tags",
    type: "select",
    placeholder: "Enter tags",
    mode: "tags",
  },
  {
    name: "productBuyingPrice",
    label: "Buying Price",
    type: "number",
    placeholder: "Enter buying price",
    rules: [{ required: true, message: "Buying price is required!" }],
  },
  {
    name: "productSellingPrice",
    label: "Selling Price",
    type: "number",
    placeholder: "Enter selling price",
    rules: [{ required: true, message: "Selling price is required!" }],
  },
  {
    name: "productOfferPrice",
    label: "Offer Price",
    type: "number",
    placeholder: "Enter offer price (if any)",
  },
  {
    name: "productStock",
    label: "Stock Quantity",
    type: "number",
    placeholder: "Enter stock quantity",
    rules: [{ required: true, message: "Stock quantity is required!" }],
  },
  {
    name: "productFeatureImage",
    label: "Feature Image",
    type: "image",
    maxCount: 1,
    rules: [{ required: true, message: "Feature image is required!" }],
  },
  {
    name: "productImages",
    label: "Product Images",
    type: "image",
    maxCount: 1,
  },
  {
    name: "productDescription",
    label: "Description",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    name: "isFeatured",
    label: "Featured Product",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "not" },
    ],
  },
  {
    name: "variants",
    label: "Variants",
    type: "select",
    placeholder: "Select product variants",
    options: [], // Fetch from API
    mode: "multiple",
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
