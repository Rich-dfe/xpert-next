"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import LicenseStatusCell from "./License-status-cell";
import ViewLicensesCell from "./View-licenses-cell";
import LicenseTableDateCell from "./License-date-cell";

const LicenseTable = () => {
  const DATA = [
    {
      logger: "loggery 123",
      started: "2025/10/15",
      expires: new Date(2025, 10, 15),
      status: "Attention",
      qty: "2",
      licenses: [
        ["12-06-2024", "12-06-2025"],
        ["12-06-2025", "12-06-2026"],
        ["12-06-2025", "12-06-2026"],
      ],
    },
    {
      logger: "logger 234",
      started: "2025/10/15",
      expires: new Date(2025, 10, 15),
      status: "Valid",
      qty: "3",
      licenses: [
        ["12-06-2024", "12-06-2025"],
        ["12-06-2024", "12-06-2025"],
      ],
    },
    {
      logger: "logger 345",
      started: "2025/10/15",
      expires: new Date(2025, 10, 15),
      status: "Expired",
      qty: "6",
      licenses: [
        ["12-06-2024", "12-06-2025"],
        ["12-06-2024", "12-06-2025"],
      ],
    },
  ];
  const [data, setData] = useState(DATA);
  const [globalFilter, setGlobalFilter] = useState([]);
  const [sorting, setSorting] = useState([]);

  const columns = [
    {
      accessorKey: "logger",
      header: "Logger",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "started",
      header: "Started",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "expires",
      header: "Expires",
      cell: LicenseTableDateCell,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: LicenseStatusCell,
    },
    {
      accessorKey: "qty",
      header: "Quantity",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "licenses",
      header: "Licenses",
      size: 225,
      cell: ViewLicensesCell,
      //   cell: ({cell}) => {
      //     const licenseArray = cell.getValue();
      //     return <ViewLicensesCell items={licenseArray} />
      //   },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.log(value);
      },
      // setData((prev) => prev.map((row,index) =>
      //         index === rowIndex ? {...prev[rowIndex],[columnId]:value} : row
      //     )
      // ),
    },
  });

  console.log(table.getHeaderGroups());
  return (
    <>
      {/* FILTER BOX */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Filter all columns..."
          value={globalFilter ?? ""} // Ensure it's not null/undefined
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="appearance-none bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
        />
      </div>
      {/* FILTER BOX END */}
      <div className="flex justify-center mt-4">
        <table
          width={table.getTotalSize()}
          className="border-collapse border border-gray-400 text-gray-300 text-sm font-medium"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    width={header.getSize()}
                    className="bg-gray-500 border border-gray-400 cursor-pointer"
                    key={header.id}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    {header.column.columnDef.header}
                    {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                    {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    width={cell.column.getSize()}
                    className="bg-gray-800 border border-gray-300 px-2"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LicenseTable;
