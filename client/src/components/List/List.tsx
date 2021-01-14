import { Location } from '../../interfaces';
import { useLocation } from 'react-router-dom';
import './List.scss';

export interface ListProps {}

const List: React.FC<ListProps> = () => {
  const location: Location = useLocation();
  const list = location.state.list;
  // console.log('list', list);

  return <h1>I am the list {list.name}</h1>;
};

export default List;
