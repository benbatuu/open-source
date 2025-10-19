import React, { Suspense } from 'react';
import { Badge } from '../ui/badge';
import { X, Star, Heart, Zap, Crown } from 'lucide-react';

export function BadgeRoute() {
  return (
    <div className="space-y-8">
      {/* Badge Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Badge Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge>Default</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Secondary</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="secondary">Secondary</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="destructive">Destructive</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="success">Success</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="warning">Warning</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-6 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="info">Info</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="premium">Premium</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge variant="featured">Featured</Badge>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Badge Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Badge Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-4 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Badge size="xs">XS</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-5 w-14 bg-muted animate-pulse rounded-full"></div>}>
              <Badge size="sm">Small</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge size="md">Medium</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-7 w-18 bg-muted animate-pulse rounded-full"></div>}>
              <Badge size="lg">Large</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-8 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge size="xl">Extra Large</Badge>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Badge Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Badge Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge icon={<Star className="h-3 w-3" />}>Starred</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Count</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge count={5}>Messages</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Dot Badge</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge dot>Notification</Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Removable</div>
            <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Badge removable onRemove={() => console.log('Removed')}>
                Removable
              </Badge>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Animated</div>
            <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Badge animated>Animated</Badge>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
