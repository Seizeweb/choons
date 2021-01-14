import { useState, useEffect } from 'react';
import { listUserLists } from '../../apiService';
import { List } from '../../interfaces';
import ListCard from '../../components/ListCard/ListCard';
import './Dashboard.scss';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  // FOLLOWING BIT FOR TESTING PURPOSES (checking out the api service)
  // useEffect(() => {
  //   const url = 'https://physicallysick3.bandcamp.com/album/physically-sick-3';

  //   const fetchRelease = async () => {
  //     const release = await pullRelease(url);
  //     console.log(release);
  //   };

  //   fetchRelease();
  // }, []);

  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchRelease = async () => {
      const fetchedLists = await listUserLists();
      setLists(fetchedLists);
    };

    fetchRelease();
  }, []);

  return (
    <section>
      <h2>Wishlists</h2>
      <ul className='list-cards-wrapper'>
        {lists.map((list) => (
          <ListCard
            listId={list._id}
            key={list._id}
            name={list.name}
            lastUpdated={list.lastUpdated}
            numberOfReleases={list.releases.length}
            lastReleasesArtwork={list.lastReleasesArtwork}
          />
        ))}
      </ul>
    </section>
  );
};

export default Dashboard;
