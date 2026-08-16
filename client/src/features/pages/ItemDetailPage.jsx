import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem, claimItem } from '../../store/itemsSlice';

export default function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItem, loading, error } = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    dispatch(fetchItem(id));
  }, [dispatch, id]);

  const handleClaim = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setClaiming(true);
    try {
      await dispatch(claimItem(id)).unwrap();
    } catch (err) {
      // error handled in slice
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-primary animate-spin text-[40px]">progress_activity</span>
          <p className="text-on-surface-variant text-body-md">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-error-container rounded-xl px-8 py-6 text-center">
          <span className="material-symbols-outlined text-error text-[40px]">error</span>
          <p className="text-on-error-container text-body-md mt-2">{error}</p>
          <Link to="/browse" className="text-primary text-label-md mt-4 inline-block hover:underline">
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  if (!currentItem) return null;

  const item = currentItem;
  const images = item.images && item.images.length > 0 ? item.images : [];
  const statusColor =
    item.status === 'lost'
      ? 'bg-error text-on-error'
      : item.status === 'found'
      ? 'bg-primary text-on-primary'
      : 'bg-tertiary text-on-tertiary';
  const statusLabel = item.status === 'lost' ? 'Lost' : item.status === 'found' ? 'Found' : 'Returned';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        {/* Back link */}
        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-on-surface-variant text-body-md hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Browse
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Images (7 cols) */}
          <div className="lg:col-span-7">
            {/* Main Image */}
            <div className="relative bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
              <div className="aspect-square">
                {images.length > 0 ? (
                  <img
                    src={images[selectedImage]?.url || images[selectedImage]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                    <span className="material-symbols-outlined text-outline text-[64px]">image</span>
                  </div>
                )}
              </div>
              {/* Status Badge */}
              <span className={`absolute top-4 left-4 ${statusColor} text-label-md px-4 py-1.5 rounded-full font-medium`}>
                {statusLabel}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-outline-variant hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={img?.url || img}
                      alt={`${item.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Category Breadcrumb */}
            <div className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
              <span>{item.category || 'General'}</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span>{statusLabel}</span>
            </div>

            {/* Title */}
            <h1 className="text-display font-bold text-on-surface leading-tight">
              {item.name}
            </h1>

            {/* Metadata: Date & Location */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                <span>
                  {item.date
                    ? new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Date not specified'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                <span>{item.location || 'Location not specified'}</span>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-body-lg text-on-surface leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Bento Grid: Color / Brand */}
            <div className="grid grid-cols-2 gap-3">
              {item.color && (
                <div className="bg-surface-container-low rounded-xl p-4">
                  <p className="text-label-sm text-on-surface-variant mb-1">Color</p>
                  <p className="text-body-md font-medium text-on-surface">{item.color}</p>
                </div>
              )}
              {item.brand && (
                <div className="bg-surface-container-low rounded-xl p-4">
                  <p className="text-label-sm text-on-surface-variant mb-1">Brand</p>
                  <p className="text-body-md font-medium text-on-surface">{item.brand}</p>
                </div>
              )}
              {!item.color && !item.brand && (
                <div className="bg-surface-container-low rounded-xl p-4 col-span-2">
                  <p className="text-label-sm text-on-surface-variant">Additional details not provided</p>
                </div>
              )}
            </div>

            {/* Think this is yours? Action Card */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6 flex flex-col gap-4">
              <h3 className="text-headline-sm text-on-surface">Think this is yours?</h3>
              <p className="text-body-md text-on-surface-variant">
                If this looks like your item, send a claim request to the finder. They will be notified.
              </p>
              <button
                onClick={handleClaim}
                disabled={claiming || item.status === 'returned' || item.claimed}
                className="inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-6 py-3 rounded-full text-label-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {claiming ? 'progress_activity' : 'handshake'}
                </span>
                {claiming ? 'Sending Request...' : item.claimed ? 'Claim Sent' : 'Claim this item'}
              </button>
            </div>

            {/* Finder Info */}
            {item.reportedBy && (
              <div className="flex items-center gap-3 bg-surface-container-lowest rounded-xl p-4 border border-outline-variant">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container text-[20px]">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-body-md font-medium text-on-surface">{item.reportedBy.name || 'Anonymous'}</p>
                  <p className="text-label-sm text-on-surface-variant">Finder</p>
                </div>
                {item.reportedBy.verified && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-label-sm px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Verified
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
