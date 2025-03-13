/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Upload,
  Select,
  Popconfirm,
  notification,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/common/CustomTable";
import MaxWidth from "../../../wrapper/MaxWidth";
import {
  useGetproductDataQuery,
  useProductDeleteMutation,
  useProductPostMutation,
  useProductPutMutation,
} from "../../../redux/api/productApi/ProductApi";
import { useGetCategoryDataQuery } from "../../../redux/api/categoryApi/CategoryApi";

const { TextArea } = Input;

const Products = () => {
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
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
  const [productDelete, { isLoading: isDeleteLoading }] =
    useProductDeleteMutation();
  const [fileList, setFileList] = useState<any[]>([]);

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
      header: "DESCRIPTION",
      Cell: ({ row }: any) => <span>{row.description}</span>,
    },
    {
      header: "STOCK",
      Cell: ({ row }: any) => <span>{row.stock}</span>,
    },
    {
      header: "PRICE",
      Cell: ({ row }: any) => <span>{row.price}</span>,
    },
    {
      header: "CATEGORY",
      Cell: ({ row }: any) => <span>{row.category.name}</span>,
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
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: editingProduct ? true : false, message: "Please enter product name" }]}
            >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter product description" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
            initialValue={editingProduct ? editingProduct?.category?._id : null}
          >
            <Select
              showSearch
              onSearch={(value) => setGlobalFilter(value)}
              placeholder="Select category"
              options={categories?.data?.result?.map((category: any) => ({
                label: category.name,
                value: category._id,
              }))}
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter stock quantity"
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Upload Images"
            rules={[
              { required: true, message: "Please upload product images" },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
              multiple
            >
              {fileList.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPostLoading || isEditLoading}
            >
              {editingProduct ? "Edit Product" : "Create Product"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </MaxWidth>
  );
};

export default Products;
