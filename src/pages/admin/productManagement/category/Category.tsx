/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Popconfirm,
  notification,
  Select,
  Checkbox,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
} from "../../../../redux/api/categoryApi/CategoryApi";
import Swal from "sweetalert2";

const Category = () => {
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showParentCategory, setShowParentCategory] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Fetch categories
  const { data, refetch } = useGetCategoryDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  // API Mutations
  const [categoryPost, { isLoading: isPostLoading }] =
    useCategoryPostMutation();
  const [categoryPut, { isLoading: isEditLoading }] = useCategoryPutMutation();
  const [categoryDelete] = useCategoryDeleteMutation();
  const [categoryBulkDelete] = useCategoryBulkDeleteMutation();

  // Handle Add or Edit Category
  const handleAddOrUpdate = async (values: any) => {
    try {
      const categoryData = {
        name: values.name,
        description: values.description,
        parentCategory: showParentCategory ? values.parentCategory : null,
        status: values.status,
      };

      let res;
      if (editingCategory) {
        // Edit existing category
        res = await categoryPut({
          data: categoryData,
          id: editingCategory._id,
        }).unwrap();
      } else {
        // Add new category
        res = await categoryPost(categoryData).unwrap();
      }

      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      refetch();
      setIsModalOpen(false);
      form.resetFields();
      setEditingCategory(null);
      setShowParentCategory(false); // Reset parent category toggle
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  const deleteMultiple = async (ids: string[]) => {
    try {
      const res = await categoryBulkDelete({ ids }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
      setSelectedRows([]);
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  // Handle Edit
  const handleEdit = (category: any) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
      parentCategory: category.parentCategory._id || null,
      status: category.status,
    });
    setShowParentCategory(!!category.parentCategory);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await categoryDelete({ id }).unwrap();
      notification.success({ message: res?.message, placement: "topRight" });
      setTimeout(() => refetch(), 500);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  // Category Table Columns
  const customColumns = [
    {
      header: "Action",
      size: 50,
      Cell: ({ row }: any) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(row._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button onClick={() => handleEdit(row)}>Edit</Button>
        </div>
      ),
    },
    {
      header: "Name",
      Cell: ({ row }: any) => <span className="capitalize">{row.name}</span>,
    },
    {
      header: "Parent Category",
      Cell: ({ row }: any) => (
        <span className="">{row?.parentCategory?.name || "N/A"}</span>
      ),
    },
    {
      header: "Description",
      Cell: ({ row }: any) => <span>{row.description || "N/A"}</span>,
    },
    {
      header: "Status",
      Cell: ({ row }: any) => (
        <span
          className={`p-1 rounded border ${
            row.status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {row.status || "N/A"}
        </span>
      ),
    },
    {
      header: "Created Date",
      Cell: ({ row }: any) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-4">
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add New Category
      </Button>

      {/* Table Display */}
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
        onBulkDelete={(selectedIds) => {
          deleteMultiple(selectedIds);
        }}
        enableBulkDelete={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      {/* Modal for Adding & Editing */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
          form.resetFields();
          setShowParentCategory(false);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          {/* Category Name */}
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter category name!" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          {/* Checkbox to Show Parent Category Dropdown */}
          <Form.Item>
            <Checkbox
              checked={showParentCategory}
              onChange={(e) => setShowParentCategory(e.target.checked)}
            >
              Assign to a Parent Category
            </Checkbox>
          </Form.Item>

          {/* Parent Category Dropdown (Conditional) */}
          {showParentCategory && (
            <Form.Item name="parentCategory" label="Parent Category">
              <Select
                placeholder="Select parent category"
                options={data?.data?.result.map((category: any) => {
                  return { value: category._id, label: category.name };
                })}
              />
            </Form.Item>
          )}

          {/* Status (Active / Inactive) */}
          <Form.Item
            name="status"
            label="Status"
            initialValue="active"
            rules={[
              { required: true, message: "Please select category status!" },
            ]}
          >
            <Select
              options={[
                { value: "active", label: <span>Active</span> },
                { value: "inactive", label: <span>In Active</span> },
              ]}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={3}
              placeholder="Enter category description (optional)"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPostLoading || isEditLoading}
            >
              {editingCategory ? "Update Category" : "Create Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
