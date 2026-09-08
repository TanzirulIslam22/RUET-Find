import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, clearAdminError } from '../../store/adminSlice';

const roleBadge = (role) => ({
  admin: 'bg-secondary-container text-on-secondary-container',
  student: 'bg-surface-variant text-on-surface-variant',
})[role] || 'bg-surface-variant text-on-surface-variant';

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const { users, pagination, loading, error } = useSelector((state) => state.admin);

  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const loadUsers = useCallback(() => {
    const filters = {};
    if (searchInput.trim()) filters.search = searchInput.trim();
    if (page > 1) filters.page = page;
    dispatch(fetchUsers(filters));
  }, [dispatch, searchInput, page]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers();
  };

  const handleReset = () => {
    setSearchInput('');
    setPage(1);
  };

  const totalPages = pagination?.pages || 1;

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-headline-lg text-on-surface">Users</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            {pagination?.total ?? '—'} registered accounts ({users.filter((u) => u.role === 'admin').length} admins)
          </p>
        </div>
        <form onSubmit={handleSearch} className="w-full md:w-80">
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-5 py-2.5">
            <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search name, email, student ID..."
              className="flex-1 bg-transparent text-body-md text-on-surface placeholder-on-surface-variant outline-none"
            />
          </div>
        </form>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded-xl border border-outline-variant p-4 mb-6 flex items-center justify-between">
          <span className="text-body-md">{error}</span>
          <button
            onClick={() => dispatch(clearAdminError())}
            className="flex items-center gap-1 text-label-md font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="p-10 text-center text-body-md text-on-surface-variant">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-body-md text-on-surface-variant mb-4">No users found</p>
            {searchInput && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-primary hover:text-on-primary-container text-label-md font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">User</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Student ID</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Department</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Phone</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Role</th>
                  <th className="text-right text-label-md text-on-surface-variant px-6 py-4 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-label-md font-bold select-none shrink-0">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-body-md text-on-surface font-medium truncate">{user.name}</p>
                          <p className="text-body-sm text-on-surface-variant truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">{user.studentId || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">{user.department || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">{user.phone || '—'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-label-sm font-medium capitalize ${roleBadge(user.role)}`}>
                        {user.role === 'admin' ? 'Administrator' : 'Student'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-body-sm text-on-surface-variant">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-label-md transition-colors ${
                page === p
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}