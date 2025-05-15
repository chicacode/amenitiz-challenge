export interface PlayerProfile {
  avatar?: string;
  player_id: number;
  '@id': string;
  url: string;
  name?: string;
  username: string;
  followers: number;
  country: string;
  last_online: number;
  joined: number;
  status?: string;
  is_streamer?: boolean;
  verified?: boolean;
  league?: string;
  streaming_platforms?: string[];
}

export interface GrandmasterCardProps {
  username: string;
  avatar?: string;
  country?: string;
  name?: string;
  followers?: number;
  joined?: number;
  last_online?: number;
  status?: string;
  is_streamer?: boolean;
  verified?: boolean;
  league?: string;
}
