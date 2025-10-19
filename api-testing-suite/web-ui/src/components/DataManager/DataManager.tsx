import React, { useState } from 'react';
import { 
  Database, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Search, 
  Filter,
  FileText,
  Users,
  Mail,
  CreditCard,
  Globe,
  RefreshCw,
  Eye,
  Copy,
  Save,
  X
} from 'lucide-react';

export const DataManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      name: 'User Data',
      type: 'json',
      size: '2.3 KB',
      records: 25,
      lastModified: '2024-01-15 10:30:00',
      description: 'Sample user data for testing',
      data: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
        ]
      }
    },
    {
      id: 2,
      name: 'Product Catalog',
      type: 'json',
      size: '5.7 KB',
      records: 50,
      lastModified: '2024-01-15 09:15:00',
      description: 'Product data for e-commerce testing',
      data: {
        products: [
          { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
          { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics' },
          { id: 3, name: 'Book', price: 19.99, category: 'Books' }
        ]
      }
    },
    {
      id: 3,
      name: 'Payment Methods',
      type: 'json',
      size: '1.2 KB',
      records: 8,
      lastModified: '2024-01-14 16:45:00',
      description: 'Payment method configurations',
      data: {
        paymentMethods: [
          { id: 1, type: 'credit_card', name: 'Visa', enabled: true },
          { id: 2, type: 'credit_card', name: 'Mastercard', enabled: true },
          { id: 3, type: 'paypal', name: 'PayPal', enabled: false }
        ]
      }
    }
  ]);

  const [dataFactories, setDataFactories] = useState([
    {
      id: 1,
      name: 'User Factory',
      type: 'factory',
      fields: ['name', 'email', 'role', 'created_at'],
      lastUsed: '2024-01-15 11:20:00',
      usage: 156
    },
    {
      id: 2,
      name: 'Product Factory',
      type: 'factory',
      fields: ['name', 'price', 'category', 'description'],
      lastUsed: '2024-01-15 10:45:00',
      usage: 89
    },
    {
      id: 3,
      name: 'Order Factory',
      type: 'factory',
      fields: ['user_id', 'product_id', 'quantity', 'total'],
      lastUsed: '2024-01-14 14:30:00',
      usage: 234
    }
  ]);

  const [testData, setTestData] = useState([
    {
      id: 1,
      name: 'API Endpoints',
      type: 'endpoints',
      count: 15,
      lastUpdated: '2024-01-15 12:00:00'
    },
    {
      id: 2,
      name: 'Environment Variables',
      type: 'env',
      count: 8,
      lastUpdated: '2024-01-15 11:30:00'
    },
    {
      id: 3,
      name: 'Test Configurations',
      type: 'config',
      count: 12,
      lastUpdated: '2024-01-15 10:15:00'
    }
  ]);

  const tabs = [
    { id: 'fixtures', name: 'Data Fixtures', icon: FileText },
    { id: 'factories', name: 'Data Factories', icon: Users },
    { id: 'testdata', name: 'Test Data', icon: Database }
  ];

  const handleEditFixture = (fixture) => {
    setSelectedFixture(fixture);
    setIsEditing(true);
  };

  const handleSaveFixture = () => {
    // Save logic here
    setIsEditing(false);
    setSelectedFixture(null);
  };

  const handleDeleteFixture = (id) => {
    setFixtures(fixtures.filter(f => f.id !== id));
  };

  const renderFixtures = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Data Fixtures</h3>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Add Fixture
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{fixture.name}</h4>
                  <p className="text-sm text-gray-600">{fixture.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditFixture(fixture)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteFixture(fixture.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium text-gray-900">{fixture.type.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium text-gray-900">{fixture.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Records:</span>
                <span className="font-medium text-gray-900">{fixture.records}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Modified:</span>
                <span className="font-medium text-gray-900">{fixture.lastModified}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFactories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Data Factories</h3>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Add Factory
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Name</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Fields</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Usage</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Last Used</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataFactories.map((factory) => (
              <tr key={factory.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{factory.name}</p>
                      <p className="text-sm text-gray-600">Data Factory</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex flex-wrap gap-1">
                    {factory.fields.map((field, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm font-medium text-gray-900">{factory.usage} times</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-600">{factory.lastUsed}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTestData = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Test Data</h3>
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Add Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testData.map((data) => (
          <div key={data.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{data.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{data.type.replace('_', ' ')}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium text-gray-900">{data.count}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Updated:</span>
                <span className="font-medium text-gray-900">{data.lastUpdated}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Manager</h1>
            <p className="text-gray-600">Manage test data, fixtures, and data factories</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'fixtures' && renderFixtures()}
          {activeTab === 'factories' && renderFactories()}
          {activeTab === 'testdata' && renderTestData()}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && selectedFixture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Fixture: {selectedFixture.name}</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fixture Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedFixture.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedFixture.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  JSON Data
                </label>
                <textarea
                  defaultValue={JSON.stringify(selectedFixture.data, null, 2)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 font-mono text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFixture}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
