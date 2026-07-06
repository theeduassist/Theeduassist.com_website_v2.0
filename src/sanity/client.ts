import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './env'

// THIS CLIENT MUST ONLY BE USED SERVER-SIDE / BUILD TIME
// DO NOT import this into browser-hydrated React/Vue components to prevent exposing tokens or doing client-side fetching.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Ensure fresh build data and prevent reliance on runtime fetching
})

// Wrapper to gracefully fallback when env vars are missing
export async function fetchFromSanity(query: string, params: Record<string, any> = {}) {
  try {
    return await client.fetch(query, params)
  } catch (error: any) {
    console.warn('Gracefully skipping Sanity fetch due to missing environment variables or connection error.');
    if (query.trim().endsWith('[0]')) {
      return null
    }
    return []
  }
}
