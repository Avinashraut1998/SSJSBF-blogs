import React, { useState } from 'react';
import TextEditor from './TextEditor';
import { toast } from 'react-toastify';

const CreateBlogs = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false); // optional: disable buttons while saving
  const [error, setError] = useState(null);      // optional: show error message
  

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://blog-fullstackapp.onrender.com/api/v1/blogs/create-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          title,
          content,
          status: 'published',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Blog created successfully");
        setTitle('');
        setContent('');
      } else {
        // data.error comes from server response
        toast.error(data.error || "Failed to publish blog");
      }

      // Optionally reset fields
      setTitle('');
      setContent('');
    } catch (err) {

      // toast.error(err.error)
      console.error('Error publishing blog:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://blog-fullstackapp.onrender.com/api/v1/blogs/create-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          title,
          content,
          status: 'draft',
        }),
      });

      const data = await response.json();
      console.log('Draft saved successfully:', data);

      // Optionally reset fields
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Error saving draft:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setTitle('');
    setContent('');
    setError(null);
  };

  return (
    <div className="space-y-4 bg-gray-900 p-6 rounded-md shadow-md">
      {/* Blog Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-200">
          Blog Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Text Editor */}
      <div className="border border-dashed border-gray-600 rounded-md text-gray-400">
        <div className="h-96 overflow-y-auto">
          <TextEditor 
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Action buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={handlePublish}
          disabled={loading}
          className={`bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Publish
        </button>
        <button
          onClick={handleSaveAsDraft}
          disabled={loading}
          className={`bg-yellow-500 text-gray-900 px-4 py-2 rounded shadow hover:bg-yellow-400 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Save as Draft
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-700 text-gray-100 px-4 py-2 rounded shadow hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateBlogs;
