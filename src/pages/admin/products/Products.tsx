/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, notification, Popconfirm } from "antd";
import CustomTable from "../../../components/common/CustomTable";
import ProductModal from "../../../components/pages/admin/products/ProductModal";
import ProductTable from "../../../components/pages/admin/products/ProductTable";
import MaxWidth from "../../../wrapper/MaxWidth";
import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import { useGetproductDataQuery, useProductDeleteMutation, useProductPostMutation, useProductPutMutation } from "../../../redux/api/productApi/ProductApi";

const Products = () => {
    const [form] = Form.useForm();
      const [EditingCategory, setEditingCategory] = useState<any | null>(null);
      const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
      });
      const [globalFilter, setGlobalFilter] = useState("");
      const { data: data, refetch } = useGetproductDataQuery({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        isDelete: false,
        search: globalFilter
      });
    
      const [productPost, { isLoading: isPostLoading }] =
        useProductPostMutation();
      const [productPut, { isLoading: isEditLoading }] = useProductPutMutation();
      const [productDelete, { isLoading: isDeleteLoading }] =
        useProductDeleteMutation();
    
      const handleAddOrUpdate = async (values: any) => {
        try {
          const data = {
            name: values.name,
            description: values.description,
          };
    
          let res;
          if (EditingCategory) {
            res = await productPut({
              data: data,
              id: EditingCategory._id,
            }).unwrap();
          } else {
            res = await productPost(data).unwrap();
          }
          alert(res.message);
          //   notification.success({
          //     message: res?.message,
          //     placement: "topRight",
          //   });
    
          refetch();
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
    <MaxWidth>
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
      <ProductTable />
      <ProductModal />
    </MaxWidth>
  );
};

export default Products;
