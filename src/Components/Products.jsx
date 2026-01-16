import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Products = () => {
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
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12" data-aos="fade-up">
                <h2 className="text-4xl font-heading font-bold text-gray-800 mb-4">Latest Collections</h2>
                <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Discover our newest arrivals for the season. Premium quality, best prices, and exclusive designs just for you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(({ id, image, title, price, category }) => (
                    <div
                        key={id}
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2"
                    >
                        <div className="relative pt-6 px-4 flex justify-center items-center h-64 bg-white overflow-hidden">
                            <img src={image} alt={title} className="max-h-52 w-auto object-contain transition duration-500 group-hover:scale-110" />
                            {/* Overlay Button (Optional, or keep simple) */}
                        </div>

                        <div className="p-6 flex flex-col flex-1 bg-white relative z-10">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">{category}</p>
                            <h3 className="text-gray-900 font-heading font-bold text-lg line-clamp-1 mb-2 group-hover:text-red-600 transition-colors">{title}</h3>
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-xl font-bold text-gray-900">${Math.floor(price)}</span>
                                <div className="flex gap-2">
                                    <Link to={`/products/${id}`}>
                                        <button className="bg-gray-100 text-gray-800 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
