import React, { Suspense } from 'react';
import { Input } from '../ui/input';
import { User, Mail, Lock, Search, Eye, EyeOff } from 'lucide-react';

export function InputRoute() {
  return (
    <div className="space-y-8">
      {/* Input Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input placeholder="Enter text..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="success" placeholder="Valid input" success="Input is valid" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="warning" placeholder="Warning input" warning="Please check this input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="error" placeholder="Error input" error="This field is required" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="info" placeholder="Info input" info="Additional information" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="premium" placeholder="Premium input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input variant="featured" placeholder="Featured input" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Input Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-6 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Input size="xs" placeholder="Extra small input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-8 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Input size="sm" placeholder="Small input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input size="md" placeholder="Medium input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-12 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input size="lg" placeholder="Large input" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-14 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Input size="xl" placeholder="Extra large input" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Input Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon (Left)</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input icon={<User className="h-4 w-4" />} iconPosition="left" placeholder="Enter your name" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon (Right)</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input icon={<Search className="h-4 w-4" />} iconPosition="right" placeholder="Search..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-20 bg-muted animate-pulse rounded"></div><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-3 w-40 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Input placeholder="Enter your username" />
                <p className="text-xs text-muted-foreground">Username must be at least 3 characters</p>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Clearable</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input clearable placeholder="Type and clear..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Password Toggle</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input type="password" showPasswordToggle placeholder="Enter password" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Addons</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input leftAddon="$" rightAddon="USD" placeholder="0.00" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Character Count</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-3 w-20 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Input maxLength={50} showCharacterCount placeholder="Type something..." />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading State</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input loading placeholder="Loading..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Input disabled placeholder="Disabled input" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
