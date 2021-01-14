import { useState, useEffect } from 'react';
import { listUserLists } from '../../apiService';
import { ListInterface } from '../../interfaces';
import ListCard from '../../components/ListCard/ListCard';
import './Dashboard.scss';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [lists, setLists] = useState<ListInterface[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      const fetchedLists = await listUserLists();
      setLists(fetchedLists);
    };

    fetchLists();
  }, []);

  return (
    <section>
      <h2>Wishlists</h2>
      <ul className='list-cards-wrapper'>
        {lists.map((list) => (
          <ListCard list={list} key={list._id} />
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
