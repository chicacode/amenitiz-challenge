import { useEffect, useState } from 'react';
import { type PlayerProfile } from "../types/player";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';


interface UserProfileProps {
    user: PlayerProfile;
    // TODO: Add Clock component to show last online time, search bar to search user
    isLoading?: boolean;
    error?: string | null;
}
const getCountryCode = (url: string | undefined): string | null => {
    if (!url) return null;
    const segments = url.split('/');
    return segments[segments.length - 1]?.toUpperCase() || null;
};

const getFlagEmoji = (countryCode: string | null) => {
    if (!countryCode || countryCode.length !== 2) return '';
    return countryCode
        .toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading, error }) => {
    const [elapsed, setElapsed] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const updateElapsed = () => {
            const now = Math.floor(Date.now() / 1000);
            setElapsed(now - (user.last_online || now));
        };
        updateElapsed();
        const interval = setInterval(updateElapsed, 1000);
        return () => clearInterval(interval);
    }, [user.last_online]);

    const formatElapsed = (seconds: number) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const countryCode = getCountryCode(user.country);
    const flag = getFlagEmoji(countryCode);

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-6 space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-500 hover:text-blue-700 text-l flex items-center"
            >
                <FaArrowLeft className="inline-block mr-2" />
                Back
            </button>

            <div className="flex flex-col items-center space-y-3">
                {user.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full mx-auto" />
                ) : (
                    <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto" />
                )}
                <h1 className="text-2xl font-bold text-center text-blue-500">{user.name || user.username}</h1>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Country</span>
                    <span className="font-medium text-blue-500">{flag} {countryCode}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Joined</span>
                    <span className="font-medium text-blue-500">{user.joined ? new Date(user.joined * 1000).toLocaleDateString() : '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Followers</span>
                    <span className="font-medium text-blue-500">{user.followers?.toLocaleString() || '—'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Last online</span>
                    <span className="font-medium text-blue-500">{elapsed < 60 ? `${elapsed} seconds ago` : `${Math.floor(elapsed / 60)} minutes ago`}</span>
                </div>
            </div>

            <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Last seen</div>
                <div className="text-xl font-semibold text-blue-500">{formatElapsed(elapsed)}</div>
            </div>

            <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                    Show random grodmaster
                </button>
            </div>
        </div>
    );
}
export default UserProfile;
// This component displays the profile information of a user, including their avatar, username, country, and followers.
