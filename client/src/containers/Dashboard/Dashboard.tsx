import { useEffect } from 'react';
import { pullRelease } from '../../apiService';
import ListCard from '../../components/ListCard/ListCard';
import './Dashboard.scss';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const showList = () => {};

  useEffect(() => {
    const url = 'https://physicallysick3.bandcamp.com/album/physically-sick-3';

    const fetchRelease = async () => {
      const release = await pullRelease(url);
      console.log(release);
    };

    fetchRelease();
  }, []);

  return (
    <section>
      <h2>Wishlists</h2>
      <ul className='list-cards-wrapper'>
        <ListCard listId='someid1' />
        <ListCard listId='someid2' />
        <ListCard listId='someid3' />
        <ListCard listId='someid4' />
        <ListCard listId='someid5' />
        <ListCard listId='someid6' />
        <ListCard listId='someid7' />
        <ListCard listId='someid8' />
        <ListCard listId='someid9' />
      </ul>
    </section>
  );
};

export default Dashboard;
