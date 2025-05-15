import GrandmasterCard from "./GrandmasterCard";

interface UserListProps {
    users: [];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user: any) => (
                <GrandmasterCard
                    key={user.id}
                    playerId={user.playerId}
                    id={user.id}
                    url={user.url}
                    name={user.name}
                    userName={user.userName}
                    followers={user.followers}
                    country={user.country}
                    last_online={user.last_online}
                    joined={user.joined}
                    status={user.status}
                    isStreamer={user.isStreamer}
                    verified={user.verified}
                    league={user.league}
                />
            ))}
        </div>
    );
};
export default UserList;
// This component is a list of user cards that displays information about multiple grandmaster players.