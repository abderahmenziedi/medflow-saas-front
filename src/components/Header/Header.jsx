import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar-icon.png';
import { BiMenu } from 'react-icons/bi';
import { useEffect, useRef } from 'react'; // Added useRef import

const NavLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'  
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
];

const Header = () => {

  const headerRef = useRef(null); // Fixed typo: userRef -> useRef, headerRed -> headerRef
  const menuRef = useRef(null);

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  }

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

          {/* Nav Menu */}
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

          {/* Nav Right */}
          <div className="flex items-center gap-4">   
           

            <Link to='/login'>
              <button className='bg-buttonBgColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                Login
              </button>
            </Link>
              
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