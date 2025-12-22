import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const Men = () => {
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
            <div className="flex flex-wrap justify-center gap-6 p-6 m-20">
                {products.map(({ id, image, title, category, price }) => (
                    category === "men's clothing" && (
                        <div key={id} className="flex flex-col items-center p-4 w-52 border rounded shadow-sm">
                            <img src={image} alt={title} className="w-full h-48 object-cover" />
                            <h2 className="text-lg font-semibold mt-2">{title}</h2>
                            <p className="text-gray-600">${price}</p>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default Men