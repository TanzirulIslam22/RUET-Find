import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchItems } from '../../store/itemsSlice';

const statusOptions = ['All', 'Lost', 'Found'];
const categoryOptions = ['All', 'Electronics', 'ID & Documents', 'Keys', 'Clothing', 'Other'];
const locationOptions = ['Anywhere', 'Cafeteria', 'Academic', 'Hostels'];
const dateOptions = ['Anytime', 'Today', 'This Week', 'This Month'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132"%3E%3Crect fill="%23e8eff1" width="132" height="132"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%237a757f" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

function buildFilters({ status, category, location, dateRange, search, sortBy, page }) {
  const filters = {};
  if (status !== 'All') filters.status = status.toLowerCase();
  if (category !== 'All') filters.category = category;
  if (location !== 'Anywhere') filters.location = location;
  if (dateRange !== 'Anytime') filters.dateRange = dateRange;
  if (search) filters.search = search;
  if (sortBy) filters.sort = sortBy;
  if (page) filters.page = page;
  return filters;
}

export default function BrowsePage() {
  const dispatch = useDispatch();
  const { items, pagination, loading } = useSelector((state) => state.items);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [location, setLocation] = useState('Anywhere');
  const [dateRange, setDateRange] = useState('Anytime');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const loadItems = useCallback(() => {
    const filters = buildFilters({ status, category, location, dateRange, search: searchInput, sortBy, page });
    dispatch(fetchItems(filters));
  }, [dispatch, status, category, location, dateRange, searchInput, sortBy, page]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadItems();
  };

  const handleReset = () => {
    setSearchInput('');
    setStatus('All');
    setCategory('All');
    setLocation('Anywhere');
    setDateRange('Anytime');
    setSortBy('newest');
    setPage(1);
    setSearchParams({});
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-headline-lg text-on-surface mb-4">Browse RUET Find</h1>
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-5 py-3">
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

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-label-md font-medium text-on-surface mb-3">Status</h3>
                <div className="space-y-1">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setStatus(opt); setPage(1); }}
                      className={`block w-full text-left text-body-sm px-3 py-2 rounded-lg transition-colors ${
                        status === opt
                          ? 'bg-primary-container text-on-primary-container font-medium'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-label-md font-medium text-on-surface mb-3">Category</h3>
                <div className="space-y-1">
                  {categoryOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setCategory(opt); setPage(1); }}
                      className={`block w-full text-left text-body-sm px-3 py-2 rounded-lg transition-colors ${
                        category === opt
                          ? 'bg-primary-container text-on-primary-container font-medium'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-label-md font-medium text-on-surface mb-3">Location</h3>
                <div className="space-y-1">
                  {locationOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setLocation(opt); setPage(1); }}
                      className={`block w-full text-left text-body-sm px-3 py-2 rounded-lg transition-colors ${
                        location === opt
                          ? 'bg-primary-container text-on-primary-container font-medium'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-label-md font-medium text-on-surface mb-3">Date Range</h3>
                <div className="space-y-1">
                  {dateOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setDateRange(opt); setPage(1); }}
                      className={`block w-full text-left text-body-sm px-3 py-2 rounded-lg transition-colors ${
                        dateRange === opt
                          ? 'bg-primary-container text-on-primary-container font-medium'
                          : 'text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-2 text-label-md text-on-surface-variant hover:text-on-surface px-4 py-2.5 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                Reset filters
              </button>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-body-sm text-on-surface-variant">
                {pagination?.totalItems ?? items.length} items found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-body-sm text-on-surface-variant hidden sm:inline">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                  className="bg-surface-container-lowest border border-outline-variant text-body-sm text-on-surface rounded-lg px-3 py-2 outline-none focus:border-primary"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <span className="material-symbols-outlined text-on-surface-variant animate-spin mr-3">progress_activity</span>
                <span className="text-body-md text-on-surface-variant">Loading items...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-surface-container-lowest border border-outline-variant rounded-xl">
                <span className="material-symbols-outlined text-on-surface-variant text-[48px] mb-4">search_off</span>
                <p className="text-body-md text-on-surface-variant">No items match your filters.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-label-md text-primary hover:text-on-primary-container transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {items.map((item) => (
                  <Link
                    key={item._id}
                    to={`/item/${item._id}`}
                    className="flex gap-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="w-[132px] h-[132px] shrink-0 rounded-lg overflow-hidden bg-surface-container">
                      <img
                        src={item.images?.[0] || placeholderImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`inline-block text-label-sm font-medium px-3 py-0.5 rounded-full ${
                            item.status === 'lost'
                              ? 'bg-error-container text-on-error-container'
                              : 'bg-secondary-container text-on-secondary-container'
                          }`}
                        >
                          {item.status === 'lost' ? 'LOST' : 'FOUND'}
                        </span>
                      </div>
                      <h3 className="text-body-md font-medium text-on-surface mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-auto">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-body-sm text-on-surface-variant">
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {item.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
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
          </main>
        </div>
      </div>
    </div>
  );
}
