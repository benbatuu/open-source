import React, { Suspense } from 'react';
import { Button } from '../ui/button';
import { Copy, Eye, Code, Download, Component, Settings } from 'lucide-react';

export function ButtonRoute() {
  return (
    <div className="space-y-8">
      {/* Button Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Button Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Primary</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="primary">Primary</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Secondary</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="secondary">Secondary</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Outline</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="outline">Outline</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Ghost</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="ghost">Ghost</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Link</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="link">Link</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="destructive">Destructive</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button variant="success">Success</Button>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Button Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-md"></div>}>
              <Button size="xs">XS Button</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-8 w-20 bg-muted animate-pulse rounded-md"></div>}>
              <Button size="sm">SM Button</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
              <Button size="md">MD Button</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-12 w-24 bg-muted animate-pulse rounded-xl"></div>}>
              <Button size="lg">LG Button</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-14 w-28 bg-muted animate-pulse rounded-2xl"></div>}>
              <Button size="xl">XL Button</Button>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Button Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Button Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon (Left)</div>
            <Suspense fallback={<div className="h-10 w-32 bg-muted animate-pulse rounded-lg"></div>}>
              <Button icon={<Download className="h-4 w-4" />} iconPosition="left">
                Download
              </Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon (Right)</div>
            <Suspense fallback={<div className="h-10 w-32 bg-muted animate-pulse rounded-lg"></div>}>
              <Button icon={<Copy className="h-4 w-4" />} iconPosition="right">
                Copy
              </Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading State</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button loading>Loading...</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-10 w-24 bg-muted animate-pulse rounded-lg"></div>}>
              <Button disabled>Disabled</Button>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Button fullWidth>Full Width Button</Button>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
