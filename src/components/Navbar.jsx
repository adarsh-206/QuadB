import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './Logout';
import { useSelector } from 'react-redux';

function Navbar() {
    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    console.log("Hello", isAuthenticated);

    return (
        <nav className="p-4 flex justify-between items-center">
            <div className="text-orange-500 text-2xl font-bold">
                <span className="text-yellow-500">Jobs</span>Adda
            </div>
            <div className='flex'>
                {isAuthenticated ? (
                    <>
                        <Link to="/" className='text-orange-500 text-xl font-semibold hover:text-yellow-600 mr-2'>Home</Link>
                        <Logout />
                    </>
                ) : (
                    <>
                        <Link to="/signup" className='text-orange-500 text-xl font-semibold hover:text-yellow-600 mr-2'>Signup</Link>
                        <Link to="/login" className='text-orange-500 text-xl font-semibold hover:text-yellow-600 mr-2'>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);