import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function getUserIdFromToken(){
  const token = localStorage.getItem('token');
  if(!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch{
    return null;
  }
}

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const userId = getUserIdFromToken();

  useEffect(()=>{
    const fetchItems = async() =>{
      try {
        const res = await fetch('/api/item');
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const userItems = items.filter(item => item.user && item.user._id === userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col">
      <header className="flex justify-end p-6">
        <button
          onClick={() => navigate('/createnew')}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition font-semibold"
        >
          Create Lost Item Post
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Your Posted Items</h1>
        {userItems.length === 0 ? (
          <p className="text-gray-600">You have not posted any items yet.</p>
        ) : (
          <ul className="w-full max-w-xl space-y-4">
            {userItems.map(item => (
              <li key={item._id} className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-gray-500 text-sm">Location: {item.location}</p>
                <p className="text-gray-400 text-xs">Type: {item.type}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default Dashboard;