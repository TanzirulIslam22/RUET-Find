export default function AdminSettingsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-headline-lg text-on-surface">Settings</h1>
        <p className="text-body-md text-on-surface-variant mt-1">
          Platform configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface rounded-xl border border-outline-variant p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">public</span>
          <div>
            <h3 className="text-label-md font-medium text-on-surface mb-0.5">Cross-Origin Resources</h3>
            <p className="text-body-sm text-on-surface-variant">
              Admin endpoints are restricted to verified operators via the API layer.
            </p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-outline-variant p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">verified_user</span>
          <div>
            <h3 className="text-label-md font-medium text-on-surface mb-0.5">Access Control</h3>
            <p className="text-body-sm text-on-surface-variant">
              Only accounts with the admin role can view this panel.
            </p>
          </div>
        </div>
        <div className="bg-surface rounded-xl border border-outline-variant p-5 flex items-start gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">schedule</span>
          <div>
            <h3 className="text-label-md font-medium text-on-surface mb-0.5">Coming Soon</h3>
            <p className="text-body-sm text-on-surface-variant">
              Fine-grained controls will be added here in a future update.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}