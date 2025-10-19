import React, { Suspense } from 'react';
import { Progress } from '../ui/progress';
import { CheckCircle, AlertTriangle, Info, Upload, Download } from 'lucide-react';

export function ProgressRoute() {
  return (
    <div className="space-y-8">
      {/* Progress Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={75} variant="default" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={85} variant="success" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={65} variant="warning" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={45} variant="destructive" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={55} variant="info" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={95} variant="premium" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={80} variant="featured" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glass</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={70} variant="glass" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Progress Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-2 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={60} size="sm" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={75} size="md" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-4 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={90} size="lg" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-5 w-full bg-muted animate-pulse rounded-full"></div>}>
              <Progress value={85} size="xl" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Progress with Labels and Values */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress with Labels and Values</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <Progress value={80} label="Project Progress" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Value</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-16 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={90} showValue />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label and Value</div>
            <Suspense fallback={<div className="space-y-2"><div className="flex justify-between items-center"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-4 w-16 bg-muted animate-pulse rounded"></div></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <Progress value={95} label="Upload Complete" showValue />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Storage Usage</div>
            <Suspense fallback={<div className="space-y-2"><div className="flex justify-between items-center"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-4 w-16 bg-muted animate-pulse rounded"></div></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <Progress value={45} variant="warning" label="Storage Usage" showValue />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Progress Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Custom Icon</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={80} icon={<Upload className="h-4 w-4" />} label="Upload Progress" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Auto Icon</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={75} autoIcon label="Auto Icon Progress" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Shimmer Effect</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={65} showShimmer label="Shimmer Progress" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Glow Effect</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={90} showGlow label="Glow Progress" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Full Width</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div></div>}>
              <Progress value={70} fullWidth label="Full Width Progress" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Progress Examples */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress Examples</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">File Upload</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <div className="space-y-4">
                <Progress value={85} variant="success" icon={<Upload className="h-4 w-4" />} label="document.pdf" showValue />
                <Progress value={45} variant="info" icon={<Download className="h-4 w-4" />} label="image.jpg" showValue />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">System Status</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <div className="space-y-4">
                <Progress value={95} variant="success" autoIcon label="CPU Usage" showValue />
                <Progress value={60} variant="warning" autoIcon label="Memory Usage" showValue />
                <Progress value={25} variant="info" autoIcon label="Disk Usage" showValue />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Task Completion</div>
            <Suspense fallback={<div className="space-y-4"><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div><div className="h-4 w-32 bg-muted animate-pulse rounded"></div><div className="h-3 w-full bg-muted animate-pulse rounded-full"></div></div>}>
              <div className="space-y-4">
                <Progress value={100} variant="success" showShimmer label="Project Setup" showValue />
                <Progress value={75} variant="premium" showGlow label="Development" showValue />
                <Progress value={30} variant="info" label="Testing" showValue />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
