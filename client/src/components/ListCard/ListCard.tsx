import './ListCard.scss';

export interface ListCardProps {
  listId: string;
  name: string;
  lastUpdated: Date;
  numberOfReleases: number;
  lastReleasesArtwork: string;
}

const ListCard: React.FC<ListCardProps> = ({ name, lastUpdated, numberOfReleases, lastReleasesArtwork }) => {
  return (
    <li className='list-card'>
      <figure>
        {lastReleasesArtwork ? (
          <img src={lastReleasesArtwork} alt='last release cover' />
        ) : (
          <img src='/assets/no-releases-artwork.png' alt='no releases' />
        )}
      </figure>
      <aside className='list-infos'>
        <h3 className='is-bold'>{name}</h3>
        <p>{numberOfReleases} releases</p>
        <small>Last updated on {lastUpdated}</small>
      </aside>
    </li>
  );
};

export default ListCard;
