/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useState } from "react";
import { Typography } from "antd";
import CustomTable from "../../../../components/common/CustomTable";
import Swal from "sweetalert2";
import { useGetOrderDataQuery } from "../../../../redux/api/orderApi/OrderApi";
import { formatCurrency } from "../../../../utils/formatCurrency";

const { Text } = Typography;

const Order = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const { data } = useGetOrderDataQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });

  const isDarkMode = false;

  const customColumns = [
    // {
    //   header: "ACTIONS",
    //   size: 100,
    //   muiTableHeadCellProps: {
    //     sx: { color: `${isDarkMode ? "white" : "black"}` },
    //   },
    //   Cell: ({ row }: any) => (
    //     <Space size="small">
    //       <Button 
    //         icon={<EyeOutlined />} 
    //         onClick={() => {
           
    //         }}
    //       >
    //         View
    //       </Button>
    //       <Popconfirm
    //         title="Are you sure you want to delete this order?"
    //         description="This action cannot be undone."
    //         onConfirm={() => handleDelete(row._id)}
    //         okText="Yes, Delete"
    //         cancelText="Cancel"
    //       >
    //         <Button danger icon={<DeleteOutlined />} />
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
    {
      header: "ORDER ID",
      accessorKey: "transactionId",
      Cell: ({ row }: any) => (
        <Text strong copyable>{row.transactionId}</Text>
      ),
    },
    {
      header: "CUSTOMER",
      Cell: ({ row }: any) => (
        <div className="flex flex-col">
          <Text strong>{row.customer?.name}</Text>
          <Text type="secondary">{row.customer?.email}</Text>
          <Text type="secondary">{row.customer?.phone}</Text>
        </div>
      ),
    },
    {
      header: "ITEMS",
      Cell: ({ row }: any) => (
        <div>
          {row.items?.map((item: any) => (
            <div key={item._id} className="flex justify-between py-1">
              <Text>
                {item.quantity} × {item.product?.productName || 'Product'}
              </Text>
              <Text>{formatCurrency(item.price)}</Text>
            </div>
          ))}
        </div>
      ),
    },
    {
      header: "TOTAL",
      Cell: ({ row }: any) => (
        <Text strong>{formatCurrency(row.total)}</Text>
      ),
    },

    {
      header: "DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <Text>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </Text>
          <Text type="secondary">
            {new Date(row.createdAt).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
  ];

  const handleDelete = async (id: string) => {
    try {
      // Implement your delete mutation here
      // const res = await softDelete({ id }).unwrap();
      Swal.fire({
        title: "Success!",
        text: `Order has been deleted`,
        icon: "success",
      });
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
      // Implement your bulk delete mutation here
      // const res = await bulkSoftDelete(ids).unwrap();
      Swal.fire({
        title: "Success!",
        text: `${ids.length} orders have been deleted`,
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

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomTable
          columns={customColumns}
          data={data?.data?.result || []}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) =>
            setPagination({ pageIndex, pageSize })
          }
          onBulkDelete={(selectedIds) => {
            deleteMultiple(selectedIds);
          }}
          enableBulkDelete={false}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>


    </div>
  );
};

export default Order;