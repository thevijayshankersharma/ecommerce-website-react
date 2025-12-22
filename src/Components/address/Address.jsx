import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

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
        <div className="min-h-screen bg-gray-100">
            <div><Toaster/></div>
            <div className="flex h-13 justify-around items-around bg-red-500 p-3">
                <Link to="/"><img src="asd" alt="logo" className="h-10 w-auto" /></Link>
                <h3 className="text-white font-semibold text-lg">Address</h3>
            </div>
            <div className="flex justify-center m-6">
                <Link to='/addnewaddress'><button className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition">Add New Address</button></Link>
            </div>

            <div className="flex flex-col gap-4">
                {addresses.length > 0 ? (
                    addresses.map(({ id, username, email, mobile, area, pincode }) => (
                        <div key={id} className="flex items-center bg-white p-3 rounded shadow-sm hover:shadow-md transition gap-4">
                            <input type="radio" name="selectedAddress" value={id} checked={selectedId === id} onChange={() => setSelectedId(id)} className="w-5 h-5 accent-red-500" />

                            <div className="flex-1">
                                <p className="font-semibold">{username}</p>
                                <p className="text-gray-700 text-sm">{email}</p>
                                <p className="text-gray-700 text-sm">{mobile}</p>
                                <p className="text-gray-700 text-sm">{area}, {pincode}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(id)} className="bg-blue-500 flex justify-center items-center text-white px-3 py-1 rounded hover:bg-blue-600 transition"><MdEdit />Edit</button>
                                    <button onClick={() => handleDelete(id)} className="bg-red-500 flex justify-center items-center text-white px-3 py-1 rounded hover:bg-red-600 transition"><AiFillDelete />Delete</button>
                                </div>

                                {selectedId === id && (
                                    <button className="bg-green-500 flex justify-center items-center text-white px-3 py-1 rounded hover:bg-green-600 transition"><CiDeliveryTruck />Deliver Here</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No addresses found. Please add a new address.</p>
                )}
            </div>
        </div>
    );
};

export default Address;
