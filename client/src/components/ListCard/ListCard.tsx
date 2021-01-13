import './ListCard.scss';

export interface ListCardProps {
  listId: String;
}

const ListCard: React.FC<ListCardProps> = ({ listId }) => {
  return (
    <li className='list-card'>
      <figure>
        <img src='https://f4.bcbits.com/img/a3764976661_16.jpg' alt='last release cover' />
      </figure>
      <aside className='list-infos'>
        <h3 className='is-bold'>The mega choons of 2020</h3>
        <p>15 releases</p>
        <small>Last updated on 12/20</small>
      </aside>
    </li>
  );
};

export default ListCard;
