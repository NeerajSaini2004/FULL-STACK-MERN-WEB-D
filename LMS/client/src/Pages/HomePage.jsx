import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay, FaBook, FaCertificate, FaUsers, FaLaptop } from "react-icons/fa";
import { useSelector } from "react-redux";

import HomePageImage from "../Assets/Images/homePageMainImage.png";
import HomeLayout from "../Layouts/HomeLayout";

function HomePage() {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const stats = [
        { number: "10K+", label: "Students" },
        { number: "500+", label: "Courses" },
        { number: "50+", label: "Instructors" },
        { number: "95%", label: "Success Rate" }
    ];

    const features = [
        {
            icon: <FaBook />,
            title: "Expert Content",
            desc: "Learn from industry experts with real-world experience"
        },
        {
            icon: <FaCertificate />,
            title: "Certificates",
            desc: "Earn recognized certificates upon course completion"
        },
        {
            icon: <FaUsers />,
            title: "Community",
            desc: "Join a vibrant community of learners and mentors"
        },
        {
            icon: <FaLaptop />,
            title: "Flexible Learning",
            desc: "Learn at your own pace, anywhere, anytime"
        }
    ];

    return (
        <HomeLayout>
            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="pt-20 pb-16 text-white flex items-center justify-center gap-16 mx-8 lg:mx-16">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                                Master New Skills with
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                    {" "}Premium Courses
                                </span>
                            </h1>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Join thousands of learners worldwide. Access expert-led courses, 
                                interactive projects, and earn industry-recognized certificates.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={isLoggedIn ? "/courses" : "/signup"}>
                                <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                                    {isLoggedIn ? "Explore Courses" : "Start Learning"}
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <Link to="/about">
                                <button className="border-2 border-yellow-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300">
                                    Learn More
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold text-yellow-400">{stat.number}</div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:flex w-1/2 items-center justify-center">
                        <div className="relative">
                            <img 
                                alt="Learning illustration" 
                                src={HomePageImage} 
                                className="w-full max-w-lg rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-4 -right-4 bg-yellow-500 text-gray-900 p-4 rounded-full shadow-lg">
                                <FaPlay className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 px-8 lg:px-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We provide everything you need to succeed in your learning journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 group">
                                <div className="text-yellow-500 text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-20 px-8 lg:px-16 bg-gradient-to-r from-yellow-500 to-orange-500">
                    <div className="text-center text-gray-900">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Join our community of learners and unlock your potential with our premium courses
                        </p>
                        <Link to={isLoggedIn ? "/courses" : "/signup"}>
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg">
                                {isLoggedIn ? "Browse Courses" : "Get Started Now"}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default HomePage;