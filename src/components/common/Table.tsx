import React from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";

export interface CustomTableColumn<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  width?: number;
  render?: (value: T[keyof T], record: T, index: number) => React.ReactNode;
  align?: "left" | "center" | "right";
}

export interface CustomTableProps<
  T extends { id: number | number; disabled?: boolean }
> {
  data: T[];
  columns: CustomTableColumn<T>[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  showActions?: boolean;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  pagination?: TableProps<T>["pagination"];
  size?: "small" | "middle" | "large";
  className?: string;
  showSelection?: boolean;
  onSelectionChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
}

const AdminTable = <T extends { id: number | number; disabled?: boolean }>({
  data,
  columns,
  loading = false,
  rowKey = "id",
  showActions = true,
  onEdit,
  onDelete,
  pagination = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
    pageSizeOptions: ["10", "20", "50", "100"],
    defaultPageSize: 10,
  },
  size = "middle",
  className = "",
  showSelection = false,
  onSelectionChange,
}: CustomTableProps<T>) => {
  const actionColumn: ColumnType<T> = {
    title: "Thao tác",
    key: "actions",
    width: 80,
    align: "center",
    render: (_: unknown, record: T) => {
      const menuItems = [
        {
          key: "edit",
          label: (
            <Space>
              <EditOutlined />
              Chỉnh sửa
            </Space>
          ),
          onClick: () => onEdit?.(record),
        },
        {
          key: "delete",
          label: (
            <Space>
              <DeleteOutlined />
              Xóa
            </Space>
          ),
          onClick: () => onDelete?.(record),
          danger: true,
        },
      ];

      return (
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="hover:bg-gray-100 transition-colors"
          />
        </Dropdown>
      );
    },
  };

  const finalColumns: ColumnsType<T> = [
    ...columns.map((col) => ({
      ...col,
      dataIndex: col.dataIndex as string,
      className:
        col.align === "center"
          ? "text-center"
          : col.align === "right"
          ? "text-right"
          : "text-left",
    })),
    ...(showActions ? [actionColumn] : []),
  ];

  const rowSelection: TableProps<T>["rowSelection"] | undefined = showSelection
    ? {
        onChange: onSelectionChange,
        getCheckboxProps: (record: T) => ({
          disabled: record.disabled ?? false,
        }),
      }
    : undefined;

  return (
    <div className={`p-6 ${className}`}>
      <Table<T>
        dataSource={data}
        columns={finalColumns}
        loading={loading}
        rowKey={rowKey}
        pagination={pagination}
        size={size}
        rowSelection={rowSelection}
        className="ant-table-custom"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AdminTable;
