import { useState } from 'react';
import { List, ListItem } from '../ui/list';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Award,
  TrendingUp,
  Search,
  Filter,
  Download
} from 'lucide-react';

// Sample data for different list types
const userData: ListItem[] = [
  {
    id: '1',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          JD
        </div>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-sm text-muted-foreground">Software Engineer</div>
        </div>
      </div>
    ),
    data: { name: 'John Doe', role: 'Software Engineer', department: 'Engineering' },
    metadata: { status: 'active', lastActive: '2 hours ago' }
  },
  {
    id: '2',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold">
          JS
        </div>
        <div>
          <div className="font-medium">Jane Smith</div>
          <div className="text-sm text-muted-foreground">Product Manager</div>
        </div>
      </div>
    ),
    data: { name: 'Jane Smith', role: 'Product Manager', department: 'Product' },
    metadata: { status: 'active', lastActive: '1 hour ago' }
  },
  {
    id: '3',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold">
          MJ
        </div>
        <div>
          <div className="font-medium">Mike Johnson</div>
          <div className="text-sm text-muted-foreground">Designer</div>
        </div>
      </div>
    ),
    data: { name: 'Mike Johnson', role: 'Designer', department: 'Design' },
    metadata: { status: 'away', lastActive: '3 hours ago' }
  },
  {
    id: '4',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold">
          SW
        </div>
        <div>
          <div className="font-medium">Sarah Wilson</div>
          <div className="text-sm text-muted-foreground">Marketing Lead</div>
        </div>
      </div>
    ),
    data: { name: 'Sarah Wilson', role: 'Marketing Lead', department: 'Marketing' },
    metadata: { status: 'active', lastActive: '30 minutes ago' }
  },
  {
    id: '5',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-semibold">
          AB
        </div>
        <div>
          <div className="font-medium">Alex Brown</div>
          <div className="text-sm text-muted-foreground">Data Analyst</div>
        </div>
      </div>
    ),
    data: { name: 'Alex Brown', role: 'Data Analyst', department: 'Analytics' },
    metadata: { status: 'active', lastActive: '1 hour ago' }
  }
];

const projectData: ListItem[] = [
  {
    id: '1',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Star className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-medium">E-commerce Platform</div>
          <div className="text-sm text-muted-foreground">Next.js, TypeScript, Tailwind</div>
        </div>
      </div>
    ),
    data: { name: 'E-commerce Platform', tech: 'Next.js, TypeScript, Tailwind', priority: 'high' },
    metadata: { status: 'active', progress: 85 }
  },
  {
    id: '2',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
          <Award className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-medium">Mobile App</div>
          <div className="text-sm text-muted-foreground">React Native, Firebase</div>
        </div>
      </div>
    ),
    data: { name: 'Mobile App', tech: 'React Native, Firebase', priority: 'medium' },
    metadata: { status: 'active', progress: 60 }
  },
  {
    id: '3',
    content: (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-medium">Analytics Dashboard</div>
          <div className="text-sm text-muted-foreground">React, D3.js, Python</div>
        </div>
      </div>
    ),
    data: { name: 'Analytics Dashboard', tech: 'React, D3.js, Python', priority: 'low' },
    metadata: { status: 'completed', progress: 100 }
  }
];

const taskData: ListItem[] = [
  {
    id: '1',
    content: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <div>
            <div className="font-medium">Implement user authentication</div>
            <div className="text-sm text-muted-foreground">Due: Tomorrow</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">High</div>
      </div>
    ),
    data: { title: 'Implement user authentication', priority: 'high', status: 'in-progress' },
    metadata: { dueDate: 'Tomorrow', assignee: 'John Doe' }
  },
  {
    id: '2',
    content: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div>
            <div className="font-medium">Design mobile mockups</div>
            <div className="text-sm text-muted-foreground">Due: Next week</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Medium</div>
      </div>
    ),
    data: { title: 'Design mobile mockups', priority: 'medium', status: 'pending' },
    metadata: { dueDate: 'Next week', assignee: 'Jane Smith' }
  },
  {
    id: '3',
    content: (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div>
            <div className="font-medium">Fix critical bug in payment</div>
            <div className="text-sm text-muted-foreground">Due: Today</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Urgent</div>
      </div>
    ),
    data: { title: 'Fix critical bug in payment', priority: 'urgent', status: 'pending' },
    metadata: { dueDate: 'Today', assignee: 'Mike Johnson' }
  }
];

