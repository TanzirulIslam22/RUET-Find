import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Browse', to: '/browse' },
  { label: 'Map', to: '/map' },
  { label: 'How it works', to: '/how-it-works' },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Link to="/" className="text-headline-sm font-bold text-primary">
              RUET Find
            </Link>
            <p className="text-body-sm text-on-surface-variant">
              A community-powered lost &amp; found platform for RUET campus.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-outline-variant flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-body-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} RUET Find. All rights reserved.
          </p>
          <p className="text-body-xs text-on-surface-variant">
            Developed by <span className="font-semibold text-on-surface">Tanzirul Islam</span> &mdash; Dept. of CSE, RUET &bull; ID: 2203054 &bull;{' '}
            <a
              href="mailto:tanzirul.islam56@gmail.com"
              className="text-primary hover:underline"
            >
              tanzirul.islam56@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
