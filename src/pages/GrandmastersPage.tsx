import { useEffect, useState } from 'react';
import { getGrandmasters, getPlayer } from '../services/chessApi';
import { type GrandmasterCardProps } from '../types/player';
import UserList from '../components/UserList';
import SearchBar from '../components/SearchBar';


const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<GrandmasterCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'oldest'>('relevant');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setCurrentPage(1);
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
              followers: player.followers,
              last_online: player.last_online
            };
          } else {
            // Handle the case where the player data could not be fetched
            return { username: res.players[index] };
          }
        });

        setUsers(players);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, sortBy]);

  // Filter users based on the search term

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sort change
    const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') return (b.joined || 0) - (a.joined || 0);
    if (sortBy === 'oldest') return (a.joined || 0) - (b.joined || 0);
    return 0;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'relevant' | 'newest' | 'oldest');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

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
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <UserList
        users={currentUsers}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} isLoading={isLoading} />
    </main>
  );
};

export default GrandmastersPage;