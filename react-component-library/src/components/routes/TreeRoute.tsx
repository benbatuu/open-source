import { Suspense, useState } from 'react';
import { Tree, TreeNode } from '../ui/tree';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { 
  Folder,
  Plus,
  Minus,
  Settings,
  Users,
  Code,
  RefreshCw
} from 'lucide-react';

// Sample tree data
const fileSystemData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '1-1',
        label: 'Projects',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: '1-1-1',
            label: 'Web App',
            type: 'folder',
            children: [
              {
                id: '1-1-1-1',
                label: 'index.html',
                type: 'file',
                metadata: { size: '2.1 KB', modified: '2024-01-15' }
              },
              {
                id: '1-1-1-2',
                label: 'style.css',
                type: 'file',
                metadata: { size: '1.5 KB', modified: '2024-01-14' }
              },
              {
                id: '1-1-1-3',
                label: 'script.js',
                type: 'file',
                metadata: { size: '3.2 KB', modified: '2024-01-16' }
              }
            ]
          },
          {
            id: '1-1-2',
            label: 'Mobile App',
            type: 'folder',
            children: [
              {
                id: '1-1-2-1',
                label: 'App.tsx',
                type: 'file',
                metadata: { size: '4.8 KB', modified: '2024-01-12' }
              },
              {
                id: '1-1-2-2',
                label: 'components',
                type: 'folder',
                children: [
                  {
                    id: '1-1-2-2-1',
                    label: 'Button.tsx',
                    type: 'file',
                    metadata: { size: '1.2 KB', modified: '2024-01-10' }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: '1-2',
        label: 'Images',
        type: 'folder',
        children: [
          {
            id: '1-2-1',
            label: 'profile.jpg',
            type: 'file',
            metadata: { size: '245 KB', modified: '2024-01-08' }
          },
          {
            id: '1-2-2',
            label: 'banner.png',
            type: 'file',
            metadata: { size: '1.2 MB', modified: '2024-01-05' }
          }
        ]
      },
      {
        id: '1-3',
        label: 'report.pdf',
        type: 'file',
        metadata: { size: '2.8 MB', modified: '2024-01-18' }
      }
    ]
  },
  {
    id: '2',
    label: 'Downloads',
    type: 'folder',
    children: [
      {
        id: '2-1',
        label: 'software.zip',
        type: 'file',
        metadata: { size: '15.2 MB', modified: '2024-01-20' }
      },
      {
        id: '2-2',
        label: 'document.docx',
        type: 'file',
        metadata: { size: '156 KB', modified: '2024-01-19' }
      }
    ]
  },
  {
    id: '3',
    label: 'Desktop',
    type: 'folder',
    children: [
      {
        id: '3-1',
        label: 'shortcut.lnk',
        type: 'file',
        metadata: { size: '1 KB', modified: '2024-01-17' }
      }
    ]
  }
];

const organizationData: TreeNode[] = [
  {
    id: 'org-1',
    label: 'Engineering',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: 'org-1-1',
        label: 'Frontend Team',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: 'org-1-1-1',
            label: 'John Doe',
            type: 'file',
            metadata: { role: 'Senior Developer', status: 'active' }
          },
          {
            id: 'org-1-1-2',
            label: 'Jane Smith',
            type: 'file',
            metadata: { role: 'UI/UX Designer', status: 'active' }
          }
        ]
      },
      {
        id: 'org-1-2',
        label: 'Backend Team',
        type: 'folder',
        children: [
          {
            id: 'org-1-2-1',
            label: 'Mike Johnson',
            type: 'file',
            metadata: { role: 'Lead Developer', status: 'active' }
          },
          {
            id: 'org-1-2-2',
            label: 'Sarah Wilson',
            type: 'file',
            metadata: { role: 'DevOps Engineer', status: 'on-leave' }
          }
        ]
      }
    ]
  },
  {
    id: 'org-2',
    label: 'Marketing',
    type: 'folder',
    children: [
      {
        id: 'org-2-1',
        label: 'Content Team',
        type: 'folder',
        children: [
          {
            id: 'org-2-1-1',
            label: 'Alex Brown',
            type: 'file',
            metadata: { role: 'Content Writer', status: 'active' }
          }
        ]
      }
    ]
  }
];

