import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRecentItems } from '../../store/itemsSlice';

const categories = [
  { name: 'Electronics', icon: 'devices', count: 24 },
  { name: 'ID Cards', icon: 'badge', count: 18 },
  { name: 'Bags', icon: 'backpack', count: 12 },
  { name: 'Books', icon: 'menu_book', count: 9 },
];

const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="132" height="132" viewBox="0 0 132 132"%3E%3Crect fill="%23e8eff1" width="132" height="132"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%237a757f" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recentItems, loading } = useSelector((state) => state.items);
  const { user, token } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    dispatch(fetchRecentItems());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const displayedItems = recentItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pt-10 pb-14">
        <div className="flex flex-col items-center text-center">
          <span className="inline-block bg-primary-fixed text-on-primary-container text-label-md font-medium px-4 py-1.5 rounded-full mb-8">
            RUET Campus Community
          </span>

          <h1 className="text-display text-on-surface mb-4">
            Lost something on campus?
          </h1>

          <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
            Find it. Report it. Return it.
          </p>

          <div className="flex items-center gap-4 mb-12">
            <Link
              to="/report?type=lost"
              className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary px-7 py-3.5 rounded-full text-label-md font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search_off</span>
              Report Lost Item
            </Link>
            <Link
              to="/report?type=found"
              className="inline-flex items-center gap-2 bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container px-7 py-3.5 rounded-full text-label-md font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Report Found Item
            </Link>
          </div>

          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-5 py-3 shadow-sm">
              <span className="material-symbols-outlined text-on-surface-variant mr-3">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for keys, ID cards, electronics..."
                className="flex-1 bg-transparent text-body-md text-on-surface placeholder-on-surface-variant outline-none"
              />
            </div>
          </form>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-14">
        <h2 className="text-headline-md text-on-surface mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/browse?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-4 p-6 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-[28px]">
                  {cat.icon}
                </span>
              </div>
              <div className="text-center">
                <p className="text-body-md font-medium text-on-surface">{cat.name}</p>
                <p className="text-body-sm text-on-surface-variant">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-headline-md text-on-surface">Recently Reported</h2>
          <Link
            to="/browse"
            className="text-label-md text-primary hover:text-on-primary-container transition-colors"
          >
            View all
          </Link>
        </div>

        {loading && recentItems.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined text-on-surface-variant animate-spin mr-3">progress_activity</span>
            <span className="text-body-md text-on-surface-variant">Loading recent items...</span>
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-surface-container-lowest border border-outline-variant rounded-xl">
            <span className="material-symbols-outlined text-on-surface-variant text-[48px] mb-4">inbox</span>
            <p className="text-body-md text-on-surface-variant">No items reported yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedItems.map((item) => (
                <Link
                  key={item._id}
                  to={`/item/${item._id}`}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="w-full aspect-[4/3] bg-surface-container overflow-hidden">
                    <img
                      src={item.images?.[0] || placeholderImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-block text-label-sm font-medium px-3 py-1 rounded-full ${
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
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mb-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mb-3">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                    <span className="text-label-md text-primary">
                      View details
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {visibleCount < recentItems.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 3)}
                  className="inline-flex items-center gap-2 bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container px-7 py-3.5 rounded-full text-label-md font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
