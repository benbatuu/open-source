import React, { Suspense } from 'react';
import { Switch } from '../ui/switch';
import { Check, X, Star, Heart } from 'lucide-react';

export function SwitchRoute() {
  return (
    <div className="space-y-8">
      {/* Switch Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch>Default switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="success">Success switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="warning">Warning switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="error">Error switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="info">Info switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="premium">Premium switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="featured">Featured switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">iOS 26</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch variant="ios26">iOS 26 style</Switch>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Switch Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-4 w-8 bg-muted animate-pulse rounded-full"></div>}>
              <Switch size="xs">Extra small switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-5 w-9 bg-muted animate-pulse rounded-full"></div>}>
              <Switch size="sm">Small switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch size="md">Medium switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-7 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Switch size="lg">Large switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-8 w-14 bg-muted animate-pulse rounded-full"></div>}>
              <Switch size="xl">Extra large switch</Switch>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Switch States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Off</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch>Off</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">On</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch defaultChecked>On</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch disabled>Disabled</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch loading>Loading</Switch>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Switch Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Custom Icon</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch icon={<Star className="h-3 w-3" />}>Star switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="flex items-center space-x-2"><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <label htmlFor="notifications" className="text-sm font-medium">Enable notifications</label>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
            <Suspense fallback={<div className="space-y-2"><div className="flex items-center space-x-2"><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div><div className="h-4 w-40 bg-muted animate-pulse rounded"></div></div><div className="h-3 w-48 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <label htmlFor="dark-mode" className="text-sm font-medium">Dark mode</label>
                </div>
                <p className="text-xs text-muted-foreground ml-13">Switch between light and dark themes</p>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Show Icons</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch showIcons>Show status icons</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Animated</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch animated>Animated switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glowing</div>
            <Suspense fallback={<div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div>}>
              <Switch glowing>Glowing switch</Switch>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="h-6 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Switch fullWidth>Full width switch</Switch>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Switch Groups */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Groups</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Settings Group</div>
            <Suspense fallback={<div className="space-y-3"><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div></div>}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Push notifications</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SMS notifications</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Mixed Variants</div>
            <Suspense fallback={<div className="space-y-3"><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div><div className="flex items-center justify-between"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-6 w-11 bg-muted animate-pulse rounded-full"></div></div></div>}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success switch</span>
                  <Switch variant="success" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Warning switch</span>
                  <Switch variant="warning" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">iOS 26 switch</span>
                  <Switch variant="ios26" defaultChecked />
                </div>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
