import { useNavigate } from "react-router-dom";
import { FaPlay, FaUser, FaClock, FaStar } from "react-icons/fa";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2">
            <div className="relative overflow-hidden">
                <img 
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={data?.thumbnail?.secure_url || "https://placehold.co/400x200/1f2937/ffffff?text=Course+Image"}
                    alt="course thumbnail"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-yellow-500 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <FaPlay className="text-gray-900 text-xl" />
                    </div>
                </div>
                <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                    {data?.category || "Course"}
                </div>
            </div>
            
            <div 
                onClick={() => navigate("/course/description/", {state: {...data}})}
                className="p-6 space-y-4"
            >
                <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {data?.title}
                </h3>
                
                <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">
                    {data?.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <FaUser className="text-yellow-500" />
                        <span>{data?.createdBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaClock className="text-yellow-500" />
                        <span>{data?.numberOfLectures || data?.numberoflectures || 0} lectures</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-yellow-500" />
                        <FaStar className="text-gray-600" />
                        <span className="text-gray-400 text-sm ml-1">(4.0)</span>
                    </div>
                    <div className="text-yellow-500 font-bold text-lg">
                        Free
                    </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105">
                    View Course
                </button>
            </div>
        </div>
    );
}

export default CourseCard;