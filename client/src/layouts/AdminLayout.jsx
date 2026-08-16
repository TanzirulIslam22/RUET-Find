import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const sidebarLinks = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
  { to: '/admin/reports', icon: 'flag', label: 'Reports' },
  { to: '/admin/users', icon: 'people', label: 'Users' },
  { to: '/admin/settings', icon: 'settings', label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-inverse-surface/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-outline-variant flex flex-col transition-transform duration-200 md:translate-x-0 md:static md:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-5 border-b border-outline-variant">
          <span className="text-headline-sm font-bold text-primary">
            RUET Find Admin
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-3 mt-2">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-full text-body-md transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-low'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">
                {link.icon}
              </span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-outline-variant">
          {user && (
            <div className="px-4 py-2 mb-2">
              <p className="text-body-sm text-on-surface font-medium truncate">
                {user.name}
              </p>
              <p className="text-label-sm text-on-surface-variant truncate">
                {user.email}
              </p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-full text-body-md text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center gap-4 px-4 border-b border-outline-variant bg-surface md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          <span className="text-headline-sm font-bold text-primary">
            RUET Find Admin
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
