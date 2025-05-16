import { useEffect, useState } from 'react';
import { getGrandmasters, getPlayer } from '../services/chessApi';
import { type GrandmasterCardProps } from '../types/player';
import UserList from '../components/UserList';

const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<GrandmasterCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'oldest'>('relevant');
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getGrandmasters();

      const results = await Promise.allSettled(
        res.players.map((username: string) => getPlayer(username))
      );

      const players = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          const player = result.value;
          return {
            username: player.username,
            avatar: player.avatar,
            country: new URL(player.country).pathname.split('/').pop(),
            name: player.name,
            joined: player.joined,
          };
        } else {
          // Handle the case where the player data could not be fetched
          return { username: res.players[index] };
        }
      });

      const sortedPlayers = [...players].sort((a, b) => {
        if (sortBy === 'newest') return (b.joined || 0) - (a.joined || 0);
        if (sortBy === 'oldest') return (a.joined || 0) - (b.joined || 0);
        return 0;
      });

      setUsers(sortedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [sortBy]);


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'relevant' | 'newest' | 'oldest');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <main className="flex-1 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Top Chess Grandmasters</h2>
        <select
          onChange={handleSortChange}
          value={sortBy}
          className="border border-blue-300 rounded px-3 py-1 text-sm"
        >
          <option value="relevant">Sort by: Relevant</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <UserList users={currentUsers} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={isLoading} />
    </main>
  );
};

export default GrandmastersPage;