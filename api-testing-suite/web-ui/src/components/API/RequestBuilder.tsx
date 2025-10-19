import React, { useState } from 'react';
import { Play, Plus, Trash2, Save } from 'lucide-react';

interface RequestData {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  name: string;
}

export const RequestBuilder: React.FC = () => {
  const [request, setRequest] = useState<RequestData>({
    method: 'GET',
    url: '',
    headers: { 'Content-Type': 'application/json' },
    body: '',
    name: '',
  });

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

  const handleMethodChange = (method: string) => {
    setRequest({ ...request, method });
  };

  const handleUrlChange = (url: string) => {
    setRequest({ ...request, url });
  };

  const handleHeaderChange = (key: string, value: string) => {
    const newHeaders = { ...request.headers };
    if (value === '') {
      delete newHeaders[key];
    } else {
      newHeaders[key] = value;
    }
    setRequest({ ...request, headers: newHeaders });
  };

  const addHeader = () => {
    setRequest({
      ...request,
      headers: { ...request.headers, '': '' },
    });
  };

  const removeHeader = (key: string) => {
    const newHeaders = { ...request.headers };
    delete newHeaders[key];
    setRequest({ ...request, headers: newHeaders });
  };

  const handleBodyChange = (body: string) => {
    setRequest({ ...request, body });
  };

  const sendRequest = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      setResponse({
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'content-length': '123',
        },
        data: {
          message: 'Request successful',
          timestamp: new Date().toISOString(),
        },
        responseTime: 245,
      });
    } catch (error) {
      setResponse({
        status: 500,
        statusText: 'Internal Server Error',
        error: 'Request failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Request Configuration */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Request Builder</h3>
          <div className="flex space-x-2">
            <button className="btn btn-secondary flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button 
              onClick={sendRequest}
              disabled={loading || !request.url}
              className="btn btn-primary flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Method and URL */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-2">
            <select
              value={request.method}
              onChange={(e) => handleMethodChange(e.target.value)}
              className="input"
            >
              {methods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          <div className="col-span-10">
            <input
              type="text"
              placeholder="Enter URL (e.g., https://api.example.com/users)"
              value={request.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Request Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Request name (optional)"
            value={request.name}
            onChange={(e) => setRequest({ ...request, name: e.target.value })}
            className="input"
          />
        </div>

        {/* Headers */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Headers</label>
            <button onClick={addHeader} className="btn btn-secondary text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Header
            </button>
          </div>
          <div className="space-y-2">
            {Object.entries(request.headers).map(([key, value]) => (
              <div key={key} className="grid grid-cols-12 gap-2">
                <input
                  type="text"
                  placeholder="Header name"
                  value={key}
                  onChange={(e) => {
                    const newHeaders = { ...request.headers };
                    delete newHeaders[key];
                    newHeaders[e.target.value] = value;
                    setRequest({ ...request, headers: newHeaders });
                  }}
                  className="input col-span-5"
                />
                <input
                  type="text"
                  placeholder="Header value"
                  value={value}
                  onChange={(e) => handleHeaderChange(key, e.target.value)}
                  className="input col-span-6"
                />
                <button
                  onClick={() => removeHeader(key)}
                  className="btn btn-error col-span-1 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        {['POST', 'PUT', 'PATCH'].includes(request.method) && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Body</label>
            <textarea
              placeholder="Request body (JSON, XML, etc.)"
              value={request.body}
              onChange={(e) => handleBodyChange(e.target.value)}
              rows={8}
              className="input font-mono text-sm"
            />
          </div>
        )}
      </div>

      {/* Response */}
      {response && (
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Response</h3>
          
          {/* Status */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              response.status >= 200 && response.status < 300 
                ? 'bg-success-100 text-success-800' 
                : 'bg-error-100 text-error-800'
            }`}>
              {response.status} {response.statusText}
            </span>
            {response.responseTime && (
              <span className="ml-2 text-sm text-gray-500">
                {response.responseTime}ms
              </span>
            )}
          </div>

          {/* Response Headers */}
          {response.headers && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Headers</h4>
              <div className="bg-gray-50 rounded-md p-3">
                <pre className="text-xs text-gray-600">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key}>{key}: {value}</div>
                  ))}
                </pre>
              </div>
            </div>
          )}

          {/* Response Body */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Body</h4>
            <div className="bg-gray-50 rounded-md p-3">
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(response.data || response.error, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
