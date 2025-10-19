import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { ComponentViewerNew } from './components/layout/ComponentViewerNew';
import { Header } from './components/layout/Header';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { components, ComponentInfo } from './data/componentData';
import './styles/globals.css';

function ComponentPage() {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const component = components.find(comp => comp.id === componentId);
  
  // Debug log
  console.log('ComponentPage - componentId:', componentId);
  console.log('ComponentPage - component:', component);
  
  // Filter components based on search and category
  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || comp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  if (!component) {
    return (
      <>
        <Sidebar
          components={filteredComponents}
          selectedComponent={null}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onComponentSelect={() => {}}
          onCategorySelect={setSelectedCategory}
          onSearchChange={setSearchQuery}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Component Not Found</h3>
              <p className="text-sm text-muted-foreground">The component "{componentId}" does not exist.</p>
              <button 
                onClick={() => navigate('/')}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar
        components={filteredComponents}
        selectedComponent={component}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onComponentSelect={() => {}}
        onCategorySelect={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      <ComponentViewerNew component={component} />
    </>
  );
}

function HomePage() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter components based on search and category
  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Set first component as selected by default
  useEffect(() => {
    if (filteredComponents.length > 0 && !selectedComponent) {
      setSelectedComponent(filteredComponents[0]);
    }
  }, [filteredComponents, selectedComponent]);

  return (
    <>
      <Sidebar
        components={filteredComponents}
        selectedComponent={selectedComponent}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        onComponentSelect={setSelectedComponent}
        onCategorySelect={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      <ComponentViewerNew component={selectedComponent} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:componentId" element={<ComponentPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;