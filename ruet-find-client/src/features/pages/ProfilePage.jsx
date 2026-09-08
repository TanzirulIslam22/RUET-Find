import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-body-md text-on-surface-variant">Loading profile...</p>
      </div>
    );
  }

  const rows = [
    { icon: 'badge', label: 'Student ID', value: user.studentId },
    { icon: 'school', label: 'Department', value: user.department },
    { icon: 'call', label: 'Phone', value: user.phone },
    {
      icon: 'admin_panel_settings',
      label: 'Role',
      value: user.role === 'admin' ? 'Administrator' : 'Student',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background flex items-start justify-center px-4 py-10 md:py-16">
      <div className="w-full max-w-lg">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <div className="bg-primary-container/40 px-6 py-8 flex flex-col items-center gap-3 border-b border-outline-variant">
            <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center text-headline-md font-bold select-none">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center">
              <h1 className="text-headline-sm font-bold text-on-surface">{user.name}</h1>
              <p className="text-body-sm text-on-surface-variant mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="px-6 py-4 divide-y divide-outline-variant">
            {rows.map((row) =>
              row.value ? (
                <div key={row.label} className="flex items-center gap-4 py-4">
                  <span className="material-symbols-outlined text-[22px] text-on-surface-variant">
                    {row.icon}
                  </span>
                  <span className="text-body-sm text-on-surface-variant w-24 shrink-0">
                    {row.label}
                  </span>
                  <span className="text-body-md text-on-surface font-medium ml-auto text-right">
                    {row.value}
                  </span>
                </div>
              ) : null
            )}
          </div>

          <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container text-label-md font-medium py-3 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-outline-variant hover:bg-error-container hover:text-on-error-container hover:border-transparent text-label-md font-medium py-3 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
