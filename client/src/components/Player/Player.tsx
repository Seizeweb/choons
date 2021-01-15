import { ReleaseInterface } from '../../interfaces';
import './Player.scss';

export interface PlayerProps {
  nowPlaying: {
    current: ReleaseInterface;
    next: string;
  };
}

const Player: React.FC<PlayerProps> = ({ nowPlaying }) => {
  const { url, artist, title, bandcampId, bandcampAlbumId, itemType } = nowPlaying.current;

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
      <iframe src={src} seamless title='bc-player'>
        <a href={url}>
          {title} by {artist}
        </a>
      </iframe>
    </div>
  );
};

export default Player;
