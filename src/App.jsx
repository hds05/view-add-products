import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/Additems';
import ViewItems from './pages/Viewitems';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css'; 

function App() {
  return (
      <Router className="min-w-screen h-screen flex flex-col items-center justify-center">
        <nav className='text-gray-500 flex p-5 bg-gray-400 text-white gap-5 sticky top-0' >
          <Link to="/add" className='bg-black p-3 rounded-xl hover:pointer'>Add Item</Link>
          <Link to="/view" className='bg-black p-3 rounded-xl hover:pointer'>View Items</Link>
        </nav>
        <Routes>
          <Route path="/add" element={<AddItem />} />
          <Route path="/view" element={<ViewItems />} />
        </Routes>
        <ToastContainer />
      </Router>
  );
}

export default App;
