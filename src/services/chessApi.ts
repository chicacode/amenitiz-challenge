export const getGrandmasters = async () => {
  const res = await fetch('https://api.chess.com/pub/titled/GM');
  return res.json();
};

// https://api.chess.com/pub/player/john_doe
export const getPlayer = async (username: string) => {
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  return res.json();
};
