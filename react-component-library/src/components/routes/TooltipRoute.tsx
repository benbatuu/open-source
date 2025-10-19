import React, { Suspense } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { HelpCircle, Info, AlertTriangle, CheckCircle, Star, Heart, Share, Download, Settings, User, Mail, Phone } from 'lucide-react';

export function TooltipRoute() {
  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Tooltip Variants */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tooltip Variants</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Default Tooltips</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a default tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Secondary</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Secondary button tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="destructive">Destructive</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This action cannot be undone</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Colored Tooltips</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Success</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="success">
                    <p>Operation completed successfully!</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Error</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="error">
                    <p>Something went wrong</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Warning</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="warning">
                    <p>Please review your input</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Info</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="info">
                    <p>Additional information available</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Premium Tooltips</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Premium</Button>
                  </TooltipTrigger>
                  <TooltipContent variant="premium">
                    <p>Premium feature available</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="premium">Featured</Badge>
                  </TooltipTrigger>
                  <TooltipContent variant="premium">
                    <p>This is a featured item</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip Positions */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tooltip Positions</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">All Directions</div>
              <div className="flex flex-col items-center justify-center space-y-8 p-8">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Top</Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Tooltip on top</p>
                  </TooltipContent>
                </Tooltip>

                <div className="flex items-center space-x-8">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Left</Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Tooltip on left</p>
                    </TooltipContent>
                  </Tooltip>

                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Center</span>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Right</Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Tooltip on right</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Bottom</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Tooltip on bottom</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip Sizes */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tooltip Sizes</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Different Sizes</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm">Small</Button>
                  </TooltipTrigger>
                  <TooltipContent size="sm">
                    <p>Small tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button>Medium</Button>
                  </TooltipTrigger>
                  <TooltipContent size="md">
                    <p>Medium tooltip with more content</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="lg">Large</Button>
                  </TooltipTrigger>
                  <TooltipContent size="lg">
                    <p>Large tooltip with even more detailed information and context</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Elements</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Form Elements</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="email">Email</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Enter your email address</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="password">Password</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Password must be at least 8 characters</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Status Indicators</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Active</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>User is currently active</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span>Warning</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent variant="warning">
                    <p>Please review this item</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="destructive">Error</Badge>
                  </TooltipTrigger>
                  <TooltipContent variant="error">
                    <p>An error occurred</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Tooltips */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Tooltips</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">User Avatars</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>John Doe - Developer</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Alice Brown - Designer</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Charlie Davis - Manager</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Action Buttons</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Social Actions</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like this post</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Share className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this post</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download file</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to favorites</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Settings & Profile</div>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View profile</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call user</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Card with Tooltips */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card with Tooltips</h4>
          </div>
          <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
            <div className="space-y-4">
              <div className="text-sm font-medium text-muted-foreground">Product Card</div>
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Premium Plan</CardTitle>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="premium">Featured</Badge>
                      </TooltipTrigger>
                      <TooltipContent variant="premium">
                        <p>Most popular plan</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardDescription>
                    Advanced features for professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Storage</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">100GB</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cloud storage space</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Users</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium">Unlimited</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Number of team members</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
