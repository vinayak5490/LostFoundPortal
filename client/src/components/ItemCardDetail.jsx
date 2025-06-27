import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ItemCardDetail = () => {
  const {id} = useParams();
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchItem = async()=>{
      try {
        const res = await fetch(`/api/item/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (error) {
        setItem(null);
      }finally{
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if(loading) return <div className="p-8 text-center">Loading...</div>;
  if(!item) return <div className='p-8 text-center text-red-600'>Item not Found.</div>
  return (
    <div className='mt-12'>
      <div className='w-full h-65 mb-6 rounded overflow-hidden border'>
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      )}
      </div>

      <h2 className="text-3xl font-bold text-blue-800 mb-2">{item.title}</h2>
      <p className="text-gray-900 mb-4">{item.description}</p>
      <p className="text-gray-700 mb-2">Location: {item.location}</p>
      <p className="text-gray-600 mb-2">Type: {item.type}</p>
      <p className="text-gray-600 mb-2">
        Posted by: {item.user?.name} ({item.user?.email})
      </p>

      {item.date && (
        <p className="text-gray-400 mb-2">
          Date: {new Date(item.date).toLocaleDateString()}
        </p>
      )}
    </div>
  )
}

export default ItemCardDetail;