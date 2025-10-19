import React, { Suspense } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { User, Mail, Globe, Calendar } from 'lucide-react';

export function SelectRoute() {
  return (
    <div className="space-y-8">
      {/* Select Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Select Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="success">
                  <SelectValue placeholder="Valid selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="warning">
                  <SelectValue placeholder="Warning selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="error">
                  <SelectValue placeholder="Error selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="info">
                  <SelectValue placeholder="Info selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="premium">
                  <SelectValue placeholder="Premium selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger variant="featured">
                  <SelectValue placeholder="Featured selection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Select Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Select Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-6 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Select>
                <SelectTrigger size="xs">
                  <SelectValue placeholder="XS Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-8 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Select>
                <SelectTrigger size="sm">
                  <SelectValue placeholder="Small Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger size="md">
                  <SelectValue placeholder="Medium Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-12 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger size="lg">
                  <SelectValue placeholder="Large Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-14 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Select>
                <SelectTrigger size="xl">
                  <SelectValue placeholder="XL Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Select Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Select Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger icon={<User className="h-4 w-4" />}>
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">John Doe</SelectItem>
                  <SelectItem value="user2">Jane Smith</SelectItem>
                  <SelectItem value="user3">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-20 bg-muted animate-pulse rounded"></div><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-3 w-40 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="gmt">GMT</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Choose your preferred timezone</p>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading State</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger loading>
                  <SelectValue placeholder="Loading..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Select>
                <SelectTrigger fullWidth>
                  <SelectValue placeholder="Full width select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
