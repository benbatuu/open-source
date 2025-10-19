import { Suspense, useState } from 'react';
import { DataTable, Column } from '../ui/datatable';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Edit, Trash2, Eye, Download, Star, Heart, Share } from 'lucide-react';

// Sample data
const sampleUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-15',
    avatar: 'https://github.com/shadcn.png',
    score: 95,
    department: 'Engineering',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-01-10',
    avatar: 'https://github.com/vercel.png',
    score: 87,
    department: 'Marketing',
    joinDate: '2023-03-20',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Moderator',
    status: 'Active',
    lastLogin: '2024-01-14',
    avatar: 'https://github.com/nextjs.png',
    score: 92,
    department: 'Support',
    joinDate: '2023-02-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-13',
    avatar: 'https://github.com/react.png',
    score: 78,
    department: 'Sales',
    joinDate: '2023-04-05',
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-12',
    avatar: 'https://github.com/vue.png',
    score: 89,
    department: 'Engineering',
    joinDate: '2023-01-20',
  },
];

const sampleProducts = [
  {
    id: '1',
    name: 'MacBook Pro',
    category: 'Electronics',
    price: 2499,
    stock: 15,
    rating: 4.8,
    status: 'In Stock',
    sales: 1250,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'iPhone 15',
    category: 'Electronics',
    price: 999,
    stock: 0,
    rating: 4.9,
    status: 'Out of Stock',
    sales: 2100,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'AirPods Pro',
    category: 'Audio',
    price: 249,
    stock: 45,
    rating: 4.7,
    status: 'In Stock',
    sales: 890,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    name: 'iPad Air',
    category: 'Electronics',
    price: 599,
    stock: 8,
    rating: 4.6,
    status: 'Low Stock',
    sales: 650,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    name: 'Apple Watch',
    category: 'Wearables',
    price: 399,
    stock: 22,
    rating: 4.5,
    status: 'In Stock',
    sales: 420,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop',
  },
];

export function DataTableRoute() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // User columns
  const userColumns: Column[] = [
    {
      key: 'user',
      title: 'User',
      dataIndex: 'name',
      sortable: true,
      filterable: true,
      width: '300px',
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={record.avatar} alt={value} />
            <AvatarFallback>{value.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true,
      filterable: true,
      width: '120px',
      align: 'center',
      render: (value) => (
        <Badge variant={value === 'Admin' ? 'premium' : value === 'Moderator' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      width: '120px',
      align: 'center',
      render: (value) => (
        <Badge variant={value === 'Active' ? 'success' : 'destructive'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      sortable: true,
      filterable: true,
      width: '150px',
    },
    {
      key: 'score',
      title: 'Score',
      dataIndex: 'score',
      sortable: true,
      align: 'right',
      width: '150px',
      render: (value) => (
        <div className="flex items-center justify-end gap-2">
          <div className="w-16 bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      dataIndex: 'lastLogin',
      sortable: true,
      width: '120px',
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '120px',
      align: 'center',
      render: () => (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  // Product columns
  const productColumns: Column[] = [
    {
      key: 'product',
      title: 'Product',
      dataIndex: 'name',
      sortable: true,
      filterable: true,
      width: '300px',
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <img 
            src={record.image} 
            alt={value}
            className="h-10 w-10 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{record.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      title: 'Price',
      dataIndex: 'price',
      sortable: true,
      align: 'right',
      width: '120px',
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      key: 'stock',
      title: 'Stock',
      dataIndex: 'stock',
      sortable: true,
      align: 'right',
      width: '100px',
      render: (value) => (
        <span className={cn(
          "font-medium",
          value === 0 ? "text-destructive" : value < 10 ? "text-warning" : "text-success"
        )}>
          {value}
        </span>
      ),
    },
    {
      key: 'rating',
      title: 'Rating',
      dataIndex: 'rating',
      sortable: true,
      align: 'center',
      width: '120px',
      render: (value) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      filterable: true,
      width: '120px',
      align: 'center',
      render: (value) => (
        <Badge 
          variant={
            value === 'In Stock' ? 'success' : 
            value === 'Out of Stock' ? 'destructive' : 
            'warning'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'sales',
      title: 'Sales',
      dataIndex: 'sales',
      sortable: true,
      align: 'right',
      width: '100px',
      render: (value) => value.toLocaleString(),
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '120px',
      align: 'center',
      render: () => (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Basic DataTable */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Basic DataTable</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">User Management Table</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <DataTable
                data={sampleUsers}
                columns={userColumns}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: selectedUsers,
                  onChange: setSelectedUsers,
                }}
                pagination={{
                  current: 1,
                  pageSize: 10,
                  total: sampleUsers.length,
                  showTotal: true,
                }}
                onRow={(record) => ({
                  onClick: () => console.log('Row clicked:', record),
                })}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">DataTable Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <DataTable
                  data={sampleProducts.slice(0, 3)}
                  columns={productColumns.slice(0, 4)}
                  variant="default"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <DataTable
                  data={sampleProducts.slice(0, 3)}
                  columns={productColumns.slice(0, 4)}
                  variant="premium"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Featured Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <DataTable
                  data={sampleProducts.slice(0, 3)}
                  columns={productColumns.slice(0, 4)}
                  variant="featured"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">DataTable Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Small Size</div>
              <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <DataTable
                  data={sampleUsers.slice(0, 2)}
                  columns={userColumns.slice(0, 3)}
                  size="small"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Large Size</div>
              <Suspense fallback={<div className="h-40 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <DataTable
                  data={sampleUsers.slice(0, 2)}
                  columns={userColumns.slice(0, 3)}
                  size="large"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Advanced Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Featured Table with Filters</div>
            <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <DataTable
                data={sampleProducts}
                columns={productColumns}
                rowSelection={{
                  type: 'checkbox',
                  selectedRowKeys: selectedProducts,
                  onChange: setSelectedProducts,
                }}
                pagination={{
                  current: 1,
                  pageSize: 5,
                  total: sampleProducts.length,
                  showTotal: true,
                  showSizeChanger: true,
                }}
                sticky
                bordered
                onRow={(record) => ({
                  onClick: () => console.log('Product clicked:', record),
                  className: 'cursor-pointer',
                })}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Empty State</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">No Data Available</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <DataTable
                data={[]}
                columns={userColumns.slice(0, 3)}
                emptyText="No users found. Try adjusting your filters or add some users."
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Loading State */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Loading State</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading Data</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <DataTable
                data={[]}
                columns={userColumns.slice(0, 3)}
                loading={true}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
