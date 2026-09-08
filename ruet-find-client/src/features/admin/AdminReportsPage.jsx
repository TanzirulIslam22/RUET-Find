import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminItems, updateItemStatus, deleteItem, clearAdminError } from '../../store/adminSlice';

const statusBadge = (status) => ({
  active: 'bg-primary-container text-on-primary-container',
  pending: 'bg-error-container text-on-error-container',
  claimed: 'bg-secondary-container text-on-secondary-container',
  returned: 'bg-primary text-on-primary',
  expired: 'bg-surface-variant text-on-surface-variant',
})[status] || 'bg-surface-variant text-on-surface-variant';

export default function AdminReportsPage() {
  const dispatch = useDispatch();
  const { items, pagination, loading, error } = useSelector((state) => state.admin);

  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const loadItems = useCallback(() => {
    const filters = {};
    if (searchInput.trim()) filters.search = searchInput.trim();
    if (status) filters.itemStatus = status;
    if (page > 1) filters.page = page;
    dispatch(fetchAdminItems(filters));
  }, [dispatch, searchInput, status, page]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadItems();
  };

  const handleStatusFilter = (value) => {
    setStatus(value);
    setPage(1);
  };

  const totalPages = pagination?.pages || 1;

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-headline-lg text-on-surface">Reports</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            All item submissions across the platform
          </p>
        </div>
        <form onSubmit={handleSearch} className="w-full md:w-80">
          <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-5 py-2.5">
            <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search items..."
              className="flex-1 bg-transparent text-body-md text-on-surface placeholder-on-surface-variant outline-none"
            />
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['', 'pending', 'active', 'claimed', 'returned', 'expired'].map((value) => (
          <button
            key={value || 'all'}
            onClick={() => handleStatusFilter(value)}
            className={`px-4 py-2 rounded-full text-label-md transition-colors ${
              status === value
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {value ? value.charAt(0).toUpperCase() + value.slice(1) : 'All'}
          </button>
        ))}
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
        {loading && items.length === 0 ? (
          <div className="p-10 text-center text-body-md text-on-surface-variant">
            Loading reports...
          </div>
        ) : items.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-body-md text-on-surface-variant">No reports found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low">
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Item</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Type</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">User</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Date</th>
                  <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">Status</th>
                  <th className="text-right text-label-md text-on-surface-variant px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <span className="material-symbols-outlined text-on-surface-variant">image</span>
                          )}
                        </div>
                        <span className="text-body-md text-on-surface font-medium">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-label-sm font-medium capitalize ${
                        item.status === 'lost' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">{item.reportedBy?.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-body-sm text-on-surface-variant">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-label-sm font-medium capitalize ${statusBadge(item.itemStatus)}`}>
                        {item.itemStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          value={item.itemStatus || 'active'}
                          onChange={(e) => dispatch(updateItemStatus({ id: item._id, status: e.target.value }))}
                          className="bg-surface-container-lowest border border-outline-variant rounded-lg text-label-sm text-on-surface px-3 py-2 outline-none"
                        >
                          {['active', 'pending', 'claimed', 'returned', 'expired'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this report permanently?')) {
                              dispatch(deleteItem(item._id));
                            }
                          }}
                          className="p-2 rounded-full text-error hover:bg-error-container hover:text-on-error-container transition-colors"
                          aria-label="Delete report"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
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