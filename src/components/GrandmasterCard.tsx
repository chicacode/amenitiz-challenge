import { Link } from "react-router-dom";

interface GrandmasterCardProps {
    avatar?: string;
    playerId: number;
    id: number;
    url: string;
    name?: string;
    userName: string;
    followers?: number;
    country?: string;
    last_online: number;
    joined: number;
    status: string;
    isStreamer: boolean;
    verified: boolean;
    league: string;
}
const GrandmasterCard: React.FC<GrandmasterCardProps> = ({
    avatar,
    playerId,
    id,
    url,
    name,
    userName,
    followers,
    country,
    last_online,
    joined,
    status,
    isStreamer,
    verified,
    league,
}) => {
    return (
        <Link to={`/grandmaster/${userName}`} className="block">
            <div className="border p-4 rounded-lg hover:shadow-lg transition">
                {avatar && <img src={avatar} alt={userName} className="w-16 h-16 rounded-full mx-auto" />}
                <h2 className="text-lg font-semibold text-center text-gray-500 mt-2">{userName}</h2>
                {country && <p className="text-center text-sm text-gray-500">{country}</p>}
            </div>
        </Link>
    );
}
export default GrandmasterCard;
// This component is a card that displays information about a grandmaster player.