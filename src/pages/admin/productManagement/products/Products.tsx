/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Upload,
  InputNumber,
  Popconfirm,
  notification,
  Drawer,
  Table,
  Menu,
  Dropdown,
} from "antd";
import CustomTable from "../../../../components/common/CustomTable";
import MaxWidth from "../../../../wrapper/MaxWidth";
import {
  useGetproductDataQuery,
  useProductDeleteMutation,
  useProductPostMutation,
  useProductPutMutation,
} from "../../../../redux/api/productApi/ProductApi";
import { useGetCategoryDataQuery } from "../../../../redux/api/categoryApi/CategoryApi";
import { useGetbrandDataQuery } from "../../../../redux/api/brandApi/BrandApi";
import { useGetattributeDataQuery } from "../../../../redux/api/attributeApi/AttributeApi";
import { useGetAllQuery } from "../../../../redux/api/unitApi/UnitApi";

const Products = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openProductDrawer, setOpenProductDrawer] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [featureImageList, setFeatureImageList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [habeVairent, setHaveVariant] = useState(false);
  const [attributesForColor, setAttributesForColor] = useState<any[]>([]);
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
  const { data: brands } = useGetbrandDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const { data: attributes } = useGetattributeDataQuery({
    isDelete: false,
    search: globalFilter,
  });
  const { data: units } = useGetAllQuery({
    isDelete: false,
    search: globalFilter,
  });

  const [productPost, { isLoading: isPostLoading }] = useProductPostMutation();
  const [productPut, { isLoading: isEditLoading }] = useProductPutMutation();
  const [productDelete, { isLoading: isDeleteLoading }] =
    useProductDeleteMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditLoading) {
      setLoading(true);
    }
    if (isPostLoading) {
      setLoading(true);
    }
  }, [isEditLoading, isPostLoading]);

  useEffect(() => {
    if (!openProductDrawer) {
      form.resetFields();
      setEditingProduct(null);
      setFileList([]);
      setFeatureImageList([]);
      setAttributesForColor([]);
    }
  }, [openProductDrawer]);

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const handleFeatureImageChange = ({ fileList }: any) => {
    setFeatureImageList(fileList);
  };

  const handleAddOrUpdate = async (values: any) => {
    console.log(values);
    try {
      const formData = new FormData();

      // Append product details
      formData.append("productName", values.productName);
      formData.append("skuCode", values.skuCode);
      formData.append("productCategory", values.productCategory);
      formData.append("productBrand", values.productBrand);
      formData.append("productWeight", values.productWeight);
      formData.append("productUnit", values.productUnit);
      formData.append("productPurchasePoint", values.productPurchasePoint);
      formData.append("productBuyingPrice", values.productBuyingPrice);
      formData.append("productSellingPrice", values.productSellingPrice);
      formData.append("productOfferPrice", values.productOfferPrice);
      formData.append("productStock", values.productStock);
      formData.append("isFeatured", values.isFeatured);
      formData.append("productDescription", values.productDescription);
      formData.append("variant", values?.variant || null);

      if (values?.productFeatureImage) {
        formData.append("productFeatureImage", values.productFeatureImage.file); // Ensure this field name is correct
      } else {
        console.error("No feature image selected.");
      }

      if (values?.productImages) {
        values?.productImages.fileList.forEach((file: any) => {
          formData.append("productImages", file.originFileObj); // Ensure this field name is correct
        });
      } else {
        console.error("No additional images selected.");
      }

      // Handle color-related data
      if (values.variantcolor && values.variantcolor.length > 0) {
        formData.append("variantcolor", JSON.stringify(values.variantcolor));
      }

      // Submit the form
      const res = editingProduct
        ? await productPut({ formData, id: editingProduct._id }).unwrap()
        : await productPost(formData).unwrap();

      notification.success({
        message: res?.message || "Product added/updated successfully!",
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
    setFileList(product?.images || []);
    setFeatureImageList(product?.featureImage || []);
    setAttributesForColor(product?.variants || []);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await productDelete({ id }).unwrap();
      notification.success({
        message: res?.message || "Product deleted successfully!",
        placement: "topRight",
      });
      refetch();
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
      Cell: ({ row }: any) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" onClick={() => handleEdit(row)}>
              <EditOutlined /> Edit
            </Menu.Item>
            <Menu.Item key="details" onClick={() => handleDetails(row)}>
              <EyeOutlined /> Details
            </Menu.Item>
            <Menu.Item key="delete" danger>
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => handleDelete(row._id)}
                okText="Yes, Delete"
                cancelText="Cancel"
              >
                <DeleteOutlined /> Delete
              </Popconfirm>
            </Menu.Item>
          </Menu>
        );
  
        return (
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
    {
      header: "NAME",
      Cell: ({ row }: any) => <span>{row.productName}</span>,
    },
    {
      header: "SKU CODE",
      Cell: ({ row }: any) => <span>{row.skuCode}</span>,
    },
    {
      header: "CATEGORY",
      Cell: ({ row }: any) => <span>{`${row.productCategory.name} (${row.productCategory.type})`}</span>,
    },
    {
      header: "BRAND",
      Cell: ({ row }: any) => <span>{row.productBrand.name}</span>,
    },
    {
      header: "UNIT",
      Cell: ({ row }: any) => <span>{row.productUnit.name}</span>,
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

  const columns = [
    {
      title: "Color Name",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <strong>{text}</strong>, // Make color name bold
    },

    {
      title: "Variant Color",
      key: "variantColor",
      render: (_: any, record: any) => (
        <Form.Item name={`variantcolor`}>
          <Select
            mode="multiple"
            placeholder="Select variant colors"
            style={{ width: "100%" }}
            options={record.attributeOption.map((item: any) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>
      ),
    },
  ];

  const data = attributesForColor.map((color: any) => ({
    key: color._id,
    name: color.name,
    colorCode: color.colorCode,
    attributeOption: color.attributeOption,
  }));
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
        onBulkDelete={() => {}}
        enableBulkDelete={false}
        globalFilter={globalFilter}
        onFilterChange={setGlobalFilter}
        totalRecordCount={productData?.data?.meta?.total || 0}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
      <Drawer
        title={`${editingProduct ? "Edit Product" : "New Product"}`}
        placement="right"
        closable
        onClose={() => setOpenProductDrawer(false)}
        open={openProductDrawer}
        width={500}
      >
        <Form
          form={form}
          onFinish={handleAddOrUpdate}
          layout="vertical"
          initialValues={{
            isFeatured: "not",
          }}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="SKU Code"
            name="skuCode"
            rules={[{ required: true, message: "Please enter the SKU code" }]}
          >
            <Input.Group compact>
              <Input
                style={{ width: "80%" }}
                value={Form.useWatch("skuCode", form)}
                placeholder="Enter SKU code"
                // You don't need to manually manag e SKU value here anymore
              />
              <Button
                type="primary"
                style={{ width: "20%" }}
                onClick={() => {
                  // Generate a new SKU code and update it in the form
                  const newSkuCode = `SKU-${Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase()}`;
                  form.setFieldsValue({ skuCode: newSkuCode });
                }}
              >
                Generate
              </Button>
            </Input.Group>
          </Form.Item>

          <Form.Item
            label="Brand"
            name="productBrand"
            rules={[{ required: true, message: "Please select a brand" }]}
          >
            <Select
              placeholder="Select a brand"
              options={brands?.data?.result.map((item: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="productCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select a category"
              options={categories?.data?.result.map((item: any) => ({
                label: `${item.name} (${item.type.toUpperCase()})`,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Weight"
            name="productWeight"
            rules={[
              { required: false, message: "Please enter the product weight" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="productUnit"
            rules={[{ required: true, message: "Please select a unit" }]}
          >
            <Select
              placeholder="Select a unit"
              options={units?.data?.result.map((item: any) => ({
                label: item.name,
                value: item._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Purchase Point"
            name="productPurchasePoint"
            rules={[
              { required: false, message: "Please enter the purchase point" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Buying Price"
            name="productBuyingPrice"
            rules={[
              { required: true, message: "Please enter the buying price" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Selling Price"
            name="productSellingPrice"
            rules={[
              { required: true, message: "Please enter the selling price" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Offer Price" name="productOfferPrice">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="productStock"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Featured Image" name="productFeatureImage">
            <Upload
              listType="picture-card"
              fileList={featureImageList}
              beforeUpload={() => false}
              onChange={handleFeatureImageChange}
              maxCount={1}
            >
              {featureImageList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Images"
            name="productImages"
            rules={[
              { required: true, message: "please select product images." },
            ]}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
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

          <Form.Item label="Product Description" name="productDescription">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Featured" name="isFeatured">
            <Checkbox>Yes</Checkbox>
          </Form.Item>

          <Form.Item label="This Product Has Variations" name="haveVarient">
            <Checkbox onChange={(e) => setHaveVariant(e.target.checked)}>
              Yes
            </Checkbox>
          </Form.Item>

          {habeVairent && (
            <>
              <Form.Item label="Variant" name="variant">
                <Select
                  placeholder="Select variant"
                  options={attributes?.data?.result.map((item: any) => ({
                    label: item.name,
                    value: item._id,
                  }))}
                  onChange={(values) => {
                    const selectedAttributes = attributes?.data?.result.filter(
                      (attr: any) => values.includes(attr._id)
                    );
                    setAttributesForColor(selectedAttributes);
                  }}
                />
              </Form.Item>
            </>
          )}

          {attributesForColor[0]?.name === "Color" && (
            <Table
              columns={columns}
              dataSource={data}
              pagination={false} // Disable pagination
              bordered
            />
          )}

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </MaxWidth>
  );
};

export default Products;
