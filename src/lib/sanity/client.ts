import { createClient } from '@sanity/client';

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'jg4gi6mn';
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-06-19';

// Client for build time, fetching fresh data
export const sanityBuildClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// Client for public read-only summaries/lists
export const sanityCdnClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Deprecated in favor of sanityBuildClient / sanityCdnClient. Kept for backwards compatibility if needed during refactoring
export const sanityClient = sanityBuildClient;

export async function fetchFromSanity(
  query: string,
  params: Record<string, any> = {},
  options: { useCdn?: boolean, tags?: string[] } = {}
) {
  try {
    const { useCdn = false, tags = [] } = options;
    const client = useCdn ? sanityCdnClient : sanityBuildClient;
    const fetchOptions: any = tags && tags.length > 0 ? { tag: tags.join(',') } : {};
    return await client.fetch(query, params, fetchOptions);
  } catch (error: any) {
    console.error("Sanity fetch error:", error);
    if (error.message?.includes("Dataset not found") || error.message?.includes("Project not found")) {
      return query.includes('[0]') ? null : [];
    }
    return query.includes('[0]') ? null : [];
  }
}
