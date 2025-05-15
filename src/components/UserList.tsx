import GrandmasterCard from "./GrandmasterCard";
import { type PlayerProfile } from "../types/player";

interface UserListProps {
    users: PlayerProfile[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div className="space-y-3 p-4">
            {users.map((user: any) => (
                console.log("hello",user),
                <GrandmasterCard
                    key={user.id}
                    playerId={user.playerId}
                    id={user.id}
                    url={user.url}
                    name={user}
                    userName={user}
                    followers={user.followers}
                    country={user.country}
                    last_online={user.last_online}
                    joined={user.joined}
                    status={user.status}
                    isStreamer={user.isStreamer}
                    verified={user.verified}
                    league={user.league}
                    avatar={user.avatar}
                />
            ))}
        </div>
    );
};
export default UserList;
// This component is a list of user cards that displays information about multiple grandmaster players.