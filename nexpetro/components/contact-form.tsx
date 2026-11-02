'use client';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
export default function ContactForm() {
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget;
    setStatus('sending'); setMessage('');
    try {
      const response = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Your message could not be sent. Please try again.');
      setStatus('sent'); form.reset();
    } catch(error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to connect. Please email nexpetro18@outlook.com.'); }
  }
  return <form onSubmit={submit} className="bg-white p-6 md:p-10 border border-black/5">
    <div className="flex justify-between items-center mb-8"><h3 className="text-2xl tracking-tight">Tell us about your project.</h3><ArrowUpRight className="text-forest" size={27}/></div>
    <div className="grid sm:grid-cols-2 gap-5">
      <label className="text-xs font-semibold">Full name <span aria-hidden="true">*</span><input className="field mt-2" name="name" autoComplete="name" placeholder="Your full name" required maxLength={100}/></label>
      <label className="text-xs font-semibold">Work email <span aria-hidden="true">*</span><input className="field mt-2" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></label>
      <label className="text-xs font-semibold">Company<input className="field mt-2" name="company" autoComplete="organization" placeholder="Company name" maxLength={150}/></label>
      <label className="text-xs font-semibold">Phone number<input className="field mt-2" name="phone" type="tel" autoComplete="tel" placeholder="+234" maxLength={40}/></label>
      <label className="text-xs font-semibold sm:col-span-2">Service of interest <span aria-hidden="true">*</span><select className="field mt-2" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{['Oilfield services & drilling support','Procurement & general supplies','Engineering & construction','Equipment rental','Supplier partnership','General enquiry'].map(s=><option key={s}>{s}</option>)}</select></label>
      <label className="text-xs font-semibold sm:col-span-2">Project details <span aria-hidden="true">*</span><textarea className="field mt-2 min-h-28 resize-y" name="message" placeholder="Tell us about your scope, location, and timeline…" required minLength={10} maxLength={5000}/></label>
    </div>
    <div className="hidden" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <p className="text-xs text-slate-500 leading-relaxed mt-4">We’ll use these details to respond to your enquiry. Please avoid including confidential project information.</p>
    <button disabled={status==='sending'} className="button bg-forest hover:bg-ink text-white w-full mt-6 disabled:opacity-60">{status==='sending'?'Sending your enquiry…':'Send enquiry'}<ArrowUpRight size={17}/></button>
    <div aria-live="polite" aria-atomic="true">{status==='sent'&&<p className="mt-4 text-sm text-forest flex gap-2"><CheckCircle2 size={20}/>Thank you. Your enquiry has been sent to the Nexpetro team.</p>}{status==='error'&&<p role="alert" className="mt-4 text-sm text-red-800">{message} <a className="underline" href="mailto:nexpetro18@outlook.com">Email us directly</a>.</p>}</div>
  </form>;
}
