/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Form, Input, Button, Modal, Popconfirm, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomTable from "../../../../components/common/CustomTable";
import {
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
} from "../../../../redux/api/categoryApi/CategoryApi";

const Category = () => {
  const [form] = Form.useForm();
  const [EditingCategory, setEditingCategory] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data, refetch } = useGetCategoryDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter
  });

  const [categoryPost, { isLoading: isPostLoading }] =
    useCategoryPostMutation();
  const [categoryPut, { isLoading: isEditLoading }] = useCategoryPutMutation();
  const [categoryDelete, { isLoading: isDeleteLoading }] =
    useCategoryDeleteMutation();

  const handleAddOrUpdate = async (values: any) => {
    try {
      const data = {
        name: values.name,
        description: values.description,
      };

      let res;
      if (EditingCategory) {
        res = await categoryPut({
          data: data,
          id: EditingCategory._id,
        }).unwrap();
      } else {
        res = await categoryPost(data).unwrap();
      }
      alert(res.message);
      //   notification.success({
      //     message: res?.message,
      //     placement: "topRight",
      //   });

      refetch();
      setIsModalOpen(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (error: any) {
      notification.error({
        message: error?.message || "Something went wrong!",
        placement: "topRight",
      });
    }
  };

  const handleEdit = (project: any) => {
    setEditingCategory(project);
    form.setFieldsValue(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await categoryDelete({ id }).unwrap();
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
            <Button type="primary"  icon={<DeleteOutlined />}>
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
      header: "DESCRIPTION",
      Cell: ({ row }: any) => (
        <div>
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span className="capitalize">{row.description}</span>
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
  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add New Category
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
        title={EditingCategory ? "Edit Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOrUpdate}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Category Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={EditingCategory ? isEditLoading : isPostLoading}
              type="primary"
              htmlType="submit"
              size="large"
              block
            >
              {EditingCategory ? "Edit Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Category;
