/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

const CustomTable = ({
  columns,
  data,
  pagination,
  onPaginationChange,
  globalFilter,
  onFilterChange,
  totalRecordCount,
}: {
  columns: any[];
  data: any[];
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  globalFilter: string;
  onFilterChange: (value: string) => void;
  totalRecordCount: number;
}) => {
  const  isDarkMode  = false;

  const handlePageChange = (newPageIndex: number) => {
    onPaginationChange(newPageIndex, pagination.pageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPaginationChange(pagination.pageIndex, Number(e.target.value));
  };

  return (
    <div className={`py-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Global Filter */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search..."
          className={`p-2 border rounded-xl w-52 ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 border-gray-300"
          }`}
        />
        <div className="text-sm">
          Showing {pagination.pageIndex * pagination.pageSize + 1}-
          {Math.min(
            (pagination.pageIndex + 1) * pagination.pageSize,
            totalRecordCount
          )}{" "}
          of {totalRecordCount}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  rounded-xl  border border-gray-200">
        <table className="w-full ">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessorKey || col.header}
                  className={`border p-2 text-left ${
                    isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  // className={`${
                  //   isDarkMode
                  //     ? rowIndex % 2 === 0
                  //       ? "bg-gray-800"
                  //       : "bg-gray-900"
                  //     : rowIndex % 2 === 0
                  //     ? "bg-sky-50"
                  //     : "bg-white"
                  // }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessorKey || col.header}
                      className={`border p-2 ${
                        isDarkMode ? "border-gray-700" : "border-gray-300"
                      }`}
                      style={{maxWidth: "250px",  overflowX: "auto", minWidth: '150px'}}
                    >
                      {col.Cell ? col.Cell({ row }) : row[col.accessorKey]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className={`text-center p-4 border ${
                    isDarkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <select
          value={pagination.pageSize}
          onChange={handlePageSizeChange}
          className={`p-2 border rounded ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 border-gray-300"
          }`}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <div>
          <button
            disabled={pagination.pageIndex === 0}
            onClick={() => handlePageChange(pagination.pageIndex - 1)}
            className={`px-4 py-2 border rounded mr-2 disabled:opacity-50 ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            Previous
          </button>
          <button
            disabled={(pagination.pageIndex + 1) * pagination.pageSize >= totalRecordCount}
            onClick={() => handlePageChange(pagination.pageIndex + 1)}
            className={`px-4 py-2 border rounded disabled:opacity-50 ${
              isDarkMode ? "border-gray-700" : "border-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;