"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Save,
  X,
} from "lucide-react";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    salary: 75000,
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Marketing",
    salary: 65000,
    status: "Active",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    department: "Sales",
    salary: 55000,
    status: "Inactive",
    joinDate: "2022-11-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    department: "HR",
    salary: 60000,
    status: "Active",
    joinDate: "2023-03-05",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    department: "Engineering",
    salary: 80000,
    status: "Active",
    joinDate: "2022-09-12",
  },
  {
    id: 6,
    name: "Lisa Davis",
    email: "lisa@example.com",
    department: "Finance",
    salary: 70000,
    status: "Active",
    joinDate: "2023-01-30",
  },
  {
    id: 7,
    name: "Tom Anderson",
    email: "tom@example.com",
    department: "Marketing",
    salary: 58000,
    status: "Inactive",
    joinDate: "2022-12-08",
  },
  {
    id: 8,
    name: "Emily Taylor",
    email: "emily@example.com",
    department: "Sales",
    salary: 52000,
    status: "Active",
    joinDate: "2023-04-18",
  },
];

export default function EditableTable() {
  const [data, setData] = useState(initialData);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const handleEdit = (rowId, columnId, currentValue) => {
    setEditingCell({ rowId, columnId });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (!editingCell) return;

    setData((prev) =>
      prev.map((row) =>
        row.id === editingCell.rowId
          ? {
              ...row,
              [editingCell.columnId]:
                editingCell.columnId === "salary"
                  ? Number(editValue)
                  : editValue,
            }
          : row
      )
    );
    setEditingCell(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row, getValue }) => {
          const isEditing =
            editingCell?.rowId === row.original.id &&
            editingCell?.columnId === "name";
          return (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 w-32 px-2 border border-secondary-200 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    className="p-1 hover:bg-success-50 text-success-600 rounded transition-colors duration-200"
                    onClick={handleSave}
                  >
                    <Save className="h-3 w-3" />
                  </button>
                  <button
                    className="p-1 hover:bg-secondary-50 text-secondary-600 rounded transition-colors duration-200"
                    onClick={handleCancel}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <span className="font-medium">{getValue()}</span>
                  <button
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-primary-50 text-primary-600 rounded transition-all duration-200"
                    onClick={() =>
                      handleEdit(row.original.id, "name", getValue())
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row, getValue }) => {
          const isEditing =
            editingCell?.rowId === row.original.id &&
            editingCell?.columnId === "email";
          return (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 w-40"
                    autoFocus
                  />
                  <button size="sm" variant="ghost" onClick={handleSave}>
                    <Save className="h-3 w-3" />
                  </button>
                  <button size="sm" variant="ghost" onClick={handleCancel}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <span className="text-[#6e62e5]">{getValue()}</span>
                  <button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() =>
                      handleEdit(row.original.id, "email", getValue())
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("department", {
        header: "Department",
        cell: ({ row, getValue }) => {
          const isEditing =
            editingCell?.rowId === row.original.id &&
            editingCell?.columnId === "department";
          return (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 w-32"
                    autoFocus
                  />
                  <button size="sm" variant="ghost" onClick={handleSave}>
                    <Save className="h-3 w-3" />
                  </button>
                  <button size="sm" variant="ghost" onClick={handleCancel}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <span>{getValue()}</span>
                  <button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() =>
                      handleEdit(row.original.id, "department", getValue())
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("salary", {
        header: "Salary",
        cell: ({ row, getValue }) => {
          const isEditing =
            editingCell?.rowId === row.original.id &&
            editingCell?.columnId === "salary";
          return (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8 w-24"
                    autoFocus
                  />
                  <button size="sm" variant="ghost" onClick={handleSave}>
                    <Save className="h-3 w-3" />
                  </button>
                  <button size="sm" variant="ghost" onClick={handleCancel}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <span className="font-mono">
                    ${getValue().toLocaleString()}
                  </span>
                  <button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() =>
                      handleEdit(
                        row.original.id,
                        "salary",
                        getValue().toString()
                      )
                    }
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => <span>{getValue()}</span>,
      }),
      columnHelper.accessor("joinDate", {
        header: "Join Date",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600">{getValue()}</span>
        ),
      }),
    ],
    [editingCell, editValue]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg   ">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#323a4b]">
            Employee Data Table
          </h2>
          <p className="text-[#323a4b]">
            Click the edit icon to modify any cell inline
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
          <input
            placeholder="Search employees..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className=" rounded-lg  ">
        <div className="  px-3 py-2 ">
          <div className="flex items-center justify-between">
            <span className="text-secondary-600 font-medium">
              Employee Records
            </span>
            <span className="text-secondary-500 bg-secondary-50 px-3 py-1 rounded-full text-sm">
              {data.length} employees
            </span>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto border-[1px] border-gray-400  rounded-2xl">
            <table className="w-full ">
              <thead className="">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="h-12 px-4 bg-[#f5f7fb]  text-left align-middle font-medium text-secondary-700 border-b  border-[1pxborder-secondary-200"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none hover:text-primary-600 transition-colors duration-200"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " ↑",
                              desc: " ↓",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-[#f5f7fb]">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-400 border-dashed hover:bg-secondary-50 transition-colors duration-200"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-4 align-middle text-secondary-600"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="h-24 text-center text-secondary-500"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-4 py-3 bg-secondary-50 rounded-b-lg">
            <div className="text-sm text-secondary-600">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{" "}
              of {table.getFilteredRowModel().rows.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                  ${
                    !table.getCanPreviousPage()
                      ? "bg-secondary-100 text-secondary-400 cursor-not-allowed"
                      : "bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200"
                  }`}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              <button
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                  ${
                    !table.getCanNextPage()
                      ? "bg-secondary-100 text-secondary-400 cursor-not-allowed"
                      : "bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200"
                  }`}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
