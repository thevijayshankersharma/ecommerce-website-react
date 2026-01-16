import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { Link } from "react-router-dom";

const Electronics = () => {
    let [products, setProducts] = useState([]);
    let [loading, setLoading] = useState(true);

    let fetchApi = async () => {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
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
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-20">
                {products.map(({ id, image, title, category, price }) => (
                    category === "electronics" && (
                        <div key={id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:-translate-y-1">
                            <div className="relative pt-4 px-4 flex justify-center items-center h-48 bg-gray-50 group-hover:bg-gray-100 transition">
                                <img src={image} alt={title} className="w-32 h-32 object-contain mix-blend-multiply group-hover:scale-110 transition duration-300" />
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h2 className="text-gray-800 font-heading font-semibold text-sm line-clamp-2 mb-2 group-hover:text-red-500 transition">{title}</h2>
                                <div className="mt-auto">
                                    <p className="text-lg font-bold text-gray-900 mb-3">${price}</p>
                                    <Link to={`/products/${id}`} className="block w-full">
                                        <button className="w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg hover:bg-red-500 active:scale-95 transition-all duration-200 shadow-md">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Electronics