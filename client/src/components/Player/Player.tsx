import { useEffect, useState } from 'react';
import { ReleaseInterface } from '../../interfaces';
import { RiCloseLine, RiLoader4Line } from 'react-icons/ri';
import './Player.scss';

export interface PlayerProps {
  nowPlaying: {
    current: ReleaseInterface;
    next: string;
  };
  closePlayer: () => void;
}

const Player: React.FC<PlayerProps> = ({ nowPlaying, closePlayer }) => {
  const { url, artist, title, bandcampId, bandcampAlbumId, itemType } = nowPlaying.current;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [nowPlaying]);

  const handlePlayerHasLoaded = () => {
    setIsLoading(false);
  };

  const param1 = itemType;
  const param2 = bandcampAlbumId && bandcampAlbumId !== bandcampId ? `=${bandcampAlbumId}/` : `=${bandcampId}/`;
  const param3 = bandcampAlbumId && bandcampAlbumId !== bandcampId && `track=${bandcampId}/`;

  const src =
    'https://bandcamp.com/EmbeddedPlayer/' +
    param1 +
    param2 +
    '/size=large/bgcol=ffffff/linkcol=7365d6/tracklist=false/artwork=small/' +
    param3 +
    'transparent=true/';

  return (
    <div id='player-wrapper'>
      <div className={isLoading ? 'player-loader' : 'player-loader hides'}>
        <RiLoader4Line className={'spins'} size={32} />
      </div>
      <div className='player-controls'>
        <button className='btn is-icon-wrapper close' onClick={closePlayer}>
          <RiCloseLine size={24} />
        </button>
      </div>
      <iframe src={src} seamless title='bc-player' id='bc-player' onLoad={handlePlayerHasLoaded}>
        <a href={url}>
          {title} by {artist}
        </a>
      </iframe>
    </div>
  );
};

export default Player;
