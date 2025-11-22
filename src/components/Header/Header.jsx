import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar-icon.png';
import { BiMenu, BiLogOut } from 'react-icons/bi';
import { useEffect, useRef, useContext } from 'react'; 
import { authContext } from '../../context/AuthContext';

const NavLinks = [
  { path: '/home', display: 'Home' },
  { path: '/doctors', display: 'Find a Doctor' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {

  const headerRef = useRef(null); 
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, role, token, dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  };

  useEffect(() => {
    handleStickyHeader();
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/* Navigation */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {NavLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16px] leading-7 font-[500]'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">

            {token && user ? (
              <div className='flex items-center gap-4'>
                <Link to={role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}>
                  <figure className='w-[50px] h-[50px] rounded-full cursor-pointer'>
                    <img
                      src={user?.photo ? user.photo : userImg}
                      className='w-full h-full rounded-full object-cover'
                      alt="User"
                    />
                  </figure>
                </Link>
                <button 
                  onClick={handleLogout}
                  className='flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 px-2 py-1 text-sm rounded-full transition-colors border border-red-200'
                  title='Déconnexion'
                >
                  <BiLogOut className='text-base' />
                  <span className='hidden md:inline text-sm'>Logout</span>
                </button>
              </div>
            ) : (
              <Link to='/login'>
                <button className='bg-buttonBgColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
