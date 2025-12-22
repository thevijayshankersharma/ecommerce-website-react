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
        <div className="flex flex-wrap justify-center gap-6 p-6">
            {products.map(({ id, image, title }) => (
                <div key={id} className="flex flex-col items-center p-4 w-52 border rounded shadow-sm">
                    <img src={image} alt='err' className="w-36 h-36 object-contain"/>
                    <p className="text-center mt-2 text-sm line-clamp-2">{title}</p>
                    <Link to={`/products/${id}`}>
                        <button className="mt-3 bg-red-500 text-white px-3 py-1 rounded">View More</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Products;
