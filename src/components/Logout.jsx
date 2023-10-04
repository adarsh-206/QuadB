import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/actions';

const Logout = ({ logout }) => {
    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <button onClick={handleLogout} className='text-orange-500 text-xl font-semibold hover:text-yellow-600 mr-2'>
            Logout
        </button>
    );
};

const mapDispatchToProps = {
    logout,
};

export default connect(null, mapDispatchToProps)(Logout);