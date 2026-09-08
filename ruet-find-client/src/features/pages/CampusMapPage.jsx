import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../store/itemsSlice';

const MAP_PINS = [
  { id: 1, name: 'Central Library', x: '45%', y: '35%' },
  { id: 2, name: 'TSC', x: '62%', y: '50%' },
  { id: 3, name: 'Academic Building', x: '30%', y: '60%' },
  { id: 4, name: 'Admin Building', x: '55%', y: '25%' },
  { id: 5, name: 'Cafeteria', x: '70%', y: '40%' },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'lost', label: 'Lost' },
  { key: 'found', label: 'Found' },
];

export default function CampusMapPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = items.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
    const matchesSearch =
      !searchQuery ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left: Map Area */}
      <div className="flex-1 relative min-h-[50vh] lg:min-h-screen">
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-surface-container-low overflow-hidden transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Simulated map grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-outline-variant"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-outline-variant"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>

          {/* Simulated paths */}
          <div className="absolute top-[30%] left-[20%] w-[60%] h-[2px] bg-outline-variant/60 rotate-[15deg]" />
          <div className="absolute top-[45%] left-[25%] w-[50%] h-[2px] bg-outline-variant/60 -rotate-[10deg]" />
          <div className="absolute top-[20%] left-[50%] w-[2px] h-[60%] bg-outline-variant/60 rotate-[5deg]" />

          {/* Map Pins */}
          {MAP_PINS.map((pin) => (
            <div
              key={pin.id}
              className="absolute group cursor-pointer"
              style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -100%)' }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div className="w-2 h-2 bg-primary/40 rounded-full -mt-0.5" />
                <span className="text-label-sm text-on-surface font-medium bg-surface-container-lowest/90 px-2 py-0.5 rounded-full mt-0.5 shadow-sm whitespace-nowrap">
                  {pin.name}
                </span>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-inverse-surface text-on-surface text-label-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {pin.name}
              </div>
            </div>
          ))}
        </div>

        {/* Search Input Overlay */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[320px] z-10">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search locations..."
              className="w-full bg-surface-container-lowest shadow-lg border border-outline-variant rounded-full pl-11 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
            className="w-10 h-10 bg-surface-container-lowest shadow-lg border border-outline-variant rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">add</span>
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
            className="w-10 h-10 bg-surface-container-lowest shadow-lg border border-outline-variant rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">remove</span>
          </button>
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-full lg:w-[400px] bg-surface-container-lowest border-l border-outline-variant flex flex-col max-h-[50vh] lg:max-h-screen">
        {/* Header */}
        <div className="px-5 py-4 border-b border-outline-variant">
          <h2 className="text-headline-sm text-on-surface mb-3">Items Nearby</h2>
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-label-md font-medium transition-colors border ${
                  activeFilter === f.key
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 flex flex-col gap-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <span className="material-symbols-outlined text-primary animate-spin text-[32px]">progress_activity</span>
              <p className="text-body-md text-on-surface-variant">Loading items...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
              <p className="text-body-md text-on-surface-variant">No items found</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id || item.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 flex gap-3 hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]?.url || item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline text-[24px]">image</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-body-md font-medium text-on-surface truncate">{item.name}</h3>
                    <span
                      className={`flex-shrink-0 text-label-sm px-2.5 py-0.5 rounded-full font-medium ${
                        item.status === 'lost'
                          ? 'bg-error-container text-on-error-container'
                          : item.status === 'found'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-tertiary-container text-on-tertiary'
                      }`}
                    >
                      {item.status === 'lost' ? 'Lost' : item.status === 'found' ? 'Found' : 'Returned'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="truncate">{item.location || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-label-sm text-outline">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    <span>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Unknown date'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
