import React, { Suspense, useState } from 'react';
import { ComponentInfo } from '../../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Toast, ToastTitle, ToastDescription } from '../ui/toast';
import { PropsTable, PropInfo } from '../ui/props-table';
import { Copy, Eye, Code, Download, Component, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ComponentViewerProps {
  component: ComponentInfo | null;
}

export function ComponentViewer({ component }: ComponentViewerProps) {
  const [activeTab, setActiveTab] = useState('preview');

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="text-center max-w-lg mx-auto px-8 relative z-10">
          <div className="relative mb-8">
            <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-accent shadow-2xl shadow-primary/25 flex items-center justify-center">
              <Eye className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce" />
          </div>
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
            Welcome to ComponentLab
          </h3>
          <p className="text-lg text-muted-foreground/80 leading-relaxed">
            Select a component from the sidebar to explore its design, variants, and implementation details
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-muted-foreground/60">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Preview</span>
            </div>
            <div className="w-px h-4 bg-border/50" />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Interactive Docs</span>
            </div>
            <div className="w-px h-4 bg-border/50" />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Copy Code</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const generateCodeExample = (comp: ComponentInfo) => {
    const propsString = comp.props ? 
      Object.entries(comp.props)
        .map(([key, value]) => {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          }
          return `${key}={${JSON.stringify(value)}}`;
        })
        .join(' ') : '';

    return `<${comp.name}${propsString ? ` ${propsString}` : ''} />`;
  };


  return (
    <div className="flex-1 flex flex-col">
      {/* Component Header */}
      <div className="relative border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-20 z-40">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-4 mb-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent truncate">
                  {component.name}
                </h1>
                <Badge variant="secondary" className="flex-shrink-0 px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-semibold">
                  {component.category}
                </Badge>
              </div>
              <p className="text-muted-foreground/80 text-base leading-relaxed max-w-2xl">{component.description}</p>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(generateCodeExample(component))}
                className="h-10 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <Copy className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Copy Code
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const blob = new Blob([generateCodeExample(component)], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${component.name}.tsx`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="h-10 px-4 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <Download className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform duration-300" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-background/95 to-muted/10">
        <div className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-muted/30 border border-border/20 rounded-2xl p-1 h-14">
              <TabsTrigger 
                value="preview" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <Eye className="h-5 w-5 group-data-[state=active]:scale-110 transition-transform duration-300" />
                <span className="font-semibold">Preview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <Code className="h-5 w-5 group-data-[state=active]:scale-110 transition-transform duration-300" />
                <span className="font-semibold">Code</span>
              </TabsTrigger>
              <TabsTrigger 
                value="props" 
                className="flex items-center space-x-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                <Settings className="h-5 w-5 group-data-[state=active]:scale-110 transition-transform duration-300" />
                <span className="font-semibold">Props</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-8">
              <div className="space-y-8">
                {/* All Variants Showcase */}
                <Card className="border-border/20 bg-background/50 backdrop-blur-sm shadow-xl shadow-primary/5">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {component.name} Variants
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground/80">
                      Explore all available variants and styles of the {component.name} component
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComponentVariants component={component} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-8">
              <div className="space-y-8">
                {/* Code Examples for Each Variant */}
                <Card className="border-border/20 bg-background/50 backdrop-blur-sm shadow-xl shadow-primary/5">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Code Examples
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground/80">
                      Copy and paste ready code examples for each {component.name} variant
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ComponentCodeExamples component={component} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="props" className="mt-8">
              <div className="space-y-8">
                {/* Props Table */}
                <PropsTable 
                  componentName={component.name} 
                  props={getComponentProps(component.id)} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Component props definitions
function getComponentProps(componentId: string): PropInfo[] {
  const propsMap: Record<string, PropInfo[]> = {
    button: [
      { name: 'variant', type: '"primary" | "secondary" | "outline" | "ghost" | "link" | "destructive" | "success"', description: 'Visual style variant of the button', default: '"primary"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the button', default: '"md"' },
      { name: 'loading', type: 'boolean', description: 'Shows loading spinner and disables button', default: 'false' },
      { name: 'disabled', type: 'boolean', description: 'When true, prevents the user from interacting with the button', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display in the button', default: 'undefined' },
      { name: 'iconPosition', type: '"left" | "right"', description: 'Position of the icon relative to text', default: '"left"' },
      { name: 'fullWidth', type: 'boolean', description: 'Makes button take full width of container', default: 'false' },
      { name: 'asChild', type: 'boolean', description: 'Change the default rendered element for the one passed as a child', default: 'false' },
      { name: 'children', type: 'React.ReactNode', description: 'Button content', required: true },
    ],
    card: [
      { name: 'variant', type: '"default" | "elevated" | "outlined" | "filled" | "interactive"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', description: 'Size of the card', default: '"md"' },
      { name: 'interactive', type: 'boolean', description: 'Makes the card interactive with hover effects', default: 'false' },
      { name: 'hoverable', type: 'boolean', description: 'Enables shimmer effect on hover', default: 'false' },
      { name: 'clickable', type: 'boolean', description: 'Makes the card clickable', default: 'false' },
      { name: 'onCardClick', type: '() => void', description: 'Callback fired when card is clicked' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
      { name: 'children', type: 'React.ReactNode', description: 'Card content', required: true },
    ],
    input: [
      { name: 'type', type: 'string', description: 'Type of input element', default: '"text"' },
      { name: 'variant', type: '"default" | "error" | "success" | "warning" | "info" | "premium" | "featured"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the input', default: '"md"' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', description: 'Whether the input is disabled', default: 'false' },
      { name: 'value', type: 'string', description: 'Current value of the input' },
      { name: 'onChange', type: '(event: ChangeEvent<HTMLInputElement>) => void', description: 'Callback fired when the value is changed' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display in the input' },
      { name: 'iconPosition', type: '"left" | "right"', description: 'Position of the icon', default: '"left"' },
      { name: 'clearable', type: 'boolean', description: 'Whether the input can be cleared', default: 'false' },
      { name: 'onClear', type: '() => void', description: 'Callback fired when input is cleared' },
      { name: 'showPasswordToggle', type: 'boolean', description: 'Whether to show password toggle for password inputs', default: 'false' },
      { name: 'label', type: 'string', description: 'Label text for the input' },
      { name: 'helperText', type: 'string', description: 'Helper text below the input' },
      { name: 'error', type: 'string', description: 'Error message to display' },
      { name: 'warning', type: 'string', description: 'Warning message to display' },
      { name: 'info', type: 'string', description: 'Info message to display' },
      { name: 'success', type: 'string', description: 'Success message to display' },
      { name: 'autoIcon', type: 'boolean', description: 'Whether to automatically show icon based on type', default: 'false' },
      { name: 'iconType', type: '"search" | "email" | "password" | "user" | "phone" | "calendar" | "credit-card" | "custom"', description: 'Type of icon to display when autoIcon is true', default: '"custom"' },
      { name: 'floatingLabel', type: 'boolean', description: 'Whether to use floating label animation', default: 'false' },
      { name: 'required', type: 'boolean', description: 'Whether the input is required', default: 'false' },
      { name: 'maxLength', type: 'number', description: 'Maximum number of characters allowed' },
      { name: 'showCharacterCount', type: 'boolean', description: 'Whether to show character count', default: 'false' },
      { name: 'loading', type: 'boolean', description: 'Whether the input is in loading state', default: 'false' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the input takes full width', default: 'true' },
      { name: 'animated', type: 'boolean', description: 'Whether the input has pulse animation', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the input has glowing effect', default: 'false' },
      { name: 'leftAddon', type: 'React.ReactNode', description: 'Content to display on the left side of the input' },
      { name: 'rightAddon', type: 'React.ReactNode', description: 'Content to display on the right side of the input' },
      { name: 'onFocus', type: '(e: FocusEvent<HTMLInputElement>) => void', description: 'Callback fired when input receives focus' },
      { name: 'onBlur', type: '(e: FocusEvent<HTMLInputElement>) => void', description: 'Callback fired when input loses focus' },
    ],
    badge: [
      { name: 'variant', type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "premium" | "featured"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the badge', default: '"md"' },
      { name: 'removable', type: 'boolean', description: 'Whether the badge can be removed', default: 'false' },
      { name: 'onRemove', type: '() => void', description: 'Callback fired when badge is removed' },
      { name: 'animated', type: 'boolean', description: 'Whether the badge has pulse animation', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display in the badge' },
      { name: 'iconPosition', type: '"left" | "right"', description: 'Position of the icon', default: '"left"' },
      { name: 'count', type: 'number', description: 'Count number to display in the badge' },
      { name: 'maxCount', type: 'number', description: 'Maximum count to display before showing "maxCount+"', default: '99' },
      { name: 'dot', type: 'boolean', description: 'Whether to render as a dot badge', default: 'false' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
      { name: 'children', type: 'React.ReactNode', description: 'Badge content', required: true },
    ],
    avatar: [
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"', description: 'Size of the avatar', default: '"md"' },
      { name: 'shape', type: '"circle" | "square" | "hexagon"', description: 'Shape of the avatar', default: '"circle"' },
      { name: 'status', type: '"online" | "offline" | "busy" | "away"', description: 'Status indicator ring' },
      { name: 'interactive', type: 'boolean', description: 'Whether the avatar is clickable', default: 'false' },
      { name: 'bordered', type: 'boolean', description: 'Whether the avatar has a border', default: 'false' },
      { name: 'onClick', type: '() => void', description: 'Callback fired when avatar is clicked' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
      { name: 'children', type: 'React.ReactNode', description: 'Avatar content (AvatarImage and AvatarFallback)', required: true },
    ],
    separator: [
      { name: 'variant', type: '"default" | "subtle" | "bold" | "success" | "warning" | "destructive" | "info" | "premium"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the separator', default: '"md"' },
      { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Orientation of the separator', default: '"horizontal"' },
      { name: 'animated', type: 'boolean', description: 'Whether the separator has pulse animation', default: 'false' },
      { name: 'dotted', type: 'boolean', description: 'Whether the separator has dotted style', default: 'false' },
      { name: 'label', type: 'string', description: 'Label text to display with the separator' },
      { name: 'labelPosition', type: '"left" | "center" | "right"', description: 'Position of the label', default: '"center"' },
      { name: 'showIcon', type: 'boolean', description: 'Whether to show an icon with the label', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display with the label' },
      { name: 'decorative', type: 'boolean', description: 'Whether the separator is purely decorative', default: 'true' },
      { name: 'className', type: 'string', description: 'Additional CSS classes' },
    ],
    textarea: [
      { name: 'variant', type: '"default" | "error" | "success" | "warning" | "info" | "premium" | "featured"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the textarea', default: '"md"' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', description: 'Whether the textarea is disabled', default: 'false' },
      { name: 'value', type: 'string', description: 'Current value of the textarea' },
      { name: 'onChange', type: '(event: ChangeEvent<HTMLTextAreaElement>) => void', description: 'Callback fired when the value is changed' },
      { name: 'label', type: 'string', description: 'Label text for the textarea' },
      { name: 'helperText', type: 'string', description: 'Helper text below the textarea' },
      { name: 'error', type: 'string', description: 'Error message to display' },
      { name: 'warning', type: 'string', description: 'Warning message to display' },
      { name: 'info', type: 'string', description: 'Info message to display' },
      { name: 'success', type: 'string', description: 'Success message to display' },
      { name: 'autoIcon', type: 'boolean', description: 'Whether to automatically show icon based on type', default: 'false' },
      { name: 'iconType', type: '"message" | "text" | "comment" | "note" | "custom"', description: 'Type of icon to display when autoIcon is true', default: '"custom"' },
      { name: 'floatingLabel', type: 'boolean', description: 'Whether to use floating label animation', default: 'false' },
      { name: 'required', type: 'boolean', description: 'Whether the textarea is required', default: 'false' },
      { name: 'maxLength', type: 'number', description: 'Maximum number of characters allowed' },
      { name: 'showCharacterCount', type: 'boolean', description: 'Whether to show character count', default: 'false' },
      { name: 'loading', type: 'boolean', description: 'Whether the textarea is in loading state', default: 'false' },
      { name: 'clearable', type: 'boolean', description: 'Whether the textarea can be cleared', default: 'false' },
      { name: 'onClear', type: '() => void', description: 'Callback fired when textarea is cleared' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the textarea takes full width', default: 'true' },
      { name: 'animated', type: 'boolean', description: 'Whether the textarea has pulse animation', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the textarea has glowing effect', default: 'false' },
      { name: 'onFocus', type: '(e: FocusEvent<HTMLTextAreaElement>) => void', description: 'Callback fired when textarea receives focus' },
      { name: 'onBlur', type: '(e: FocusEvent<HTMLTextAreaElement>) => void', description: 'Callback fired when textarea loses focus' },
      { name: 'rows', type: 'number', description: 'Number of rows to display' },
    ],
    select: [
      { name: 'variant', type: '"default" | "error" | "success" | "warning" | "info" | "premium" | "featured"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the select', default: '"md"' },
      { name: 'label', type: 'string', description: 'Label text for the select' },
      { name: 'helperText', type: 'string', description: 'Helper text below the select' },
      { name: 'error', type: 'string', description: 'Error message to display' },
      { name: 'warning', type: 'string', description: 'Warning message to display' },
      { name: 'info', type: 'string', description: 'Info message to display' },
      { name: 'success', type: 'string', description: 'Success message to display' },
      { name: 'loading', type: 'boolean', description: 'Whether the select is in loading state', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display in the select' },
      { name: 'iconPosition', type: '"left" | "right"', description: 'Position of the icon', default: '"left"' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the select takes full width', default: 'true' },
      { name: 'glowing', type: 'boolean', description: 'Whether the select has glowing effect', default: 'false' },
      { name: 'disabled', type: 'boolean', description: 'Whether the select is disabled', default: 'false' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text for the select value' },
    ],
    checkbox: [
      { name: 'variant', type: '"default" | "error" | "success" | "warning" | "info" | "premium" | "featured"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the checkbox', default: '"md"' },
      { name: 'label', type: 'string', description: 'Label text for the checkbox' },
      { name: 'helperText', type: 'string', description: 'Helper text below the checkbox' },
      { name: 'error', type: 'string', description: 'Error message to display' },
      { name: 'warning', type: 'string', description: 'Warning message to display' },
      { name: 'info', type: 'string', description: 'Info message to display' },
      { name: 'success', type: 'string', description: 'Success message to display' },
      { name: 'indeterminate', type: 'boolean', description: 'Whether the checkbox is in indeterminate state', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon to display in the checkbox' },
      { name: 'loading', type: 'boolean', description: 'Whether the checkbox is in loading state', default: 'false' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the checkbox takes full width', default: 'false' },
      { name: 'animated', type: 'boolean', description: 'Whether the checkbox has pulse animation when checked', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the checkbox has glowing effect', default: 'false' },
      { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback fired when the checked state changes' },
      { name: 'disabled', type: 'boolean', description: 'Whether the checkbox is disabled', default: 'false' },
    ],
    switch: [
      { name: 'variant', type: '"default" | "error" | "success" | "warning" | "info" | "premium" | "featured" | "ios26"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', description: 'Size of the switch', default: '"md"' },
      { name: 'label', type: 'string', description: 'Label text for the switch' },
      { name: 'helperText', type: 'string', description: 'Helper text below the switch' },
      { name: 'error', type: 'string', description: 'Error message to display' },
      { name: 'warning', type: 'string', description: 'Warning message to display' },
      { name: 'info', type: 'string', description: 'Info message to display' },
      { name: 'success', type: 'string', description: 'Success message to display' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon to display in the switch' },
      { name: 'loading', type: 'boolean', description: 'Whether the switch is in loading state', default: 'false' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the switch takes full width', default: 'false' },
      { name: 'showIcons', type: 'boolean', description: 'Whether to show status icons', default: 'false' },
      { name: 'animated', type: 'boolean', description: 'Whether the switch has pulse animation when checked', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the switch has glowing effect', default: 'false' },
      { name: 'checked', type: 'boolean', description: 'Whether the switch is checked' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback fired when the checked state changes' },
      { name: 'disabled', type: 'boolean', description: 'Whether the switch is disabled', default: 'false' },
    ],
    tabs: [
      { name: 'variant', type: '"default" | "outlined" | "filled" | "premium" | "featured" | "glass"', description: 'Visual style variant for TabsList, TabsTrigger, and TabsContent', default: '"default"' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', description: 'Size of the tabs', default: '"md"' },
      { name: 'orientation', type: '"horizontal" | "vertical"', description: 'Orientation of the tabs', default: '"horizontal"' },
      { name: 'showArrows', type: 'boolean', description: 'Whether to show navigation arrows', default: 'false' },
      { name: 'scrollable', type: 'boolean', description: 'Whether the tabs are scrollable', default: 'false' },
      { name: 'icon', type: 'React.ReactNode', description: 'Icon to display in TabsTrigger' },
      { name: 'badge', type: 'string | number', description: 'Badge to display in TabsTrigger' },
      { name: 'animated', type: 'boolean', description: 'Whether tabs have animations', default: 'false' },
      { name: 'defaultValue', type: 'string', description: 'Default active tab value' },
      { name: 'value', type: 'string', description: 'Controlled active tab value' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback fired when tab value changes' },
      { name: 'disabled', type: 'boolean', description: 'Whether tabs are disabled', default: 'false' },
    ],
    alert: [
      { name: 'variant', type: '"default" | "destructive" | "success" | "warning" | "info" | "premium" | "featured" | "glass"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', description: 'Size of the alert', default: '"md"' },
      { name: 'dismissible', type: 'boolean', description: 'Whether the alert can be dismissed', default: 'false' },
      { name: 'onDismiss', type: '() => void', description: 'Callback fired when alert is dismissed' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon to display' },
      { name: 'autoIcon', type: 'boolean', description: 'Whether to show automatic icon based on variant', default: 'true' },
      { name: 'showShimmer', type: 'boolean', description: 'Whether to show shimmer effect', default: 'false' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the alert takes full width', default: 'true' },
      { name: 'animated', type: 'boolean', description: 'Whether the alert has pulse animation', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the alert has glowing effect', default: 'false' },
      { name: 'children', type: 'React.ReactNode', description: 'Alert content', required: true },
    ],
    progress: [
      { name: 'variant', type: '"default" | "success" | "warning" | "destructive" | "info" | "premium" | "featured" | "glass"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', description: 'Size of the progress bar', default: '"md"' },
      { name: 'value', type: 'number', description: 'Progress value (0-100)', required: true },
      { name: 'showValue', type: 'boolean', description: 'Whether to show percentage value', default: 'false' },
      { name: 'label', type: 'string', description: 'Label text for the progress bar' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon to display' },
      { name: 'autoIcon', type: 'boolean', description: 'Whether to show automatic icon based on variant', default: 'true' },
      { name: 'showShimmer', type: 'boolean', description: 'Whether to show shimmer effect', default: 'true' },
      { name: 'showGlow', type: 'boolean', description: 'Whether to show glow effect', default: 'true' },
      { name: 'fullWidth', type: 'boolean', description: 'Whether the progress takes full width', default: 'true' },
      { name: 'animated', type: 'boolean', description: 'Whether the progress has animations', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the progress has glowing effect', default: 'false' },
    ],
    toast: [
      { name: 'variant', type: '"default" | "destructive" | "success" | "warning" | "info" | "premium" | "featured" | "glass"', description: 'Visual style variant', default: '"default"' },
      { name: 'size', type: '"sm" | "md" | "lg"', description: 'Size of the toast', default: '"md"' },
      { name: 'icon', type: 'React.ReactNode', description: 'Custom icon to display' },
      { name: 'autoIcon', type: 'boolean', description: 'Whether to show automatic icon based on variant', default: 'true' },
      { name: 'showShimmer', type: 'boolean', description: 'Whether to show shimmer effect', default: 'false' },
      { name: 'animated', type: 'boolean', description: 'Whether the toast has pulse animation', default: 'false' },
      { name: 'glowing', type: 'boolean', description: 'Whether the toast has glowing effect', default: 'false' },
      { name: 'children', type: 'React.ReactNode', description: 'Toast content', required: true },
    ],
  };

  return propsMap[componentId] || [];
}

function ComponentVariants({ component }: { component: ComponentInfo }) {
  const renderVariants = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="space-y-12">
            {/* Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variants</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="primary">Primary</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Secondary</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="secondary">Secondary</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Outline</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="outline">Outline</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Ghost</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="ghost">Ghost</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Link</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="link">Link</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Destructive</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="destructive">Destructive</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component variant="success">Success</component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Sizes</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Suspense fallback={<div className="h-7 w-12 bg-muted animate-pulse rounded-md"></div>}>
                    <component.component size="xs">XS</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Suspense fallback={<div className="h-8 w-16 bg-muted animate-pulse rounded-md"></div>}>
                    <component.component size="sm">SM</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Suspense fallback={<div className="h-10 w-20 bg-muted animate-pulse rounded-lg"></div>}>
                    <component.component size="md">MD</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Suspense fallback={<div className="h-12 w-24 bg-muted animate-pulse rounded-xl"></div>}>
                    <component.component size="lg">LG</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Suspense fallback={<div className="h-14 w-28 bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component size="xl">XL</component.component>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variants</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="default">Default</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Secondary</div>
                  <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="secondary">Secondary</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Destructive</div>
                  <Suspense fallback={<div className="h-6 w-24 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="destructive">Destructive</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Outline</div>
                  <Suspense fallback={<div className="h-6 w-18 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="outline">Outline</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Suspense fallback={<div className="h-6 w-18 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="success">Success</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Suspense fallback={<div className="h-6 w-18 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="warning">Warning</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Suspense fallback={<div className="h-6 w-18 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="info">Info</component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Sizes</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Small</div>
                  <Suspense fallback={<div className="h-5 w-12 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="sm">Small</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Medium</div>
                  <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="md">Medium</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Large</div>
                  <Suspense fallback={<div className="h-7 w-20 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="lg">Large</component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* New Premium Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Premium Variants</h4>
              </div>
              <div className="flex flex-wrap items-center gap-4 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="premium">Premium</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="featured">Featured</component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Badge Sizes Extended */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Extended Sizes</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Suspense fallback={<div className="h-4 w-10 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="xs">XS</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Suspense fallback={<div className="h-5 w-12 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="sm">SM</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="md">MD</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Suspense fallback={<div className="h-7 w-20 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="lg">LG</component.component>
                  </Suspense>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Suspense fallback={<div className="h-8 w-24 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component size="xl">XL</component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Badges with Count */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Badges with Count</h4>
              </div>
              <div className="flex flex-wrap items-center gap-4 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component count={5}>Notifications</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="success" count={12}>Messages</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="warning" count={99}>Alerts</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="destructive" count={150} maxCount={99}>Errors</component.component>
                </Suspense>
              </div>
            </div>

            {/* Animated Badges */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Animated Badges</h4>
              </div>
              <div className="flex flex-wrap items-center gap-4 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component animated>Live</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="success" animated>Active</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="warning" animated>Pending</component.component>
                </Suspense>
              </div>
            </div>

            {/* Dot Badges */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Dot Badges</h4>
              </div>
              <div className="flex flex-wrap items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Online</span>
                  <Suspense fallback={<div className="w-3 h-3 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="success" dot />
                  </Suspense>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Away</span>
                  <Suspense fallback={<div className="w-3 h-3 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="warning" dot animated />
                  </Suspense>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Busy</span>
                  <Suspense fallback={<div className="w-3 h-3 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="destructive" dot />
                  </Suspense>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Offline</span>
                  <Suspense fallback={<div className="w-3 h-3 bg-muted animate-pulse rounded-full"></div>}>
                    <component.component variant="secondary" dot />
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Removable Badges */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Removable Badges</h4>
              </div>
              <div className="flex flex-wrap items-center gap-4 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <Suspense fallback={<div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component removable onRemove={() => console.log('Removed')}>Removable</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-24 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="success" removable onRemove={() => console.log('Removed')}>Success</component.component>
                </Suspense>
                <Suspense fallback={<div className="h-6 w-28 bg-muted animate-pulse rounded-full"></div>}>
                  <component.component variant="warning" removable onRemove={() => console.log('Removed')}>Warning</component.component>
                </Suspense>
              </div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className="space-y-8">
            {/* Avatar Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Sizes</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Avatar size="xs">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Avatar size="sm">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Avatar size="md">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Avatar size="lg">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Avatar size="xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">2XL</div>
                  <Avatar size="2xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>2XL</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">3XL</div>
                  <Avatar size="3xl">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>3XL</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* Avatar Shapes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Avatar Shapes</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Circle</div>
                  <Avatar size="lg" shape="circle">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Square</div>
                  <Avatar size="lg" shape="square">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Hexagon</div>
                  <Avatar size="lg" shape="hexagon">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* Avatar Status */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Status Indicators</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Online</div>
                  <Avatar size="lg" status="online">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Offline</div>
                  <Avatar size="lg" status="offline">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Busy</div>
                  <Avatar size="lg" status="busy">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Away</div>
                  <Avatar size="lg" status="away">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>

            {/* Avatar Fallback Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Fallback Variants</h4>
              </div>
              <div className="flex items-center gap-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="default" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="success" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="warning" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Destructive</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="destructive" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="info" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="premium" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="featured" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">Admin</div>
                  <Avatar size="lg">
                    <AvatarFallback variant="admin" showIcon>JD</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        );


      case 'textarea':
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
                  <Textarea placeholder="Default textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Textarea placeholder="Success textarea" variant="success" success="Textarea is valid" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Textarea placeholder="Warning textarea" variant="warning" warning="Please check this textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Textarea placeholder="Error textarea" variant="error" error="This field is required" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Textarea placeholder="Info textarea" variant="info" info="Additional information" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Textarea placeholder="Premium textarea" variant="premium" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Textarea placeholder="Featured textarea" variant="featured" />
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
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Textarea size="xs" placeholder="Extra small textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Textarea size="sm" placeholder="Small textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Textarea size="md" placeholder="Medium textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Textarea size="lg" placeholder="Large textarea" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Textarea size="xl" placeholder="Extra large textarea" />
                </div>
              </div>
            </div>

            {/* Textarea with Icons */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Textarea with Icons</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Message Icon</div>
                  <Textarea placeholder="Leave a message..." autoIcon iconType="message" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Text Icon</div>
                  <Textarea placeholder="Enter your text..." autoIcon iconType="text" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Comment Icon</div>
                  <Textarea placeholder="Add a comment..." autoIcon iconType="comment" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Note Icon</div>
                  <Textarea placeholder="Write your notes..." autoIcon iconType="note" />
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
                  <div className="text-sm font-medium text-muted-foreground">Clearable Textarea</div>
                  <Textarea placeholder="Type something..." clearable defaultValue="Sample text content" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Character Count</div>
                  <Textarea placeholder="Type up to 200 characters" maxLength={200} showCharacterCount />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Loading State</div>
                  <Textarea placeholder="Loading..." loading />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing Effect</div>
                  <Textarea placeholder="Glowing textarea" glowing />
                </div>
              </div>
            </div>

            {/* Textarea with Labels */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Textarea with Labels</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Standard Label</div>
                  <Textarea label="Message" placeholder="Enter your message" autoIcon iconType="message" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Floating Label</div>
                  <Textarea label="Comments" floatingLabel placeholder="Add your comments" autoIcon iconType="comment" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Required Field</div>
                  <Textarea label="Description" placeholder="Enter description" required helperText="Please provide a detailed description" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Helper Text</div>
                  <Textarea label="Notes" placeholder="Write your notes here" helperText="This field is optional but recommended" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'select':
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
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Select>
                    <SelectTrigger variant="success" success="Selection is valid">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Select>
                    <SelectTrigger variant="warning" warning="Please check your selection">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Select>
                    <SelectTrigger variant="error" error="This field is required">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Select>
                    <SelectTrigger variant="premium">
                      <SelectValue placeholder="Premium select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium1">Premium Option 1</SelectItem>
                      <SelectItem value="premium2">Premium Option 2</SelectItem>
                      <SelectItem value="premium3">Premium Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Select>
                    <SelectTrigger variant="featured">
                      <SelectValue placeholder="Featured select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured1">Featured Option 1</SelectItem>
                      <SelectItem value="featured2">Featured Option 2</SelectItem>
                      <SelectItem value="featured3">Featured Option 3</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Select>
                    <SelectTrigger size="xs">
                      <SelectValue placeholder="Extra small" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs1">XS Option 1</SelectItem>
                      <SelectItem value="xs2">XS Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Select>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Small" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm1">SM Option 1</SelectItem>
                      <SelectItem value="sm2">SM Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Select>
                    <SelectTrigger size="md">
                      <SelectValue placeholder="Medium" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md1">MD Option 1</SelectItem>
                      <SelectItem value="md2">MD Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Select>
                    <SelectTrigger size="lg">
                      <SelectValue placeholder="Large" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lg1">LG Option 1</SelectItem>
                      <SelectItem value="lg2">LG Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Select>
                    <SelectTrigger size="xl">
                      <SelectValue placeholder="Extra large" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xl1">XL Option 1</SelectItem>
                      <SelectItem value="xl2">XL Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Select with Labels */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Select with Labels</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Label</div>
                  <Select>
                    <SelectTrigger label="Choose Country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
                  <Select>
                    <SelectTrigger label="Payment Method" helperText="Choose your preferred payment method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Loading State</div>
                  <Select>
                    <SelectTrigger loading>
                      <SelectValue placeholder="Loading..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loading1">Loading Option 1</SelectItem>
                      <SelectItem value="loading2">Loading Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing Effect</div>
                  <Select>
                    <SelectTrigger glowing>
                      <SelectValue placeholder="Glowing select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glow1">Glow Option 1</SelectItem>
                      <SelectItem value="glow2">Glow Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'checkbox':
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
                  <Checkbox label="Default checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Checkbox label="Success checkbox" variant="success" success="Checkbox is valid" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Checkbox label="Warning checkbox" variant="warning" warning="Please check this option" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Checkbox label="Error checkbox" variant="error" error="This field is required" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Checkbox label="Info checkbox" variant="info" info="Additional information" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Checkbox label="Premium checkbox" variant="premium" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Checkbox label="Featured checkbox" variant="featured" />
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
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Checkbox size="xs" label="Extra small checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Checkbox size="sm" label="Small checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Checkbox size="md" label="Medium checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Checkbox size="lg" label="Large checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Checkbox size="xl" label="Extra large checkbox" />
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
                  <Checkbox label="Unchecked checkbox" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Checked</div>
                  <Checkbox label="Checked checkbox" checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Indeterminate</div>
                  <Checkbox label="Indeterminate checkbox" indeterminate />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Disabled</div>
                  <Checkbox label="Disabled checkbox" disabled />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Loading</div>
                  <Checkbox label="Loading checkbox" loading />
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
                  <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
                  <Checkbox label="Terms and Conditions" helperText="Please read and accept our terms and conditions" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Animated</div>
                  <Checkbox label="Animated checkbox" animated checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing</div>
                  <Checkbox label="Glowing checkbox" glowing checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Full Width</div>
                  <Checkbox label="Full width checkbox" fullWidth helperText="This checkbox takes full width" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'switch':
        return (
          <div className="space-y-8">
            {/* Switch Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Variants</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Switch label="Default switch" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Switch label="Success switch" variant="success" success="Switch is enabled" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Switch label="Warning switch" variant="warning" warning="Please check this setting" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Switch label="Error switch" variant="error" error="This setting is required" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Switch label="Info switch" variant="info" info="Additional information" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Switch label="Premium switch" variant="premium" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Switch label="Featured switch" variant="featured" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">iOS 26</div>
                  <Switch label="iOS 26 switch" variant="ios26" />
                </div>
              </div>
            </div>

            {/* Switch Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Sizes</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Switch size="xs" label="Extra small switch" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Switch size="sm" label="Small switch" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Switch size="md" label="Medium switch" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Switch size="lg" label="Large switch" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Switch size="xl" label="Extra large switch" />
                </div>
              </div>
            </div>

            {/* Switch States */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch States</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Off</div>
                  <Switch label="Switch is off" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">On</div>
                  <Switch label="Switch is on" checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Disabled</div>
                  <Switch label="Disabled switch" disabled />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Loading</div>
                  <Switch label="Loading switch" loading />
                </div>
              </div>
            </div>

            {/* Switch Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Switch Features</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Helper Text</div>
                  <Switch label="Notifications" helperText="Receive notifications about updates" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Animated</div>
                  <Switch label="Animated switch" animated checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing</div>
                  <Switch label="Glowing switch" glowing checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Icons</div>
                  <Switch label="Show status icons" showIcons variant="success" checked />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Full Width</div>
                  <Switch label="Full width switch" fullWidth helperText="This switch takes full width" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="space-y-8">
            {/* Tabs Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Variants</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="default">
                      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="default">
                      <p className="text-sm text-muted-foreground">Default tab content goes here.</p>
                    </TabsContent>
                    <TabsContent value="tab2" variant="default">
                      <p className="text-sm text-muted-foreground">Second tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" variant="default">
                      <p className="text-sm text-muted-foreground">Third tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Outlined</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="outlined">
                      <TabsTrigger value="tab1" variant="outlined">Tab 1</TabsTrigger>
                      <TabsTrigger value="tab2" variant="outlined">Tab 2</TabsTrigger>
                      <TabsTrigger value="tab3" variant="outlined">Tab 3</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="outlined">
                      <p className="text-sm text-muted-foreground">Outlined tab content goes here.</p>
                    </TabsContent>
                    <TabsContent value="tab2" variant="outlined">
                      <p className="text-sm text-muted-foreground">Second outlined tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" variant="outlined">
                      <p className="text-sm text-muted-foreground">Third outlined tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="premium">
                      <TabsTrigger value="tab1" variant="premium">Premium</TabsTrigger>
                      <TabsTrigger value="tab2" variant="premium">Features</TabsTrigger>
                      <TabsTrigger value="tab3" variant="premium">Support</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="premium">
                      <p className="text-sm text-muted-foreground">Premium tab content with gradient styling.</p>
                    </TabsContent>
                    <TabsContent value="tab2" variant="premium">
                      <p className="text-sm text-muted-foreground">Features tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" variant="premium">
                      <p className="text-sm text-muted-foreground">Support tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="featured">
                      <TabsTrigger value="tab1" variant="featured">Featured</TabsTrigger>
                      <TabsTrigger value="tab2" variant="featured">New</TabsTrigger>
                      <TabsTrigger value="tab3" variant="featured">Hot</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="featured">
                      <p className="text-sm text-muted-foreground">Featured tab content with premium styling.</p>
                    </TabsContent>
                    <TabsContent value="tab2" variant="featured">
                      <p className="text-sm text-muted-foreground">New tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" variant="featured">
                      <p className="text-sm text-muted-foreground">Hot tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glass</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="glass">
                      <TabsTrigger value="tab1" variant="glass">Glass</TabsTrigger>
                      <TabsTrigger value="tab2" variant="glass">Modern</TabsTrigger>
                      <TabsTrigger value="tab3" variant="glass">Clean</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="glass">
                      <p className="text-sm text-muted-foreground">Glass tab content with backdrop blur effect.</p>
                    </TabsContent>
                    <TabsContent value="tab2" variant="glass">
                      <p className="text-sm text-muted-foreground">Modern tab content.</p>
                    </TabsContent>
                    <TabsContent value="tab3" variant="glass">
                      <p className="text-sm text-muted-foreground">Clean tab content.</p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Tabs Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Sizes</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Small</div>
                  <Tabs defaultValue="tab1">
                    <TabsList size="sm">
                      <TabsTrigger value="tab1">Small</TabsTrigger>
                      <TabsTrigger value="tab2">Tabs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Small tab content.</TabsContent>
                    <TabsContent value="tab2">Second small tab.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Medium</div>
                  <Tabs defaultValue="tab1">
                    <TabsList size="md">
                      <TabsTrigger value="tab1">Medium</TabsTrigger>
                      <TabsTrigger value="tab2">Tabs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Medium tab content.</TabsContent>
                    <TabsContent value="tab2">Second medium tab.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Large</div>
                  <Tabs defaultValue="tab1">
                    <TabsList size="lg">
                      <TabsTrigger value="tab1">Large</TabsTrigger>
                      <TabsTrigger value="tab2">Tabs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Large tab content.</TabsContent>
                    <TabsContent value="tab2">Second large tab.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
                  <Tabs defaultValue="tab1">
                    <TabsList size="xl">
                      <TabsTrigger value="tab1">Extra Large</TabsTrigger>
                      <TabsTrigger value="tab2">Tabs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">Extra large tab content.</TabsContent>
                    <TabsContent value="tab2">Second extra large tab.</TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Tabs Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Tabs Features</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Icons</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="outlined">
                      <TabsTrigger value="tab1" icon="🏠">Home</TabsTrigger>
                      <TabsTrigger value="tab2" icon="⚙️">Settings</TabsTrigger>
                      <TabsTrigger value="tab3" icon="📊">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="outlined">Home content with icon.</TabsContent>
                    <TabsContent value="tab2" variant="outlined">Settings content.</TabsContent>
                    <TabsContent value="tab3" variant="outlined">Analytics content.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">With Badges</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="filled">
                      <TabsTrigger value="tab1" badge="5">Messages</TabsTrigger>
                      <TabsTrigger value="tab2" badge="12">Notifications</TabsTrigger>
                      <TabsTrigger value="tab3">Profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="filled">Messages with badge count.</TabsContent>
                    <TabsContent value="tab2" variant="filled">Notifications with badge count.</TabsContent>
                    <TabsContent value="tab3" variant="filled">Profile content.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Animated</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="premium">
                      <TabsTrigger value="tab1" animated>Animated</TabsTrigger>
                      <TabsTrigger value="tab2" animated>Premium</TabsTrigger>
                      <TabsTrigger value="tab3" animated>Tabs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="premium" animated>Animated tab content with smooth transitions.</TabsContent>
                    <TabsContent value="tab2" variant="premium" animated>Second animated tab.</TabsContent>
                    <TabsContent value="tab3" variant="premium" animated>Third animated tab.</TabsContent>
                  </Tabs>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Scrollable with Arrows</div>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="glass" showArrows scrollable>
                      <TabsTrigger value="tab1">Very Long Tab Name 1</TabsTrigger>
                      <TabsTrigger value="tab2">Very Long Tab Name 2</TabsTrigger>
                      <TabsTrigger value="tab3">Very Long Tab Name 3</TabsTrigger>
                      <TabsTrigger value="tab4">Very Long Tab Name 4</TabsTrigger>
                      <TabsTrigger value="tab5">Very Long Tab Name 5</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" variant="glass">Scrollable tabs with navigation arrows.</TabsContent>
                    <TabsContent value="tab2" variant="glass">Second scrollable tab.</TabsContent>
                    <TabsContent value="tab3" variant="glass">Third scrollable tab.</TabsContent>
                    <TabsContent value="tab4" variant="glass">Fourth scrollable tab.</TabsContent>
                    <TabsContent value="tab5" variant="glass">Fifth scrollable tab.</TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        );

      case 'alert':
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
                  <Alert variant="default">
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>This is a default alert message.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Alert variant="success">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Your action was completed successfully.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Alert variant="warning">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>Please check your input before proceeding.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Alert variant="info">
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>Here's some useful information for you.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Alert variant="premium">
                    <AlertTitle>Premium Feature</AlertTitle>
                    <AlertDescription>Unlock premium features with our pro plan.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Alert variant="featured">
                    <AlertTitle>Featured Content</AlertTitle>
                    <AlertDescription>Check out our latest featured content.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glass</div>
                  <Alert variant="glass">
                    <AlertTitle>Glass Effect</AlertTitle>
                    <AlertDescription>Modern glass morphism design alert.</AlertDescription>
                  </Alert>
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
                  <Alert size="sm" variant="info">
                    <AlertTitle>Small Alert</AlertTitle>
                    <AlertDescription>Compact alert message.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Medium</div>
                  <Alert size="md" variant="success">
                    <AlertTitle>Medium Alert</AlertTitle>
                    <AlertDescription>Standard sized alert message.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Large</div>
                  <Alert size="lg" variant="warning">
                    <AlertTitle>Large Alert</AlertTitle>
                    <AlertDescription>Large alert message with more space.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
                  <Alert size="xl" variant="premium">
                    <AlertTitle>Extra Large Alert</AlertTitle>
                    <AlertDescription>Extra large alert message with maximum spacing.</AlertDescription>
                  </Alert>
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
                  <Alert variant="info" dismissible>
                    <AlertTitle>Dismissible Alert</AlertTitle>
                    <AlertDescription>This alert can be dismissed by clicking the X button.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Custom Icon</div>
                  <Alert variant="premium" icon="🎉">
                    <AlertTitle>Custom Icon</AlertTitle>
                    <AlertDescription>Alert with a custom emoji icon.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">No Auto Icon</div>
                  <Alert variant="success" autoIcon={false}>
                    <AlertTitle>No Auto Icon</AlertTitle>
                    <AlertDescription>Alert without automatic icon display.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Animated</div>
                  <Alert variant="featured" animated>
                    <AlertTitle>Animated Alert</AlertTitle>
                    <AlertDescription>Alert with pulse animation effect.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing</div>
                  <Alert variant="premium" glowing>
                    <AlertTitle>Glowing Alert</AlertTitle>
                    <AlertDescription>Alert with glowing shadow effect.</AlertDescription>
                  </Alert>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Shimmer Effect</div>
                  <Alert variant="glass" showShimmer>
                    <AlertTitle>Shimmer Alert</AlertTitle>
                    <AlertDescription>Alert with shimmer animation effect.</AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
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
                  <Progress value={75} variant="default" label="Default Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Progress value={85} variant="success" label="Success Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Progress value={65} variant="warning" label="Warning Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Progress value={45} variant="destructive" label="Error Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Progress value={70} variant="info" label="Info Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Progress value={90} variant="premium" label="Premium Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Progress value={95} variant="featured" label="Featured Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glass</div>
                  <Progress value={80} variant="glass" label="Glass Progress" showValue />
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
                  <Progress value={60} size="sm" variant="success" label="Small Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Medium</div>
                  <Progress value={75} size="md" variant="info" label="Medium Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Large</div>
                  <Progress value={85} size="lg" variant="premium" label="Large Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Extra Large</div>
                  <Progress value={95} size="xl" variant="featured" label="Extra Large Progress" showValue />
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
                  <Progress value={70} variant="success" icon="🎯" label="Custom Icon Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">No Auto Icon</div>
                  <Progress value={80} variant="premium" autoIcon={false} label="No Auto Icon Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">No Shimmer</div>
                  <Progress value={75} variant="info" showShimmer={false} label="No Shimmer Progress" showValue />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">No Glow</div>
                  <Progress value={85} variant="featured" showGlow={false} label="No Glow Progress" showValue />
                </div>
              </div>
            </div>
          </div>
        );

      case 'toast':
        return (
          <div className="space-y-8">
            {/* Toast Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Toast Variants</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Toast variant="default">
                    <ToastTitle>Default Toast</ToastTitle>
                    <ToastDescription>This is a default toast message.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Toast variant="success">
                    <ToastTitle>Success!</ToastTitle>
                    <ToastDescription>Your action was completed successfully.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Toast variant="warning">
                    <ToastTitle>Warning</ToastTitle>
                    <ToastDescription>Please check your input before proceeding.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Toast variant="destructive">
                    <ToastTitle>Error</ToastTitle>
                    <ToastDescription>Something went wrong. Please try again.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Toast variant="info">
                    <ToastTitle>Information</ToastTitle>
                    <ToastDescription>Here's some useful information for you.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Toast variant="premium">
                    <ToastTitle>Premium Feature</ToastTitle>
                    <ToastDescription>Unlock premium features with our pro plan.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Toast variant="featured">
                    <ToastTitle>Featured Content</ToastTitle>
                    <ToastDescription>Check out our latest featured content.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glass</div>
                  <Toast variant="glass">
                    <ToastTitle>Glass Effect</ToastTitle>
                    <ToastDescription>Modern glass morphism design toast.</ToastDescription>
                  </Toast>
                </div>
              </div>
            </div>

            {/* Toast Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Toast Sizes</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Small</div>
                  <Toast size="sm" variant="info">
                    <ToastTitle>Small Toast</ToastTitle>
                    <ToastDescription>Compact toast message.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Medium</div>
                  <Toast size="md" variant="success">
                    <ToastTitle>Medium Toast</ToastTitle>
                    <ToastDescription>Standard sized toast message.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Large</div>
                  <Toast size="lg" variant="premium">
                    <ToastTitle>Large Toast</ToastTitle>
                    <ToastDescription>Large toast message with more space.</ToastDescription>
                  </Toast>
                </div>
              </div>
            </div>

            {/* Toast Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Toast Features</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Custom Icon</div>
                  <Toast variant="premium" icon="🎉">
                    <ToastTitle>Custom Icon</ToastTitle>
                    <ToastDescription>Toast with a custom emoji icon.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">No Auto Icon</div>
                  <Toast variant="success" autoIcon={false}>
                    <ToastTitle>No Auto Icon</ToastTitle>
                    <ToastDescription>Toast without automatic icon display.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Animated</div>
                  <Toast variant="featured" animated>
                    <ToastTitle>Animated Toast</ToastTitle>
                    <ToastDescription>Toast with pulse animation effect.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing</div>
                  <Toast variant="premium" glowing>
                    <ToastTitle>Glowing Toast</ToastTitle>
                    <ToastDescription>Toast with glowing shadow effect.</ToastDescription>
                  </Toast>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Shimmer Effect</div>
                  <Toast variant="glass" showShimmer>
                    <ToastTitle>Shimmer Toast</ToastTitle>
                    <ToastDescription>Toast with shimmer animation effect.</ToastDescription>
                  </Toast>
                </div>
              </div>
            </div>
          </div>
        );

      case 'separator':
        return (
          <div className="space-y-8">
            {/* Separator Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Separator Variants</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Default</div>
                  <Separator variant="default" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Subtle</div>
                  <Separator variant="subtle" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Bold</div>
                  <Separator variant="bold" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Separator variant="success" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Separator variant="warning" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Destructive</div>
                  <Separator variant="destructive" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Separator variant="info" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Separator variant="premium" />
                </div>
              </div>
            </div>

            {/* Separator Sizes */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Separator Sizes</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Separator size="xs" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Separator size="sm" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Separator size="md" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Separator size="lg" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Separator size="xl" />
                </div>
              </div>
            </div>

            {/* Separator Orientations */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Separator Orientations</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Horizontal</div>
                  <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                    <Separator orientation="horizontal" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Vertical</div>
                  <div className="flex items-center space-x-6 h-12 p-4 bg-background/50 rounded-xl border border-border/30">
                    <span className="text-sm text-muted-foreground">Left</span>
                    <Separator orientation="vertical" />
                    <span className="text-sm text-muted-foreground">Right</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Separators */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Animated Separators</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Pulse Animation</div>
                  <Separator variant="default" animated />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success with Pulse</div>
                  <Separator variant="success" animated />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium with Pulse</div>
                  <Separator variant="premium" animated />
                </div>
              </div>
            </div>

            {/* Separators with Labels */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Separators with Labels</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Center Label</div>
                  <Separator label="Section Divider" labelPosition="center" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Left Label</div>
                  <Separator label="Left Aligned" labelPosition="left" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Right Label</div>
                  <Separator label="Right Aligned" labelPosition="right" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Label with Icon</div>
                  <Separator label="Premium Section" labelPosition="center" showIcon icon="⭐" />
                </div>
              </div>
            </div>

            {/* Vertical Separators with Labels */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Vertical Separators with Labels</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Vertical Center Label</div>
                  <div className="flex items-center h-32 p-4 bg-background/50 rounded-xl border border-border/30">
                    <Separator orientation="vertical" label="Vertical" labelPosition="center" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Vertical with Icon</div>
                  <div className="flex items-center h-32 p-4 bg-background/50 rounded-xl border border-border/30">
                    <Separator orientation="vertical" label="Divider" labelPosition="center" showIcon icon="📏" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'input':
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
                  <Input placeholder="Default input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Success</div>
                  <Input placeholder="Success input" variant="success" success="Input is valid" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Warning</div>
                  <Input placeholder="Warning input" variant="warning" warning="Please check this input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Error</div>
                  <Input placeholder="Error input" variant="error" error="This field is required" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Info</div>
                  <Input placeholder="Info input" variant="info" info="Additional information" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Premium</div>
                  <Input placeholder="Premium input" variant="premium" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Featured</div>
                  <Input placeholder="Featured input" variant="featured" />
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
                  <div className="text-sm font-medium text-muted-foreground">XS</div>
                  <Input size="xs" placeholder="Extra small input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">SM</div>
                  <Input size="sm" placeholder="Small input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">MD</div>
                  <Input size="md" placeholder="Medium input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">LG</div>
                  <Input size="lg" placeholder="Large input" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">XL</div>
                  <Input size="xl" placeholder="Extra large input" />
                </div>
              </div>
            </div>

            {/* Input with Icons */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input with Icons</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Search Icon</div>
                  <Input placeholder="Search..." autoIcon iconType="search" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Email Icon</div>
                  <Input type="email" placeholder="Enter your email" autoIcon iconType="email" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">User Icon</div>
                  <Input placeholder="Username" autoIcon iconType="user" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Phone Icon</div>
                  <Input type="tel" placeholder="Phone number" autoIcon iconType="phone" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Calendar Icon</div>
                  <Input type="date" autoIcon iconType="calendar" />
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
                  <div className="text-sm font-medium text-muted-foreground">Clearable Input</div>
                  <Input placeholder="Type something..." clearable defaultValue="Sample text" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Password with Toggle</div>
                  <Input type="password" placeholder="Enter password" showPasswordToggle />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Character Count</div>
                  <Input placeholder="Type up to 50 characters" maxLength={50} showCharacterCount />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Loading State</div>
                  <Input placeholder="Loading..." loading />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Glowing Effect</div>
                  <Input placeholder="Glowing input" glowing />
                </div>
              </div>
            </div>

            {/* Input with Labels */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input with Labels</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Standard Label</div>
                  <Input label="Email Address" type="email" placeholder="Enter your email" autoIcon iconType="email" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Floating Label</div>
                  <Input label="Username" floatingLabel placeholder="Enter username" autoIcon iconType="user" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Required Field</div>
                  <Input label="Password" type="password" placeholder="Enter password" required showPasswordToggle />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Helper Text</div>
                  <Input label="Phone Number" type="tel" placeholder="Enter phone number" helperText="Include country code" autoIcon iconType="phone" />
                </div>
              </div>
            </div>

            {/* Input Addons */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Input Addons</h4>
              </div>
              <div className="space-y-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Left Addon</div>
                  <Input placeholder="Enter amount" leftAddon="$" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Right Addon</div>
                  <Input placeholder="Enter percentage" rightAddon="%" />
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Both Addons</div>
                  <Input placeholder="Price" leftAddon="$" rightAddon=".00" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-12">
            {/* Variants */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Variants</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Default Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component variant="default" size="md">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Default Card</h3>
                        <p className="text-sm text-muted-foreground">This is a default card with subtle styling.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Elevated Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component variant="elevated" size="md">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
                        <p className="text-sm text-muted-foreground">This card has enhanced shadows and hover effects.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Outlined Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component variant="outlined" size="md">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
                        <p className="text-sm text-muted-foreground">This card has a prominent border outline.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Filled Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component variant="filled" size="md">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Filled Card</h3>
                        <p className="text-sm text-muted-foreground">This card has a gradient background fill.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
              </div>
            </div>

            {/* Interactive Cards */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Cards</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Clickable Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component 
                      variant="interactive" 
                      size="md"
                      clickable
                      onCardClick={() => alert('Card clicked!')}
                    >
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
                        <p className="text-sm text-muted-foreground">Click this card to see the interaction.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Hoverable Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component variant="default" size="md" hoverable>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
                        <p className="text-sm text-muted-foreground">Hover over this card to see the shimmer effect.</p>
                      </div>
                    </component.component>
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
              <div className="space-y-6 p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Small Card</div>
                  <Suspense fallback={<div className="h-24 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component size="sm">
                      <div className="p-4">
                        <h3 className="text-base font-semibold mb-1">Small Card</h3>
                        <p className="text-xs text-muted-foreground">Compact card with minimal padding.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Medium Card</div>
                  <Suspense fallback={<div className="h-28 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component size="md">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Medium Card</h3>
                        <p className="text-sm text-muted-foreground">Standard card with balanced padding.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground">Large Card</div>
                  <Suspense fallback={<div className="h-32 w-full bg-muted animate-pulse rounded-2xl"></div>}>
                    <component.component size="lg">
                      <div className="p-8">
                        <h3 className="text-xl font-semibold mb-3">Large Card</h3>
                        <p className="text-base text-muted-foreground">Spacious card with generous padding for content.</p>
                      </div>
                    </component.component>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Default</h4>
              </div>
              <div className="flex items-center justify-center p-12 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
                <Suspense fallback={<div className="h-12 w-32 bg-muted animate-pulse rounded-lg"></div>}>
                  <component.component {...component.props} />
                </Suspense>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderVariants();
}

function ComponentCodeExamples({ component }: { component: ComponentInfo }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateVariantCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    return `import { ${component.name} } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <${component.name} ${propsString}>
      ${variantName}
    </${component.name}>
  );
}`;
  };

  const generateSelectCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    return `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Select>
      <SelectTrigger ${propsString}>
        <SelectValue placeholder="${props.placeholder || 'Select option'}" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}`;
  };

  const generateCheckboxCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    return `import { Checkbox } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Checkbox ${propsString} />
  );
}`;
  };

  const generateSwitchCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : '';
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join(' ');

    return `import { Switch } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Switch ${propsString} />
  );
}`;
  };

  const generateTabsCode = (variantName: string, props: any = {}) => {
    const { variant = 'default', icon = false, badge = false, animated = false, scrollable = false, showArrows = false } = props;
    
    const tabsListProps = [];
    if (variant !== 'default') tabsListProps.push(`variant="${variant}"`);
    if (scrollable) tabsListProps.push('scrollable');
    if (showArrows) tabsListProps.push('showArrows');
    
    const tabsTriggerProps = [];
    if (variant !== 'default') tabsTriggerProps.push(`variant="${variant}"`);
    if (animated) tabsTriggerProps.push('animated');
    if (icon) tabsTriggerProps.push('icon="🏠"');
    if (badge) tabsTriggerProps.push('badge="5"');
    
    const tabsContentProps = [];
    if (variant !== 'default') tabsContentProps.push(`variant="${variant}"`);
    if (animated) tabsContentProps.push('animated');
    
    const tabsListPropsString = tabsListProps.join(' ');
    const tabsTriggerPropsString = tabsTriggerProps.join(' ');
    const tabsContentPropsString = tabsContentProps.join(' ');

    return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList ${tabsListPropsString}>
        <TabsTrigger value="tab1" ${tabsTriggerPropsString}>
          ${icon ? '🏠 ' : ''}Tab 1${badge ? ' (5)' : ''}
        </TabsTrigger>
        <TabsTrigger value="tab2" ${tabsTriggerPropsString}>
          ${icon ? '⚙️ ' : ''}Tab 2${badge ? ' (12)' : ''}
        </TabsTrigger>
        <TabsTrigger value="tab3" ${tabsTriggerPropsString}>
          ${icon ? '📊 ' : ''}Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" ${tabsContentPropsString}>
        <p>First tab content goes here.</p>
      </TabsContent>
      <TabsContent value="tab2" ${tabsContentPropsString}>
        <p>Second tab content goes here.</p>
      </TabsContent>
      <TabsContent value="tab3" ${tabsContentPropsString}>
        <p>Third tab content goes here.</p>
      </TabsContent>
    </Tabs>
  );
}`;
  };

  const generateAlertCode = (variantName: string, props: any = {}) => {
    const { variant = 'default', dismissible = false, icon = false, autoIcon = true, animated = false, glowing = false, showShimmer = false } = props;
    
    const alertProps = [];
    if (variant !== 'default') alertProps.push(`variant="${variant}"`);
    if (dismissible) alertProps.push('dismissible');
    if (icon) alertProps.push(`icon="${icon}"`);
    if (!autoIcon) alertProps.push('autoIcon={false}');
    if (animated) alertProps.push('animated');
    if (glowing) alertProps.push('glowing');
    if (showShimmer) alertProps.push('showShimmer');
    
    const alertPropsString = alertProps.join(' ');

    return `import { Alert, AlertTitle, AlertDescription } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Alert ${alertPropsString}>
      <AlertTitle>${variantName}</AlertTitle>
      <AlertDescription>Your alert message goes here.</AlertDescription>
    </Alert>
  );
}`;
  };

  const generateProgressCode = (variantName: string, props: any = {}) => {
    const { variant = 'default', value = 75, size = 'md', icon = false, autoIcon = true, showShimmer = true, showGlow = true, showValue = true, label = 'Progress' } = props;
    
    const progressProps = [];
    if (value !== 75) progressProps.push(`value={${value}}`);
    if (variant !== 'default') progressProps.push(`variant="${variant}"`);
    if (size !== 'md') progressProps.push(`size="${size}"`);
    if (icon) progressProps.push(`icon="${icon}"`);
    if (!autoIcon) progressProps.push('autoIcon={false}');
    if (!showShimmer) progressProps.push('showShimmer={false}');
    if (!showGlow) progressProps.push('showGlow={false}');
    if (showValue) progressProps.push('showValue');
    if (label) progressProps.push(`label="${label}"`);
    
    const progressPropsString = progressProps.join(' ');

    return `import { Progress } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Progress ${progressPropsString} />
  );
}`;
  };

  const generateToastCode = (variantName: string, props: any = {}) => {
    const { variant = 'default', size = 'md', icon = false, autoIcon = true, animated = false, glowing = false, showShimmer = false } = props;
    
    const toastProps = [];
    if (variant !== 'default') toastProps.push(`variant="${variant}"`);
    if (size !== 'md') toastProps.push(`size="${size}"`);
    if (icon) toastProps.push(`icon="${icon}"`);
    if (!autoIcon) toastProps.push('autoIcon={false}');
    if (animated) toastProps.push('animated');
    if (glowing) toastProps.push('glowing');
    if (showShimmer) toastProps.push('showShimmer');
    
    const toastPropsString = toastProps.join(' ');

    return `import { Toast, ToastTitle, ToastDescription } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Toast ${toastPropsString}>
      <ToastTitle>${variantName}</ToastTitle>
      <ToastDescription>Your toast message goes here.</ToastDescription>
    </Toast>
  );
}`;
  };

  const renderCodeExamples = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="space-y-8">
            {/* Variants Code */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
              </div>
              
              <div className="grid gap-6">
                {[
                  { variant: 'primary', label: 'Primary Button' },
                  { variant: 'secondary', label: 'Secondary Button' },
                  { variant: 'outline', label: 'Outline Button' },
                  { variant: 'ghost', label: 'Ghost Button' },
                  { variant: 'link', label: 'Link Button' },
                  { variant: 'destructive', label: 'Destructive Button' },
                  { variant: 'success', label: 'Success Button' }
                ].map(({ variant, label }) => (
                  <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground">{label}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generateVariantCode(label, { variant }))}
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className="text-foreground">{generateVariantCode(label, { variant })}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes Code */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Size Examples</h4>
              </div>
              
              <div className="grid gap-6">
                {[
                  { size: 'xs', label: 'Extra Small Button' },
                  { size: 'sm', label: 'Small Button' },
                  { size: 'md', label: 'Medium Button' },
                  { size: 'lg', label: 'Large Button' },
                  { size: 'xl', label: 'Extra Large Button' }
                ].map(({ size, label }) => (
                  <div key={size} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground">{label}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generateVariantCode(label, { size }))}
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className="text-foreground">{generateVariantCode(label, { size })}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Special Features</h4>
              </div>
              
              <div className="grid gap-6">
                {[
                  { props: { loading: true }, label: 'Loading Button' },
                  { props: { icon: '🚀', iconPosition: 'left' }, label: 'Button with Icon (Left)' },
                  { props: { icon: '→', iconPosition: 'right' }, label: 'Button with Icon (Right)' },
                  { props: { fullWidth: true }, label: 'Full Width Button' }
                ].map(({ props, label }, index) => (
                  <div key={index} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground">{label}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generateVariantCode(label, props))}
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className="text-foreground">{generateVariantCode(label, props)}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Badge Variants</h4>
              </div>
              
              <div className="grid gap-6">
                {[
                  { variant: 'default', label: 'Default Badge' },
                  { variant: 'secondary', label: 'Secondary Badge' },
                  { variant: 'destructive', label: 'Destructive Badge' },
                  { variant: 'outline', label: 'Outline Badge' }
                ].map(({ variant, label }) => (
                  <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground">{label}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generateVariantCode(label, { variant }))}
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className="text-foreground">{generateVariantCode(label, { variant })}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Progress Examples</h4>
              </div>
              
              <div className="grid gap-6">
                {[
                  { value: 25, label: '25% Progress' },
                  { value: 50, label: '50% Progress' },
                  { value: 75, label: '75% Progress' },
                  { value: 100, label: '100% Progress' }
                ].map(({ value, label }) => (
                  <div key={value} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground">{label}</h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generateVariantCode(label, { value }))}
                        className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                        <code className="text-foreground">{generateVariantCode(label, { value })}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

             case 'card':
               return (
                 <div className="space-y-8">
                   {/* Card Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Variants</h4>
                     </div>

                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Card' },
                         { variant: 'elevated', label: 'Elevated Card' },
                         { variant: 'outlined', label: 'Outlined Card' },
                         { variant: 'filled', label: 'Filled Card' },
                         { variant: 'interactive', label: 'Interactive Card' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="relative">
                             <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                               <code className="text-foreground">{generateVariantCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Card Sizes Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Card Sizes</h4>
                     </div>

                     <div className="grid gap-6">
                       {[
                         { size: 'sm', label: 'Small Card' },
                         { size: 'md', label: 'Medium Card' },
                         { size: 'lg', label: 'Large Card' },
                         { size: 'xl', label: 'Extra Large Card' }
                       ].map(({ size, label }) => (
                         <div key={size} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { size }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="relative">
                             <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                               <code className="text-foreground">{generateVariantCode(label, { size })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Interactive Features */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Interactive Features</h4>
                     </div>

                     <div className="grid gap-6">
                       {[
                         { props: { clickable: true, onCardClick: '() => alert("Card clicked!")' }, label: 'Clickable Card' },
                         { props: { hoverable: true }, label: 'Hoverable Card' },
                         { props: { interactive: true }, label: 'Interactive Card' }
                       ].map(({ props, label }, index) => (
                         <div key={index} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, props))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="relative">
                             <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                               <code className="text-foreground">{generateVariantCode(label, props)}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'input':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Input' },
                         { variant: 'success', label: 'Success Input' },
                         { variant: 'warning', label: 'Warning Input' },
                         { variant: 'error', label: 'Error Input' },
                         { variant: 'info', label: 'Info Input' },
                         { variant: 'premium', label: 'Premium Input' },
                         { variant: 'featured', label: 'Featured Input' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateVariantCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                         <div className="flex items-center justify-between">
                           <h5 className="font-semibold text-foreground">With Auto Icon</h5>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => copyToClipboard(generateVariantCode('Input with Auto Icon', { autoIcon: true, iconType: 'email' }))}
                             className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                           >
                             <Copy className="h-3 w-3 mr-1" />
                             Copy
                           </Button>
                         </div>
                         <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                           <pre className="text-sm text-foreground/80 overflow-x-auto">
                             <code>{generateVariantCode('Input with Auto Icon', { autoIcon: true, iconType: 'email' })}</code>
                           </pre>
                         </div>
                       </div>

                       <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                         <div className="flex items-center justify-between">
                           <h5 className="font-semibold text-foreground">Clearable Input</h5>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => copyToClipboard(generateVariantCode('Clearable Input', { clearable: true }))}
                             className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                           >
                             <Copy className="h-3 w-3 mr-1" />
                             Copy
                           </Button>
                         </div>
                         <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                           <pre className="text-sm text-foreground/80 overflow-x-auto">
                             <code>{generateVariantCode('Clearable Input', { clearable: true })}</code>
                           </pre>
                         </div>
                       </div>

                       <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                         <div className="flex items-center justify-between">
                           <h5 className="font-semibold text-foreground">Floating Label</h5>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => copyToClipboard(generateVariantCode('Floating Label Input', { floatingLabel: true, label: 'Username' }))}
                             className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                           >
                             <Copy className="h-3 w-3 mr-1" />
                             Copy
                           </Button>
                         </div>
                         <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                           <pre className="text-sm text-foreground/80 overflow-x-auto">
                             <code>{generateVariantCode('Floating Label Input', { floatingLabel: true, label: 'Username' })}</code>
                           </pre>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               );

             case 'textarea':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Textarea' },
                         { variant: 'success', label: 'Success Textarea', props: { success: 'Textarea is valid' } },
                         { variant: 'warning', label: 'Warning Textarea', props: { warning: 'Please check this textarea' } },
                         { variant: 'error', label: 'Error Textarea', props: { error: 'This field is required' } },
                         { variant: 'info', label: 'Info Textarea', props: { info: 'Additional information' } },
                         { variant: 'premium', label: 'Premium Textarea' },
                         { variant: 'featured', label: 'Featured Textarea' }
                       ].map(({ variant, label, props = {} }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { variant, placeholder: `${label} placeholder`, ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateVariantCode(label, { variant, placeholder: `${label} placeholder`, ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'clearable', label: 'Clearable Textarea', props: { clearable: true, defaultValue: 'Sample text content' } },
                         { feature: 'characterCount', label: 'Character Count Textarea', props: { maxLength: 200, showCharacterCount: true } },
                         { feature: 'loading', label: 'Loading Textarea', props: { loading: true } },
                         { feature: 'glowing', label: 'Glowing Textarea', props: { glowing: true } },
                         { feature: 'floatingLabel', label: 'Floating Label Textarea', props: { floatingLabel: true, label: 'Comments' } },
                         { feature: 'autoIcon', label: 'Auto Icon Textarea', props: { autoIcon: true, iconType: 'message' } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { placeholder: `${label} placeholder`, ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateVariantCode(label, { placeholder: `${label} placeholder`, ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'select':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Select' },
                         { variant: 'success', label: 'Success Select', props: { success: 'Selection is valid' } },
                         { variant: 'warning', label: 'Warning Select', props: { warning: 'Please check your selection' } },
                         { variant: 'error', label: 'Error Select', props: { error: 'This field is required' } },
                         { variant: 'info', label: 'Info Select', props: { info: 'Additional information' } },
                         { variant: 'premium', label: 'Premium Select' },
                         { variant: 'featured', label: 'Featured Select' }
                       ].map(({ variant, label, props = {} }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateSelectCode(label, { variant, ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateSelectCode(label, { variant, ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'label', label: 'Select with Label', props: { label: 'Choose Country' } },
                         { feature: 'helperText', label: 'Select with Helper Text', props: { label: 'Payment Method', helperText: 'Choose your preferred payment method' } },
                         { feature: 'loading', label: 'Loading Select', props: { loading: true } },
                         { feature: 'glowing', label: 'Glowing Select', props: { glowing: true } },
                         { feature: 'size', label: 'Large Select', props: { size: 'lg' } },
                         { feature: 'icon', label: 'Select with Icon', props: { icon: '🏳️', iconPosition: 'left' } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateSelectCode(label, { placeholder: 'Select option', ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateSelectCode(label, { placeholder: 'Select option', ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'checkbox':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Checkbox' },
                         { variant: 'success', label: 'Success Checkbox', props: { success: 'Checkbox is valid' } },
                         { variant: 'warning', label: 'Warning Checkbox', props: { warning: 'Please check this option' } },
                         { variant: 'error', label: 'Error Checkbox', props: { error: 'This field is required' } },
                         { variant: 'info', label: 'Info Checkbox', props: { info: 'Additional information' } },
                         { variant: 'premium', label: 'Premium Checkbox' },
                         { variant: 'featured', label: 'Featured Checkbox' }
                       ].map(({ variant, label, props = {} }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateCheckboxCode(label, { variant, ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateCheckboxCode(label, { variant, ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'label', label: 'Checkbox with Label', props: { label: 'Accept Terms' } },
                         { feature: 'helperText', label: 'Checkbox with Helper Text', props: { label: 'Subscribe to Newsletter', helperText: 'Get updates about new features' } },
                         { feature: 'indeterminate', label: 'Indeterminate Checkbox', props: { indeterminate: true, label: 'Select All' } },
                         { feature: 'loading', label: 'Loading Checkbox', props: { loading: true, label: 'Processing...' } },
                         { feature: 'animated', label: 'Animated Checkbox', props: { animated: true, checked: true, label: 'Animated Checkbox' } },
                         { feature: 'glowing', label: 'Glowing Checkbox', props: { glowing: true, checked: true, label: 'Glowing Checkbox' } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateCheckboxCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateCheckboxCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'switch':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Switch' },
                         { variant: 'success', label: 'Success Switch', props: { success: 'Switch is enabled' } },
                         { variant: 'warning', label: 'Warning Switch', props: { warning: 'Please check this setting' } },
                         { variant: 'error', label: 'Error Switch', props: { error: 'This setting is required' } },
                         { variant: 'info', label: 'Info Switch', props: { info: 'Additional information' } },
                         { variant: 'premium', label: 'Premium Switch' },
                         { variant: 'featured', label: 'Featured Switch' },
                         { variant: 'ios26', label: 'iOS 26 Switch' }
                       ].map(({ variant, label, props = {} }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateSwitchCode(label, { variant, ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateSwitchCode(label, { variant, ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'label', label: 'Switch with Label', props: { label: 'Enable Notifications' } },
                         { feature: 'helperText', label: 'Switch with Helper Text', props: { label: 'Dark Mode', helperText: 'Toggle dark mode theme' } },
                         { feature: 'loading', label: 'Loading Switch', props: { loading: true, label: 'Processing...' } },
                         { feature: 'animated', label: 'Animated Switch', props: { animated: true, checked: true, label: 'Animated Switch' } },
                         { feature: 'glowing', label: 'Glowing Switch', props: { glowing: true, checked: true, label: 'Glowing Switch' } },
                         { feature: 'showIcons', label: 'Switch with Icons', props: { showIcons: true, variant: 'success', checked: true, label: 'Show Status Icons' } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateSwitchCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateSwitchCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'tabs':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Tabs' },
                         { variant: 'outlined', label: 'Outlined Tabs' },
                         { variant: 'filled', label: 'Filled Tabs' },
                         { variant: 'premium', label: 'Premium Tabs' },
                         { variant: 'featured', label: 'Featured Tabs' },
                         { variant: 'glass', label: 'Glass Tabs' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateTabsCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateTabsCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'icons', label: 'Tabs with Icons', props: { icon: true } },
                         { feature: 'badges', label: 'Tabs with Badges', props: { badge: true } },
                         { feature: 'animated', label: 'Animated Tabs', props: { animated: true } },
                         { feature: 'scrollable', label: 'Scrollable Tabs', props: { scrollable: true, showArrows: true } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateTabsCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateTabsCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'alert':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Alert' },
                         { variant: 'success', label: 'Success Alert' },
                         { variant: 'warning', label: 'Warning Alert' },
                         { variant: 'destructive', label: 'Error Alert' },
                         { variant: 'info', label: 'Info Alert' },
                         { variant: 'premium', label: 'Premium Alert' },
                         { variant: 'featured', label: 'Featured Alert' },
                         { variant: 'glass', label: 'Glass Alert' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateAlertCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateAlertCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'dismissible', label: 'Dismissible Alert', props: { dismissible: true } },
                         { feature: 'customIcon', label: 'Custom Icon Alert', props: { icon: '🎉' } },
                         { feature: 'noAutoIcon', label: 'No Auto Icon Alert', props: { autoIcon: false } },
                         { feature: 'animated', label: 'Animated Alert', props: { animated: true } },
                         { feature: 'glowing', label: 'Glowing Alert', props: { glowing: true } },
                         { feature: 'shimmer', label: 'Shimmer Alert', props: { showShimmer: true } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateAlertCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateAlertCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'progress':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Progress', value: 75 },
                         { variant: 'success', label: 'Success Progress', value: 85 },
                         { variant: 'warning', label: 'Warning Progress', value: 65 },
                         { variant: 'destructive', label: 'Error Progress', value: 45 },
                         { variant: 'info', label: 'Info Progress', value: 70 },
                         { variant: 'premium', label: 'Premium Progress', value: 90 },
                         { variant: 'featured', label: 'Featured Progress', value: 95 },
                         { variant: 'glass', label: 'Glass Progress', value: 80 }
                       ].map(({ variant, label, value }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateProgressCode(label, { variant, value }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateProgressCode(label, { variant, value })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'customIcon', label: 'Custom Icon Progress', props: { icon: '🎯', variant: 'success', value: 70 } },
                         { feature: 'noAutoIcon', label: 'No Auto Icon Progress', props: { autoIcon: false, variant: 'premium', value: 80 } },
                         { feature: 'noShimmer', label: 'No Shimmer Progress', props: { showShimmer: false, variant: 'info', value: 75 } },
                         { feature: 'noGlow', label: 'No Glow Progress', props: { showGlow: false, variant: 'featured', value: 85 } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateProgressCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateProgressCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'toast':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Toast' },
                         { variant: 'success', label: 'Success Toast' },
                         { variant: 'warning', label: 'Warning Toast' },
                         { variant: 'destructive', label: 'Error Toast' },
                         { variant: 'info', label: 'Info Toast' },
                         { variant: 'premium', label: 'Premium Toast' },
                         { variant: 'featured', label: 'Featured Toast' },
                         { variant: 'glass', label: 'Glass Toast' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateToastCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateToastCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Features Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Feature Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { feature: 'customIcon', label: 'Custom Icon Toast', props: { icon: '🎉', variant: 'premium' } },
                         { feature: 'noAutoIcon', label: 'No Auto Icon Toast', props: { autoIcon: false, variant: 'success' } },
                         { feature: 'animated', label: 'Animated Toast', props: { animated: true, variant: 'featured' } },
                         { feature: 'glowing', label: 'Glowing Toast', props: { glowing: true, variant: 'premium' } },
                         { feature: 'shimmer', label: 'Shimmer Toast', props: { showShimmer: true, variant: 'glass' } }
                       ].map(({ feature, label, props = {} }) => (
                         <div key={feature} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateToastCode(label, { ...props }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateToastCode(label, { ...props })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               );

             case 'separator':
               return (
                 <div className="space-y-8">
                   {/* Variants Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Variant Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { variant: 'default', label: 'Default Separator' },
                         { variant: 'subtle', label: 'Subtle Separator' },
                         { variant: 'bold', label: 'Bold Separator' },
                         { variant: 'success', label: 'Success Separator' },
                         { variant: 'warning', label: 'Warning Separator' },
                         { variant: 'destructive', label: 'Destructive Separator' },
                         { variant: 'info', label: 'Info Separator' },
                         { variant: 'premium', label: 'Premium Separator' }
                       ].map(({ variant, label }) => (
                         <div key={variant} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { variant }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateVariantCode(label, { variant })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Sizes Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Size Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       {[
                         { size: 'xs', label: 'Extra Small Separator' },
                         { size: 'sm', label: 'Small Separator' },
                         { size: 'md', label: 'Medium Separator' },
                         { size: 'lg', label: 'Large Separator' },
                         { size: 'xl', label: 'Extra Large Separator' }
                       ].map(({ size, label }) => (
                         <div key={size} className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                           <div className="flex items-center justify-between">
                             <h5 className="font-semibold text-foreground">{label}</h5>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => copyToClipboard(generateVariantCode(label, { size }))}
                               className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                             >
                               <Copy className="h-3 w-3 mr-1" />
                               Copy
                             </Button>
                           </div>
                           <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                             <pre className="text-sm text-foreground/80 overflow-x-auto">
                               <code>{generateVariantCode(label, { size })}</code>
                             </pre>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Label Examples Code */}
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Label Examples</h4>
                     </div>
                     
                     <div className="grid gap-6">
                       <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                         <div className="flex items-center justify-between">
                           <h5 className="font-semibold text-foreground">Center Label</h5>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => copyToClipboard(generateVariantCode('Center Label Separator', { label: 'Section Divider', labelPosition: 'center' }))}
                             className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                           >
                             <Copy className="h-3 w-3 mr-1" />
                             Copy
                           </Button>
                         </div>
                         <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                           <pre className="text-sm text-foreground/80 overflow-x-auto">
                             <code>{generateVariantCode('Center Label Separator', { label: 'Section Divider', labelPosition: 'center' })}</code>
                           </pre>
                         </div>
                       </div>

                       <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                         <div className="flex items-center justify-between">
                           <h5 className="font-semibold text-foreground">Label with Icon</h5>
                           <Button
                             variant="ghost"
                             size="sm"
                             onClick={() => copyToClipboard(generateVariantCode('Label with Icon Separator', { label: 'Premium Section', labelPosition: 'center', showIcon: true, icon: '⭐' }))}
                             className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                           >
                             <Copy className="h-3 w-3 mr-1" />
                             Copy
                           </Button>
                         </div>
                         <div className="bg-background/80 p-4 rounded-lg border border-border/30">
                           <pre className="text-sm text-foreground/80 overflow-x-auto">
                             <code>{generateVariantCode('Label with Icon Separator', { label: 'Premium Section', labelPosition: 'center', showIcon: true, icon: '⭐' })}</code>
                           </pre>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               );

             default:
               return (
                 <div className="space-y-8">
                   <div className="space-y-6">
                     <div className="flex items-center space-x-3">
                       <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                       <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Basic Usage</h4>
                     </div>

                     <div className="space-y-4 p-6 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-2xl">
                       <div className="flex items-center justify-between">
                         <h5 className="font-semibold text-foreground">Default {component.name}</h5>
                         <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => copyToClipboard(generateVariantCode(component.name, component.props))}
                           className="h-8 px-3 hover:bg-primary/10 hover:text-primary transition-colors"
                         >
                           <Copy className="h-3 w-3 mr-1" />
                           Copy
                         </Button>
                       </div>
                       <div className="relative">
                         <pre className="bg-muted/50 border border-border/30 p-4 rounded-xl overflow-x-auto text-sm">
                           <code className="text-foreground">{generateVariantCode(component.name, component.props)}</code>
                         </pre>
                       </div>
                     </div>
                   </div>
                 </div>
               );
    }
  };

  return renderCodeExamples();
}
