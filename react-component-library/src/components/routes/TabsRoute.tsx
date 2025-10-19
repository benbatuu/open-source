import React, { Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Home, User, Settings, Mail, Bell, Heart } from 'lucide-react';

export function TabsRoute() {
  return (
    <div className="space-y-8">
      {/* Tabs Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 1</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Outlined</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList variant="outlined">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Outlined tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Filled</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList variant="filled">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Filled tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList variant="premium">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Premium tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList variant="featured">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Featured tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glass</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList variant="glass">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Glass tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Tabs Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-8 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList size="sm">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Small tabs content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList size="md">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Medium tabs content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-12 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList size="lg">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Large tabs content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-14 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList size="xl">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Extra large tabs content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Tabs Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icons</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="home" className="w-full">
                <TabsList>
                  <TabsTrigger value="home" icon={<Home className="h-4 w-4" />}>Home</TabsTrigger>
                  <TabsTrigger value="profile" icon={<User className="h-4 w-4" />}>Profile</TabsTrigger>
                  <TabsTrigger value="settings" icon={<Settings className="h-4 w-4" />}>Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="home">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Home tab with icon</p>
                  </div>
                </TabsContent>
                <TabsContent value="profile">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Profile tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Settings tab content</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Badges</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="inbox" className="w-full">
                <TabsList>
                  <TabsTrigger value="inbox" badge={<Badge variant="destructive" size="xs">3</Badge>}>Inbox</TabsTrigger>
                  <TabsTrigger value="sent" badge={<Badge variant="secondary" size="xs">12</Badge>}>Sent</TabsTrigger>
                  <TabsTrigger value="drafts" badge={<Badge variant="warning" size="xs">5</Badge>}>Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="inbox">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Inbox tab with badge</p>
                  </div>
                </TabsContent>
                <TabsContent value="sent">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Sent tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="drafts">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Drafts tab content</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Animated</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList>
                  <TabsTrigger value="tab1" animated>Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2" animated>Tab 2</TabsTrigger>
                  <TabsTrigger value="tab3" animated>Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" animated>
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Animated tab content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2" animated>
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3" animated>
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Vertical Orientation</div>
            <Suspense fallback={<div className="flex gap-4"><div className="h-48 w-32 bg-muted animate-pulse rounded-lg"></div><div className="h-48 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full" orientation="vertical">
                <div className="flex gap-4">
                  <TabsList orientation="vertical">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                  </TabsList>
                  <div className="flex-1">
                    <TabsContent value="tab1">
                      <div className="p-4 border border-border/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Vertical tab content</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <div className="p-4 border border-border/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <div className="p-4 border border-border/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                      </div>
                    </TabsContent>
                  </div>
                </div>
              </Tabs>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Scrollable with Arrows</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList showArrows scrollable>
                  <TabsTrigger value="tab1">Very Long Tab Name 1</TabsTrigger>
                  <TabsTrigger value="tab2">Very Long Tab Name 2</TabsTrigger>
                  <TabsTrigger value="tab3">Very Long Tab Name 3</TabsTrigger>
                  <TabsTrigger value="tab4">Very Long Tab Name 4</TabsTrigger>
                  <TabsTrigger value="tab5">Very Long Tab Name 5</TabsTrigger>
                  <TabsTrigger value="tab6">Very Long Tab Name 6</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Scrollable tabs content</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 2</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab3">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 3</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab4">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 4</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab5">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 5</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab6">
                  <div className="p-4 border border-border/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Content for Tab 6</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
