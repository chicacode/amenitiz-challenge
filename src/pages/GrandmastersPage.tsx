import { useEffect, useState } from 'react';
import { getGrandmasters, getPlayer } from '../services/chessApi';
import { type PlayerProfile, type GrandmasterCardProps } from '../types/player';
import UserList from '../components/UserList';

const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<GrandmasterCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'oldest'>('relevant');
  const usersPerPage = 10;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getGrandmasters();
  //     setUsers(data.players);
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGrandmasters();
      const players = await Promise.all(
        res.players.map(async (username: string) => {
          try {
            const player = await getPlayer(username);
            return {
              username: player.username,
              avatar: player.avatar,
              country: new URL(player.country).pathname.split('/').pop(),
              name: player.name,
              joined: player.joined,
            };
          } catch (err) {
            return { username };
          }
        })
      );

      const sortedPlayers = [...players].sort((a, b) => {
        if (sortBy === 'newest') return (b.joined || 0) - (a.joined || 0);
        if (sortBy === 'oldest') return (a.joined || 0) - (b.joined || 0);
        return 0;
      });

      setUsers(sortedPlayers);
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
      <UserList users={currentUsers} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </main>
  );
};

export default GrandmastersPage;