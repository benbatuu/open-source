import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from "lucide-react";

const treeVariants = cva(
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

const treeItemVariants = cva(
  "flex items-center gap-2 py-1 px-2 rounded-md transition-colors cursor-pointer group",
  {
    variants: {
      size: {
        sm: "text-xs py-0.5 px-1",
        md: "text-sm py-1 px-2",
        lg: "text-base py-1.5 px-3",
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

const treeIconVariants = cva(
  "flex-shrink-0 transition-colors",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      state: {
        default: "text-muted-foreground",
        selected: "text-primary",
        active: "text-accent",
        disabled: "text-muted-foreground/30",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

const treeLabelVariants = cva(
  "flex-1 truncate",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      state: {
        default: "text-foreground",
        selected: "text-primary font-medium",
        active: "text-accent font-medium",
        disabled: "text-muted-foreground/50",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  type?: 'folder' | 'file' | 'custom';
  children?: TreeNode[];
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  metadata?: Record<string, any>;
  onSelect?: () => void;
  onToggle?: () => void;
}

export interface TreeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof treeVariants> {
  data: TreeNode[];
  onNodeSelect?: (node: TreeNode) => void;
  onNodeToggle?: (node: TreeNode) => void;
  onNodeExpand?: (node: TreeNode) => void;
  onNodeCollapse?: (node: TreeNode) => void;
  selectedNodeId?: string;
  expandedNodeIds?: string[];
  showIcons?: boolean;
  showConnectors?: boolean;
  allowMultiSelect?: boolean;
  searchable?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  loading?: boolean;
  error?: string;
  emptyText?: string;
  renderNode?: (node: TreeNode, level: number) => React.ReactNode;
  renderIcon?: (node: TreeNode) => React.ReactNode;
  renderLabel?: (node: TreeNode) => React.ReactNode;
  filterNodes?: (node: TreeNode, query: string) => boolean;
  sortNodes?: (a: TreeNode, b: TreeNode) => number;
}

const defaultFileIcons = {
  folder: <Folder className="h-4 w-4" />,
  'folder-open': <FolderOpen className="h-4 w-4" />,
  file: <File className="h-4 w-4" />,
};

export function Tree({
  data,
  onNodeSelect,
  onNodeToggle,
  onNodeExpand,
  onNodeCollapse,
  selectedNodeId,
  expandedNodeIds = [],
  showIcons = true,
  showConnectors = true,
  allowMultiSelect = false,
  searchable = false,
  searchQuery = '',
  onSearchChange,
  loading = false,
  error,
  emptyText = 'No items',
  renderNode,
  renderIcon,
  renderLabel,
  filterNodes,
  sortNodes,
  variant,
  size,
  className,
  ...props
}: TreeProps) {
  const [mounted, setMounted] = React.useState(false);
  const [internalExpandedIds, setInternalExpandedIds] = React.useState<string[]>(expandedNodeIds);
  const [internalSelectedId, setInternalSelectedId] = React.useState<string | undefined>(selectedNodeId);

  // Filter and sort data - moved before early returns to fix hooks violation
  const filteredData = React.useMemo(() => {
    let filtered = data || [];
    
    if (searchQuery && filterNodes) {
      filtered = filtered.filter(node => filterNodes(node, searchQuery));
    }
    
    if (sortNodes) {
      filtered = [...filtered].sort(sortNodes);
    }
    
    return filtered;
  }, [data, searchQuery, filterNodes, sortNodes]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setInternalExpandedIds(expandedNodeIds);
  }, [expandedNodeIds]);

  React.useEffect(() => {
    setInternalSelectedId(selectedNodeId);
  }, [selectedNodeId]);

  if (!mounted) {
    return (
      <div className={cn(treeVariants({ variant, size, className }))}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={cn(treeVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading tree...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(treeVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
            <span className="text-2xl text-destructive">⚠️</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">Tree Error</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={cn(treeVariants({ variant, size, className }))}>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">🌳</span>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground">No Items</h3>
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleNodeToggle = (node: TreeNode) => {
    const isExpanded = internalExpandedIds.includes(node.id);
    const newExpandedIds = isExpanded
      ? internalExpandedIds.filter(id => id !== node.id)
      : [...internalExpandedIds, node.id];
    
    setInternalExpandedIds(newExpandedIds);
    
    if (isExpanded) {
      onNodeCollapse?.(node);
    } else {
      onNodeExpand?.(node);
    }
    
    onNodeToggle?.(node);
  };

  const handleNodeSelect = (node: TreeNode) => {
    if (node.disabled) return;
    
    if (!allowMultiSelect) {
      setInternalSelectedId(node.id);
    }
    
    onNodeSelect?.(node);
    node.onSelect?.();
  };

  const getNodeIcon = (node: TreeNode) => {
    if (renderIcon) {
      return renderIcon(node);
    }
    
    if (node.icon) {
      return node.icon;
    }
    
    if (!showIcons) {
      return null;
    }
    
    const isExpanded = internalExpandedIds.includes(node.id);
    
    if (node.type === 'folder') {
      return isExpanded ? defaultFileIcons['folder-open'] : defaultFileIcons.folder;
    }
    
    if (node.type === 'file') {
      return defaultFileIcons.file;
    }
    
    return defaultFileIcons.file;
  };

  const getNodeState = (node: TreeNode) => {
    if (node.disabled) return 'disabled';
    if (node.selected || internalSelectedId === node.id) return 'selected';
    if (node.metadata?.active) return 'active';
    return 'default';
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    if (renderNode) {
      return renderNode(node, level);
    }

    const isExpanded = internalExpandedIds.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const nodeState = getNodeState(node);

    return (
      <div key={node.id} className="select-none">
        <div
          className={cn(
            treeItemVariants({ size, state: nodeState }),
            "ml-4"
          )}
          style={{ marginLeft: `${level * 16}px` }}
          onClick={() => handleNodeSelect(node)}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNodeToggle(node);
              }}
              className="flex-shrink-0 p-0.5 hover:bg-muted/50 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className={cn(treeIconVariants({ size, state: nodeState }))} />
              ) : (
                <ChevronRight className={cn(treeIconVariants({ size, state: nodeState }))} />
              )}
            </button>
          )}
          
          {/* Spacer for nodes without children */}
          {!hasChildren && <div className="w-4" />}
          
          {/* Node Icon */}
          {getNodeIcon(node) && (
            <div className={cn(treeIconVariants({ size, state: nodeState }))}>
              {getNodeIcon(node)}
            </div>
          )}
          
          {/* Node Label */}
          <div className={cn(treeLabelVariants({ size, state: nodeState }))}>
            {renderLabel ? renderLabel(node) : node.label}
          </div>
          
          {/* Node Actions */}
          {node.metadata?.actions && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {node.metadata.actions}
            </div>
          )}
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {showConnectors && (
              <div 
                className="absolute left-0 top-0 bottom-0 w-px bg-border/30"
                style={{ left: `${level * 16 + 8}px` }}
              />
            )}
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(treeVariants({ variant, size, className }))} {...props}>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      )}
      
      {/* Tree Content */}
      <div className="space-y-1">
        {filteredData.map(node => renderTreeNode(node))}
      </div>
      
      {/* Tree Stats */}
      {data.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
          {data.length} item{data.length !== 1 ? 's' : ''}
          {internalExpandedIds.length > 0 && (
            <span> • {internalExpandedIds.length} expanded</span>
          )}
        </div>
      )}
    </div>
  );
}

export { treeVariants, treeItemVariants, treeIconVariants, treeLabelVariants };
