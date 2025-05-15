import React, { useEffect, useState } from 'react';
import { getGrandmasters } from '../services/chessApi';
import UserList from '../components/UserList';
import { type PlayerProfile } from '../types/player';

const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<PlayerProfile[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGrandmasters();
      setUsers(data.players);
    };
    fetchData();
  }, []);

  return (
    <main className="flex-1">
      <h1 className="text-gray-600 text-2xl font-bold m-4">Grandmaster Players</h1>
      <p className="text-gray-600 mb-4">List of Grandmaster players from the chess API.</p>
       
      <UserList users={users} />
    </main>
  );
};

export default GrandmastersPage;