import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

export default function AddItem() {
    const [item, setItem] = useState({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: []
    });

    const coverRef = useRef();
    const additionalRef = useRef();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'coverImage') {
            setItem({ ...item, coverImage: files[0] });
        } else if (name === 'additionalImages') {
            setItem({ ...item, additionalImages: Array.from(files) });
        } else {
            setItem({ ...item, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem('items') || '[]');
        const newItem = {
            ...item,
            id: Date.now(),
            coverImage: URL.createObjectURL(item.coverImage),
            additionalImages: item.additionalImages.map(file => URL.createObjectURL(file))
        };
        localStorage.setItem('items', JSON.stringify([...existing, newItem]));
        toast.success("Item successfully added!");

        // Reset form
        setItem({
            name: '',
            type: '',
            description: '',
            coverImage: null,
            additionalImages: []
        });
        coverRef.current.value = '';
        additionalRef.current.value = '';
    };

    return (
        <div className="min-h-screen w-screen bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Add New Item</h1>
                <p className="text-sm text-gray-500 text-center mb-6">Fill in the details to add a new product</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Item Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 relative top-3 px-1 left-2 bg-white w-fit">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={item.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g. Nike Air Max"
                        />
                    </div>

                    {/* Item Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 relative top-3 px-1 left-2 bg-white w-fit">Item Type</label>
                        <select
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Select Type</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Pant">Pant</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Sports Gear">Sports Gear</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 relative top-3 px-1 left-2 bg-white w-fit">Description</label>
                        <textarea
                            name="description"
                            value={item.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Brief description of the item"
                        />
                    </div>

                    {/* Cover Image */}
                    <div className='flex'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                            <input
                                type="file"
                                name="coverImage"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                ref={coverRef}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
                            />
                        </div>

                        {/* Additional Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                            <input
                                type="file"
                                name="additionalImages"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                                ref={additionalRef}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-50 file:text-green-700
                         hover:file:bg-green-100"
                            />
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
}
