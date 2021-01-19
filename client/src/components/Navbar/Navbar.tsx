import './Navbar.scss';
import { Link } from 'react-router-dom';
export interface NavbarProps {
  username: string;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, logout }) => {
  return (
    <nav className='navbar'>
      <h1 className='is-bold'>
        <Link to='/'>Choons</Link>
      </h1>
      <ul>
        {username && (
          <>
            <li>
              <Link to='/profile' className='is-bold'>
                {username}
              </Link>
            </li>
            <li>
              <button className='btn' onClick={logout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
