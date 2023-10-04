import React, { useState } from 'react';
import { connect } from 'react-redux';
import { storeSignupData } from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';

const Signup = ({ storeSignupData, signupData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch the signup data to the Redux store
        storeSignupData(formData);
        navigate('/login');
    };

    return (
        <div className="w-1/3 mx-auto p-6 border border-gray-300 rounded-lg shadow-xl mt-19">
            <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
            <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="form-input mt-1 block w-full p-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 rounded-lg"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="form-input mt-1 block w-full p-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 rounded-lg"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form-input mt-1 block w-full p-2 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 rounded-lg"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4 flex justify-center">
                    <button
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-orange-600"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    signupData: state.signupData,
});

const mapDispatchToProps = {
    storeSignupData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);