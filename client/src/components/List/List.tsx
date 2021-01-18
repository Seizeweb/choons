import { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getListReleases, pullRelease, addReleaseToList, deleteReleaseFromList, deleteList } from '../../apiService';
import { RiDownload2Line, RiLoader4Line } from 'react-icons/ri';
import { Location, ListInterface, ReleaseInterface } from '../../interfaces';
import Release from '../Release/Release';
import './List.scss';

export interface ListProps {}

const initialRelease: ReleaseInterface = {
  _id: '',
  tracks: [],
  artist: '',
  title: '',
  url: '',
  imageUrl: '',
  bandcampId: '',
  bandcampAlbumId: '',
  itemType: '',
};

const List: React.FC<ListProps> = () => {
  const location: Location = useLocation();
  const history = useHistory();

  const [list, setList] = useState<ListInterface>(location.state.list);
  const [formState, setFormState] = useState({ releaseUrl: '' });
  const [releases, setReleases] = useState<ReleaseInterface[]>([initialRelease]);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      const fetchedReleases = await getListReleases(list._id);
      setReleases(fetchedReleases);
    };

    fetchReleases();
  }, [list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setError('');
    setFormState({ releaseUrl: value });
  };

  const handlePullRelease = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    // basic url validation, to be updated later (and handle https:// or not here)
    if (/https:\/\/[\S]+\.bandcamp\.com\/[\S]+\/[\S]+/g.test(formState.releaseUrl)) {
      setIsPulling(true);
      const release = await pullRelease(formState.releaseUrl);
      if (release) handleAddToList(release);
    } else {
      setError("Uh oh, this doesn't look like a Bandcamp link");
    }
  };

  const handleAddToList = (release: ReleaseInterface): void => {
    addReleaseToList(list._id, release._id)
      .then((newList) => {
        setList(newList);
        setFormState({ releaseUrl: '' });
        setIsPulling(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteTrack = (releaseId: string): void => {
    deleteReleaseFromList(list._id, releaseId)
      .then((newList) => {
        setList(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteList = (): void => {
    if (!confirm) {
      setConfirm(true);
    } else {
      deleteList(list._id)
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const useCloseOnOutsideClick = (ref: React.MutableRefObject<HTMLDivElement | null>): void => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && confirm) setConfirm(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    useEffect(() => {
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };

  const wrapperRef = useRef(null);
  useCloseOnOutsideClick(wrapperRef);

  return (
    <section className='list'>
      <div className='left'>
        <div className='sticky-wrapper'>
          <h1 className='is-bold'>{list.name}</h1>
          <div className='list-subtitle mr-1'>
            <p>{list.releases.length} releases</p>
            <small onClick={handleDeleteList} ref={wrapperRef}>
              {!confirm ? 'Delete list' : <strong>Are you sure ?</strong>}
            </small>
          </div>
          <form onSubmit={handlePullRelease} className='mr-1'>
            <input type='text' placeholder='Add release' name='releaseUrl' onChange={handleChange} value={formState.releaseUrl} />
            <button className='btn'>{isPulling ? <RiLoader4Line className='spins' size={20} /> : <RiDownload2Line size={20} />}</button>
          </form>
          {error && <small className='field-error'>{error}</small>}
        </div>
      </div>
      <div className='right'>
        <ul>
          {releases.map((release) => (
            <Release release={release} key={release._id} deleteTrack={handleDeleteTrack} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default List;
