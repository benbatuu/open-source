import React, { Suspense } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Check, Minus, Star, Heart } from 'lucide-react';

export function CheckboxRoute() {
  return (
    <div className="space-y-8">
      {/* Checkbox Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Checkbox Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox>Default checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="success">Success checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="warning">Warning checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="error">Error checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="info">Info checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="premium">Premium checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox variant="featured">Featured checkbox</Checkbox>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Checkbox Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Checkbox Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-3 w-3 bg-muted animate-pulse rounded"></div>}>
              <Checkbox size="xs">Extra small checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox size="sm">Small checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-5 w-5 bg-muted animate-pulse rounded"></div>}>
              <Checkbox size="md">Medium checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-6 w-6 bg-muted animate-pulse rounded"></div>}>
              <Checkbox size="lg">Large checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-7 w-7 bg-muted animate-pulse rounded"></div>}>
              <Checkbox size="xl">Extra large checkbox</Checkbox>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Checkbox States */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Checkbox States</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Unchecked</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox>Unchecked</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Checked</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox defaultChecked>Checked</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Indeterminate</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox indeterminate>Indeterminate</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox disabled>Disabled</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox loading>Loading</Checkbox>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Checkbox Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Checkbox Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Custom Icon</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox icon={<Star className="h-3 w-3" />}>Star checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm font-medium">Accept terms and conditions</label>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="space-y-1"><div className="h-4 w-40 bg-muted animate-pulse rounded"></div><div className="h-3 w-48 bg-muted animate-pulse rounded"></div></div></div>}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <label htmlFor="newsletter" className="text-sm font-medium">Subscribe to newsletter</label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">Get updates about new features and releases</p>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Animated</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox animated>Animated checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glowing</div>
            <Suspense fallback={<div className="h-4 w-4 bg-muted animate-pulse rounded"></div>}>
              <Checkbox glowing>Glowing checkbox</Checkbox>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="h-4 w-full bg-muted animate-pulse rounded"></div>}>
              <Checkbox fullWidth>Full width checkbox</Checkbox>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Checkbox Groups */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Checkbox Groups</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Basic Group</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="h-4 w-4 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Checkbox>Option 1</Checkbox>
                <Checkbox>Option 2</Checkbox>
                <Checkbox>Option 3</Checkbox>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Mixed States</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="h-4 w-4 bg-muted animate-pulse rounded"></div><div className="h-4 w-4 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Checkbox defaultChecked>Selected option</Checkbox>
                <Checkbox indeterminate>Partial selection</Checkbox>
                <Checkbox>Unselected option</Checkbox>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
