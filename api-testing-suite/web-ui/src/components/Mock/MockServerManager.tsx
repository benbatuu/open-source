import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Plus, 
  Edit, 
  Trash2, 
  Server, 
  Activity,
  Settings,
  Copy
} from 'lucide-react';
import { Modal } from '../UI/Modal';
import { ConfirmModal } from '../UI/ConfirmModal';

interface MockRule {
  id: string;
  name: string;
  method: string;
  url: string;
  status: number;
  response: any;
  enabled: boolean;
  delay?: number;
}

export const MockServerManager: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [port, setPort] = useState(3001);
  const [mockRules, setMockRules] = useState<MockRule[]>([
    {
      id: '1',
      name: 'Get Users',
      method: 'GET',
      url: '/api/users',
      status: 200,
      response: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
      },
      enabled: true,
    },
    {
      id: '2',
      name: 'Create User',
      method: 'POST',
      url: '/api/users',
      status: 201,
      response: {
        id: 3,
        name: 'New User',
        email: 'new@example.com',
        createdAt: new Date().toISOString()
      },
      enabled: true,
    },
    {
      id: '3',
      name: 'User Not Found',
      method: 'GET',
      url: '/api/users/999',
      status: 404,
      response: {
        error: 'User not found'
      },
      enabled: true,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState<MockRule | null>(null);
  const [editingRule, setEditingRule] = useState<MockRule | null>(null);
  const [ruleToDelete, setRuleToDelete] = useState<MockRule | null>(null);

  const toggleServer = () => {
    setIsRunning(!isRunning);
  };

  const toggleRule = (id: string) => {
    setMockRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const handleEditRule = (rule: MockRule) => {
    setEditingRule(rule);
    setShowEditModal(true);
  };

  const handleDeleteRule = (rule: MockRule) => {
    setRuleToDelete(rule);
    setShowDeleteModal(true);
  };

  const confirmDeleteRule = () => {
    if (ruleToDelete) {
      setMockRules(prev => prev.filter(rule => rule.id !== ruleToDelete.id));
      if (selectedRule?.id === ruleToDelete.id) {
        setSelectedRule(null);
      }
    }
  };

  const handleCreateRule = () => {
    const newRule: MockRule = {
      id: Date.now().toString(),
      name: 'New Endpoint',
      method: 'GET',
      url: '/api/endpoint',
      status: 200,
      response: { message: 'Hello World' },
      enabled: true,
    };
    setMockRules(prev => [...prev, newRule]);
    setShowCreateModal(false);
  };

  const handleUpdateRule = () => {
    if (editingRule) {
      setMockRules(prev => prev.map(rule => 
        rule.id === editingRule.id ? editingRule : rule
      ));
      setShowEditModal(false);
      setEditingRule(null);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-success-600 bg-success-100';
    if (status >= 400 && status < 500) return 'text-warning-600 bg-warning-100';
    if (status >= 500) return 'text-error-600 bg-error-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mock Server</h2>
          <p className="text-gray-600">Manage mock API endpoints for testing</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Port:</span>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
              className="w-20 input text-sm"
              disabled={isRunning}
            />
          </div>
          <button
            onClick={toggleServer}
            className={`btn flex items-center ${
              isRunning ? 'btn-error' : 'btn-success'
            }`}
          >
            {isRunning ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop Server
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Server
              </>
            )}
          </button>
        </div>
      </div>

      {/* Server Status */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-success-500' : 'bg-gray-400'}`} />
            <div>
              <h3 className="font-medium text-gray-900">
                Mock Server {isRunning ? 'Running' : 'Stopped'}
              </h3>
              <p className="text-sm text-gray-600">
                {isRunning 
                  ? `Server is running on http://localhost:${port}` 
                  : 'Server is not running'
                }
              </p>
            </div>
          </div>
          {isRunning && (
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                <span>Active</span>
              </div>
              <div className="flex items-center">
                <Server className="w-4 h-4 mr-1" />
                <span>{mockRules.filter(r => r.enabled).length} endpoints</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mock Rules */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Mock Endpoints</h3>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Endpoint
          </button>
        </div>

        <div className="space-y-3">
          {mockRules.map(rule => (
            <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(rule.method)}`}>
                      {rule.method}
                    </span>
                    <span className="font-mono text-sm text-gray-900">{rule.url}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}>
                    {rule.status}
                  </span>
                  <span className="text-sm text-gray-600">{rule.name}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      rule.enabled 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {rule.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                  <button 
                    onClick={() => handleEditRule(rule)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteRule(rule)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {rule.delay && (
                <div className="mt-2 text-sm text-gray-600">
                  Delay: {rule.delay}ms
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Response Preview */}
      {selectedRule && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Response Preview</h3>
            <button 
              onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedRule.response, null, 2))}
              className="btn btn-secondary flex items-center"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="text-sm text-gray-800 overflow-auto">
              {JSON.stringify(selectedRule.response, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Create Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        title="Create Mock Endpoint"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                className="input" 
                placeholder="Endpoint name" 
                defaultValue="New Endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
              <select className="input" defaultValue="GET">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <input 
              type="text" 
              className="input" 
              placeholder="/api/endpoint" 
              defaultValue="/api/endpoint"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Code</label>
              <input 
                type="number" 
                className="input" 
                placeholder="200" 
                defaultValue="200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delay (ms)</label>
              <input 
                type="number" 
                className="input" 
                placeholder="0" 
                defaultValue="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Body</label>
            <textarea 
              className="input font-mono text-sm" 
              rows={8}
              placeholder='{"message": "Hello World"}'
              defaultValue='{"message": "Hello World"}'
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => setShowCreateModal(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateRule}
            className="btn btn-primary"
          >
            Create Endpoint
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        title="Edit Mock Endpoint"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                className="input" 
                defaultValue={editingRule?.name || ''}
                onChange={(e) => editingRule && setEditingRule({...editingRule, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
              <select 
                className="input" 
                value={editingRule?.method || 'GET'}
                onChange={(e) => editingRule && setEditingRule({...editingRule, method: e.target.value})}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
            <input 
              type="text" 
              className="input" 
              defaultValue={editingRule?.url || ''}
              onChange={(e) => editingRule && setEditingRule({...editingRule, url: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Code</label>
              <input 
                type="number" 
                className="input" 
                defaultValue={editingRule?.status || 200}
                onChange={(e) => editingRule && setEditingRule({...editingRule, status: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Delay (ms)</label>
              <input 
                type="number" 
                className="input" 
                defaultValue={editingRule?.delay || 0}
                onChange={(e) => editingRule && setEditingRule({...editingRule, delay: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Response Body</label>
            <textarea 
              className="input font-mono text-sm" 
              rows={8}
              defaultValue={JSON.stringify(editingRule?.response || {}, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  editingRule && setEditingRule({...editingRule, response: parsed});
                } catch (error) {
                  // Invalid JSON, keep the text as is
                }
              }}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => setShowEditModal(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpdateRule}
            className="btn btn-primary"
          >
            Update Endpoint
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteRule}
        title="Delete Mock Endpoint"
        message={`Are you sure you want to delete "${ruleToDelete?.name}"? This action cannot be undone.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
