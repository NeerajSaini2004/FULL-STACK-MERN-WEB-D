import {AiFillCloseCircle} from 'react-icons/ai';
import {FiMenu} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer';
import { logout } from '../Redux/Slices/AuthSlice';
function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // for checking if user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    // for displaying the options acc to role
    const role = useSelector((state) => state?.auth?.role);



    async function handleLogout(e) {
        e.preventDefault();

        const res = await dispatch(logout());
        if(res?.payload?.success)
        navigate("/");
    }

    return (
        <div className="min-h-screen relative">
            {/* Menu button */}
            <div className="fixed top-4 left-4 z-50">
                <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost bg-base-300">
                    <FiMenu size={24} />
                </label>
            </div>
            
            {/* Hidden checkbox for toggle */}
            <input id="drawer-toggle" type="checkbox" className="hidden" />
            
            {/* Sidebar overlay */}
            <label htmlFor="drawer-toggle" className="sidebar-overlay fixed inset-0 bg-black bg-opacity-60 z-40 opacity-0 pointer-events-none transition-opacity duration-300 cursor-pointer"></label>
            
            {/* Sidebar */}
            <div className="sidebar fixed top-0 left-0 w-80 h-screen bg-gray-900 text-white z-50 transform -translate-x-full transition-transform duration-300 shadow-2xl">
                <div className="p-6">
                    <ul className="space-y-4 mt-8">
                        <li>
                            <Link to="/" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                Home
                            </Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to="/course/create" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                    Create New Course
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link to="/courses" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                All Courses
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                Contact Us
                            </Link>
                        </li>

                        <li>
                            <Link to="/about" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                About Us
                            </Link>
                        </li>

                        {isLoggedIn && (
                            <li>
                                <Link to="/user/profile" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                    About Profile
                                </Link>
                            </li>
                        )}

                        {isLoggedIn && (
                            <li>
                                <Link onClick={handleLogout} className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                    Logout
                                </Link>
                            </li>
                        )}

                        {!isLoggedIn && (
                            <li>
                                <Link to="/login" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                    Login
                                </Link>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li>
                                <Link to="/signup" className="block py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                                    Signup
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            
            {/* Main content */}
            <div className="min-h-screen">
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default HomeLayout;