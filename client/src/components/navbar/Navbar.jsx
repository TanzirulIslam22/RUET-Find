import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse' },
  { to: '/map', label: 'Map' },
  { to: '/how-it-works', label: 'How it works' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!token && !!user;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-outline-variant">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-headline-sm font-bold text-primary shrink-0">
          RUET Find
        </Link>

        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-body-md transition-colors py-1 ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isLoggedIn ? (
            <>
              <span className="hidden sm:inline text-body-md text-on-surface font-medium">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-label-md text-on-surface-variant hover:text-on-surface px-3 py-2 rounded-full transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="text-label-md text-on-surface-variant hover:text-on-surface px-4 py-2 rounded-full transition-colors"
            >
              Sign in
            </Link>
          )}

          <Link
            to="/report"
            className="hidden sm:inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-5 py-2.5 rounded-full text-label-md font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Report an item
          </Link>
        </div>
      </div>
    </nav>
  );
}
