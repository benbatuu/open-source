import React, { Suspense } from 'react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export function AlertRoute() {
  return (
    <div className="space-y-8">
      {/* Alert Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Alert Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert>
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert message.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="destructive">
                <AlertTitle>Error Alert</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="success">
                <AlertTitle>Success Alert</AlertTitle>
                <AlertDescription>Your action was completed successfully.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="warning">
                <AlertTitle>Warning Alert</AlertTitle>
                <AlertDescription>Please check your input before proceeding.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="info">
                <AlertTitle>Info Alert</AlertTitle>
                <AlertDescription>Here's some useful information for you.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="premium">
                <AlertTitle>Premium Alert</AlertTitle>
                <AlertDescription>Unlock premium features with our pro plan.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="featured">
                <AlertTitle>Featured Alert</AlertTitle>
                <AlertDescription>Check out our latest featured content.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glass</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert variant="glass">
                <AlertTitle>Glass Alert</AlertTitle>
                <AlertDescription>Modern glass morphism design alert.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Alert Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Alert Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-12 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert size="sm">
                <AlertTitle className="text-sm">Small Alert</AlertTitle>
                <AlertDescription className="text-xs">Compact alert message.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert size="md">
                <AlertTitle>Medium Alert</AlertTitle>
                <AlertDescription>Standard sized alert message.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-20 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert size="lg">
                <AlertTitle className="text-lg">Large Alert</AlertTitle>
                <AlertDescription className="text-base">Large alert message with more space.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert size="xl">
                <AlertTitle className="text-xl">Extra Large Alert</AlertTitle>
                <AlertDescription className="text-lg">Extra large alert message with maximum space.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Alert Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Alert Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Dismissible</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert dismissible onDismiss={() => console.log('Dismissed')}>
                <AlertTitle>Dismissible Alert</AlertTitle>
                <AlertDescription>This alert can be dismissed by clicking the X button.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Custom Icon</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert icon={<CheckCircle className="h-4 w-4" />}>
                <AlertTitle>Custom Icon Alert</AlertTitle>
                <AlertDescription>This alert has a custom check circle icon.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Auto Icon</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert autoIcon>
                <AlertTitle>Auto Icon Alert</AlertTitle>
                <AlertDescription>The icon is automatically determined based on the variant.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Animated</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert animated>
                <AlertTitle>Animated Alert</AlertTitle>
                <AlertDescription>This alert has smooth animations.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glowing</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert glowing>
                <AlertTitle>Glowing Alert</AlertTitle>
                <AlertDescription>This alert has a glowing effect.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Shimmer Effect</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert showShimmer>
                <AlertTitle>Shimmer Alert</AlertTitle>
                <AlertDescription>This alert has a shimmer animation effect.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Alert fullWidth>
                <AlertTitle>Full Width Alert</AlertTitle>
                <AlertDescription>This alert takes up the full width of its container.</AlertDescription>
              </Alert>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Alert Examples */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Alert Examples</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Form Validation</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <div className="space-y-2">
                <Alert variant="destructive">
                  <AlertTitle>Validation Error</AlertTitle>
                  <AlertDescription>Please fix the errors below before submitting the form.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your form has been submitted successfully!</AlertDescription>
                </Alert>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">System Notifications</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-16 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <div className="space-y-2">
                <Alert variant="info">
                  <AlertTitle>System Maintenance</AlertTitle>
                  <AlertDescription>Scheduled maintenance will occur tonight from 2 AM to 4 AM EST.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Storage Warning</AlertTitle>
                  <AlertDescription>You're using 85% of your storage quota. Consider upgrading your plan.</AlertDescription>
                </Alert>
                <Alert variant="premium">
                  <AlertTitle>New Feature Available</AlertTitle>
                  <AlertDescription>Check out our new AI-powered analytics dashboard!</AlertDescription>
                </Alert>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
