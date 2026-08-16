import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createItem } from '../../store/itemsSlice';

const STEPS = [
  { id: 1, label: 'Item' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Review' },
];

const CATEGORIES = [
  'Electronics',
  'Bag & Wallet',
  'ID & Cards',
  'Keys',
  'Clothing',
  'Books & Stationery',
  'Jewelry & Accessories',
  'Other',
];

export default function ReportItemPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    status: 'lost',
    description: '',
    color: '',
    brand: '',
    additionalDetails: '',
    location: '',
    date: '',
    contactInfo: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setSubmitting(true);
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('category', formData.category);
    fd.append('status', formData.status);
    fd.append('description', formData.description);
    fd.append('color', formData.color);
    fd.append('brand', formData.brand);
    fd.append('additionalDetails', formData.additionalDetails);
    fd.append('location', formData.location);
    fd.append('date', formData.date);
    fd.append('contactInfo', formData.contactInfo);
    images.forEach((img) => fd.append('images', img));

    try {
      const result = await dispatch(createItem(fd)).unwrap();
      navigate(`/item/${result._id || result.id}`);
    } catch (err) {
      // error handled in slice
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[24px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">location_searching</span>
            <span className="text-headline-sm text-on-surface">RUET Lost & Found</span>
          </div>
        </div>
      </div>

      <div className="max-w-[780px] mx-auto px-4 md:px-6 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-10 px-4">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-label-md font-medium transition-colors ${
                    step >= s.id
                      ? 'bg-primary text-on-primary'
                      : 'border-2 border-outline-variant text-on-surface-variant'
                  }`}
                >
                  {step > s.id ? (
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  ) : (
                    s.id
                  )}
                </div>
                <span
                  className={`text-label-sm ${
                    step >= s.id ? 'text-primary font-medium' : 'text-on-surface-variant'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 mt-[-20px] rounded-full ${
                    step > s.id ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 md:p-8">
          {/* Step 1: Item */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md text-on-surface mb-1">What did you find or lose?</h2>
                <p className="text-body-md text-on-surface-variant">Upload photos and give your item a name.</p>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-label-md text-on-surface mb-2 block">Photos</label>
                <div className="grid grid-cols-4 gap-3">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-outline-variant">
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 bg-error rounded-full flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-on-error text-[14px]">close</span>
                      </button>
                    </div>
                  ))}
                  {images.length < 4 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                      <span className="material-symbols-outlined text-on-surface-variant text-[28px]">photo_camera</span>
                      <span className="text-label-sm text-on-surface-variant mt-1">Add</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Item Name */}
              <div>
                <label className="text-label-md text-on-surface mb-2 block">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Blue Backpack"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-label-md text-on-surface mb-2 block">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Toggle */}
              <div>
                <label className="text-label-md text-on-surface mb-2 block">I am reporting this as</label>
                <div className="flex gap-3">
                  {['lost', 'found'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData((prev) => ({ ...prev, status: s }))}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-label-md font-medium transition-colors border ${
                        formData.status === s
                          ? s === 'lost'
                            ? 'bg-error text-on-error border-error'
                            : 'bg-primary text-on-primary border-primary'
                          : 'border-outline-variant text-on-surface-variant hover:border-primary/50'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {s === 'lost' ? 'search_off' : 'search'}
                      </span>
                      {s === 'lost' ? 'Lost' : 'Found'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md text-on-surface mb-1">Item Details</h2>
                <p className="text-body-md text-on-surface-variant">Help others identify your item.</p>
              </div>

              <div>
                <label className="text-label-md text-on-surface mb-2 block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your item in detail..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-label-md text-on-surface mb-2 block">Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g. Blue"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-label-md text-on-surface mb-2 block">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Nike"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-label-md text-on-surface mb-2 block">Additional Details</label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any distinguishing marks, stickers, or unique features..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md text-on-surface mb-1">Where & When</h2>
                <p className="text-body-md text-on-surface-variant">Location and contact details help with recovery.</p>
              </div>

              <div>
                <label className="text-label-md text-on-surface mb-2 block">Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    location_on
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Central Library, RUET"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl pl-11 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-label-md text-on-surface mb-2 block">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="text-label-md text-on-surface mb-2 block">Contact Information</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  placeholder="Phone number or email"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-headline-md text-on-surface mb-1">Review & Submit</h2>
                <p className="text-body-md text-on-surface-variant">Double-check everything before submitting.</p>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex gap-3">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-outline-variant">
                      <img src={preview} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-4">
                <ReviewRow label="Item Name" value={formData.name || '—'} />
                <ReviewRow label="Category" value={formData.category || '—'} />
                <ReviewRow
                  label="Status"
                  value={formData.status === 'lost' ? 'Lost' : 'Found'}
                  valueClass={formData.status === 'lost' ? 'text-error' : 'text-primary'}
                />
                <ReviewRow label="Description" value={formData.description || '—'} />
                <div className="grid grid-cols-2 gap-4">
                  <ReviewRow label="Color" value={formData.color || '—'} />
                  <ReviewRow label="Brand" value={formData.brand || '—'} />
                </div>
                <ReviewRow label="Additional Details" value={formData.additionalDetails || '—'} />
                <ReviewRow label="Location" value={formData.location || '—'} />
                <ReviewRow label="Date" value={formData.date || '—'} />
                <ReviewRow label="Contact" value={formData.contactInfo || '—'} />
                <ReviewRow label="Photos" value={`${images.length} uploaded`} />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="inline-flex items-center gap-2 border border-outline-variant text-on-surface-variant hover:bg-surface-container px-6 py-3 rounded-full text-label-md font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Previous Step
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-2 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary px-6 py-3 rounded-full text-label-md font-medium transition-colors"
            >
              Next Step
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-on-primary px-8 py-3 rounded-full text-label-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Submitting...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Submit Report
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, valueClass = '' }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-label-sm text-on-surface-variant">{label}</span>
      <span className={`text-body-md text-on-surface ${valueClass}`}>{value}</span>
    </div>
  );
}
