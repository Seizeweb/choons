import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getListReleases, pullRelease, addReleaseToList } from '../../apiService';
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
};

const List: React.FC<ListProps> = () => {
  const location: Location = useLocation();
  const [list, setList] = useState<ListInterface>(location.state.list);
  const [formState, setFormState] = useState({ releaseUrl: '' });
  const [releases, setReleases] = useState<ReleaseInterface[]>([initialRelease]);
  const [pulledRelease, setPulledRelease] = useState<ReleaseInterface>(initialRelease);

  useEffect(() => {
    const fetchReleases = async () => {
      const fetchedReleases = await getListReleases(list._id);
      setReleases(fetchedReleases);
    };

    fetchReleases();
  }, [list]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setFormState({ releaseUrl: value });
  };

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    const release = await pullRelease(formState.releaseUrl);
    setPulledRelease(release);
  };

  const handleAddToList = (): void => {
    if (pulledRelease) {
      addReleaseToList(list._id, pulledRelease._id)
        .then((newList) => {
          setPulledRelease(initialRelease);
          setList(newList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className='list'>
      <div className='left'>
        <div className='sticky-wrapper'>
          <h1 className='is-bold'>{list.name}</h1>
          <h4>{list.releases.length} releases</h4>
          <form onSubmit={handleSubmit} className='mr-1'>
            <input type='text' placeholder='Add release' name='releaseUrl' onChange={handleChange} />
            <button>fetch</button>
          </form>
          {pulledRelease._id && (
            <>
              <Release release={pulledRelease} isPulledRelease={true} />
              <button className='btn pulled-release-btn' onClick={handleAddToList}>
                That's it !
              </button>
            </>
          )}
        </div>
      </div>
      <div className='right'>
        <ul>
          {[...releases].reverse().map((release) => (
            <Release release={release} key={release._id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default List;
