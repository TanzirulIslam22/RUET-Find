import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/browse', icon: 'grid_view', label: 'Browse' },
  { to: '/map', icon: 'map', label: 'Map' },
  { to: '/profile', icon: 'person', label: 'Profile' },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-surface-container-low/90 backdrop-blur-md border-t border-outline-variant">
      <div className="flex items-center justify-around h-16 px-2">
        {items.slice(0, 2).map((item) => (
          <MobileNavItem key={item.to} {...item} />
        ))}

        <NavLink
          to="/report"
          className="flex items-center justify-center w-14 h-14 -mt-5 rounded-full bg-primary text-on-primary shadow-lg active:scale-95 transition-transform"
          aria-label="Report an item"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </NavLink>

        {items.slice(2).map((item) => (
          <MobileNavItem key={item.to} {...item} />
        ))}
      </div>
    </nav>
  );
}

function MobileNavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-0.5 w-16 py-1 rounded-full transition-colors ${
          isActive
            ? 'bg-primary-container text-on-primary-container'
            : 'text-on-surface-variant'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`material-symbols-outlined text-[22px] ${
              isActive ? 'fill' : ''
            }`}
          >
            {icon}
          </span>
          <span className="text-label-sm leading-none">{label}</span>
        </>
      )}
    </NavLink>
  );
}
