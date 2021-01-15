import { useContext } from 'react';
import { ReleaseInterface } from '../../interfaces';
import './Player.scss';

export interface PlayerProps {
  nowPlaying: {
    current: ReleaseInterface;
    next: string;
  };
}

const Player: React.FC<PlayerProps> = ({ nowPlaying }) => {
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

{
  /* 
Format when it's a track from an album
https://bandcamp.com/EmbeddedPlayer/album=95932365/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=1855288359/transparent=true/

Format when it's an album
https://bandcamp.com/EmbeddedPlayer/album=95932365/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/

Format when it's a single track
https://bandcamp.com/EmbeddedPlayer/track=1788183451/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/
*/
}
