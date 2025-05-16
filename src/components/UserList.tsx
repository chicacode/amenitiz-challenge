import GrandmasterCard from "./GrandmasterCard";
import { type GrandmasterCardProps } from "../types/player";

interface UserListProps {
    users: GrandmasterCardProps[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div className="space-y-3 p-4">
            {users.map((user: any) => (

                <GrandmasterCard
                    key={user.username}
                    username={user.username}
                    avatar={user.avatar}
                    name={user.name}
                    country={user.country}
                    joined={user.joined}
                    last_online={user.last_online}
                    followers={user.followers}
                    status={user.status}
                    is_streamer={user.is_streamer}
                    verified={user.verified}
                    league={user.league}
                />
            ))}
        </div>
    );
};
export default UserList;
// This component is a list of user cards that displays information about multiple grandmaster players.