import { Link } from 'react-router-dom';
import { ListInterface } from '../../interfaces';
import moment from 'moment';
import './ListCard.scss';

export interface ListCardProps {
  list: ListInterface;
}

const ListCard: React.FC<ListCardProps> = ({ list }) => {
  const { lastReleasesArtwork, name, lastUpdated } = list;
  return (
    <li className='list-card'>
      <Link to={{ pathname: '/list', state: { list } }}>
        <figure>
          {lastReleasesArtwork ? (
            <img src={lastReleasesArtwork} alt='last release cover' />
          ) : (
            <img src='/assets/no-releases-artwork.png' alt='no releases' />
          )}
        </figure>
        <aside className='list-infos'>
          <h3 className='is-bold'>{name}</h3>
          <p>
            {list.releases.length} release{list.releases.length > 1 && 's'}
          </p>
          <small>Last updated on {moment(lastUpdated).format('MMM Do')}</small>
        </aside>
      </Link>
    </li>
  );
};

export default ListCard;
