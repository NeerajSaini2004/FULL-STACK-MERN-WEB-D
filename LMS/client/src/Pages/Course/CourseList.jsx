import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";

import CourseCard from "../../Components/CourseCard";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData, loading, error } = useSelector((state) => state.course);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [filteredCourses, setFilteredCourses] = useState([]);

    const categories = ["all", "web development", "mobile development", "data science", "design", "business"];

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, []);

    useEffect(() => {
        let filtered = [...(courseData || [])];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(course => 
                course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter(course => 
                course.category?.toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        // Sort courses
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                case "oldest":
                    return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
                case "title":
                    return (a.title || '').localeCompare(b.title || '');
                default:
                    return 0;
            }
        });

        setFilteredCourses(filtered);
    }, [courseData, searchTerm, selectedCategory, sortBy]);

    return (
        <HomeLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 px-4 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Explore Premium
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                            {" "}Courses
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover courses crafted by industry experts to boost your career
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors appearance-none"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="title">Title A-Z</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                            <h3 className="text-xl text-white">Loading courses...</h3>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20">
                            <div className="text-6xl text-red-500 mb-4">⚠️</div>
                            <h3 className="text-2xl font-semibold text-white mb-2">Error loading courses</h3>
                            <p className="text-gray-400 mb-4">{error}</p>
                            <button 
                                onClick={loadCourses}
                                className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <>
                            <div className="mb-6 text-gray-300">
                                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course._id} data={course} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl text-gray-600 mb-4">📚</div>
                            <h3 className="text-2xl font-semibold text-white mb-2">No courses found</h3>
                            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;