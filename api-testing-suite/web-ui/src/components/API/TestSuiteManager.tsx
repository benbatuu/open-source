import React, { useState } from 'react';
import { Plus, Play, Edit, Trash2, Folder, FileText } from 'lucide-react';
import { Modal } from '../UI/Modal';
import { ConfirmModal } from '../UI/ConfirmModal';

interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: Test[];
  createdAt: string;
  updatedAt: string;
}

interface Test {
  id: string;
  name: string;
  method: string;
  url: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
}

export const TestSuiteManager: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: '1',
      name: 'User Management API',
      description: 'Tests for user CRUD operations',
      tests: [
        { id: '1', name: 'Get Users', method: 'GET', url: '/users', status: 'passed' },
        { id: '2', name: 'Create User', method: 'POST', url: '/users', status: 'passed' },
        { id: '3', name: 'Update User', method: 'PUT', url: '/users/1', status: 'failed' },
        { id: '4', name: 'Delete User', method: 'DELETE', url: '/users/1', status: 'pending' },
      ],
      createdAt: '2025-10-19T10:00:00Z',
      updatedAt: '2025-10-19T14:30:00Z',
    },
    {
      id: '2',
      name: 'Authentication API',
      description: 'Tests for authentication endpoints',
      tests: [
        { id: '5', name: 'Login', method: 'POST', url: '/auth/login', status: 'passed' },
        { id: '6', name: 'Logout', method: 'POST', url: '/auth/logout', status: 'passed' },
        { id: '7', name: 'Refresh Token', method: 'POST', url: '/auth/refresh', status: 'pending' },
      ],
      createdAt: '2025-10-19T11:00:00Z',
      updatedAt: '2025-10-19T13:45:00Z',
    },
  ]);

  const [selectedSuite, setSelectedSuite] = useState<TestSuite | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [suiteToDelete, setSuiteToDelete] = useState<TestSuite | null>(null);
  const [editingSuite, setEditingSuite] = useState<TestSuite | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-success-600 bg-success-100';
      case 'failed': return 'text-error-600 bg-error-100';
      case 'running': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
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

  const runSuite = (suite: TestSuite) => {
    // Simulate running tests
    setTestSuites(prev => prev.map(s => 
      s.id === suite.id 
        ? { ...s, tests: s.tests.map(t => ({ ...t, status: 'running' as const })) }
        : s
    ));

    setTimeout(() => {
      setTestSuites(prev => prev.map(s => 
        s.id === suite.id 
          ? { 
              ...s, 
              tests: s.tests.map(t => ({ 
                ...t, 
                status: Math.random() > 0.3 ? 'passed' as const : 'failed' as const 
              })),
              updatedAt: new Date().toISOString()
            }
          : s
      ));
    }, 2000);
  };

  const handleEditSuite = (suite: TestSuite) => {
    setEditingSuite(suite);
    setShowEditModal(true);
  };

  const handleDeleteSuite = (suite: TestSuite) => {
    setSuiteToDelete(suite);
    setShowDeleteModal(true);
  };

  const confirmDeleteSuite = () => {
    if (suiteToDelete) {
      setTestSuites(prev => prev.filter(s => s.id !== suiteToDelete.id));
      if (selectedSuite?.id === suiteToDelete.id) {
        setSelectedSuite(null);
      }
    }
  };

  const handleCreateSuite = () => {
    // Simulate creating a new suite
    const newSuite: TestSuite = {
      id: Date.now().toString(),
      name: 'New Test Suite',
      description: 'A new test suite',
      tests: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTestSuites(prev => [...prev, newSuite]);
    setShowCreateModal(false);
  };

  const handleUpdateSuite = () => {
    if (editingSuite) {
      setTestSuites(prev => prev.map(s => 
        s.id === editingSuite.id 
          ? { ...editingSuite, updatedAt: new Date().toISOString() }
          : s
      ));
      setShowEditModal(false);
      setEditingSuite(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test Suites</h2>
          <p className="text-gray-600">Manage and organize your API tests</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Suite
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Suites List */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">All Suites</h3>
            <div className="space-y-2">
              {testSuites.map(suite => (
                <div
                  key={suite.id}
                  onClick={() => setSelectedSuite(suite)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedSuite?.id === suite.id 
                      ? 'border-primary-200 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Folder className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{suite.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {suite.tests.length} tests
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{suite.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Suite Details */}
        <div className="lg:col-span-2">
          {selectedSuite ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedSuite.name}</h3>
                  <p className="text-gray-600">{selectedSuite.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditSuite(selectedSuite)}
                    className="btn btn-secondary flex items-center"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button 
                    onClick={() => runSuite(selectedSuite)}
                    className="btn btn-primary flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Suite
                  </button>
                </div>
              </div>

              {/* Test List */}
              <div className="space-y-3">
                <h4 className="text-lg font-medium text-gray-900">Tests</h4>
                {selectedSuite.tests.map(test => (
                  <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(test.method)}`}>
                        {test.method}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">{test.name}</div>
                        <div className="text-sm text-gray-600">{test.url}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                        {test.status}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteSuite(selectedSuite)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Test Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="btn btn-secondary flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Test
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Suite Selected</h3>
              <p className="text-gray-600">Select a test suite from the list to view its details</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Suite Modal */}
      <Modal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        title="Create New Test Suite"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Suite name" 
              defaultValue="New Test Suite"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              className="input" 
              rows={3} 
              placeholder="Suite description"
              defaultValue="A new test suite"
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
            onClick={handleCreateSuite}
            className="btn btn-primary"
          >
            Create Suite
          </button>
        </div>
      </Modal>

      {/* Edit Suite Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        title="Edit Test Suite"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              className="input" 
              defaultValue={editingSuite?.name || ''}
              onChange={(e) => editingSuite && setEditingSuite({...editingSuite, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              className="input" 
              rows={3} 
              defaultValue={editingSuite?.description || ''}
              onChange={(e) => editingSuite && setEditingSuite({...editingSuite, description: e.target.value})}
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
            onClick={handleUpdateSuite}
            className="btn btn-primary"
          >
            Update Suite
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteSuite}
        title="Delete Test Suite"
        message={`Are you sure you want to delete "${suiteToDelete?.name}"? This action cannot be undone and will remove all tests in this suite.`}
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
