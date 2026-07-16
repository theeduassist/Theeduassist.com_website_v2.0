# Baseline Report
?? reports/website-2.5-phase-4-part-4-baseline.md
v22.22.1
11.11.0
14:42:44 [types] Generated 134ms
14:42:44 [check] Getting diagnostics for Astro files in /app...
[96mdeskStructure.ts[0m:[93m3[0m:[93m43[0m - [91merror[0m[90m ts(7006): [0mParameter 'S' implicitly has an 'any' type.

[7m3[0m const deskStructure: StructureResolver = (S) =>
[7m [0m [91m                                          ~[0m
[96mdeskStructure.ts[0m:[93m1[0m:[93m38[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/structure' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/structure.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m1[0m import type {StructureResolver} from 'sanity/structure'
[7m [0m [91m                                     ~~~~~~~~~~~~~~~~~~[0m

[96mlist_routes.ts[0m:[93m2[0m:[93m1[0m - [93mwarning[0m[90m ts(6133): [0m'getBlogPostSummaries' is declared but its value is never read.

[7m2[0m import { getBlogPostSummaries } from "./src/lib/content/getAllBlogPosts";
[7m [0m [93m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96msanity.cli.ts[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/cli' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/cli.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m1[0m import {defineCliConfig} from 'sanity/cli'
[7m [0m [91m                              ~~~~~~~~~~~~[0m

[96msanity.config.ts[0m:[93m66[0m:[93m23[0m - [91merror[0m[90m ts(7006): [0mParameter 'context' implicitly has an 'any' type.

[7m66[0m           post: (doc, context) => {
[7m  [0m [91m                      ~~~~~~~[0m
[96msanity.config.ts[0m:[93m66[0m:[93m18[0m - [91merror[0m[90m ts(7006): [0mParameter 'doc' implicitly has an 'any' type.

[7m66[0m           post: (doc, context) => {
[7m  [0m [91m                 ~~~[0m
[96msanity.config.ts[0m:[93m16[0m:[93m63[0m - [91merror[0m[90m ts(7031): [0mBinding element 'schemaType' implicitly has an 'any' type.

[7m16[0m const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
[7m  [0m [91m                                                              ~~~~~~~~~~[0m
[96msanity.config.ts[0m:[93m16[0m:[93m59[0m - [91merror[0m[90m ts(7006): [0mParameter 'S' implicitly has an 'any' type.

[7m16[0m const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
[7m  [0m [91m                                                          ~[0m
[96msanity.config.ts[0m:[93m10[0m:[93m32[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/presentation' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/presentation.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m10[0m import {presentationTool} from 'sanity/presentation'
[7m  [0m [91m                               ~~~~~~~~~~~~~~~~~~~~~[0m
[96msanity.config.ts[0m:[93m3[0m:[93m48[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/structure' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/structure.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m3[0m import type {DefaultDocumentNodeResolver} from 'sanity/structure'
[7m [0m [91m                                               ~~~~~~~~~~~~~~~~~~[0m
[96msanity.config.ts[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/structure' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/structure.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import {structureTool} from 'sanity/structure'
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~~[0m
[96msanity.config.ts[0m:[93m66[0m:[93m23[0m - [93mwarning[0m[90m ts(6133): [0m'context' is declared but its value is never read.

[7m66[0m           post: (doc, context) => {
[7m  [0m [93m                      ~~~~~~~[0m

[96mactions/generateSeo.ts[0m:[93m4[0m:[93m64[0m - [93mwarning[0m[90m ts(6385): [0m'onComplete' is deprecated.

[7m4[0m export function GenerateSeoAction({id, type, published, draft, onComplete}: DocumentActionProps) {
[7m [0m [93m                                                               ~~~~~~~~~~[0m

[96msrc/components/ai/AIAssistClient.ts[0m:[93m123[0m:[93m44[0m - [93mwarning[0m[90m ts(6133): [0m'platformUrl' is declared but its value is never read.

[7m123[0m function showFallbackModal(prompt: string, platformUrl: string) {
[7m   [0m [93m                                           ~~~~~~~~~~~[0m
[96msrc/components/ai/AIAssistClient.ts[0m:[93m123[0m:[93m28[0m - [93mwarning[0m[90m ts(6133): [0m'prompt' is declared but its value is never read.

[7m123[0m function showFallbackModal(prompt: string, platformUrl: string) {
[7m   [0m [93m                           ~~~~~~[0m

[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m1050[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m1050[0m     qualityScore: isTopTier ? 92 : 75,
[7m    [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m1016[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m1016[0m     priorityTier: isTopTier ? 1 : 2,
[7m    [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m1000[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m1000[0m     qualityScore: isTopTier ? 92 : 75,
[7m    [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m966[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m966[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m950[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m950[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m916[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m916[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m900[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m900[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m866[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m866[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m850[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m850[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m816[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m816[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m800[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m800[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m766[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m766[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m750[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m750[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m716[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m716[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m700[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m700[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m666[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m666[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m650[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m650[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m616[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m616[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m600[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m600[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m566[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m566[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m550[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m550[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m516[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m516[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m500[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m500[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m466[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m466[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m450[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m450[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m416[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m416[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m400[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m400[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m366[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m366[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m350[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m350[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m316[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m316[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m300[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m300[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m266[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m266[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m250[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m250[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m216[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m216[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m200[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m200[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m166[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m166[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m150[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m150[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m116[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m116[0m     priorityTier: isTopTier ? 1 : 2,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m100[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m100[0m     qualityScore: isTopTier ? 92 : 75,
[7m   [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m66[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m66[0m     priorityTier: isTopTier ? 1 : 2,
[7m  [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m50[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m50[0m     qualityScore: isTopTier ? 92 : 75,
[7m  [0m [91m                  ~~~~~~~~~[0m
[96msrc/data/locations/europe-expansion-cities.ts[0m:[93m16[0m:[93m19[0m - [91merror[0m[90m ts(2304): [0mCannot find name 'isTopTier'.

[7m16[0m     priorityTier: isTopTier ? 1 : 2,
[7m  [0m [91m                  ~~~~~~~~~[0m

[96msrc/lib/firebaseClient.ts[0m:[93m3[0m:[93m58[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'firebase/app' or its corresponding type declarations.

[7m3[0m import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
[7m [0m [91m                                                         ~~~~~~~~~~~~~~[0m

[96msrc/lib/content/getAllCaseStudies.ts[0m:[93m52[0m:[93m8[0m - [91merror[0m[90m ts(2322): [0mType '(CaseStudy | { title: any; slug: any; subtitle: any; clientType: any; industry: any; summary: any; publishedAt: any; updatedAt: any; source: string; })[]' is not assignable to type 'CaseStudy[]'.
  Type 'CaseStudy | { title: any; slug: any; subtitle: any; clientType: any; industry: any; summary: any; publishedAt: any; updatedAt: any; source: string; }' is not assignable to type 'CaseStudy'.
    Type '{ title: any; slug: any; subtitle: any; clientType: any; industry: any; summary: any; publishedAt: any; updatedAt: any; source: string; }' is not assignable to type 'CaseStudy'.
      Types of property 'source' are incompatible.
        Type 'string' is not assignable to type '"sanity" | "static"'.

[7m52[0m        return unique;
[7m  [0m [91m       ~~~~~~[0m
[96msrc/lib/content/getAllCaseStudies.ts[0m:[93m21[0m:[93m23[0m - [91merror[0m[90m ts(2339): [0mProperty 'noIndex' does not exist on type '{ slug: string; title: string; subtitle: string; caseNumber: string; clientType: string; industry: string; location: string; isRealProject: boolean; clientNamePublic: boolean; summary: string; ... 13 more ...; seoDescription: string; }'.

[7m21[0m     .filter(cs => !cs.noIndex)
[7m  [0m [91m                      ~~~~~~~[0m
[96msrc/lib/content/getAllCaseStudies.ts[0m:[93m2[0m:[93m10[0m - [93mwarning[0m[90m ts(6133): [0m'getCaseStudyBySlug' is declared but its value is never read.

[7m2[0m import { getCaseStudyBySlug, getAllCaseStudies as getSanityCaseStudies } from '../../sanity/queries';
[7m [0m [93m         ~~~~~~~~~~~~~~~~~~[0m

[96msrc/lib/sanity/client.ts[0m:[93m35[0m:[93m46[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 4, '(query: string, params: Record<string, any>, options?: FilteredResponseQueryOptions | undefined): Promise<any>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'FilteredResponseQueryOptions | undefined'.
      Type '{ filterResponse: boolean; tag: string; }' is not assignable to type 'FilteredResponseQueryOptions'.
        Types of property 'filterResponse' are incompatible.
          Type 'boolean' is not assignable to type 'true'.
  Overload 2 of 4, '(query: string, params: Record<string, any>, options: UnfilteredResponseQueryOptions): Promise<RawQueryResponse<any>>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'UnfilteredResponseQueryOptions'.
      Type '{ filterResponse: boolean; tag: string; }' is not assignable to type 'UnfilteredResponseQueryOptions'.
        Types of property 'filterResponse' are incompatible.
          Type 'boolean' is not assignable to type 'false'.
  Overload 3 of 4, '(query: string, params: Record<string, any>, options: UnfilteredResponseWithoutQuery): Promise<RawQuerylessQueryResponse<any>>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'UnfilteredResponseWithoutQuery'.
      Property 'returnQuery' is missing in type '{ filterResponse: boolean; tag: string; }' but required in type 'UnfilteredResponseWithoutQuery'.

[7m35[0m     return await client.fetch(query, params, fetchOptions);
[7m  [0m [91m                                             ~~~~~~~~~~~~[0m

[96msrc/lib/sanity/image.ts[0m:[93m6[0m:[93m29[0m - [91merror[0m[90m ts(7006): [0mParameter 'source' implicitly has an 'any' type.

[7m6[0m export function urlForImage(source) {
[7m [0m [91m                            ~~~~~~[0m

[96msrc/lib/seo/buildJsonLd.ts[0m:[93m10[0m:[93m5[0m - [93mwarning[0m[90m ts(6133): [0m'blogPostingSchema' is declared but its value is never read.

[7m10[0m     blogPostingSchema
[7m  [0m [93m    ~~~~~~~~~~~~~~~~~[0m

[96msrc/pages/data/blog/page-[page].json.ts[0m:[93m19[0m:[93m35[0m - [91merror[0m[90m ts(7006): [0mParameter 'post' implicitly has an 'any' type.

[7m19[0m   const cleanData = page.data.map(post => ({
[7m  [0m [91m                                  ~~~~[0m
[96msrc/pages/data/blog/page-[page].json.ts[0m:[93m15[0m:[93m29[0m - [91merror[0m[90m ts(7031): [0mBinding element 'props' implicitly has an 'any' type.

[7m15[0m export async function GET({ props }) {
[7m  [0m [91m                            ~~~~~[0m
[96msrc/pages/data/blog/page-[page].json.ts[0m:[93m12[0m:[93m19[0m - [91merror[0m[90m ts(7005): [0mVariable 'posts' implicitly has an 'any[]' type.

[7m12[0m   return paginate(posts, { pageSize: 12 });
[7m  [0m [91m                  ~~~~~[0m
[96msrc/pages/data/blog/page-[page].json.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m ts(7034): [0mVariable 'posts' implicitly has type 'any[]' in some locations where its type cannot be determined.

[7m6[0m   let posts = [];
[7m [0m [91m      ~~~~~[0m
[96msrc/pages/data/blog/page-[page].json.ts[0m:[93m5[0m:[93m40[0m - [91merror[0m[90m ts(7031): [0mBinding element 'paginate' implicitly has an 'any' type.

[7m5[0m export async function getStaticPaths({ paginate }) {
[7m [0m [91m                                       ~~~~~~~~[0m

[96msrc/sanity/client.ts[0m:[93m31[0m:[93m46[0m - [91merror[0m[90m ts(2769): [0mNo overload matches this call.
  Overload 1 of 4, '(query: string, params: Record<string, any>, options?: FilteredResponseQueryOptions | undefined): Promise<any>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'FilteredResponseQueryOptions | undefined'.
      Type '{ filterResponse: boolean; tag: string; }' is not assignable to type 'FilteredResponseQueryOptions'.
        Types of property 'filterResponse' are incompatible.
          Type 'boolean' is not assignable to type 'true'.
  Overload 2 of 4, '(query: string, params: Record<string, any>, options: UnfilteredResponseQueryOptions): Promise<RawQueryResponse<any>>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'UnfilteredResponseQueryOptions'.
      Type '{ filterResponse: boolean; tag: string; }' is not assignable to type 'UnfilteredResponseQueryOptions'.
        Types of property 'filterResponse' are incompatible.
          Type 'boolean' is not assignable to type 'false'.
  Overload 3 of 4, '(query: string, params: Record<string, any>, options: UnfilteredResponseWithoutQuery): Promise<RawQuerylessQueryResponse<any>>', gave the following error.
    Argument of type '{ filterResponse: boolean; tag: string; } | { filterResponse?: undefined; tag?: undefined; }' is not assignable to parameter of type 'UnfilteredResponseWithoutQuery'.
      Property 'returnQuery' is missing in type '{ filterResponse: boolean; tag: string; }' but required in type 'UnfilteredResponseWithoutQuery'.

[7m31[0m     return await client.fetch(query, params, fetchOptions)
[7m  [0m [91m                                             ~~~~~~~~~~~~[0m

[96msrc/sanity/image.ts[0m:[93m4[0m:[93m17[0m - [93mwarning[0m[90m ts(6385): [0m'imageUrlBuilder' is deprecated.

[7m4[0m const builder = imageUrlBuilder(client)
[7m [0m [93m                ~~~~~~~~~~~~~~~[0m

[96mstudio/sanity.cli.ts[0m:[93m1[0m:[93m31[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/cli' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/cli.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m1[0m import {defineCliConfig} from 'sanity/cli'
[7m [0m [91m                              ~~~~~~~~~~~~[0m

[96mstudio/sanity.config.ts[0m:[93m57[0m:[93m16[0m - [91merror[0m[90m ts(7006): [0mParameter 'listItem' implicitly has an 'any' type.

[7m57[0m               (listItem) =>
[7m  [0m [91m               ~~~~~~~~[0m
[96mstudio/sanity.config.ts[0m:[93m18[0m:[93m19[0m - [91merror[0m[90m ts(7006): [0mParameter 'S' implicitly has an 'any' type.

[7m18[0m       structure: (S) =>
[7m  [0m [91m                  ~[0m
[96mstudio/sanity.config.ts[0m:[93m4[0m:[93m21[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity-plugin-media' or its corresponding type declarations.

[7m4[0m import {media} from 'sanity-plugin-media'
[7m [0m [91m                    ~~~~~~~~~~~~~~~~~~~~~[0m
[96mstudio/sanity.config.ts[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m ts(2307): [0mCannot find module 'sanity/structure' or its corresponding type declarations.
  There are types at '/app/node_modules/sanity/lib/structure.d.ts', but this result could not be resolved under your current 'moduleResolution' setting. Consider updating to 'node16', 'nodenext', or 'bundler'.

[7m2[0m import {structureTool} from 'sanity/structure'
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~~[0m

[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m118[0m:[93m5[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m118[0m     </div>
[7m   [0m [91m    ~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m116[0m:[93m5[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m116[0m     <div className="portable-text-content prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-24 prose-a:text-[var(--color-brand-primary)] prose-img:rounded-2xl prose-img:shadow-sm">
[7m   [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m110[0m:[93m60[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m110[0m     em: ({ children }) => <em className="italic">{children}</em>,
[7m   [0m [91m                                                           ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m110[0m:[93m27[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m110[0m     em: ({ children }) => <em className="italic">{children}</em>,
[7m   [0m [91m                          ~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m109[0m:[93m86[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m109[0m     strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
[7m   [0m [91m                                                                                     ~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m109[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m109[0m     strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
[7m   [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m106[0m:[93m9[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m106[0m         </a>
[7m   [0m [91m        ~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m104[0m:[93m9[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m104[0m         <a href={value?.href} target={target} rel={rel} className="text-[var(--color-brand-primary)] hover:text-[var(--color-accent)] underline decoration-2 decoration-[var(--color-brand-primary)]/30 hover:decoration-[var(--color-accent)] transition-colors">
[7m   [0m [91m        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m97[0m:[93m62[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m97[0m     number: ({ children }) => <li className="pl-2">{children}</li>,
[7m  [0m [91m                                                             ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m97[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m97[0m     number: ({ children }) => <li className="pl-2">{children}</li>,
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m96[0m:[93m62[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m96[0m     bullet: ({ children }) => <li className="pl-2">{children}</li>,
[7m  [0m [91m                                                             ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m96[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m96[0m     bullet: ({ children }) => <li className="pl-2">{children}</li>,
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m93[0m:[93m90[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m93[0m     number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
[7m  [0m [91m                                                                                         ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m93[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m93[0m     number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>,
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m92[0m:[93m87[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m92[0m     bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
[7m  [0m [91m                                                                                      ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m92[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m92[0m     bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>,
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m88[0m:[93m7[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m88[0m       </blockquote>
[7m  [0m [91m      ~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m86[0m:[93m7[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m86[0m       <blockquote className="border-l-4 border-[var(--color-primary)] pl-6 italic text-slate-700 my-8 py-2 bg-slate-50 rounded-r-lg">
[7m  [0m [91m      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m84[0m:[93m77[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m84[0m     normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
[7m  [0m [91m                                                                            ~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m84[0m:[93m31[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m84[0m     normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
[7m  [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m82[0m:[93m104[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m82[0m       return <h4 id={id} className="text-xl font-bold text-slate-800 mt-6 mb-3 scroll-mt-24">{children}</h4>;
[7m  [0m [91m                                                                                                       ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m82[0m:[93m14[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m82[0m       return <h4 id={id} className="text-xl font-bold text-slate-800 mt-6 mb-3 scroll-mt-24">{children}</h4>;
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m77[0m:[93m105[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m77[0m       return <h3 id={id} className="text-2xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24">{children}</h3>;
[7m  [0m [91m                                                                                                        ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m77[0m:[93m14[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m77[0m       return <h3 id={id} className="text-2xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24">{children}</h3>;
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m72[0m:[93m106[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m72[0m       return <h2 id={id} className="text-3xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24">{children}</h2>;
[7m  [0m [91m                                                                                                         ~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m72[0m:[93m14[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m72[0m       return <h2 id={id} className="text-3xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24">{children}</h2>;
[7m  [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m57[0m:[93m11[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m57[0m           </div>
[7m  [0m [91m          ~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m55[0m:[93m92[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m55[0m               <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
[7m  [0m [91m                                                                                           ~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m55[0m:[93m15[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m55[0m               <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m48[0m:[93m13[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m 48[0m             <img
[7m   [0m [91m            ~~~~[0m
[7m 49[0m               src={urlFor(value).url()}
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m
[7m 52[0m               loading="lazy"
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 53[0m             />
[7m   [0m [91m~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m47[0m:[93m11[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m47[0m           <div className="my-8">
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m35[0m:[93m11[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m35[0m           </div>
[7m  [0m [91m          ~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m33[0m:[93m92[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m33[0m               <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
[7m  [0m [91m                                                                                           ~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m33[0m:[93m15[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m33[0m               <p className="text-sm text-center text-slate-500 mt-2 italic">{value.caption}</p>
[7m  [0m [91m              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m26[0m:[93m13[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m 26[0m             <img
[7m   [0m [91m            ~~~~[0m
[7m 27[0m               src={urlFor(value).url()}
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m
[7m 30[0m               loading="lazy"
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m 31[0m             />
[7m   [0m [91m~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m25[0m:[93m11[0m - [91merror[0m[90m ts(7026): [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m25[0m           <div className="my-8">
[7m  [0m [91m          ~~~~~~~~~~~~~~~~~~~~~~[0m
[96msrc/components/blog/PortableTextRenderer.tsx[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m ts(1259): [0mModule '"/app/node_modules/@types/react/index"' can only be default-imported using the 'allowSyntheticDefaultImports' flag

[7m1[0m import React from 'react';
[7m [0m [91m       ~~~~~[0m

Result (138 files):
- 105 errors
- 0 warnings
- 8 hints


> theeduassist@1.0.0 validate:trust
> node scripts/validate-trust-architecture.mjs

Trust architecture validated successfully.

> theeduassist@1.0.0 validate:redirects
> node scripts/validate-redirects.mjs

Redirects validated successfully.
Enterprise architecture validated successfully.
