import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../../sanity/image';

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <img
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            className="w-full h-auto rounded-xl shadow-sm border border-slate-200"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
          )}
        </div>
      );
    },
    imageWithAlt: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <img
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            className="w-full h-auto rounded-xl shadow-sm border border-slate-200"
            loading="lazy"
          />
          {value.caption && (
            <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: any; value: any }) => {
      const href = value?.href || '';
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={href} rel={rel} target={target} className="text-brand-green hover:text-brand-blue underline transition-colors">
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children, value }: { children: any; value: any }) => {
      const id = value._key || Math.random().toString(36).substring(7);
      return <h2 id={id} className="text-3xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24">{children}</h2>;
    },
    h3: ({ children, value }: { children: any; value: any }) => {
      const id = value._key || Math.random().toString(36).substring(7);
      return <h3 id={id} className="text-2xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24">{children}</h3>;
    },
    h4: ({ children, value }: { children: any; value: any }) => {
      const id = value._key || Math.random().toString(36).substring(7);
      return <h4 id={id} className="text-xl font-bold text-slate-800 mt-6 mb-3 scroll-mt-24">{children}</h4>;
    },
    normal: ({ children }: { children: any }) => <p className="mb-6 leading-relaxed">{children}</p>,
    blockquote: ({ children }: { children: any }) => (
      <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic text-slate-700 my-8 py-2 bg-slate-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: any }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
    number: ({ children }: { children: any }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: { children: any }) => <li>{children}</li>,
    number: ({ children }: { children: any }) => <li>{children}</li>,
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components as any} />;
}
