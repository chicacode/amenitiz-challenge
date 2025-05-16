import GrandmasterCard from "./GrandmasterCard";
import { type GrandmasterCardProps } from "../types/player";

interface UserListProps {
    users: GrandmasterCardProps[];
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, totalPages, currentPage, setCurrentPage }) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 3;
        const leftSide = Math.max(2, currentPage - 1);
        const rightSide = Math.min(totalPages - 1, currentPage + 1);

        pages.push(
            <button
                key={1}
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1 rounded border text-sm ${currentPage === 1 ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
            >
                1
            </button>
        );

        if (leftSide > 2) {
            pages.push(<span key="left-ellipsis" className="px-2">...</span>);
        }

        for (let i = leftSide; i <= rightSide; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 rounded border text-sm ${currentPage === i ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                >
                    {i}
                </button>
            );
        }

        if (rightSide < totalPages - 1) {
            pages.push(<span key="right-ellipsis" className="px-2">...</span>);
        }

        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };
    return (
        <div className="space-y-6 p-4">
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
            <div className="flex justify-center flex-wrap gap-2">
                {renderPageNumbers()}
            </div>
        </div>


    );
};
export default UserList;
// This component is a list of user cards that displays information about multiple grandmaster players.