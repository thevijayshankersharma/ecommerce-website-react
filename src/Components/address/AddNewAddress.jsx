import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TbXboxX } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';

const AddNewAddress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    area: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/address`, formData);
      toast.success('Successfully Added!')
      navigate('/address')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div><Toaster /></div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col gap-4"
      >

        <Link to='/address'>
          <TbXboxX className='absolute right-10 text-3xl' />
        </Link>
        <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border p-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="border p-2 rounded" required />

        <button type="submit" className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">Add Address</button>
      </form>
    </div>
  );
};

export default AddNewAddress;
