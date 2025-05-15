import { type PlayerProfile } from "../types/player";    

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
        <div className="flex flex-col items-center">
            {user.avatar && <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full" />}
            <h2 className="text-lg font-semibold">{user.username}</h2>
            {user.country && <p className="text-sm text-gray-500">{user.country}</p>}
            {user.followers && <p className="text-sm text-gray-500">Followers: {user.followers}</p>}
            {user.joined && <p className="text-sm text-gray-500">Joined: {new Date(user.joined * 1000).toLocaleDateString()}</p>}
            {user.last_online && <p className="text-sm text-gray-500">Last Online: {new Date(user.last_online * 1000).toLocaleDateString()}</p>}
            {user.status && <p className="text-sm text-gray-500">Status: {user.status}</p>}
            {user.is_streamer && <p className="text-sm text-gray-500">Streamer</p>}
            {user.verified && <p className="text-sm text-gray-500">Verified</p>}
            {user.league && <p className="text-sm text-gray-500">League: {user.league}</p>}
        </div>
    );
}
export default UserProfile;
// This component displays the profile information of a user, including their avatar, username, country, and followers.
