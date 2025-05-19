import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayer } from '../services/chessApi';
import { type PlayerProfile } from '../types/player';
import UserProfile from '../components/UserProfile';


const GrandmasterProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [player, setPlayer] = useState<PlayerProfile | null>(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      if (username) {
        const data = await getPlayer(username);
        setPlayer(data);
      }
    };
    fetchPlayer();
  }, [username]);

  return (
    <main className="flex-1">

      {player ? <UserProfile user={player} /> : <p className="text-center mt-10">Loading...</p>}
    </main>
  );
};

export default GrandmasterProfilePage;