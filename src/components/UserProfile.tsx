import { type PlayerProfile } from "../types/player";
import { FaUserCircle } from 'react-icons/fa';

interface UserProfileProps {
    user: PlayerProfile;
    // TODO: Add more props as needed in the page GMPPage
    isLoading?: boolean;
    error?: string | null;
}
const UserProfile: React.FC<UserProfileProps> = ({ user, isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            {user.avatar ? (
                <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full mx-auto" />
            ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto" />
            )}
            <h2 className="text-2xl font-bold text-center mt-4">{user.name || user.username}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 border rounded-lg p-4 bg-white">
                {user.country && <p className="text-sm text-gray-500">{user.country}</p>}
                {user.followers && <p className="text-sm text-gray-500">Followers: {user.followers}</p>}
                {user.joined && <p className="text-sm text-gray-500">Joined: {new Date(user.joined * 1000).toLocaleDateString()}</p>}
                {user.last_online && <p className="text-sm text-gray-500">Last Online: {new Date(user.last_online * 1000).toLocaleDateString()}</p>}
                {user.status && <p className="text-sm text-gray-500">Status: {user.status}</p>}
                {user.is_streamer && <p className="text-sm text-gray-500">Streamer</p>}
                {user.verified && <p className="text-sm text-gray-500">Verified</p>}
                {user.league && <p className="text-sm text-gray-500">League: {user.league}</p>}
            </div>
        </div>
    );
}
export default UserProfile;
// This component displays the profile information of a user, including their avatar, username, country, and followers.
