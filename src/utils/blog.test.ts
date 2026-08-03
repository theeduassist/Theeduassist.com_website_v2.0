import { describe, it, expect } from 'vitest';
import { normalizeBlogSlug, getBlogUrl, getFallbackDescription } from './blog';

describe('blog utils', () => {
  describe('normalizeBlogSlug', () => {
    it('returns null for falsy inputs', () => {
      expect(normalizeBlogSlug(null)).toBeNull();
      expect(normalizeBlogSlug(undefined)).toBeNull();
      expect(normalizeBlogSlug('')).toBeNull();
    });

    it('handles direct string slug', () => {
      expect(normalizeBlogSlug({ slug: 'my-post' })).toBe('my-post');
    });

    it('handles nested slug.current', () => {
      expect(normalizeBlogSlug({ slug: { current: 'my-post' } })).toBe('my-post');
    });

    it('returns null for non-string slugs', () => {
      expect(normalizeBlogSlug({ slug: 123 })).toBeNull();
      expect(normalizeBlogSlug({ slug: { current: 123 } })).toBeNull();
    });

    it('returns null for invalid string representations', () => {
      expect(normalizeBlogSlug({ slug: 'undefined' })).toBeNull();
      expect(normalizeBlogSlug({ slug: 'null' })).toBeNull();
      expect(normalizeBlogSlug({ slug: '[object Object]' })).toBeNull();
    });

    it('strips full URL prefix', () => {
      expect(normalizeBlogSlug({ slug: 'https://example.com/blog/my-post' })).toBe('my-post');
      expect(normalizeBlogSlug({ slug: 'http://test.org/blog/another-post' })).toBe('another-post');
    });

    it('strips trailing slashes', () => {
      expect(normalizeBlogSlug({ slug: 'my-post/' })).toBe('my-post');
      expect(normalizeBlogSlug({ slug: 'https://example.com/blog/my-post/' })).toBe('my-post');
    });
  });

  describe('getBlogUrl', () => {
    it('returns null for invalid slugs', () => {
      expect(getBlogUrl(null)).toBeNull();
      expect(getBlogUrl({ slug: 'null' })).toBeNull();
    });

    it('returns formatted URL for valid slugs', () => {
      expect(getBlogUrl({ slug: 'my-post' })).toBe('/blog/my-post/');
      expect(getBlogUrl({ slug: { current: 'my-post' } })).toBe('/blog/my-post/');
    });
  });

  describe('getFallbackDescription', () => {
    it('extracts and truncates text from HTML content', () => {
      const html = '<p>This is a <strong>test</strong> content that should be stripped of HTML tags and potentially truncated if it gets too long, but for now we will just check the stripping.</p>';
      const expected = 'This is a test content that should be stripped of HTML tags and potentially truncated if it gets too long, but for now we will just check the strippin...';
      expect(getFallbackDescription(html)).toBe(expected);
    });

    it('extracts text from PortableText body', () => {
      const body = [
        {
          _type: 'block',
          style: 'normal',
          children: [
            { text: 'This is ' },
            { text: 'a test ' },
            { text: 'from PortableText.' }
          ]
        }
      ];
      expect(getFallbackDescription(undefined, body)).toBe('This is a test from PortableText.');
    });

    it('ignores non-normal blocks in PortableText', () => {
      const body = [
        {
          _type: 'image',
          asset: { _ref: 'image-123' }
        },
        {
          _type: 'block',
          style: 'h1',
          children: [{ text: 'Heading' }]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [{ text: 'Actual content.' }]
        }
      ];
      expect(getFallbackDescription(undefined, body)).toBe('Actual content.');
    });

    it('returns default message if both are missing or empty', () => {
      const defaultMsg = 'Read our latest insights on course creation and LMS implementation.';
      expect(getFallbackDescription()).toBe(defaultMsg);
      expect(getFallbackDescription('')).toBe(defaultMsg);
      expect(getFallbackDescription(undefined, [])).toBe(defaultMsg);
    });
  });
});
