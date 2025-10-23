import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const LostItemForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description:'',
    location: '',
    type: 'lost',
  })

  const [image, setImage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [])

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }

  const handleImageChange=(e)=>{
    setImage(e.target.files[0]);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('type', formData.type);
      // if(image) data.append('image', image);
      if(image){
        const options = {maxSizeMB: 0.6, maxWidthOrHeight: 1280, useWebWorker: true};
        const compressedFile = await imageCompression(image, options);
        data.append('image', compressedFile, compressedFile.name || 'upload.jpg');
      }

      await axios.post('/api/item', data,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          // 'content-Type': 'multipart/form-data',
        }
      });

      setFormData({title: '', description: '', location: '', type: 'lost'});
      setImage(null);
      toast.success('Post have been created successfully!!')
      navigate('/dashboard')
    }catch(err){
      toast.error('Error: ' + (err.response?.data?.message || 'unauthorized'));
    }
  };

  if(!isLoggedIn)
    return(
  <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-6">
    please <a href="/login"  className="underline text-blue-600">login</a> to post a lost item.
  </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6"  encType='multipart/form-data'>
      <h2 className="text-xl font-bold mb-4 text-blue-600">Report Lost Item</h2>
      <input type="text"
      name='title'
      placeholder='Item title'
      value={formData.title}
      onChange={handleChange}
      className='w-full mb-3 p-2 border rounded' 
      required
      />

      <textarea
       name="description"
       value={formData.description}
       onChange={handleChange}
       className="w-full mb-3 p-2 border rounded"
       required
        />

      <input
      name='location'
      placeholder='Last seen location'
      value={formData.location}
      onChange={handleChange}
      className="w-full mb-3 p-2 border rounded"
      required
      />

      <select
      name='type'
      value={formData.type}
      onChange={handleChange}
      className="w-full mb-3 p-2 border rounded"
      required
      >
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <input
      type="file"
      name='image'
      accept='image/*'
      onChange={handleImageChange}
      className="w-full mb-3"
       />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Post Item
      </button>
    </form>
  )
}

export default LostItemForm