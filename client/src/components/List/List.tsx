import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { listUserLists, getListReleases } from '../../apiService';
import { Location, ListInterface, ReleaseInterface } from '../../interfaces';
import Release from '../Release/Release';
import './List.scss';

export interface ListProps {}

const List: React.FC<ListProps> = () => {
  const location: Location = useLocation();
  const [list, setList] = useState<ListInterface>(location.state.list);
  const [releases, setReleases] = useState<ReleaseInterface[]>([]);

  useEffect(() => {
    const fetchReleases = async () => {
      const fetchedReleases = await getListReleases(list._id);
      setReleases(fetchedReleases);
    };

    fetchReleases();
  }, []);

  return (
    <section className='list'>
      <div className='left'>
        <h1>{list.name}</h1>
      </div>
      <div className='right'>
        <ul>
          {releases.map((release) => (
            <Release release={release} key={release._id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default List;
