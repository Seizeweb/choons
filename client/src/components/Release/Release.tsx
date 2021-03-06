import { useContext } from 'react';
import { PlayerContext } from '../../App';
import { ReleaseInterface } from '../../interfaces';
import { RiDeleteBin2Line } from 'react-icons/ri';
import './Release.scss';

export interface ReleaseProps {
  release: ReleaseInterface;
  isPulledRelease?: boolean;
  deleteTrack?: (releaseId: string) => void | null;
}

const Release: React.FC<ReleaseProps> = ({ release, isPulledRelease, deleteTrack }) => {
  const { imageUrl, tracks, artist, title, url } = release;

  const { setNowPlaying } = useContext(PlayerContext);

  const newNowPlaying = {
    current: release,
    next: '',
  };

  return (
    <li className={isPulledRelease ? 'release pulled-release' : 'release'}>
      <div className='release-infos' onClick={() => setNowPlaying(newNowPlaying)}>
        <figure>
          <img src={imageUrl} alt={title} />
        </figure>
        <aside>
          <h2 className='is-bold'>{title}</h2>
          <h3>
            By:
            <span className='is-bold'> {artist}</span>
          </h3>
          <small>
            {tracks.length} track{tracks.length > 1 && 's'}
          </small>
        </aside>
      </div>
      {deleteTrack && (
        <div className='release-controls'>
          <a className='btn is-dark' href={url} target='_blank' rel='noreferrer'>
            Buy
          </a>
          <button className='btn is-warning is-not-outlined is-icon-wrapper' onClick={() => deleteTrack(release._id)}>
            <RiDeleteBin2Line size={24} />
          </button>
        </div>
      )}
    </li>
  );
};

export default Release;
