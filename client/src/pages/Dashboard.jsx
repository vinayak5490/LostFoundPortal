import React, { useEffect, useState } from 'react'
import LostItemForm from './LostItemForm';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ItemCardDetail from '../components/ItemCardDetail';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

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
  const user = JSON.parse(localStorage.getItem('user'));
  setCurrentUserId(user?.id);
}, []);

const handleSeeDetail = (item)=>{
  navigate(`/item/${item._id}`);
}

const handleDelete = (item)=>{
  if(window.confirm('Are you sure you have found the item ?')){
    fetch(`/api/item/${item._id}`,{
      method: 'DELETE',
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(() => fetchItems())
    .catch((err)=>alert('Error deleting item'));
  }
}
return (
  <div className="min-h-screen bg-white pt-24 px-4">
    <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">All Lost Items</h1>
    <div className="flex flex-col items-center gap-6">
      {items.length === 0 ? (
        <p className="text-gray-600">No items have been posted yet.</p>
      ) : (
        items.map(item => (
          <ItemCard
            key={item._id}
            item={item}
            isOwner={item.user?._id === currentUserId}
            onDelete={handleDelete}
            onSeeDetail={handleSeeDetail}
          />
        ))
      )}
    </div>
  </div>
);
};
export default Dashboard