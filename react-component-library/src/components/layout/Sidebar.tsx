import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ComponentInfo } from '../../data/componentData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Search, Component, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  components: ComponentInfo[];
  selectedComponent: ComponentInfo | null;
  selectedCategory: string | null;
  searchQuery: string;
  onComponentSelect: (component: ComponentInfo) => void;
  onCategorySelect: (category: string | null) => void;
  onSearchChange: (query: string) => void;
}

export function Sidebar({
  components,
  selectedComponent,
  selectedCategory,
  searchQuery,
  onComponentSelect,
  onCategorySelect,
  onSearchChange,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get unique categories from components
  const categories = Array.from(new Set(components.map(component => component.category)));
  
  const handleComponentClick = (component: ComponentInfo) => {
    onComponentSelect(component);
    navigate(`/${component.id}`);
  };
  
  return (
    <aside className="w-96 border-r border-border/20 bg-background/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        {/* Search */}
        <div className="p-6 border-b border-border/10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors duration-300" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 h-12 bg-background/60 border-border/30 focus:bg-background focus:border-primary/50 rounded-xl transition-all duration-300 placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="p-6 border-b border-border/10">
          <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Components
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategorySelect(category)}
                className={cn(
                  "text-sm h-9 px-4 rounded-xl font-medium transition-all duration-300",
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40" 
                    : "hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 border-border/30 hover:border-primary/30"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Components List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Library
              </h3>
              <Badge variant="secondary" className="text-sm h-7 px-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-primary font-semibold">
                {components.length}
              </Badge>
            </div>
            
            <div className="space-y-2">
              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => handleComponentClick(component)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all duration-300 group relative overflow-hidden",
                    "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5",
                    selectedComponent?.id === component.id || location.pathname === `/${component.id}`
                      ? "bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/30 shadow-lg shadow-primary/10"
                      : "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 border border-transparent hover:border-primary/20"
                  )}
                >
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center space-x-4 min-w-0 flex-1 relative z-10">
                    <div className={cn(
                      "flex-shrink-0 p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                      selectedComponent?.id === component.id || location.pathname === `/${component.id}`
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg"
                        : "bg-gradient-to-br from-muted/60 to-muted/40 text-muted-foreground group-hover:from-primary/20 group-hover:to-accent/20 group-hover:text-primary"
                    )}>
                      <Component className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-base truncate mb-1">{component.name}</div>
                      <div className="text-sm text-muted-foreground/80 truncate leading-relaxed">
                        {component.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={cn(
                    "h-5 w-5 text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary",
                    (selectedComponent?.id === component.id || location.pathname === `/${component.id}`) && "translate-x-1 text-primary"
                  )} />
                </button>
              ))}
            </div>

            {components.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <div className="h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Component className="h-8 w-8 text-primary/60" />
                </div>
                <p className="text-lg font-semibold mb-2">No components found</p>
                <p className="text-sm text-muted-foreground/80">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/10 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Live System</span>
            </div>
            <p className="text-xs text-muted-foreground/80 font-medium">Built with ❤️ by bennbatuu</p>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground/60">
              <span className="px-2 py-1 bg-primary/10 rounded-lg font-medium">React</span>
              <span className="px-2 py-1 bg-primary/10 rounded-lg font-medium">TypeScript</span>
              <span className="px-2 py-1 bg-primary/10 rounded-lg font-medium">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
