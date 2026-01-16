import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TbXboxX } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';


const UpdateAddress = () => {
    const { id } = useParams();
    const navigate = useNavigate()
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


    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/address/${id}`);
                setFormData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAddress();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/address/${id}`, formData);
            toast.success('Successfully Updated!')
            navigate('/address')
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>

            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative animate-fade-in-up">
                    <Link to='/address' className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition duration-300">
                        <TbXboxX className='text-3xl' />
                    </Link>

                    <div className="mb-8 text-center sm:text-left">
                        <h2 className="text-2xl font-bold font-heading text-gray-800">Edit Address</h2>
                        <p className="text-gray-500 text-sm mt-1">Update your shipping details below.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-gray-700 text-xs font-bold mb-1.5 uppercase tracking-wide">Full Name</label>
                            <input type="text" name="username" placeholder="John Doe" value={formData.username} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-gray-700 text-xs font-bold mb-1.5 uppercase tracking-wide">Email</label>
                                <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-xs font-bold mb-1.5 uppercase tracking-wide">Mobile Number</label>
                                <input type="text" name="mobile" placeholder="+1 234 567 890" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs font-bold mb-1.5 uppercase tracking-wide">Area / Street</label>
                            <input type="text" name="area" placeholder="123 Main St, Apt 4B" value={formData.area} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-xs font-bold mb-1.5 uppercase tracking-wide">Pincode</label>
                            <input type="text" name="pincode" placeholder="100001" value={formData.pincode} onChange={handleChange} className="w-full border border-gray-200 bg-gray-50 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition" required />
                        </div>

                        <button type="submit" className="mt-4 w-full bg-red-500 text-white font-bold py-3.5 rounded-xl hover:bg-red-600 shadow-lg hover:shadow-red-500/30 transition transform hover:-translate-y-0.5 active:scale-95">
                            Update Address
                        </button>
                    </form>
                </div>
            </div>
        </>

    )
}

export default UpdateAddress