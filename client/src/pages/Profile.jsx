import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

const Profile = () => {
    const [user, setUser] = useState();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchProfile = async()=>{
            const token = localStorage.getItem('token');
            const res = await fetch('/api/user/profile', {
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await res.json();
            setUser(data);
        }
        fetchProfile();
    }, [])

    const fetchItems = async(userId)=>{
      const res = await fetch('/api/item');
      const items = await res.json();
      setItems(items.filter(i=>i.user._id === userId));
    };
    useEffect(()=>{
      if(user){
        fetchItems(user._id);
      }
    }, [user]);

    const handleSeeDetail = (item)=>{
      navigate(`/item/${item._id}`);
    };

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

    if(!user) return <div className='p-8 text-center'>Loading...</div>
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">Profile</h2>
      <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
      <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
      <h3 className="text-xl font-semibold text-blue-700 mt-8 mb-4">Your Posts</h3>
      <div className='flex flex-col gap-6'>
        {items.length === 0 ? (
          <p>You have not posted any items yet.</p>
        ):(
          items.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              isOwner={true}
              onDelete={handleDelete}
              onSeeDetail={handleSeeDetail}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Profile