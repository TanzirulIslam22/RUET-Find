import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboard } from '../../store/adminSlice';

const metrics = [
  {
    key: 'totalUsers',
    label: 'Total Users',
    icon: 'group',
    trend: '+12%',
    trendUp: true,
    color: 'text-primary',
  },
  {
    key: 'activeLostReports',
    label: 'Active Lost Reports',
    icon: 'search_off',
    trend: '+5%',
    trendUp: true,
    color: 'text-error',
  },
  {
    key: 'foundItemsHeld',
    label: 'Found Items Held',
    icon: 'inventory_2',
    trend: '+3%',
    trendUp: true,
    color: 'text-secondary',
  },
  {
    key: 'itemsRecovered',
    label: 'Items Recovered',
    icon: 'task_alt',
    trend: '+8%',
    trendUp: true,
    color: 'text-primary',
  },
];

const pendingActions = [
  {
    id: 1,
    title: 'Report Flagged',
    description: 'Calculator report flagged for review',
    icon: 'warning',
    bgColor: 'bg-error-container',
    textColor: 'text-on-error-container',
  },
  {
    id: 2,
    title: 'New Admin Request',
    description: 'New admin request from user',
    icon: 'person_add',
    bgColor: 'bg-primary-container',
    textColor: 'text-on-primary-container',
  },
  {
    id: 3,
    title: 'System Alert',
    description: 'System performance alert',
    icon: 'mail',
    bgColor: 'bg-surface-variant',
    textColor: 'text-on-surface',
  },
];

const statusBadge = (status) => {
  const styles = {
    Pending: 'bg-error-container text-on-error-container',
    Approved: 'bg-primary text-on-primary',
    Rejected: 'bg-surface-variant text-on-surface-variant',
  };
  return styles[status] || 'bg-surface-variant text-on-surface-variant';
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { dashboard, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const dashData = dashboard?.data || dashboard || {};
  const stats = {
    totalUsers: dashData.totalUsers ?? 0,
    activeLostReports: dashData.activeLost ?? 0,
    foundItemsHeld: dashData.foundHeld ?? 0,
    itemsRecovered: dashData.recovered ?? 0,
  };

  const recentItems = dashData.recentItems || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg text-on-surface">Dashboard Overview</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            Platform metrics and recent activity
          </p>
        </div>
        <button className="flex items-center gap-2 bg-surface-container-low text-on-surface border border-outline-variant px-5 py-2.5 rounded-full text-label-md font-medium hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export
        </button>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="bg-surface rounded-xl border border-outline-variant p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-on-surface-variant">
                {metric.icon}
              </span>
              <span
                className={`flex items-center gap-1 text-label-sm ${
                  metric.trendUp ? 'text-primary' : 'text-error'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {metric.trendUp ? 'trending_up' : 'trending_down'}
                </span>
                {metric.trend}
              </span>
            </div>
            <div className="mt-2">
              <span className="text-headline-lg text-on-surface">
                {loading ? '—' : stats[metric.key] ?? 0}
              </span>
              <p className="text-body-sm text-on-surface-variant mt-1">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Area + Pending Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-outline-variant p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-headline-sm text-on-surface">Activity Trends</h2>
            <button className="flex items-center gap-2 bg-surface-container-low text-on-surface-variant border border-outline-variant px-4 py-2 rounded-full text-label-md hover:bg-surface-container transition-colors">
              Last 30 Days
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
          <div className="min-h-[300px] flex items-end gap-3 px-4 pb-4">
            {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 88, 72].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-lg bg-primary-container transition-all"
                  style={{ height: `${height}%` }}
                />
                <span className="text-label-sm text-on-surface-variant">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-surface rounded-xl border border-outline-variant p-6">
          <h2 className="text-headline-sm text-on-surface mb-6">Needs Attention</h2>
          <div className="flex flex-col gap-3">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className={`${action.bgColor} rounded-xl p-4 flex items-start gap-3 cursor-pointer hover:opacity-90 transition-opacity`}
              >
                <span className={`material-symbols-outlined ${action.textColor}`}>
                  {action.icon}
                </span>
                <div>
                  <h3 className={`text-label-md font-medium ${action.textColor}`}>
                    {action.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant mt-0.5">
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden mb-6">
        <div className="p-6 border-b border-outline-variant">
          <h2 className="text-headline-sm text-on-surface">Recent Submissions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  Item
                </th>
                <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  Type
                </th>
                <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  User
                </th>
                <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  Date
                </th>
                <th className="text-left text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  Status
                </th>
                <th className="text-right text-label-md text-on-surface-variant px-6 py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-outline-variant last:border-b-0 hover:bg-surface-container-low transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant">
                            image
                          </span>
                        )}
                      </div>
                      <span className="text-body-md text-on-surface font-medium">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant capitalize">
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">
                      {item.user?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">
                      {item.createdAt}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-label-sm font-medium ${statusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          check
                        </span>
                      </button>
                      <button className="p-2 rounded-full bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-colors">
                        <span className="material-symbols-outlined text-[18px]">
                          close
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View All Reports Link */}
      <div className="flex justify-center">
        <a
          href="/admin/reports"
          className="flex items-center gap-2 text-primary hover:text-on-primary-container text-label-md font-medium transition-colors"
        >
          View All Reports
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}