export function ListRoute() {
  const [selectedList, setSelectedList] = useState<string>('users');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const lists = {
    users: {
      items: userData,
      title: 'User Management',
      description: 'Team members and their roles',
      columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'department', label: 'Department', sortable: true },
      ]
    },
    projects: {
      items: projectData,
      title: 'Project Portfolio',
      description: 'Current projects and their status',
      columns: [
        { key: 'name', label: 'Project', sortable: true },
        { key: 'tech', label: 'Technology', sortable: true },
        { key: 'priority', label: 'Priority', sortable: true },
      ]
    },
    tasks: {
      items: taskData,
      title: 'Task Management',
      description: 'Tasks and their priorities',
      columns: [
        { key: 'title', label: 'Task', sortable: true },
        { key: 'priority', label: 'Priority', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
      ]
    }
  };

  const currentList = lists[selectedList as keyof typeof lists];

  const handleItemSelect = (item: ListItem) => {
    console.log('Item selected:', item);
    setSelectedItemId(item.id);
  };

  const handleSort = (column: string, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const filterItems = (item: ListItem, query: string): boolean => {
    const searchText = query.toLowerCase();
    return (
      item.data?.name?.toLowerCase().includes(searchText) ||
      item.data?.role?.toLowerCase().includes(searchText) ||
      item.data?.department?.toLowerCase().includes(searchText) ||
      item.data?.title?.toLowerCase().includes(searchText) ||
      item.data?.tech?.toLowerCase().includes(searchText) ||
      false
    );
  };

  return (
    <div className="space-y-8">
      {/* List Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">List Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">User List</div>
            <List
              items={userData.slice(0, 3)}
              onItemSelect={handleItemSelect}
              selectedItemId={selectedItemId}
              variant="card"
              size="md"
              striped={true}
            />
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Project List</div>
            <List
              items={projectData}
              onItemSelect={handleItemSelect}
              selectedItemId={selectedItemId}
              variant="premium"
              size="md"
              striped={true}
            />
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Task List</div>
            <List
              items={taskData}
              onItemSelect={handleItemSelect}
              selectedItemId={selectedItemId}
              variant="featured"
              size="md"
              striped={true}
            />
          </div>
        </div>
      </div>

      {/* List Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">List Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <List
                items={userData.slice(0, 2)}
                variant="default"
                size="sm"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <List
                items={userData.slice(0, 2)}
                variant="card"
                size="sm"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <List
                items={userData.slice(0, 2)}
                variant="glass"
                size="sm"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <List
                items={userData.slice(0, 2)}
                variant="premium"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">List Explorer</div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">List:</label>
                <select 
                  value={selectedList} 
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="users">Users</option>
                  <option value="projects">Projects</option>
                  <option value="tasks">Tasks</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedItemId(undefined)}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            </div>

            {/* Main List */}
            <List
              items={currentList.items}
              columns={currentList.columns}
              onItemSelect={handleItemSelect}
              selectedItemId={selectedItemId}
              sortable={true}
              onSort={handleSort}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              searchable={true}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterItems={filterItems}
              variant="premium"
              size="md"
              striped={true}
            />
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">List Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Team Members
                </CardTitle>
                <CardDescription>Active team members</CardDescription>
              </CardHeader>
              <CardContent>
                <List
                  items={userData.slice(0, 3)}
                  variant="default"
                  size="sm"
                  striped={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-500" />
                  Active Projects
                </CardTitle>
                <CardDescription>Current project status</CardDescription>
              </CardHeader>
              <CardContent>
                <List
                  items={projectData}
                  variant="default"
                  size="sm"
                  striped={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  Task Queue
                </CardTitle>
                <CardDescription>Pending and active tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <List
                  items={taskData}
                  variant="default"
                  size="sm"
                  striped={true}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-orange-500" />
                  Search Results
                </CardTitle>
                <CardDescription>Filtered list view</CardDescription>
              </CardHeader>
              <CardContent>
                <List
                  items={userData.slice(0, 2)}
                  searchable={true}
                  variant="default"
                  size="sm"
                  striped={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* List States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">List States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <List
                items={[]}
                loading={true}
                variant="card"
                size="md"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <List
                items={[]}
                error="Failed to load list data"
                variant="card"
                size="md"
              />
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <List
                items={[]}
                emptyText="No items available"
                variant="card"
                size="md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
