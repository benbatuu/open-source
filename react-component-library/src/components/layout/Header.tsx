import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from '../ui/button';
import { Sun, Moon, Github, Sparkles, Zap, Home } from 'lucide-react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="relative border-b border-border/20 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="relative flex h-20 items-center justify-between px-8">
        <div className="flex items-center space-x-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent shadow-lg shadow-primary/25">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  ComponentLab
                </h1>
                <p className="text-sm text-muted-foreground/80 font-medium">
                  Premium Design System
                </p>
              </div>
            </button>
          </div>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Live</span>
            </div>
            <div className="w-px h-4 bg-border/50" />
            <div className="flex items-center space-x-2">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-medium text-muted-foreground">v2.0.0</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          {location.pathname !== '/' && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="h-11 w-11 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:scale-105 group"
              title="Go to Home"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="sr-only">Go to Home</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-11 w-11 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:scale-105 group"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            ) : (
              <Sun className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 transition-all duration-300 hover:scale-105 group"
            onClick={() => window.open('https://github.com/benbatuu/open-source', '_blank')}
            title="View on GitHub"
          >
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="sr-only">View on GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
