import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronUp, ChevronDown, ArrowUpDown } from "lucide-react";

const listVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "bg-background",
        card: "bg-card border border-border rounded-lg p-4",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4",
        premium: "bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-6 shadow-lg shadow-primary/10",
        featured: "bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 rounded-xl p-6 shadow-lg shadow-accent/10",
      },
      size: {
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const listItemVariants = cva(
  "flex items-center gap-3 py-2 px-3 rounded-md transition-colors cursor-pointer group",
  {
    variants: {
      size: {
        sm: "text-xs py-1.5 px-2",
        md: "text-sm py-2 px-3",
        lg: "text-base py-3 px-4",
      },
      state: {
        default: "hover:bg-muted/50",
        selected: "bg-primary/10 text-primary hover:bg-primary/20",
        active: "bg-accent/10 text-accent hover:bg-accent/20",
        disabled: "text-muted-foreground/50 cursor-not-allowed hover:bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

const listHeaderVariants = cva(
  "flex items-center gap-3 py-2 px-3 font-medium border-b border-border/50",
  {
    variants: {
      size: {
        sm: "text-xs py-1.5 px-2",
        md: "text-sm py-2 px-3",
        lg: "text-base py-3 px-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ListItem {
  id: string;
  content: React.ReactNode;
  data?: Record<string, any>;
  selected?: boolean;
  disabled?: boolean;
  metadata?: Record<string, any>;
  onSelect?: () => void;
}

export interface ListColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string | number;
  render?: (item: ListItem, column: ListColumn) => React.ReactNode;
}

export interface ListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {
  items: ListItem[];
  columns?: ListColumn[];
  onItemSelect?: (item: ListItem) => void;
  onItemClick?: (item: ListItem) => void;
  selectedItemId?: string;
  allowMultiSelect?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  searchable?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  loading?: boolean;
  error?: string;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  virtualized?: boolean;
  itemHeight?: number;
  overscan?: number;
  renderItem?: (item: ListItem, index: number) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  filterItems?: (item: ListItem, query: string) => boolean;
  stickyHeader?: boolean;
  striped?: boolean;
}

export function List({
  items = [],
  columns,
  onItemSelect,
  onItemClick,
  selectedItemId,
  allowMultiSelect = false,
  selectable = true,
  sortable = false,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  searchable = false,
  searchQuery = '',
  onSearchChange,
  loading = false,
  error,
  emptyText = 'No items',
  emptyIcon,
  virtualized = false,
  itemHeight = 48,
  overscan = 5,
  renderItem,
  renderHeader,
  filterItems,
  stickyHeader = false,
  striped = false,
  variant,
  size,
  className,
  ...props
}: ListProps) {
  const [mounted, setMounted] = React.useState(false);
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(
    selectedItemId ? [selectedItemId] : []
  );

  // Filter items based on search query
  const filteredItems = React.useMemo(() => {
    const safeItems = items || [];
    if (!searchQuery || !filterItems) return safeItems;
    return safeItems.filter(item => filterItems(item, searchQuery));
  }, [items, searchQuery, filterItems]);

  // Sort items
  const sortedItems = React.useMemo(() => {
    if (!sortColumn || !sortable) return filteredItems;
    
    return [...filteredItems].sort((a, b) => {
      const aValue = a.data?.[sortColumn] || '';
      const bValue = b.data?.[sortColumn] || '';
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
  }, [filteredItems, sortColumn, sortDirection, sortable]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (selectedItemId) {
      setInternalSelectedIds([selectedItemId]);
    }
  }, [selectedItemId]);

  const handleItemClick = (item: ListItem) => {
    if (item.disabled) return;

    if (selectable) {
      if (allowMultiSelect) {
        setInternalSelectedIds(prev => 
          prev.includes(item.id)
            ? prev.filter(id => id !== item.id)
            : [...prev, item.id]
        );
      } else {
        setInternalSelectedIds([item.id]);
      }
    }

    onItemSelect?.(item);
    onItemClick?.(item);
    item.onSelect?.();
  };

  const handleSort = (column: string) => {
    if (!sortable || !onSort) return;
    
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column, newDirection);
  };

  const getItemState = (item: ListItem) => {
    if (item.disabled) return 'disabled';
    if (item.selected || internalSelectedIds.includes(item.id)) return 'selected';
    return 'default';
  };

  const renderSortIcon = (column: string) => {
    if (!sortable) return null;
    
    if (sortColumn === column) {
      return sortDirection === 'asc' ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      );
    }
    
    return <ArrowUpDown className="h-4 w-4 opacity-50" />;
  };

  if (!mounted) {
    return (
      <div className={cn(listVariants({ variant, size, className }))}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(listVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(listVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">List Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (sortedItems.length === 0) {
    return (
      <div className={cn(listVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            {emptyIcon || <span className="text-2xl text-muted-foreground">📋</span>}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No Items</h3>
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(listVariants({ variant, size, className }))} {...props}>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      )}

      {/* Header */}
      {columns && columns.length > 0 && (
        <div className={cn(
          listHeaderVariants({ size }),
          stickyHeader && "sticky top-0 bg-background/95 backdrop-blur-sm z-10"
        )}>
          {columns.map((column) => (
            <div
              key={column.key}
              className="flex items-center gap-2"
              style={{ width: column.width }}
            >
              <span>{column.label}</span>
              {column.sortable && (
                <button
                  onClick={() => handleSort(column.key)}
                  className="flex items-center hover:bg-muted/50 rounded p-1 transition-colors"
                >
                  {renderSortIcon(column.key)}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* List Content */}
      <div className="space-y-1">
        {sortedItems.map((item, index) => {
          const itemState = getItemState(item);
          const isEven = index % 2 === 0;
          
          if (renderItem) {
            return (
              <div key={item.id}>
                {renderItem(item, index)}
              </div>
            );
          }

          if (columns && columns.length > 0) {
            return (
              <div
                key={item.id}
                className={cn(
                  listItemVariants({ size, state: itemState }),
                  striped && isEven && "bg-muted/20"
                )}
                onClick={() => handleItemClick(item)}
              >
                {columns.map((column) => (
                  <div
                    key={column.key}
                    className="flex-1"
                    style={{ width: column.width }}
                  >
                    {column.render ? column.render(item, column) : item.content}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={cn(
                listItemVariants({ size, state: itemState }),
                striped && isEven && "bg-muted/20"
              )}
              onClick={() => handleItemClick(item)}
            >
              {item.content}
            </div>
          );
        })}
      </div>

      {/* List Stats */}
      {sortedItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          {sortedItems.length} item{sortedItems.length !== 1 ? 's' : ''}
          {internalSelectedIds.length > 0 && (
            <span> • {internalSelectedIds.length} selected</span>
          )}
        </div>
      )}
    </div>
  );
}

export { listVariants, listItemVariants, listHeaderVariants };
