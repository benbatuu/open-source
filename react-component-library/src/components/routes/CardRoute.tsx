import React, { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function CardRoute() {
  return (
    <div className="space-y-8">
      {/* Card Variants */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Variants</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Default</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>This is a default card component.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Elevated</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                  <CardDescription>This card has elevated styling.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content with elevation.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Outlined</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Outlined Card</CardTitle>
                  <CardDescription>This card has a prominent border.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content with border.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Filled</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card variant="filled">
                <CardHeader>
                  <CardTitle>Filled Card</CardTitle>
                  <CardDescription>This card has a filled background.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content with filled background.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Interactive</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card variant="interactive" interactive hoverable clickable>
                <CardHeader>
                  <CardTitle>Interactive Card</CardTitle>
                  <CardDescription>This card is interactive and clickable.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Hover and click to see effects.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Card Sizes */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Sizes</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Small</div>
            <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-lg"></div>}>
              <Card size="sm">
                <CardHeader>
                  <CardTitle className="text-sm">Small Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Compact card content.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Medium</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card size="md">
                <CardHeader>
                  <CardTitle>Medium Card</CardTitle>
                  <CardDescription>Standard sized card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Standard card content.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Large</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-2xl"></div>}>
              <Card size="lg">
                <CardHeader>
                  <CardTitle className="text-xl">Large Card</CardTitle>
                  <CardDescription>Large sized card with more space.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">Large card with more content space.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
            <Suspense fallback={<div className="h-80 w-full bg-muted animate-pulse rounded-3xl"></div>}>
              <Card size="xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Extra Large Card</CardTitle>
                  <CardDescription>Extra large card with maximum space.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">Extra large card with maximum content space.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Card Features */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
          <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Features</h4>
        </div>
        <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Footer</div>
            <Suspense fallback={<div className="h-56 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>This card includes a footer section.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </CardFooter>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">With Badge</div>
            <Suspense fallback={<div className="h-48 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Card with Badge</CardTitle>
                    <Badge variant="premium">New</Badge>
                  </div>
                  <CardDescription>This card has a badge in the header.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content with badge indicator.</p>
                </CardContent>
              </Card>
            </Suspense>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Complex Layout</div>
            <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-xl"></div>}>
              <Card variant="elevated" size="lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Complex Card</CardTitle>
                      <CardDescription>This card demonstrates complex layout.</CardDescription>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">This card shows how multiple elements can be combined.</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Feature 1</Badge>
                    <Badge variant="outline">Feature 2</Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm">Learn More</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Action</Button>
                  </div>
                </CardFooter>
              </Card>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
