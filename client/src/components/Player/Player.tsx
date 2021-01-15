import { useContext, useEffect } from 'react';
import { PlayerContext } from '../../App';
import './Player.scss';

export interface PlayerProps {}

const Player: React.FC<PlayerProps> = () => {
  const { nowPlaying } = useContext(PlayerContext);
  const { url, artist, title, bandcampId } = nowPlaying.current;
  const src =
    'https://bandcamp.com/EmbeddedPlayer/album=' +
    bandcampId +
    '/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/';
  return (
    <div id='player'>
      <h1>Ich bin das Player</h1>
      <iframe src={src} seamless>
        <a href={url}>
          {title} by {artist}
        </a>
      </iframe>
    </div>
  );
};

export default Player;
