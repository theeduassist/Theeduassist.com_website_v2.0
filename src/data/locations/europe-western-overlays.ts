export const europeWesternOverlays = [
  {
    targetCountry: "United Kingdom",
    targetCity: "London",
    westernRecordExpected: true,
    recommendationType: "cultural-localisation note",
    recommendation: "Ensure spelling adopts UK conventions (e.g. 'programme', 'organisation'). Emphasize accessibility compliance aligned with UK guidelines.",
    sourceIds: ["SRC-UK-01"],
    nativeReviewRequired: false,
    integrationPriority: "high",
    notes: "Non-destructive enrichment. Agent to apply where suitable."
  },
  {
    targetCountry: "Germany",
    westernRecordExpected: true,
    recommendationType: "missing FAQ topic",
    recommendation: "Add a question regarding specific German data protection considerations for hosting LMS platforms.",
    sourceIds: ["SRC-DE-01"],
    nativeReviewRequired: true,
    integrationPriority: "medium",
    notes: ""
  },
  {
    targetCountry: "France",
    westernRecordExpected: true,
    recommendationType: "native terminology recommendation",
    recommendation: "Consider integrating terms like 'formation professionnelle' for corporate use cases.",
    sourceIds: ["SRC-FR-01"],
    nativeReviewRequired: true,
    integrationPriority: "medium",
    notes: ""
  },
  {
    targetCountry: "Spain",
    westernRecordExpected: true,
    recommendationType: "missing creator use case",
    recommendation: "Add insights on the growing trend of solo-consultants using lightweight LMS platforms in Spain.",
    sourceIds: ["SRC-ES-01"],
    nativeReviewRequired: false,
    integrationPriority: "low",
    notes: ""
  },
  {
    targetCountry: "Italy",
    westernRecordExpected: true,
    recommendationType: "missing industry",
    recommendation: "Highlight the manufacturing and design sectors for corporate learning and development.",
    sourceIds: ["SRC-IT-01"],
    nativeReviewRequired: false,
    integrationPriority: "medium",
    notes: ""
  }
];
