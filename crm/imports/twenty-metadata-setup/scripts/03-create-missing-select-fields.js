require("dotenv").config();

const BASE_URL = process.env.TWENTY_BASE_URL;
const API_KEY = process.env.TWENTY_API_KEY;

const TARGET_OBJECT_NAME = "lead";

function option(label, value, position) {
  return {
    label,
    value,
    position,
  };
}

const SELECT_FIELDS = [
  {
    name: "priorityTier",
    label: "Priority Tier",
    type: "SELECT",
    options: [
      option("P0 - top 100", "P0_TOP_100", 0),
      option("P1 - priority", "P1_PRIORITY", 1),
      option("P2 - research", "P2_RESEARCH", 2),
      option("P3 - nurture", "P3_NURTURE", 3),
      option("Normal", "NORMAL", 4),
    ],
  },
  {
    name: "primaryChannel",
    label: "Primary Channel",
    type: "SELECT",
    options: [
      option("Email", "EMAIL", 0),
      option("LinkedIn manual", "LINKEDIN_MANUAL", 1),
      option("YouTube manual", "YOUTUBE_MANUAL", 2),
      option("Instagram manual", "INSTAGRAM_MANUAL", 3),
      option("Facebook manual", "FACEBOOK_MANUAL", 4),
      option("Upwork manual", "UPWORK_MANUAL", 5),
      option("Website form", "WEBSITE_FORM", 6),
      option("None", "NONE", 7),
    ],
  },
  {
    name: "fitStatus",
    label: "Fit Status",
    type: "SELECT",
    options: [
      option("Raw", "RAW", 0),
      option("Strong fit", "STRONG_FIT", 1),
      option("Medium fit", "MEDIUM_FIT", 2),
      option("Weak fit", "WEAK_FIT", 3),
      option("Not a fit", "NOT_A_FIT", 4),
      option("Duplicate", "DUPLICATE", 5),
      option("Needs review", "NEEDS_REVIEW", 6),
    ],
  },
  {
    name: "researchStatus",
    label: "Research Status",
    type: "SELECT",
    options: [
      option("Not started", "NOT_STARTED", 0),
      option("In progress", "IN_PROGRESS", 1),
      option("Missing company info", "MISSING_COMPANY_INFO", 2),
      option("Missing decision maker", "MISSING_DECISION_MAKER", 3),
      option("Missing contact channel", "MISSING_CONTACT_CHANNEL", 4),
      option("Complete", "COMPLETE", 5),
      option("Duplicate", "DUPLICATE", 6),
      option("Archived", "ARCHIVED", 7),
    ],
  },
  {
    name: "emailSequenceStatus",
    label: "Email Sequence Status",
    type: "SELECT",
    options: [
      option("Not started", "NOT_STARTED", 0),
      option("Draft needed", "DRAFT_NEEDED", 1),
      option("Draft ready", "DRAFT_READY", 2),
      option("Waiting review", "WAITING_REVIEW", 3),
      option("Approved to send", "APPROVED_TO_SEND", 4),
      option("Email 1 sent", "EMAIL_1_SENT", 5),
      option("Follow-up 1 due", "FOLLOW_UP_1_DUE", 6),
      option("Follow-up 1 sent", "FOLLOW_UP_1_SENT", 7),
      option("Follow-up 2 due", "FOLLOW_UP_2_DUE", 8),
      option("Follow-up 2 sent", "FOLLOW_UP_2_SENT", 9),
      option("Replied", "REPLIED", 10),
      option("Bounced", "BOUNCED", 11),
      option("Stopped", "STOPPED", 12),
    ],
  },
  {
    name: "aiAuditStatus",
    label: "AI Audit Status",
    type: "SELECT",
    options: [
      option("Not audited", "NOT_AUDITED", 0),
      option("Passed", "PASSED", 1),
      option("Passed with warnings", "PASSED_WITH_WARNINGS", 2),
      option("Failed", "FAILED", 3),
      option("Needs human review", "NEEDS_HUMAN_REVIEW", 4),
    ],
  },
  {
    name: "salesReviewStatus",
    label: "Sales Review Status",
    type: "SELECT",
    options: [
      option("Not ready", "NOT_READY", 0),
      option("Ready for review", "READY_FOR_REVIEW", 1),
      option("Approved", "APPROVED", 2),
      option("Edit needed", "EDIT_NEEDED", 3),
      option("Rejected", "REJECTED", 4),
      option("Manual only", "MANUAL_ONLY", 5),
      option("Founder review needed", "FOUNDER_REVIEW_NEEDED", 6),
    ],
  },
  {
    name: "replyStatus",
    label: "Reply Status",
    type: "SELECT",
    options: [
      option("No reply", "NO_REPLY", 0),
      option("Interested", "INTERESTED", 1),
      option("Asked question", "ASKED_QUESTION", 2),
      option("Not now", "NOT_NOW", 3),
      option("Not interested", "NOT_INTERESTED", 4),
      option("Wrong person", "WRONG_PERSON", 5),
      option("Unsubscribe / stop", "UNSUBSCRIBE_STOP", 6),
    ],
  },
  {
    name: "socialWorkflowStatus",
    label: "Social Workflow Status",
    type: "SELECT",
    options: [
      option("Not started", "NOT_STARTED", 0),
      option("Draft needed", "DRAFT_NEEDED", 1),
      option("Draft ready", "DRAFT_READY", 2),
      option("Assigned to human", "ASSIGNED_TO_HUMAN", 3),
      option("Message sent manually", "MESSAGE_SENT_MANUALLY", 4),
      option("Comment posted", "COMMENT_POSTED", 5),
      option("Replied", "REPLIED", 6),
      option("Interested", "INTERESTED", 7),
      option("Stopped", "STOPPED", 8),
    ],
  },
  {
    name: "nextAction",
    label: "Next Action",
    type: "SELECT",
    options: [
      option("Research company", "RESEARCH_COMPANY", 0),
      option("Find decision maker", "FIND_DECISION_MAKER", 1),
      option("Check contact channel", "CHECK_CONTACT_CHANNEL", 2),
      option("Generate AI draft", "GENERATE_AI_DRAFT", 3),
      option("Sales review", "SALES_REVIEW", 4),
      option("Send email", "SEND_EMAIL", 5),
      option("Manual social action", "MANUAL_SOCIAL_ACTION", 6),
      option("Handle reply", "HANDLE_REPLY", 7),
      option("Create opportunity", "CREATE_OPPORTUNITY", 8),
      option("Archive", "ARCHIVE", 9),
      option("Do not contact", "DO_NOT_CONTACT", 10),
    ],
  },
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

async function main() {
  console.log("Creating missing SELECT fields with options...");

  const objectsResponse = await api("/rest/metadata/objects");
  const objects = unwrap(objectsResponse);

  const targetObject = objects.find(
    (obj) =>
      obj.nameSingular === TARGET_OBJECT_NAME ||
      obj.labelSingular === "Lead" ||
      obj.labelPlural === "Leads"
  );

  if (!targetObject) {
    console.error("Could not find target object: Leads / lead");
    process.exit(1);
  }

  const fields =
    targetObject.fields ||
    targetObject.fieldsList ||
    targetObject.fieldMetadataItems ||
    targetObject.fieldMetadataItemsList ||
    [];

  const existingFieldNames = new Set(fields.map((field) => field.name));

  for (const field of SELECT_FIELDS) {
    if (existingFieldNames.has(field.name)) {
      console.log(`SKIP existing SELECT field: ${field.name}`);
      continue;
    }

    if (!field.options || !field.options.length) {
      throw new Error(`SELECT field ${field.name} has no options`);
    }

    const payload = {
      objectMetadataId: targetObject.id,
      name: field.name,
      label: field.label,
      type: field.type,
      options: field.options,
    };

    console.log(`CREATE SELECT field: ${field.name}`);

    await api("/rest/metadata/fields", "POST", payload);
  }

  console.log("\nDone creating missing SELECT fields.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
