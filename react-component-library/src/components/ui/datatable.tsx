import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronUp, ChevronDown, Search, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";

const datatableVariants = cva(
  "w-full border-collapse bg-background text-sm",
  {
    variants: {
      variant: {
        default: "border border-border/50 rounded-lg overflow-hidden",
        outlined: "border-2 border-border rounded-xl overflow-hidden",
        filled: "bg-muted/30 rounded-lg overflow-hidden",
        ghost: "border-0 rounded-lg overflow-hidden",
        premium: "border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden shadow-lg shadow-primary/10",
        featured: "border border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl overflow-hidden shadow-lg shadow-accent/10",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      density: {
        compact: "space-y-1",
        normal: "space-y-2",
        comfortable: "space-y-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      density: "normal",
    },
  }
);

const headerVariants = cva(
  "px-4 py-3 font-semibold text-muted-foreground border-b border-border/50 transition-colors duration-200",
  {
    variants: {
      sortable: {
        true: "cursor-pointer hover:bg-muted/50 select-none",
        false: "",
      },
      sorted: {
        true: "text-foreground bg-muted/30",
        false: "",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      sortable: false,
      sorted: false,
      align: "left",
    },
  }
);

const cellVariants = cva(
  "px-4 py-3 border-b border-border/30 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "",
        numeric: "text-right font-mono",
        center: "text-center",
        action: "text-center w-12",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sorter?: (a: T, b: T) => number;
  fixed?: 'left' | 'right';
}

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof datatableVariants> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: boolean;
  };
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: string[];
    onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
  };
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
  expandable?: {
    expandedRowKeys?: string[];
    onExpandedRowsChange?: (expandedKeys: string[]) => void;
    expandedRowRender?: (record: T, index: number) => React.ReactNode;
  };
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  showHeader?: boolean;
  sticky?: boolean;
  virtual?: boolean;
  emptyText?: string;
  rowKey?: string | ((record: T) => string);
}

export function DataTable<T = any>({
  data,
  columns,
  loading = false,
  pagination,
  rowSelection,
  onRow,
  expandable,
  scroll,
  size = 'middle',
  bordered = false,
  showHeader = true,
  sticky = false,
  virtual = false,
  emptyText = 'No data',
  rowKey = 'id',
  variant,
  density,
  className,
  ...props
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [filterConfig, setFilterConfig] = React.useState<Record<string, string>>({});
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>(
    rowSelection?.selectedRowKeys || []
  );

  // Get row key
  const getRowKey = React.useCallback((record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record as any)[rowKey] || index.toString();
  }, [rowKey]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      if (column?.sorter) {
        return sortConfig.direction === 'asc' 
          ? column.sorter(a, b)
          : column.sorter(b, a);
      }

      const aValue = column?.dataIndex ? (a as any)[column.dataIndex] : (a as any)[sortConfig.key];
      const bValue = column?.dataIndex ? (b as any)[column.dataIndex] : (b as any)[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns]);

  // Filter data
  const filteredData = React.useMemo(() => {
    if (Object.keys(filterConfig).length === 0) return sortedData;

    return sortedData.filter(record => {
      return Object.entries(filterConfig).every(([key, value]) => {
        if (!value) return true;
        const column = columns.find(col => col.key === key);
        const recordValue = column?.dataIndex ? (record as any)[column.dataIndex] : (record as any)[key];
        return String(recordValue).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [sortedData, filterConfig, columns]);

  // Handle sort
  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key);
    if (!column?.sortable) return;

    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  // Handle row selection
  const handleRowSelection = (record: T, checked: boolean) => {
    const key = getRowKey(record, 0);
    const newSelectedKeys = checked
      ? [...selectedRowKeys, key]
      : selectedRowKeys.filter(k => k !== key);
    
    setSelectedRowKeys(newSelectedKeys);
    rowSelection?.onChange?.(newSelectedKeys, data.filter(d => newSelectedKeys.includes(getRowKey(d, 0))));
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    const newSelectedKeys = checked ? filteredData.map((record, index) => getRowKey(record, index)) : [];
    setSelectedRowKeys(newSelectedKeys);
    rowSelection?.onChange?.(newSelectedKeys, filteredData);
  };

  const isAllSelected = filteredData.length > 0 && selectedRowKeys.length === filteredData.length;
  const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < filteredData.length;

  if (loading) {
    return (
      <div className={cn(datatableVariants({ variant, density, className }))}>
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Filters */}
      {columns.some(col => col.filterable) && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border/50">
          <div className="flex flex-wrap gap-4">
            {columns
              .filter(col => col.filterable)
              .map(column => (
                <div key={column.key} className="flex-1 min-w-48">
                  <Input
                    placeholder={`Filter ${column.title}...`}
                    value={filterConfig[column.key] || ''}
                    onChange={(e) => setFilterConfig(prev => ({
                      ...prev,
                      [column.key]: e.target.value
                    }))}
                    className="h-9"
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className={cn(datatableVariants({ variant, density }))}>
        <table className="w-full">
          {showHeader && (
            <thead className={cn(sticky && "sticky top-0 z-10 bg-background")}>
              <tr>
                {rowSelection && (
                  <th className={cn(headerVariants({ sortable: false }), "w-12")}>
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map(column => (
                  <th
                    key={column.key}
                    className={cn(
                      headerVariants({
                        sortable: column.sortable,
                        sorted: sortConfig?.key === column.key,
                        align: column.align || 'left',
                      }),
                      column.width && `w-[${column.width}]`
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className={cn(
                      "flex items-center gap-2",
                      column.align === 'center' && "justify-center",
                      column.align === 'right' && "justify-end"
                    )}>
                      <span>{column.title}</span>
                      {column.sortable && (
                        <div className="flex flex-col">
                          <ChevronUp 
                            className={cn(
                              "h-3 w-3",
                              sortConfig?.key === column.key && sortConfig.direction === 'asc'
                                ? "text-primary"
                                : "text-muted-foreground/50"
                            )}
                          />
                          <ChevronDown 
                            className={cn(
                              "h-3 w-3 -mt-1",
                              sortConfig?.key === column.key && sortConfig.direction === 'desc'
                                ? "text-primary"
                                : "text-muted-foreground/50"
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (rowSelection ? 1 : 0)}
                  className="p-8 text-center text-muted-foreground"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              filteredData.map((record, index) => {
                const key = getRowKey(record, index);
                const rowProps = onRow?.(record, index) || {};
                
                return (
                  <tr
                    key={key}
                    className={cn(
                      "hover:bg-muted/50 transition-colors duration-200",
                      rowProps.className
                    )}
                    onClick={rowProps.onClick}
                    onDoubleClick={rowProps.onDoubleClick}
                  >
                    {rowSelection && (
                      <td className={cn(cellVariants({ variant: 'action' }))}>
                        <Checkbox
                          checked={selectedRowKeys.includes(key)}
                          onCheckedChange={(checked) => handleRowSelection(record, checked === true)}
                        />
                      </td>
                    )}
                    {columns.map(column => {
                      const value = column.dataIndex ? (record as any)[column.dataIndex] : (record as any)[column.key];
                      const renderedValue = column.render ? column.render(value, record, index) : value;
                      
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            cellVariants({ 
                              variant: column.align === 'center' ? 'center' : 
                                      column.align === 'right' ? 'numeric' : 'default'
                            })
                          )}
                        >
                          {renderedValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {pagination.showTotal && (
              <span>
                Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
                {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
                {pagination.total} entries
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.current <= 1}
              onClick={() => {/* Handle page change */}}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
              onClick={() => {/* Handle page change */}}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { datatableVariants, headerVariants, cellVariants };
