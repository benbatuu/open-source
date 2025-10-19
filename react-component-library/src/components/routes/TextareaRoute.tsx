import React, { Suspense } from 'react';
import { Textarea } from '../ui/textarea';
import { MessageSquare, FileText, Edit3 } from 'lucide-react';

export function TextareaRoute() {
  return (
    <div className="space-y-8">
      {/* Textarea Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Textarea Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea placeholder="Enter your message..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="success" placeholder="Valid textarea" success="Textarea is valid" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="warning" placeholder="Warning textarea" warning="Please check this textarea" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Error</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="error" placeholder="Error textarea" error="This field is required" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="info" placeholder="Info textarea" info="Additional information" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="premium" placeholder="Premium textarea" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea variant="featured" placeholder="Featured textarea" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Textarea Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Textarea Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Textarea size="xs" placeholder="Extra small textarea" rows={2} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-20 w-full bg-muted animate-pulse rounded-md"></div>}>
              <Textarea size="sm" placeholder="Small textarea" rows={3} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea size="md" placeholder="Medium textarea" rows={4} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea size="lg" placeholder="Large textarea" rows={5} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-40 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Textarea size="xl" placeholder="Extra large textarea" rows={6} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Textarea Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Textarea Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Icon</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea icon={<MessageSquare className="h-4 w-4" />} placeholder="Enter your message..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Label</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-4 w-24 bg-muted animate-pulse rounded"></div><div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div></div>}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Enter description..." />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-3 w-48 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Textarea placeholder="Enter your feedback..." />
                <p className="text-xs text-muted-foreground">Please provide detailed feedback about your experience</p>
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Clearable</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea clearable placeholder="Type and clear..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Character Count</div>
            <Suspense fallback={<div className="space-y-2"><div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div><div className="h-3 w-20 bg-muted animate-pulse rounded"></div></div>}>
              <div className="space-y-2">
                <Textarea maxLength={200} showCharacterCount placeholder="Type something..." />
              </div>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Loading State</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea loading placeholder="Loading..." />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Disabled</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea disabled placeholder="Disabled textarea" />
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Resizable</div>
            <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Textarea placeholder="Resizable textarea" className="resize-y" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