const projectData: TreeNode[] = [
  {
    id: 'proj-1',
    label: 'Project Alpha',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: 'proj-1-1',
        label: 'Planning',
        type: 'folder',
        children: [
          {
            id: 'proj-1-1-1',
            label: 'requirements.md',
            type: 'file',
            metadata: { status: 'completed' }
          },
          {
            id: 'proj-1-1-2',
            label: 'timeline.xlsx',
            type: 'file',
            metadata: { status: 'in-progress' }
          }
        ]
      },
      {
        id: 'proj-1-2',
        label: 'Development',
        type: 'folder',
        children: [
          {
            id: 'proj-1-2-1',
            label: 'src',
            type: 'folder',
            children: [
              {
                id: 'proj-1-2-1-1',
                label: 'components',
                type: 'folder',
                children: [
                  {
                    id: 'proj-1-2-1-1-1',
                    label: 'Header.tsx',
                    type: 'file',
                    metadata: { status: 'completed' }
                  },
                  {
                    id: 'proj-1-2-1-1-2',
                    label: 'Footer.tsx',
                    type: 'file',
                    metadata: { status: 'completed' }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export function TreeRoute() {
  const [selectedTree, setSelectedTree] = useState<string>('filesystem');
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [expandedNodeIds, setExpandedNodeIds] = useState<string[]>(['1', '1-1', 'org-1', 'org-1-1', 'proj-1']);
  const [searchQuery, setSearchQuery] = useState('');

  const trees = {
    filesystem: {
      data: fileSystemData,
      title: 'File System',
      description: 'File and folder structure',
      icon: <Folder className="h-5 w-5" />,
    },
    organization: {
      data: organizationData,
      title: 'Organization',
      description: 'Company structure and teams',
      icon: <Users className="h-5 w-5" />,
    },
    project: {
      data: projectData,
      title: 'Project Structure',
      description: 'Project files and directories',
      icon: <Code className="h-5 w-5" />,
    },
  };

  const currentTree = trees[selectedTree as keyof typeof trees];

  const handleNodeSelect = (node: TreeNode) => {
    console.log('Node selected:', node);
    setSelectedNodeId(node.id);
  };

  const handleNodeToggle = (node: TreeNode) => {
    console.log('Node toggled:', node);
  };

  const handleNodeExpand = (node: TreeNode) => {
    console.log('Node expanded:', node);
    setExpandedNodeIds(prev => [...prev, node.id]);
  };

  const handleNodeCollapse = (node: TreeNode) => {
    console.log('Node collapsed:', node);
    setExpandedNodeIds(prev => prev.filter(id => id !== node.id));
  };

  const filterNodes = (node: TreeNode, query: string): boolean => {
    const matchesQuery = node.label.toLowerCase().includes(query.toLowerCase());
    const hasMatchingChildren = node.children?.some((child: TreeNode) => filterNodes(child, query)) || false;
    return matchesQuery || hasMatchingChildren;
  };

  return (
    <div className="space-y-8">
      {/* Tree Types */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tree Types</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">File System Tree</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Tree
                data={fileSystemData}
                onNodeSelect={handleNodeSelect}
                onNodeToggle={handleNodeToggle}
                onNodeExpand={handleNodeExpand}
                onNodeCollapse={handleNodeCollapse}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                showIcons={true}
                showConnectors={true}
                variant="card"
                size="md"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Organization Tree</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Tree
                data={organizationData}
                onNodeSelect={handleNodeSelect}
                onNodeToggle={handleNodeToggle}
                onNodeExpand={handleNodeExpand}
                onNodeCollapse={handleNodeCollapse}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                showIcons={true}
                showConnectors={true}
                variant="premium"
                size="md"
              />
            </Suspense>
          </div>

          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Project Structure Tree</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Tree
                data={projectData}
                onNodeSelect={handleNodeSelect}
                onNodeToggle={handleNodeToggle}
                onNodeExpand={handleNodeExpand}
                onNodeCollapse={handleNodeCollapse}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                showIcons={true}
                showConnectors={true}
                variant="featured"
                size="md"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Tree Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tree Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="default"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Card Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="card"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Glass Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="glass"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Variant</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="premium"
                  size="sm"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tree Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Small Size</div>
              <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="card"
                  size="sm"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Medium Size</div>
              <Suspense fallback={<div className="h-40 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Large Size</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={fileSystemData.slice(0, 1)}
                  variant="card"
                  size="lg"
                />
              </Suspense>
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
            <div className="text-sm font-medium text-muted-foreground">Tree Explorer</div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Tree:</label>
                <select 
                  value={selectedTree} 
                  onChange={(e) => setSelectedTree(e.target.value)}
                  className="px-3 py-1 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="filesystem">File System</option>
                  <option value="organization">Organization</option>
                  <option value="project">Project Structure</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedNodeIds([])}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Collapse All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setExpandedNodeIds(['1', '1-1', 'org-1', 'org-1-1', 'proj-1'])}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Expand All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedNodeId(undefined)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Selection
                </Button>
              </div>
            </div>

            {/* Main Tree */}
            <Suspense fallback={<div className="h-96 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Tree
                data={currentTree.data}
                onNodeSelect={handleNodeSelect}
                onNodeToggle={handleNodeToggle}
                onNodeExpand={handleNodeExpand}
                onNodeCollapse={handleNodeCollapse}
                selectedNodeId={selectedNodeId}
                expandedNodeIds={expandedNodeIds}
                showIcons={true}
                showConnectors={true}
                searchable={true}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterNodes={filterNodes}
                variant="premium"
                size="md"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tree Dashboard</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-blue-500" />
                  File Explorer
                </CardTitle>
                <CardDescription>Browse files and folders</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Tree
                    data={fileSystemData.slice(0, 1)}
                    variant="default"
                    size="sm"
                    showIcons={true}
                    showConnectors={true}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Team Structure
                </CardTitle>
                <CardDescription>Organization hierarchy</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Tree
                    data={organizationData.slice(0, 1)}
                    variant="default"
                    size="sm"
                    showIcons={true}
                    showConnectors={true}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-500" />
                  Project Files
                </CardTitle>
                <CardDescription>Project structure and files</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Tree
                    data={projectData}
                    variant="default"
                    size="sm"
                    showIcons={true}
                    showConnectors={true}
                  />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-500" />
                  Configuration
                </CardTitle>
                <CardDescription>Settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-lg"></div>}>
                  <Tree
                    data={[
                      {
                        id: 'config-1',
                        label: 'Settings',
                        type: 'folder',
                        children: [
                          {
                            id: 'config-1-1',
                            label: 'General',
                            type: 'file',
                            metadata: { status: 'active' }
                          },
                          {
                            id: 'config-1-2',
                            label: 'Security',
                            type: 'file',
                            metadata: { status: 'active' }
                          }
                        ]
                      }
                    ]}
                    variant="default"
                    size="sm"
                    showIcons={true}
                    showConnectors={true}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tree States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tree States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Loading State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={[]}
                  loading={true}
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Error State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={[]}
                  error="Failed to load tree data"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Empty State</div>
              <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div>}>
                <Tree
                  data={[]}
                  emptyText="No tree items available"
                  variant="card"
                  size="md"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
