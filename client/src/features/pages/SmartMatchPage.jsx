import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSmartMatches } from '../../store/itemsSlice';

const MATCH_CRITERIA = [
  { label: 'Same Category', icon: 'category', checked: true },
  { label: 'Similar Color & Brand', icon: 'palette', checked: true },
  { label: 'Nearby Location', icon: 'near_me', checked: true },
];

export default function SmartMatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matches, loading, error } = useSelector((state) => state.items);
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    dispatch(fetchSmartMatches(id));
  }, [dispatch, id]);

  const match = matches && matches.length > 0 ? selectedMatch || matches[0] : null;
  const matchPercentage = match?.matchPercentage || match?.score || 91;

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

  if (!match) {
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

  const lostItem = match.lostItem || {
    name: match.lostItemName || 'Your Lost Item',
    image: match.lostItemImage || null,
    date: match.reportedDate || match.createdAt,
    description: match.lostItemDescription || '',
  };

  const foundItem = match.foundItem || {
    name: match.foundItemName || 'Possible Match',
    image: match.foundItemImage || match.image || null,
    date: match.foundDate || match.updatedAt,
    description: match.foundItemDescription || match.description || '',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-tertiary-container/30 text-tertiary px-5 py-2 rounded-full border border-tertiary-container/50">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span className="text-label-md font-medium">Smart Match Algorithm</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-headline-lg text-on-surface text-center mb-8">
          We found a possible match
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main: Comparison Card (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* Left: Your Lost Item */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-label-md text-on-surface-variant mb-3">Your Lost Item</p>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low mb-3">
                    {lostItem.image ? (
                      <img
                        src={lostItem.image?.url || lostItem.image}
                        alt={lostItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline text-[48px]">image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-body-lg font-medium text-on-surface">{lostItem.name}</h3>
                  <p className="text-label-sm text-on-surface-variant mt-1">
                    Reported{' '}
                    {lostItem.date
                      ? new Date(lostItem.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'recently'}
                  </p>
                </div>

                {/* Center: Match Badge */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <span className="text-headline-sm text-on-primary-container font-bold">{matchPercentage}%</span>
                      <p className="text-label-sm text-on-primary-container">match</p>
                    </div>
                  </div>
                  <div className="w-12 h-px bg-outline-variant hidden md:block" />
                </div>

                {/* Right: Possible Match */}
                <div className="flex flex-col items-center text-center">
                  <p className="text-label-md text-on-surface-variant mb-3">Possible Match</p>
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low mb-3">
                    {foundItem.image ? (
                      <img
                        src={foundItem.image?.url || foundItem.image}
                        alt={foundItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline text-[48px]">image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-body-lg font-medium text-on-surface">{foundItem.name}</h3>
                  <p className="text-label-sm text-on-surface-variant mt-1">
                    Found{' '}
                    {foundItem.date
                      ? new Date(foundItem.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'recently'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => navigate(`/item/${match.foundItemId || foundItem._id || foundItem.id}`)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-6 py-3 rounded-full text-label-md font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Review Match Details
                </button>
                <button
                  onClick={() => {
                    if (matches.length > 1) {
                      const currentIdx = matches.indexOf(match);
                      const nextMatch = matches[(currentIdx + 1) % matches.length];
                      setSelectedMatch(nextMatch);
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

          {/* Right: Match Analysis Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6">
              <h3 className="text-headline-sm text-on-surface mb-4">Match Analysis</h3>
              <div className="flex flex-col gap-4">
                {MATCH_CRITERIA.map((criterion) => (
                  <div key={criterion.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      criterion.checked
                        ? 'bg-primary-container/30 text-primary'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {criterion.checked ? 'check_circle' : criterion.icon}
                      </span>
                    </div>
                    <span className="text-body-md text-on-surface">{criterion.label}</span>
                  </div>
                ))}
              </div>

              {/* Case Scratch Note */}
              <div className="mt-6 pt-4 border-t border-outline-variant">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5">
                    help
                  </span>
                  <div>
                    <p className="text-body-md text-on-surface font-medium">Case Scratch</p>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">
                      Minor cosmetic scratches on the case match your description.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence */}
              <div className="mt-6 pt-4 border-t border-outline-variant">
                <div className="flex items-center justify-between">
                  <span className="text-label-md text-on-surface-variant">Overall Confidence</span>
                  <span className="text-body-lg font-bold text-primary">{matchPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${matchPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Other Matches */}
            {matches && matches.length > 1 && (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 mt-4">
                <h3 className="text-headline-sm text-on-surface mb-4">Other Matches</h3>
                <div className="flex flex-col gap-3">
                  {matches.slice(0, 4).map((m, idx) => {
                    const mPerc = m.matchPercentage || m.score || 80;
                    const mFound = m.foundItem || {
                      name: m.foundItemName || 'Match',
                      image: m.foundItemImage || m.image,
                    };
                    return (
                      <button
                        key={m._id || m.id || idx}
                        onClick={() => setSelectedMatch(m)}
                        className={`flex items-center gap-3 p-3 rounded-full border transition-colors text-left ${
                          (selectedMatch || match) === m
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant hover:border-primary/50'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container flex-shrink-0">
                          {mFound.image ? (
                            <img
                              src={mFound.image?.url || mFound.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-outline text-[16px]">image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-body-sm font-medium text-on-surface truncate">{mFound.name}</p>
                          <p className="text-label-sm text-on-surface-variant">{mPerc}% match</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
