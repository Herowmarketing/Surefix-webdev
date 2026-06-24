/*
 * FAQ — Frequently Asked Questions
 *
 * SEO-focused: renders an accordion of common remodeling questions and emits
 * FAQPage structured data (JSON-LD) so the answers are eligible for Google's
 * rich results / "People also ask" placements.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Plus, Minus, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { BUSINESS } from '@/lib/constants';
import { useLeadStepper } from '@/contexts/LeadStepperContext';
import { useSeo, breadcrumbList, SITE_URL } from '@/lib/seo';

type FaqItem = { question: string; answer: string };

const FAQS: FaqItem[] = [
  {
    question: 'What areas does Sure-Fix Remodeling serve?',
    answer:
      'We serve Easton, Bethlehem, Allentown and the greater Lehigh Valley in Pennsylvania, plus Western New Jersey communities including Phillipsburg, Hackettstown, Washington and Milford. Our showroom is located at 2015 Freemansburg Ave, Easton, PA 18042.',
  },
  {
    question: 'Is Sure-Fix Remodeling licensed and insured?',
    answer:
      'Yes. Sure-Fix Remodeling is a fully licensed and insured design-build contractor and has been family-run in the Lehigh Valley since 2008. We carry liability and workers\u2019 compensation coverage on every project.',
  },
  {
    question: 'Do you offer free estimates?',
    answer:
      'Yes. We provide free, no-obligation in-home consultations and estimates. Call us at (610) 392-0990 or request an estimate online and a member of our team will reach out within 24 hours to schedule a visit.',
  },
  {
    question: 'How much does a kitchen or bathroom remodel cost?',
    answer:
      'Every project is different, so pricing depends on scope, materials and the size of the space. As a general range, bathroom remodels in our area typically start in the mid five figures and full kitchen remodels are usually larger. We give you a detailed written estimate after a free consultation so there are no surprises.',
  },
  {
    question: 'How long does a typical remodel take?',
    answer:
      'Smaller projects like a bathroom can take a few weeks, while full kitchens, basements and additions often run several weeks to a few months depending on scope, permitting and material lead times. We provide a clear schedule before work begins and keep you updated throughout.',
  },
  {
    question: 'Do you handle design and permits?',
    answer:
      'Yes. As a design-build firm we handle the project end to end \u2014 in-house design, material selection in our showroom, permitting, and construction \u2014 so you have a single accountable team from concept to completion.',
  },
  {
    question: 'Do you offer financing?',
    answer:
      'We can point you toward financing options to help make your project more manageable. Ask us during your consultation and we\u2019ll walk you through what\u2019s available.',
  },
  {
    question: 'Will I be able to live in my home during the remodel?',
    answer:
      'In most cases, yes. We work to minimize disruption, protect the rest of your home with dust barriers, and keep work areas clean. For larger whole-home projects we\u2019ll discuss the best approach during planning.',
  },
  {
    question: 'What kind of warranty do you provide?',
    answer:
      'We stand behind our workmanship and use quality, name-brand materials backed by manufacturer warranties. We\u2019ll review the specific warranty coverage for your project in your proposal.',
  },
  {
    question: 'How do I get started?',
    answer:
      'The easiest way is to request a free estimate online or call us at (610) 392-0990. We\u2019ll schedule a consultation, learn about your goals, and prepare a detailed plan and estimate for your project.',
  },
];

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
      >
        <span className="text-base font-bold text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>
          {item.question}
        </span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#394696]/10 text-[#394696]">
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>
      {open ? (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
            {item.answer}
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}

export default function FAQ() {
  const { openStepper } = useLeadStepper();

  useSeo({
    title: 'Frequently Asked Questions — Sure-Fix Remodeling',
    description:
      'Answers to common questions about remodeling with Sure-Fix Remodeling — service areas, licensing, free estimates, project timelines, costs, design, permits, financing and warranties in the Lehigh Valley.',
    path: '/faq',
    structuredData: [
      breadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/faq#faqpage`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-3xl px-4 pb-20 pt-[max(9rem,calc(8rem+env(safe-area-inset-top,0px)))] sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <p
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#394696]"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            <HelpCircle size={14} aria-hidden /> FAQ
          </p>
          <h1
            className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'Figtree, sans-serif' }}
          >
            Frequently Asked Questions
          </h1>
          <p
            className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Everything Lehigh Valley homeowners ask before starting a remodel. Don&apos;t see your
            question? Reach out and we&apos;ll answer it directly.
          </p>
        </motion.header>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FaqRow key={item.question} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[#983631]/25 bg-[#983631]/10 px-5 py-7 text-center min-[400px]:p-8"
        >
          <h2 className="mb-2 text-xl font-black text-slate-900" style={{ fontFamily: 'Figtree, sans-serif' }}>
            Still have questions?
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-slate-600" style={{ fontFamily: 'Georgia, serif' }}>
            Talk to our team about your project. We&apos;ll answer your questions and prepare a free,
            no-obligation estimate.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => openStepper()}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white min-[480px]:w-auto [-webkit-tap-highlight-color:transparent]"
              style={{ background: '#983631', fontFamily: 'Figtree, sans-serif', border: 'none' }}
            >
              Free Estimate <ArrowRight size={13} />
            </button>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-200 min-[480px]:w-auto"
            >
              <Phone size={13} /> {BUSINESS.phone}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
