import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LostItemForm = ({ onItemCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/items', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onItemCreated(); // refresh list
      setFormData({ title: '', description: '', location: '' });
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || 'Unauthorized'));
    }
  };

  if (!isLoggedIn)
    return (
      <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
        Please <a href="/login" className="underline text-blue-600">login</a> to post a lost item.
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Report Lost Item</h2>
      <input
        name="title"
        placeholder="Item title"
        value={formData.title}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Item description"
        value={formData.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        name="location"
        placeholder="Last seen location"
        value={formData.location}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Item
      </button>
    </form>
  );
};

export default LostItemForm;
