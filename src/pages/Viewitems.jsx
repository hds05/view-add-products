import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IoIosCloseCircle } from "react-icons/io";

Modal.setAppElement('#root');

const staticItems = [
    {
        id: 1,
        name: "Adidas Sneakers",
        type: "Shoes",
        description: "Comfortable running shoes with a stylish design.",
        coverImage:
            "https://rukminim3.flixcart.com/image/850/1000/xif0q/shoe/d/j/u/-original-imah4aen4trhfffg.jpeg?q=90&crop=false",
        additionalImages: [
            "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/8/y/o/-original-imah4aenmwgmzkf9.jpeg?q=70&crop=false",
            "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/4/m/t/-original-imah4aenyvxxbhbs.jpeg?q=70&crop=false"
        ]
    },
    {
        id: 2,
        name: "Nike Jersey",
        type: "Shirt",
        description: "Breathable and lightweight sports jersey.",
        coverImage:
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d9aa1b6a-4385-4233-96b6-b03f5c83d1a6/LAL+MNK+DF+SWGMN+JSY+ICN+22.png",
        additionalImages: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b9927fdc-ed13-4f38-af1e-4cd3f19f5359/LAL+MNK+DF+SWGMN+JSY+ICN+22.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b46db73b-2baf-47af-88e0-ff8fb4efac6e/LAL+MNK+DF+SWGMN+JSY+ICN+22.png"
        ]
    }
];

export default function ViewItems() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const localItems = JSON.parse(localStorage.getItem('items') || '[]');
        setItems([...staticItems, ...localItems]);
    }, []);

    const openModal = (item) => {
        setSelectedItem(item);
        setActiveImageIndex(0);
    };

    return (
        <div className="min-h-screen w-screen bg-slate-100 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">View Items</h1>

            {items.length === 0 ? (
                <p className="text-gray-600 text-lg">No items available. Please add some.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
                            onClick={() => openModal(item)}
                        >
                            <img
                                src={item.coverImage}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-md mb-2"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                        </div>
                    ))}
                </div>
            )}

            {!!selectedItem && (
                <Modal
                    isOpen={true}
                    onRequestClose={() => setSelectedItem(null)}
                    contentLabel="Item Details"
                    className="bg-white max-w-2xl p-6 mx-auto rounded-xl shadow-xl mt-1 outline-none"
                    overlayClassName="fixed top-0 inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
                >
                    <div className="flex flex-col gap-4 h-screen">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="self-end text-red-500 hover:text-red-800"
                        >
                            <IoIosCloseCircle size={40} // size in px
                                className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                            />
                        </button>
                        <h2 className="text-2xl font-bold text-blue-600">{selectedItem.name}</h2>
                        <p className="text-sm text-gray-600"><strong>Type:</strong> {selectedItem.type}</p>
                        <p className="text-sm text-gray-600"><strong>Description:</strong> {selectedItem.description}</p>

                        {/* Large Image */}
                        <div className="w-full max-h-[300px] overflow-hidden rounded-md border">
                            <img
                                src={[selectedItem.coverImage, ...selectedItem.additionalImages][activeImageIndex]}
                                alt="Active"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 mt-3 overflow-x-auto">
                            {[selectedItem.coverImage, ...selectedItem.additionalImages].map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`img-${index}`}
                                    onClick={() => setActiveImageIndex(index)}
                                    className={`h-20 w-20 object-cover rounded-lg border cursor-pointer ${index === activeImageIndex ? 'ring-4 ring-blue-500' : ''
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Enquire Button */}
                        <button
                            onClick={() => alert("Enquiry sent to: example@email.com")}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Enquire
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
