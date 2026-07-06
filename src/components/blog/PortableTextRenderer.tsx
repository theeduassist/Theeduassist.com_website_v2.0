import React from 'react';
import { PortableText } from '@portabletext/react';
import type { PortableTextComponents } from '@portabletext/react';
import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from '../../lib/sanity/client';

const builder = createImageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max');
}

interface Props {
  value: any;
}

const components: PortableTextComponents = {
  types: {
    customCta: ({ value }: any) => (
      <div className="my-12 bg-slate-50 border border-slate-200 rounded-2xl p-8 lg:p-10 text-center shadow-sm relative overflow-hidden">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{value.title}</h3>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">{value.body}</p>
        <div className="flex flex-wrap justify-center gap-4">
           <a href={value.primaryUrl} className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-transform hover:-translate-y-0.5 shadow-sm">
             {value.primaryText}
           </a>
           <a href={value.secondaryUrl} className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--color-primary)] font-bold rounded-lg border border-[var(--color-primary)] shadow-sm hover:bg-slate-50 transition-colors">
             {value.secondaryText}
           </a>
        </div>
      </div>
    ),
    imageWithAlt: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }
      try {
        return (
          <div className="my-8">
            <img
              src={urlFor(value).url()}
              alt={value.alt || ' '}
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
            {value.caption && (
              <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
            )}
          </div>
        );
      } catch (e) {
        return null;
      }
    },
    image: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }
      try {
        return (
          <div className="my-8">
            <img
              src={urlFor(value).url()}
              alt={value.alt || ' '}
              className="w-full h-auto rounded-2xl shadow-sm"
              loading="lazy"
            />
            {value.caption && (
              <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
            )}
          </div>
        );
      } catch (e) {
        return null;
      }
    },
    youtubeEmbed: () => null,
    table: ({ value }: any) => {
      if (!value || !value.rows) return null;
      return (
        <div className="my-10 overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left border-collapse min-w-[600px]">
            {value.rows.map((row: any, rIndex: number) => {
              const isHeader = rIndex === 0;
              const CellTag = isHeader ? 'th' : 'td';
              return (
                <tr key={row._key || rIndex} className={isHeader ? "bg-slate-50 border-b border-slate-200" : "border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"}>
                  {row.cells.map((cell: any, cIndex: number) => (
                    <CellTag key={cIndex} className={`p-4 ${isHeader ? "font-bold text-slate-800 text-sm uppercase tracking-wider" : "text-slate-600 align-top"}`}>
                      {cell}
                    </CellTag>
                  ))}
                </tr>
              );
            })}
          </table>
        </div>
      );
    },
    object: () => null,
    markdownBlock: () => null,
  },
  block: {
    h2: ({ children, value }: any) => {
      const text = value.children.map((child: any) => child.text).join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h2 id={id} className="text-3xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24">{children}</h2>;
    },
    h3: ({ children, value }: any) => {
      const text = value.children.map((child: any) => child.text).join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h3 id={id} className="text-2xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24">{children}</h3>;
    },
    h4: ({ children, value }: any) => {
      const text = value.children.map((child: any) => child.text).join('');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return <h4 id={id} className="text-xl font-bold text-slate-800 mt-6 mb-3 scroll-mt-24">{children}</h4>;
    },
    normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic text-slate-700 my-8 py-2 bg-slate-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <a href={value?.href} target={target} rel={rel} className="text-[var(--color-brand-primary)] hover:text-[var(--color-accent)] underline decoration-2 decoration-[var(--color-brand-primary)]/30 hover:decoration-[var(--color-accent)] transition-colors">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function PortableTextRenderer({ value }: Props) {
  // Inject CTAs at 30% and 80% mark of the content blocks
  if (Array.isArray(value) && value.length > 5) {
      const firstCtaIndex = Math.floor(value.length * 0.35);
      const secondCtaIndex = Math.floor(value.length * 0.85);

      const newBlocks = [];
      value.forEach((block, index) => {
         newBlocks.push(block);
         if (index === firstCtaIndex) {
            newBlocks.push({
               _type: 'customCta',
               _key: 'cta-1',
               title: "Need help turning this into a working course or platform?",
               body: "TheEduAssist can review your content, Kajabi setup, LMS plan, or training workflow and suggest the clearest next step.",
               primaryText: "Get 24–48 Hour Review",
               primaryUrl: "/book-free-audit/",
               secondaryText: "Explore Services",
               secondaryUrl: "/services/"
            });
         }
         if (index === secondCtaIndex) {
            newBlocks.push({
               _type: 'customCta',
               _key: 'cta-2',
               title: "Build a cleaner learning experience with TheEduAssist",
               body: "From course structure and LMS migration to AI-powered e-learning content, we help you build learning systems that are easier to launch and easier for learners to follow.",
               primaryText: "Book Free Audit",
               primaryUrl: "/book-free-audit/",
               secondaryText: "View Case Studies",
               secondaryUrl: "/case-studies/"
            });
         }
      });
      value = newBlocks;
  }

  return (
    <div className="portable-text-content prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-[var(--color-brand-primary)] prose-img:rounded-2xl prose-img:shadow-sm">
      <PortableText value={value} components={components} />
    </div>
  );
}
