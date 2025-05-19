import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayer } from '../services/chessApi';
import { type PlayerProfile } from '../types/player';
import UserProfile from '../components/UserProfile';
import { FaArrowLeft } from 'react-icons/fa';

const GrandmasterProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const navigate = useNavigate();

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
       <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 hover:underline m-4">
        <FaArrowLeft className="inline-block mr-2" />
      </button>
      {player ? <UserProfile user={player} /> : <p className="text-center mt-10">Loading...</p>}
    </main>
  );
};

export default GrandmasterProfilePage;