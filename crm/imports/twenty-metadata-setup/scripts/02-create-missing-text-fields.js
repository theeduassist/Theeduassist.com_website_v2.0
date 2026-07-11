require("dotenv").config();

const BASE_URL = process.env.TWENTY_BASE_URL;
const API_KEY = process.env.TWENTY_API_KEY;

// Based on your screenshot, fields already started inside "Leads".
const TARGET_OBJECT_NAME = "lead";

const SAFE_FIELDS = [
  { name: "contactNameRaw", label: "Contact Name Raw", type: "TEXT" },
  { name: "contactEmailRaw", label: "Contact Email Raw", type: "TEXT" },
  { name: "contactLinkedinRaw", label: "Contact LinkedIn Raw", type: "TEXT" },
  { name: "countryRaw", label: "Country Raw", type: "TEXT" },
  { name: "jobProjectDescription", label: "Job / Project Description", type: "TEXT" },
  { name: "budgetRaw", label: "Budget Raw", type: "TEXT" },
  { name: "clientSpendRaw", label: "Client Spend Raw", type: "TEXT" },
  { name: "linkedInUrl", label: "LinkedIn URL", type: "TEXT" },
  { name: "youtubeUrl", label: "YouTube URL", type: "TEXT" },
  { name: "instagramUrl", label: "Instagram URL", type: "TEXT" },
  { name: "facebookUrl", label: "Facebook URL", type: "TEXT" },
  { name: "upworkUrl", label: "Upwork URL", type: "TEXT" },
  { name: "aiEmailSubjectDraft", label: "AI Email Subject Draft", type: "TEXT" },
  { name: "aiEmailBodyDraft", label: "AI Email Body Draft", type: "TEXT" },
  { name: "aiLinkedinDraft", label: "AI LinkedIn Draft", type: "TEXT" },
  { name: "aiYoutubeCommentDraft", label: "AI YouTube Comment Draft", type: "TEXT" },
  { name: "aiInstagramDraft", label: "AI Instagram Draft", type: "TEXT" },
  { name: "aiAuditNotes", label: "AI Audit Notes", type: "TEXT" },
  { name: "salesReviewNotes", label: "Sales Review Notes", type: "TEXT" },
  { name: "finalApprovedSubject", label: "Final Approved Subject", type: "TEXT" },
  { name: "finalApprovedEmail", label: "Final Approved Email", type: "TEXT" },
  { name: "manualSocialNotes", label: "Manual Social Notes", type: "TEXT" },
  { name: "notesSummary", label: "Notes Summary", type: "TEXT" },
  { name: "leadScore", label: "Lead Score", type: "NUMBER" },
  { name: "emailStep", label: "Email Step", type: "NUMBER" },
  { name: "followUpCount", label: "Follow-up Count", type: "NUMBER" },
  { name: "doNotContact", label: "Do Not Contact", type: "BOOLEAN" },
  { name: "approvedToSendByN8n", label: "Approved to Send by n8n", type: "BOOLEAN" },
  { name: "founderApprovalRequired", label: "Founder Approval Required", type: "BOOLEAN" },
  { name: "firstEmailSentAt", label: "First Email Sent At", type: "DATE_TIME" },
  { name: "followUp1SentAt", label: "Follow-up 1 Sent At", type: "DATE_TIME" },
  { name: "followUp2SentAt", label: "Follow-up 2 Sent At", type: "DATE_TIME" },
  { name: "nextFollowUpDate", label: "Next Follow-up Date", type: "DATE_TIME" },
  { name: "lastSocialTouchDate", label: "Last Social Touch Date", type: "DATE_TIME" },
];

function unwrap(responseJson) {
  if (Array.isArray(responseJson)) return responseJson;
  if (Array.isArray(responseJson.data)) return responseJson.data;
  if (Array.isArray(responseJson.objects)) return responseJson.objects;
  if (Array.isArray(responseJson.data?.objects)) return responseJson.data.objects;
  return [];
}

async function api(endpoint, method = "GET", body = null) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    console.error("\nFAILED REQUEST");
    console.error("Method:", method);
    console.error("Endpoint:", endpoint);
    console.error("Payload:");
    console.error(body ? JSON.stringify(body, null, 2) : "(no body)");
    console.error("Response:");
    console.error(typeof data === "object" ? JSON.stringify(data, null, 2) : data);
    throw new Error(`Twenty API failed with status ${res.status}`);
  }

  return data;
}

async function getObjects() {
  return unwrap(await api("/rest/metadata/objects"));
}

function getFields(object) {
  return (
    object.fields ||
    object.fieldsList ||
    object.fieldMetadataItems ||
    object.fieldMetadataItemsList ||
    []
  );
}

async function main() {
  console.log("Creating missing safe fields only...");

  const objects = await getObjects();

  const targetObject = objects.find(
    (obj) =>
      obj.nameSingular === TARGET_OBJECT_NAME ||
      obj.labelSingular === "Lead" ||
      obj.labelPlural === "Leads"
  );

  if (!targetObject) {
    console.error("Could not find target object: Leads / lead");
    console.error("Run 01-inspect-existing-schema.js first.");
    process.exit(1);
  }

  console.log("Target object:", targetObject.labelSingular || targetObject.labelPlural);
  console.log("Object ID:", targetObject.id);

  const existingFields = getFields(targetObject);
  const existingFieldNames = new Set(existingFields.map((field) => field.name));

  for (const field of SAFE_FIELDS) {
    if (existingFieldNames.has(field.name)) {
      console.log(`SKIP existing field: ${field.name}`);
      continue;
    }

    const payload = {
      objectMetadataId: targetObject.id,
      name: field.name,
      label: field.label,
      type: field.type,
    };

    console.log(`CREATE field: ${field.name} (${field.type})`);

    await api("/rest/metadata/fields", "POST", payload);
  }

  console.log("\nDone creating missing safe fields.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
