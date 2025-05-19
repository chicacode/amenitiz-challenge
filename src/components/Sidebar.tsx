import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed h-screen w-20 lg:w-64 bg-white p-4 shadow-md z-30">
            <div className="space-y-6">
                <div className="flex items-center pt-0">
                    <img
                        src="src/assets/Amenitiz_0.png"
                        className="rounded-full"
                        alt="amenitiz-logo"
                        height={200}
                        width={200}
                    />
    
                </div>
                <ul className="space-y-4 text-sm">
                    <li onClick={() => navigate('/')} className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        🏠 <span className="hidden lg:inline">Dashboard</span>
                    </li>
                    <li onClick={() => navigate('/favorites')} className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        ⭐ <span className="hidden lg:inline">Favorites</span>
                    </li>
                    <li onClick={() => navigate('/recent-searches')} className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        🕓 <span className="hidden lg:inline">Recent Searches</span>
                    </li>
                    <li onClick={() => navigate('/settings')} className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-blue-600">
                        ⚙️ <span className="hidden lg:inline">Settings</span>
                    </li>
                    <li className="cursor-pointer flex items-center gap-3 text-red-600 hover:text-red-800">
                        🚪 <span className="hidden lg:inline">Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;