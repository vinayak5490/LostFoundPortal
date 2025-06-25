import React, { useEffect, useState } from 'react'
import LostItemForm from './LostItemForm';

const Dashboard = () => {
  const [items, setItems] = useState([]);

// Fetch items from the backend
const fetchItems = async () => {
  try {
    const res = await fetch('/api/item');
    const data = await res.json();
    setItems(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchItems();
}, []);
  return (
    <div className="min-h-screen bg-white pt-24 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">All Lost Items</h1>
      {/* <LostItemForm onItemCreated = {fetchItems}/> */}
      <div className="flex flex-col items-center gap-6">
      {items.length === 0 ? (
          <p className="text-gray-600">No items have been posted yet.</p>
        ) : (
          items.map(item => (
            <div
              key={item._id}
              className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-4 p-6 border border-blue-200"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full md:w-48 h-48 object-cover rounded border"
                />
              )}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-800 mb-2">{item.title}</h2>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  <p className="text-gray-500 text-sm mb-1">Location: {item.location}</p>
                  <p className="text-gray-400 text-xs mb-1">Type: {item.type}</p>
                  <p className="text-gray-400 text-xs mb-1">
                    Posted by: {item.user?.name} ({item.user?.email})
                  </p>
                  {item.date && (
                    <p className="text-gray-400 text-xs">
                      Date: {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard