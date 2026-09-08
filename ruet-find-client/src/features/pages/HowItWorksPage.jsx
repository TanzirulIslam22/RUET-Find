import { Link } from 'react-router-dom';

const steps = [
  {
    icon: 'search',
    title: 'Browse Lost Items',
    description:
      'Search through categorized lost items reported by fellow students. Filter by category, date, and location to find what you\'re looking for.',
  },
  {
    icon: 'add_circle',
    title: 'Report Found Items',
    description:
      'Found something on campus? Report it with photos, location, and details. Help reunite items with their owners quickly.',
  },
  {
    icon: 'swap_horiz',
    title: 'Smart Matching',
    description:
      'Our smart matching system automatically pairs lost item reports with found items based on category, location, and description.',
  },
  {
    icon: 'mark_email_read',
    title: 'Get Notified',
    description:
      'When a match is found or someone reports your lost item, you\'ll receive an instant notification to take action.',
  },
  {
    icon: 'handshake',
    title: 'Recover Your Item',
    description:
      'Connect with the finder through secure messaging and arrange a safe pickup at a designated campus location.',
  },
];

const faqs = [
  {
    q: 'Is RUET Find free to use?',
    a: 'Yes! RUET Find is completely free for all RUET students and staff.',
  },
  {
    q: 'How do I report a lost item?',
    a: 'Click "Report an Item" from the navbar, select "Lost", fill in the details including description and last known location, and submit.',
  },
  {
    q: 'How does smart matching work?',
    a: 'Our system compares lost and found reports by category, location, and description keywords to suggest potential matches.',
  },
  {
    q: 'Can I use the campus map?',
    a: 'Yes! The interactive campus map shows where items were lost or found, helping you narrow down search areas.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <span className="inline-block bg-primary-container text-on-primary-container text-label-md font-medium px-4 py-1.5 rounded-full mb-4">
          Simple Process
        </span>
        <h1 className="text-display-sm md:text-display-md font-bold text-on-surface mb-4">
          How <span className="text-primary">RUET Find</span> Works
        </h1>
        <p className="text-body-lg text-on-surface-variant max-w-[640px] mx-auto">
          A simple, community-powered process to help you recover lost items on campus in just a few steps.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`bg-surface-container-low rounded-2xl p-6 border border-outline-variant ${
              i === steps.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-title-lg">
                {i + 1}
              </div>
              <span className="material-symbols-outlined text-primary text-[28px]">
                {step.icon}
              </span>
            </div>
            <h3 className="text-title-lg font-bold text-on-surface mb-2">{step.title}</h3>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-primary-container/40 rounded-2xl p-8 md:p-12 mb-20">
        <h2 className="text-title-xl font-bold text-on-surface text-center mb-8">
          Trusted by the RUET Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,200+', label: 'Items Reported' },
            { value: '890+', label: 'Items Recovered' },
            { value: '74%', label: 'Recovery Rate' },
            { value: '2,500+', label: 'Active Users' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-headline-md md:text-headline-lg font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-body-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[720px] mx-auto mb-16">
        <h2 className="text-title-xl font-bold text-on-surface text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-surface-container-low rounded-xl border border-outline-variant group"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-title-sm font-semibold text-on-surface select-none">
                {faq.q}
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-6 pb-4 text-body-md text-on-surface-variant leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h3 className="text-title-lg font-bold text-on-surface mb-3">
          Ready to get started?
        </h3>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full text-label-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            Browse Items
          </Link>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-full text-label-lg font-medium hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Report an Item
          </Link>
        </div>
      </div>
    </div>
  );
}
