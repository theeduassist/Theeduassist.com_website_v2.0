require("dotenv").config();

const BASE_URL = process.env.TWENTY_BASE_URL;
const API_KEY = process.env.TWENTY_API_KEY;

const TARGET_OBJECT_NAME = "lead";

const REQUIRED_FIELDS = [
  "leadTitle",
  "externalLeadId",
  "source",
  "sourceUrl",
  "sourceBatch",
  "companyNameRaw",
  "websiteRaw",
  "contactNameRaw",
  "contactEmailRaw",
  "contactLinkedinRaw",
  "priorityTier",
  "primaryChannel",
  "fitStatus",
  "researchStatus",
  "emailSequenceStatus",
  "aiEmailSubjectDraft",
  "aiEmailBodyDraft",
  "aiLinkedinDraft",
  "aiAuditStatus",
  "salesReviewStatus",
  "approvedToSendByN8n",
  "doNotContact",
  "replyStatus",
  "socialWorkflowStatus",
  "nextAction",
];

function unwrap(responseJson) {
  if (Array.isArray(responseJson)) return responseJson;
  if (Array.isArray(responseJson.data)) return responseJson.data;
  if (Array.isArray(responseJson.objects)) return responseJson.objects;
  if (Array.isArray(responseJson.data?.objects)) return responseJson.data.objects;
  return [];
}

async function api(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    console.error("Request failed:", endpoint);
    console.error("Status:", res.status);
    console.error("Response:", data);
    process.exit(1);
  }

  return data;
}

async function main() {
  console.log("Verifying Leads schema...");

  const objects = unwrap(await api("/rest/metadata/objects"));

  const targetObject = objects.find(
    (obj) =>
      obj.nameSingular === TARGET_OBJECT_NAME ||
      obj.labelSingular === "Lead" ||
      obj.labelPlural === "Leads"
  );

  if (!targetObject) {
    console.error("Missing object: Leads");
    process.exit(1);
  }

  console.log("Found object:", targetObject.labelSingular || targetObject.labelPlural);

  const fields =
    targetObject.fields ||
    targetObject.fieldsList ||
    targetObject.fieldMetadataItems ||
    targetObject.fieldMetadataItemsList ||
    [];

  const existingFieldNames = new Set(fields.map((field) => field.name));

  let missing = [];

  for (const fieldName of REQUIRED_FIELDS) {
    if (existingFieldNames.has(fieldName)) {
      console.log(`OK: ${fieldName}`);
    } else {
      console.log(`MISSING: ${fieldName}`);
      missing.push(fieldName);
    }
  }

  console.log("\nSummary:");
  console.log("Required fields:", REQUIRED_FIELDS.length);
  console.log("Missing fields:", missing.length);

  if (missing.length) {
    console.log("Missing field names:");
    console.log(missing.join("\n"));
    process.exit(1);
  }

  console.log("Schema verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
