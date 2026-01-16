import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import logo from '../../assets/redstore_logo.png';

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const fetchApi = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/address');
            setAddresses(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/address/${id}`);
            setAddresses(addresses.filter(addr => addr.id !== id));
            if (selectedId === id) {
                setSelectedId(null);
            }
            toast.success('Successfully Deleted!')
        } catch (err) {
            console.error("Failed to delete address:", err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/updateaddress/${id}`);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">

            {/* Header / Navbar Replacement for this page */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={logo} alt="RedStore" className="h-10 w-auto group-hover:scale-105 transition duration-300" />
                        <span className="font-heading font-bold text-2xl text-gray-800 tracking-tight group-hover:text-red-500 transition">RedStore</span>
                    </Link>
                    <h1 className="text-xl font-heading font-bold text-gray-700">My Addresses</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-10 max-w-4xl">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 font-heading">Saved Addresses</h2>
                    <Link to='/addnewaddress'>
                        <button className="bg-red-500 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:bg-red-600 hover:shadow-red-500/30 transition transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                            <span>+</span> Add New Address
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col gap-5">
                    {addresses.length > 0 ? (
                        addresses.map(({ id, username, email, mobile, area, pincode }) => (
                            <div key={id} className={`group flex flex-col sm:flex-row items-center bg-white p-6 rounded-xl transition-all duration-300 gap-6 border ${selectedId === id ? 'border-red-500 ring-1 ring-red-500 shadow-md' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>

                                {/* Selection Radio */}
                                <div className="ml-2">
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={id}
                                        checked={selectedId === id}
                                        onChange={() => setSelectedId(id)}
                                        className="w-5 h-5 accent-red-500 cursor-pointer"
                                    />
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                                        <h3 className="font-bold text-gray-800 text-lg">{username}</h3>
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full border border-gray-200">Home</span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">{email} • {mobile}</p>
                                    <p className="text-gray-700 font-medium">{area}, {pincode}</p>
                                </div>

                                <div className="flex flex-row justify-center sm:flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0 min-w-[140px]">
                                    <div className="flex gap-3 w-full justify-center">
                                        <button onClick={() => handleEdit(id)} className="flex-1 sm:flex-none text-gray-500 hover:text-blue-600 transition flex justify-center items-center bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium border border-gray-100">
                                            <MdEdit className="text-lg" />
                                        </button>
                                        <button onClick={() => handleDelete(id)} className="flex-1 sm:flex-none text-gray-500 hover:text-red-600 transition flex justify-center items-center bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium border border-gray-100">
                                            <AiFillDelete className="text-lg" />
                                        </button>
                                    </div>

                                    {selectedId === id && (
                                        <button
                                            onClick={() => navigate('/payment')}
                                            className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-bold shadow-md hover:shadow-lg flex justify-center items-center gap-2 animate-fade-in transform hover:-translate-y-0.5 active:scale-95"
                                        >
                                            <CiDeliveryTruck className="text-lg text-red-500" />
                                            <span>Deliver Here</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 mb-4">No addresses saved yet.</p>
                            <Link to='/addnewaddress'>
                                <button className="text-red-500 font-bold hover:underline">Add your first address</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Address;
