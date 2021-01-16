import './Navbar.scss';
import { Link } from 'react-router-dom';
export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className='navbar'>
      <h1 className='is-bold'>
        <Link to='/'>Choons</Link>
      </h1>
      <ul>
        <li>
          <Link to='/profile' className='is-bold'>
            Lucas
          </Link>
        </li>
        <li>
          <Link to='/' className='btn'>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
