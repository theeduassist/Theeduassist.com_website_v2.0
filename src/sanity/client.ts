import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './env'

// Client for build time, fetching fresh data
export const sanityBuildClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure fresh build data and prevent reliance on runtime fetching
})

// Client for public read-only summaries/lists
export const sanityCdnClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Wrapper to gracefully fallback when env vars are missing
export async function fetchFromSanity(
  query: string,
  params: Record<string, any> = {},
  options: { useCdn?: boolean, tags?: string[] } = {}
) {
  try {
    const { useCdn = false, tags = [] } = options;
    const client = useCdn ? sanityCdnClient : sanityBuildClient;
    // Define request options, including tags if provided
    const fetchOptions: any = tags && tags.length > 0 ? { tag: tags.join(',') } : {};
    return await client.fetch(query, params, fetchOptions)
  } catch (error: any) {
    console.warn('Gracefully skipping Sanity fetch due to missing environment variables or connection error.');
    if (query.trim().endsWith('[0]')) {
      return null
    }
    return []
  }
}
