import { ReleaseInterface } from '../../interfaces';

export interface ReleaseProps {
  release: ReleaseInterface;
  isPulledRelease?: boolean;
}

const Release: React.FC<ReleaseProps> = ({ release, isPulledRelease }) => {
  const { imageUrl, tracks, artist, title } = release;

  return (
    <li className={isPulledRelease ? 'release pulled-release' : 'release'}>
      <figure>
        <img src={imageUrl} alt={title} />
      </figure>
      <aside>
        <h2 className='is-bold'>{title}</h2>
        <h3>
          By:
          <span className='is-bold'> {artist}</span>
        </h3>
        <small>{tracks.length} tracks</small>
      </aside>
    </li>
  );
};

export default Release;