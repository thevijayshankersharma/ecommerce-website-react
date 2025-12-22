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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-6 p-6">
            <div><Toaster /></div>
            <div className="shrink-0">
                <img src={product.image} alt='err' className="w-64 h-80 object-contain border border-gray-300 p-2 rounded" />
            </div>
            <div className="flex flex-col justify-between gap-4 max-w-lg">
                <h1 className="text-xl font-semibold">{product.title}</h1>
                <p className="text-red-500 text-lg font-bold">${Math.floor(product.price)}</p>
                <p className="text-gray-700 text-sm">{product.description}</p>

                {add ?
                    <button onClick={() => { handleCart(); setAdd(false); }} className="mt-2 bg-red-500 text-white px-5 py-2 rounded w-40 text-center">Add to Cart</button>
                    :
                    <button onClick={() => {
                        toast.error("Already Added")
                    }} className="mt-2 bg-red-400 cursor-not-allowed text-white px-5 py-2 rounded w-40 text-center">Added</button>
                }
            </div>
        </div>

    );
};

export default Product;
