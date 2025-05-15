import React, { useEffect, useState } from 'react';
import { getGrandmasters } from '../services/chessApi';
import UserList from '../components/UserList';

const GrandmastersPage: React.FC = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGrandmasters();
      setUsers(data.players);
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Grandmaster Players</h1>
      <p className="text-gray-600 mb-4">List of Grandmaster players from the chess API.</p>
       
      <UserList users={users} />
    </main>
  );
};

export default GrandmastersPage;