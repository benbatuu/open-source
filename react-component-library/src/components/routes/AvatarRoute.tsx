import React, { Suspense } from 'react';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarWithBadge } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Crown, Star, Shield, User } from 'lucide-react';

export function AvatarRoute() {
  return (
    <div className="space-y-8">
      {/* Avatar Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Small</div>
            <Suspense fallback={<div className="h-6 w-6 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="xs">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-8 w-8 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="sm">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="md">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-16 w-16 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="xl">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">2X Large</div>
            <Suspense fallback={<div className="h-20 w-20 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="2xl">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">3X Large</div>
            <Suspense fallback={<div className="h-24 w-24 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="3xl">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Avatar Shapes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Shapes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Circle</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" shape="circle">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Square</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-lg"></div>}>
              <Avatar size="lg" shape="square">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Hexagon</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-lg"></div>}>
              <Avatar size="lg" shape="hexagon">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Avatar Status */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Status</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Online</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" status="online">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Offline</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" status="offline">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Busy</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" status="busy">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Away</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" status="away">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Avatar Fallback Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Fallback Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Success</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="success" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Warning</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="warning" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Destructive</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="destructive" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Info</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="info" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Premium</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="premium" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Featured</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="featured" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Admin</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg">
                <AvatarFallback variant="admin" showIcon>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Avatar Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Interactive</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" interactive>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Bordered</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <Avatar size="lg" bordered>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Avatar Group</div>
            <Suspense fallback={<div className="flex -space-x-2"><div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div><div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div><div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div></div>}>
              <AvatarGroup max={3}>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User 1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face" alt="User 2" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=56&h=56&fit=crop&crop=face" alt="User 3" />
                  <AvatarFallback>CD</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=56&h=56&fit=crop&crop=face" alt="User 4" />
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Avatar with Badge</div>
            <Suspense fallback={<div className="h-12 w-12 bg-muted animate-pulse rounded-full"></div>}>
              <AvatarWithBadge
                avatar={
                  <Avatar size="lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                }
                badge={<Badge variant="destructive" size="xs">3</Badge>}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
