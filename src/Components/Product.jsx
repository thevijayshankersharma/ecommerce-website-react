import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { x } from '../App';
import toast, { Toaster } from 'react-hot-toast';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { cart, setCart } = useContext(x);
    const [add, setAdd] = useState(true);

    const fetchApi = async () => {
        try {
            const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCart = () => {
        if (!cart.some(item => item.id === product.id)) {
            setCart(prev => [...prev, { ...product, quantity: 1 }]);
            setAdd(true);
            toast.success('Successfully Added!')
        } else {
            setAdd(false);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader size={50} color="#ef4444" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 mt-16">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start" data-aos="fade-up">
                {/* Image Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                    <img src={product.image} alt='err' className="w-full max-w-sm h-auto object-contain mix-blend-multiply hover:scale-105 transition duration-500" />
                </div>

                {/* Details Section */}
                <div className="flex flex-col gap-6" data-aos="fade-left" data-aos-delay="200">
                    <div>
                        <p className="text-red-500 font-bold tracking-wider text-xs uppercase mb-2">New Arrival</p>
                        <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 leading-tight mb-4">{product.title}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <p className="text-4xl font-bold text-gray-900">${Math.floor(product.price)}</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {add ?
                            <button
                                onClick={() => { handleCart(); setAdd(false); }}
                                className="flex-1 bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-500/20 hover:bg-red-600 hover:shadow-red-500/40 transition transform hover:-translate-y-1 active:scale-95"
                            >
                                Add to Cart
                            </button>
                            :
                            <button
                                onClick={() => toast.error("Already Added")}
                                className="flex-1 bg-gray-200 text-gray-500 px-8 py-4 rounded-xl font-bold text-lg cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                <span>✓</span> Added to Cart
                            </button>
                        }
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg text-center border border-gray-100">
                            <span className="text-2xl">🚚</span>
                            <span className="text-xs font-bold text-gray-600">Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg text-center border border-gray-100">
                            <span className="text-2xl">🔄</span>
                            <span className="text-xs font-bold text-gray-600">30 Days Return</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg text-center border border-gray-100">
                            <span className="text-2xl">🛡️</span>
                            <span className="text-xs font-bold text-gray-600">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
