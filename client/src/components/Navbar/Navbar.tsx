import './Navbar.scss';

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className='navbar'>
      <h1 className='is-bold'>Choons</h1>
      <ul>
        <li>
          <a href='' className='is-bold'>
            Lucas
          </a>
        </li>
        <li>
          <a href='' className='btn is-bold'>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
