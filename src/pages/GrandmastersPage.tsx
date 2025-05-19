import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGrandmasters, getPlayer } from '../services/chessApi';
import { type GrandmasterCardProps } from '../types/player';
import UserList from '../components/UserList';
import SearchBar from '../components/SearchBar';


const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<GrandmasterCardProps[]>([]);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'newest' | 'oldest'>('relevant');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;

  // Reset Search Term and Current Page when navigating back from UserProfile
  useEffect(() => {
    if (location.state?.resetSearch) {
      setSearchTerm('');
      setCurrentPage(1);

       window.history.replaceState({}, document.title);
    }
  }, [location.state])

  // Fetch grandmasters data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getGrandmasters();
        if (!res || !res.players) {
          throw new Error('No players found');
        }
        const results = await Promise.allSettled(
          res.players.map((username: string) => getPlayer(username))
        );

        const players = results.map((result, index) => {
          if (result.status === 'fulfilled') {
            const player = result.value;
            return {
              username: player.username,
              avatar: player.avatar ?? undefined,
              country: player.country ? new URL(player.country).pathname.split('/').pop() : undefined,
              name: player.name,
              joined: player.joined,
              followers: player.followers,
              last_online: player.last_online
            } as GrandmasterCardProps;
          } else {
            // Handle the case where the player data could not be fetched
            console.warn(`Failed to fetch player: ${res.players[index]}`);
            return null;
          }
        }).filter((player): player is GrandmasterCardProps => player !== null); // Filter out null players

        setUsers(players);
        // setCurrentPage(1);
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

      {searchTerm && currentUsers.length === 0 && (
        <div className=" text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold pr-2">Holy smokes!</strong>
          <span className="block sm:inline">Something seriously bad happened.</span>
          <div className="font-bold text-black text-lg mt-6">
            No grandmasters found matching "<span className="font-semibold">{searchTerm}</span>"
          </div>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {
            setSearchTerm('');
            setCurrentPage(1);
          }}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>

      )}

    </main>
  );
};

export default GrandmastersPage;