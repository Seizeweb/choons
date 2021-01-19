import { useState, useEffect } from 'react';
import { RiAddCircleLine, RiLoader4Line } from 'react-icons/ri';
import { listUserLists } from '../../apiService';
import { ListInterface } from '../../interfaces';
import ListCard from '../../components/ListCard/ListCard';
import NewListModal from '../../components/NewListModal/NewListModal';
import './Dashboard.scss';

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [showNewList, setShowNewList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchedLists = await listUserLists();
      setLists(fetchedLists);
      setIsLoading(false);
    })();
  }, []);

  const handleListHasBeenAdded = (newList: ListInterface): void => {
    console.log(newList);
    setLists([...lists, newList]);
    setShowNewList(false);
  };

  return (
    <section>
      <div className={isLoading ? 'dashboard-loader' : 'dashboard-loader hides'}>
        <RiLoader4Line className='spins' size={64} />
      </div>
      <h2>Wishlists</h2>
      <ul className='list-cards-wrapper'>
        {!!lists.length && lists.map((list) => <ListCard list={list} key={list._id} />)}
        <li className='btn add-list list-card' onClick={() => setShowNewList(true)}>
          <RiAddCircleLine size={32} />
        </li>
      </ul>
      {showNewList && <NewListModal listHasBeenAdded={handleListHasBeenAdded} closeModal={() => setShowNewList(false)} />}
    </section>
  );
};

export default Dashboard;
