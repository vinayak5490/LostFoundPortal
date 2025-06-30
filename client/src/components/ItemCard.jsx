import React from 'react'

const ItemCard = ({item, isOwner, onDelete, onSeeDetail, onFound}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-4 p-6 border border-blue-200">
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
        <div className="flex justify-end items-end gap-3 mt-4">
          {isOwner ? (
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => onDelete(item)}
            >
              Delete
            </button>
          ):(
            <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => onFound(item)}
          >
            Found
          </button>
          )}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => onSeeDetail(item)}
          >
            See Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;