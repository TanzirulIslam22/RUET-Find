import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItem, fetchSmartMatches } from '../../store/itemsSlice';

const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23e8eff1" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%237a757f" font-family="sans-serif" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';

export default function SmartMatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItem, matches, loading, error } = useSelector((state) => state.items);
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    dispatch(fetchItem(id));
    dispatch(fetchSmartMatches(id));
  }, [dispatch, id]);

  const selectedMatch = matches && matches.length > 0 ? matches[selectedIdx] : null;
  const matchItem = selectedMatch?.item;
  const score = selectedMatch?.score || 0;
  const reasons = selectedMatch?.reasons || [];
  const originalItem = currentItem;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-primary animate-spin text-[40px]">progress_activity</span>
          <p className="text-on-surface-variant text-body-md">Analyzing matches...</p>
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
        </div>
      </div>
    );
  }

  if (!matchItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-outline text-[64px]">search_off</span>
          <h2 className="text-headline-md text-on-surface">No matches found</h2>
          <p className="text-body-md text-on-surface-variant">We couldn't find any potential matches right now.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-full text-label-md font-medium hover:bg-primary hover:text-on-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const origImage = originalItem?.images?.[0] || placeholderImage;
  const matchImage = matchItem.images?.[0] || placeholderImage;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-tertiary-container/30 text-tertiary px-5 py-2 rounded-full border border-tertiary-container/50">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="text-label-md font-medium">Smart Match Algorithm</span>
          </div>
        </div>

        <h1 className="text-headline-lg text-on-surface text-center mb-8">
          We found {matches.length} possible match{matches.length !== 1 ? 'es' : ''}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                <div className="flex flex-col items-center text-center">
                  <p className="text-label-md text-on-surface-variant mb-3">
                    {originalItem?.status === 'lost' ? 'Your Lost Item' : 'Found Item'}
                  </p>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low mb-3">
                    <img
                      src={origImage?.startsWith?.('/') ? origImage : origImage}
                      alt={originalItem?.title || 'Original'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-body-lg font-medium text-on-surface">{originalItem?.title || 'Your Item'}</h3>
                  <p className="text-label-sm text-on-surface-variant mt-1">
                    {originalItem?.location || ''}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <span className="text-headline-sm text-on-primary-container font-bold">{score}%</span>
                      <p className="text-label-sm text-on-primary-container">match</p>
                    </div>
                  </div>
                  <div className="w-12 h-px bg-outline-variant hidden md:block" />
                </div>

                <div className="flex flex-col items-center text-center">
                  <p className="text-label-md text-on-surface-variant mb-3">
                    {matchItem.status === 'lost' ? 'Lost Item' : 'Found Item'}
                  </p>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low mb-3">
                    <img
                      src={matchImage?.startsWith?.('/') ? matchImage : matchImage}
                      alt={matchItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-body-lg font-medium text-on-surface">{matchItem.title}</h3>
                  <p className="text-label-sm text-on-surface-variant mt-1">
                    {matchItem.location || ''}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => navigate(`/item/${matchItem._id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-6 py-3 rounded-full text-label-md font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  View Match Details
                </button>
                <button
                  onClick={() => {
                    if (matches.length > 1) {
                      setSelectedIdx((prev) => (prev + 1) % matches.length);
                    } else {
                      navigate(-1);
                    }
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-outline-variant text-on-surface-variant hover:bg-error-container hover:text-on-error-container hover:border-error-container px-6 py-3 rounded-full text-label-md font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  Not my item
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
              <h3 className="text-headline-sm text-on-surface mb-4">Match Analysis</h3>
              <div className="flex flex-col gap-4">
                {reasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      reason.type === 'success'
                        ? 'bg-primary-container/30 text-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {reason.type === 'success' ? 'check_circle' : 'cancel'}
                      </span>
                    </div>
                    <span className="text-body-md text-on-surface">{reason.text}</span>
                  </div>
                ))}
                {reasons.length === 0 && (
                  <p className="text-body-sm text-on-surface-variant">No specific criteria matched.</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant">
                <div className="flex items-center justify-between">
                  <span className="text-label-md text-on-surface-variant">Overall Confidence</span>
                  <span className="text-body-lg font-bold text-primary">{score}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>

            {matches && matches.length > 1 && (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 mt-4">
                <h3 className="text-headline-sm text-on-surface mb-4">Other Matches</h3>
                <div className="flex flex-col gap-3">
                  {matches.map((m, idx) => (
                    <button
                      key={m.item?._id || idx}
                      onClick={() => setSelectedIdx(idx)}
                      className={`flex items-center gap-3 p-3 rounded-full border transition-colors text-left ${
                        selectedIdx === idx
                          ? 'border-primary bg-primary/5'
                          : 'border-outline-variant hover:border-primary/50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container shrink-0">
                        <img
                          src={m.item?.images?.[0] || placeholderImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-on-surface truncate">{m.item?.title || 'Match'}</p>
                        <p className="text-label-sm text-on-surface-variant">{m.score}% match</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
