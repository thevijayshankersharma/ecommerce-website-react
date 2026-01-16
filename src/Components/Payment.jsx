import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { x } from '../App';
import toast, { Toaster } from 'react-hot-toast';
import { FaCreditCard, FaMoneyBillWave, FaGooglePay } from 'react-icons/fa';
import { SiPaytm } from 'react-icons/si';

const Payment = () => {
    const { cart, setCart } = useContext(x);
    const navigate = useNavigate();
    const location = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);

    // Calculate total amount
    const totalAmount = cart.reduce((sum, item) => sum + Math.floor(item.price) * item.quantity, 0);
    const deliveryCharge = 50;
    const finalAmount = totalAmount + deliveryCharge;

    const handlePayment = () => {
        if (!paymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            toast.success('Order Placed Successfully!');
            setCart([]); // Clear cart
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-6 mt-16" data-aos="fade-up">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Side: Payment Options */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-heading font-bold text-gray-800 mb-4">Select Payment Method</h2>

                        <div className="space-y-4">
                            {/* UPI */}
                            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'upi' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 hover:border-red-200'}`}>
                                <input type="radio" name="payment" value="upi" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-red-500" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-800">UPI</h3>
                                        <div className="flex gap-2 text-gray-400">
                                            <FaGooglePay className="text-xl" />
                                            <SiPaytm className="text-xl" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Pay via Google Pay, Paytm, PhonePe</p>
                                </div>
                            </label>

                            {/* Credit/Debit Card */}
                            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'card' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 hover:border-red-200'}`}>
                                <input type="radio" name="payment" value="card" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-red-500" />
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        <FaCreditCard className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Credit / Debit Card</h3>
                                        <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                                    </div>
                                </div>
                            </label>

                            {/* COD */}
                            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 hover:border-red-200'}`}>
                                <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 accent-red-500" />
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        <FaMoneyBillWave className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Cash on Delivery</h3>
                                        <p className="text-xs text-gray-500">Pay when your order arrives</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-heading font-bold text-gray-800 mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
                                <span>${totalAmount}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Charges</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Handling Fee</span>
                                <span>$5</span>
                            </div>
                            <hr className="border-dashed border-gray-200" />
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <span>Total Payable</span>
                                <span>${totalAmount + 5}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 flex justify-center items-center gap-2 ${loading ? 'bg-red-400 cursor-wait' : 'bg-red-500 hover:bg-red-600 shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1'}`}
                        >
                            {loading ? 'Processing...' : `Pay $${totalAmount + 5}`}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <span className="bg-gray-100 p-1 rounded">🔒</span> Secure Payment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
