import { ComponentInfo } from '../data/componentData';
import { Copy } from 'lucide-react';

interface ComponentCodeExamplesProps {
  component: ComponentInfo;
}

export function ComponentCodeExamples({ component }: ComponentCodeExamplesProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateVariantCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
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
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Select ${propsString}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
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
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Checkbox } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Checkbox ${propsString}>
      ${variantName}
    </Checkbox>
  );
}`;
  };

  const generateSwitchCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Switch } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Switch ${propsString}>
      ${variantName}
    </Switch>
  );
}`;
  };

  const generateTabsCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Tabs ${propsString} defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for tab 1</TabsContent>
      <TabsContent value="tab2">Content for tab 2</TabsContent>
      <TabsContent value="tab3">Content for tab 3</TabsContent>
    </Tabs>
  );
}`;
  };

  const generateAlertCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Alert, AlertTitle, AlertDescription } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Alert ${propsString}>
      <AlertTitle>${variantName}</AlertTitle>
      <AlertDescription>Your alert message goes here.</AlertDescription>
    </Alert>
  );
}`;
  };

  const generateProgressCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Progress } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Progress ${propsString} />
  );
}`;
  };

  const generateToastCode = (variantName: string, props: any = {}) => {
    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== false)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return key;
        } else if (typeof value === 'number') {
          return `${key}={${value}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `import { Toast, ToastTitle, ToastDescription } from '@bennbatuu/react-components';

function MyComponent() {
  return (
    <Toast ${propsString}>
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
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Primary Button</h4>
                <button
                  onClick={() => copyToClipboard(generateVariantCode('Primary Button', { variant: 'primary' }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateVariantCode('Primary Button', { variant: 'primary' })}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Button with Icon</h4>
                <button
                  onClick={() => copyToClipboard(generateVariantCode('Download', { variant: 'primary', icon: '<Download className="h-4 w-4" />', iconPosition: 'left' }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateVariantCode('Download', { variant: 'primary', icon: '<Download className="h-4 w-4" />', iconPosition: 'left' })}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Loading Button</h4>
                <button
                  onClick={() => copyToClipboard(generateVariantCode('Loading...', { variant: 'primary', loading: true }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateVariantCode('Loading...', { variant: 'primary', loading: true })}</code>
              </pre>
            </div>
          </div>
        );

      case 'badge':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Default Badge</h4>
                <button
                  onClick={() => copyToClipboard(generateVariantCode('Default', { variant: 'default' }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateVariantCode('Default', { variant: 'default' })}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Removable Badge</h4>
                <button
                  onClick={() => copyToClipboard(generateVariantCode('Removable', { variant: 'default', removable: true, onRemove: '() => console.log("Removed")' }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateVariantCode('Removable', { variant: 'default', removable: true, onRemove: '() => console.log("Removed")' })}</code>
              </pre>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Select</h4>
                <button
                  onClick={() => copyToClipboard(generateSelectCode('Basic Select', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateSelectCode('Basic Select', {})}</code>
              </pre>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Checkbox</h4>
                <button
                  onClick={() => copyToClipboard(generateCheckboxCode('Basic Checkbox', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateCheckboxCode('Basic Checkbox', {})}</code>
              </pre>
            </div>
          </div>
        );

      case 'switch':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Switch</h4>
                <button
                  onClick={() => copyToClipboard(generateSwitchCode('Basic Switch', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateSwitchCode('Basic Switch', {})}</code>
              </pre>
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Tabs</h4>
                <button
                  onClick={() => copyToClipboard(generateTabsCode('Basic Tabs', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateTabsCode('Basic Tabs', {})}</code>
              </pre>
            </div>
          </div>
        );

      case 'alert':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Alert</h4>
                <button
                  onClick={() => copyToClipboard(generateAlertCode('Basic Alert', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateAlertCode('Basic Alert', {})}</code>
              </pre>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Progress</h4>
                <button
                  onClick={() => copyToClipboard(generateProgressCode('Basic Progress', { value: 50 }))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateProgressCode('Basic Progress', { value: 50 })}</code>
              </pre>
            </div>
          </div>
        );

      case 'toast':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">Basic Toast</h4>
                <button
                  onClick={() => copyToClipboard(generateToastCode('Basic Toast', {}))}
                  className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
                <code>{generateToastCode('Basic Toast', {})}</code>
              </pre>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">Basic Usage</h4>
              <button
                onClick={() => copyToClipboard(generateVariantCode('Basic Usage', {}))}
                className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-md transition-colors"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
            <pre className="bg-muted/50 p-4 rounded-lg text-xs overflow-x-auto">
              <code>{generateVariantCode('Basic Usage', {})}</code>
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
        <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Code Examples</h4>
      </div>
      <div className="p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
        {renderCodeExamples()}
      </div>
    </div>
  );
}
