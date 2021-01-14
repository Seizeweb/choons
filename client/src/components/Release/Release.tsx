import { ReleaseInterface } from '../../interfaces';

export interface ReleaseProps {
  release: ReleaseInterface;
}

const Release: React.FC<ReleaseProps> = ({ release }) => {
  const { imageUrl, tracks, artist, title } = release;
  return (
    <li>
      <figure>
        <img src={imageUrl} alt={title} />
      </figure>
      <aside>
        <h2>{title}</h2>
        <h3>By: {artist}</h3>
        <small>{tracks.length} tracks</small>
      </aside>
    </li>
  );
};

export default Release;
