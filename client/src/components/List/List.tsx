import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getListReleases } from '../../apiService';
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
  }, [list._id]);

  return (
    <section className='list'>
      <div className='left'>
        <div className='list-info-wrapper'>
          <h1 className='is-bold'>{list.name}</h1>
          <button className='btn'>add all to cart</button>
          <button className='btn ml-1'>play all</button>
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
