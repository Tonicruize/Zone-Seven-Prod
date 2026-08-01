import { useState } from 'react';
import { motion } from 'framer-motion';

const CONTACT_ENDPOINT = `${import.meta.env.BASE_URL}api/contact`;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const PROJECT_TYPES = [
  'Music Video',
  'Commercial',
  'Creative Direction',
  'Short Film',
  'Brand Campaign',
  'Other',
];

const BUDGETS = [
  '₦300,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  '₦1,000,000 – ₦3,000,000',
  '₦3,000,000 – ₦5,000,000',
  '₦5,000,000+',
];

const TIMELINES = ['ASAP', 'Within 1 Month', '2 – 3 Months', 'Flexible'];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[9px] tracking-[0.45em] text-primary uppercase">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'bg-transparent border-0 border-b border-foreground/20 focus:border-primary outline-none ' +
  'text-foreground text-sm py-3 transition-colors duration-300 placeholder:text-foreground/25 ' +
  'w-full font-sans tracking-wide';

const selectClass =
  'bg-background border-0 border-b border-foreground/20 focus:border-primary outline-none ' +
  'text-foreground text-sm py-3 transition-colors duration-300 w-full font-sans tracking-wide ' +
  'appearance-none cursor-pointer';

export function BookingPage() {
  const [status, setStatus] = useState<FormState>('idle');
  const [values, setValues] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="relative bg-background min-h-[100dvh] text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="grain-overlay" />

      {/* Left gold line */}
      <div className="absolute left-5 md:left-12 top-0 bottom-0 w-px bg-primary/20 pointer-events-none" />

      <div className="relative z-10 pl-10 pr-5 md:pl-24 md:pr-12 lg:pl-32 lg:pr-20 pt-36 md:pt-44 pb-24 md:pb-32 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pl-3 border-l-2 border-primary mb-8 md:mb-12 self-start inline-block">
            <span className="text-primary text-[8px] tracking-[0.5em] uppercase">Book a Session</span>
          </div>
          <h1
            className="text-display font-bold uppercase tracking-[-0.025em] leading-[0.85] text-foreground"
            style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)' }}
          >
            Let's create<br />
            <span className="text-primary">something.</span>
          </h1>
          <p className="mt-6 text-foreground/40 text-sm tracking-wide max-w-md leading-relaxed">
            Tell us about your project and we'll get back to you within 48 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
        >
          {/* Row 1 */}
          <Field label="Full Name *">
            <input
              required
              type="text"
              placeholder="Your name"
              className={inputClass}
              value={values.name}
              onChange={set('name')}
            />
          </Field>

          <Field label="Email Address *">
            <input
              required
              type="email"
              placeholder="your@email.com"
              className={inputClass}
              value={values.email}
              onChange={set('email')}
            />
          </Field>

          {/* Row 2 */}
          <Field label="Project Type *">
            <div className="relative">
              <select required className={selectClass} value={values.projectType} onChange={set('projectType')}>
                <option value="" disabled>Select a type</option>
                {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xs">▾</span>
            </div>
          </Field>

          <Field label="Budget Range">
            <div className="relative">
              <select className={selectClass} value={values.budget} onChange={set('budget')}>
                <option value="" disabled>Select a range</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xs">▾</span>
            </div>
          </Field>

          {/* Row 3 */}
          <Field label="Timeline">
            <div className="relative">
              <select className={selectClass} value={values.timeline} onChange={set('timeline')}>
                <option value="" disabled>Select timeline</option>
                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-xs">▾</span>
            </div>
          </Field>

          {/* Message — full width */}
          <Field label="Tell Us About Your Project *">
            <textarea
              required
              rows={5}
              placeholder="Describe your vision, references, any details that matter..."
              className={inputClass + ' resize-none'}
              value={values.message}
              onChange={set('message')}
            />
          </Field>

          {/* Submit — full width */}
          <div className="md:col-span-2 pt-4">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-primary/40 px-8 py-5 inline-block"
              >
                <p className="text-primary text-[10px] tracking-[0.4em] uppercase">Message received — we'll be in touch.</p>
              </motion.div>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="interactive border border-primary text-foreground bg-transparent px-10 py-5 text-display text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 hover:bg-primary/10 flex items-center gap-6 group disabled:opacity-50"
              >
                {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                <span className="w-8 h-px bg-primary group-hover:w-16 transition-all duration-500 ease-out" />
              </button>
            )}
            {status === 'error' && (
              <p className="mt-4 text-[9px] tracking-[0.3em] text-red-400 uppercase">
                Something went wrong — try emailing us directly.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </main>
  );
}
