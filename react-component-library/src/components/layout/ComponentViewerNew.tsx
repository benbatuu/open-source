import React, { useState } from 'react';
import { ComponentInfo, getComponentProps } from '../../data/componentData';
import { ComponentCodeExamples } from '../ComponentCodeExamples';
import { PropsTable } from '../ui/props-table';
import { Eye, Code, Settings } from 'lucide-react';

interface ComponentViewerNewProps {
  component: ComponentInfo | null;
}

export function ComponentViewerNew({ component }: ComponentViewerNewProps) {
  const [activeTab, setActiveTab] = useState('preview');

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
            <Settings className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">No Component Selected</h3>
            <p className="text-sm text-muted-foreground">Select a component from the sidebar to view its documentation</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'props', label: 'Props', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'preview':
        if (component.route) {
          const RouteComponent = component.route;
          return <RouteComponent />;
        }
        return (
          <div className="flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <component.component className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{component.name}</h3>
                <p className="text-sm text-muted-foreground">{component.description}</p>
              </div>
            </div>
          </div>
        );

      case 'code':
        return <ComponentCodeExamples component={component} />;

      case 'props':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
              <h4 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Props</h4>
            </div>
            <div className="p-8 bg-gradient-to-br from-primary/5 via-background/50 to-accent/5 border border-primary/20 rounded-3xl">
              <PropsTable props={getComponentProps(component.id)} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {component.name}
            </h2>
            <p className="text-muted-foreground">{component.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
