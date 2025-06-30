import React, { useEffect, useState } from 'react'
import LostItemForm from './LostItemForm';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import ItemCardDetail from '../components/ItemCardDetail';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showFoundModal, setShowFoundModal] = useState(false);
  const [foundItem, setFoundItem] = useState(null);
  const [finderInfo, setFinderInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });


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
  if(window.confirm('Are you sure you want to delete the post ?')){
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

const handleFound = (item)=>{
  setFoundItem(item);
  setShowFoundModal(true);
}

const handleFinderInput = (e)=>{
  setFinderInfo({...finderInfo, [e.target.name]: e.target.value});
}

const handleSendFoundInfo = async(e)=>{
  e.preventDefault();

  try {
   const res = await fetch('/api/item/found',{
    method: 'POST',
    headers: {'content-Type' : 'application/json'},
    body: JSON.stringify({
      ...finderInfo,
      itemId: foundItem._id,
      ownerEmail: foundItem.user.email
    })
   });
   if(res.ok){
    alert('Your info has been sent to the owner!');
    setShowFoundModal(false);
    setFinderInfo({name: '', email: '', phone: '', message: ''});
   }else{
    alert('Failed to send Info');
   } 
  } catch (error) {
    alert('Error sending infor.');
  }
}
return (
  <>
  {showFoundModal && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
        onSubmit={handleSendFoundInfo}
      >
        <h2 className="text-xl font-bold mb-4">Contact Item Owner</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          name="name"
          placeholder="Your Name"
          value={finderInfo.name}
          onChange={handleFinderInput}
          required
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          name="email"
          placeholder="Your Email"
          value={finderInfo.email}
          onChange={handleFinderInput}
          required
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          name="phone"
          placeholder="Your Phone (optional)"
          value={finderInfo.phone}
          onChange={handleFinderInput}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          name="message"
          placeholder="Message to owner"
          value={finderInfo.message}
          onChange={handleFinderInput}
          required
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setShowFoundModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )}
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
            onFound={handleFound}
          />
        ))
      )}
    </div>
  </div>
  </>
);
};
export default Dashboard