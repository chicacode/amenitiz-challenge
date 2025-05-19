import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import {type GrandmasterCardProps} from "../types/player";

const GrandmasterCard: React.FC<GrandmasterCardProps> = ({
    avatar,
    name,
    username,
    country,
}) => {
    return (
        <Link to={`/grandmaster/${username}`} className="block">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow transition">
                <div className="flex items-center gap-4">
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={username}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    ) : (
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">{name || username}</h3>
                        <span className="text-sm text-gray-500">{country}</span>
                    </div>
                </div>
                <span className="text-xl">🏳️</span>
            </div>
        </Link>
    );
}
export default GrandmasterCard;
// This component is a card that displays information about a grandmaster player.