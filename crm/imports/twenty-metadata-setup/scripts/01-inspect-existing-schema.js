require("dotenv").config();

const BASE_URL = process.env.TWENTY_BASE_URL;
const API_KEY = process.env.TWENTY_API_KEY;

function unwrap(responseJson) {
  if (Array.isArray(responseJson)) return responseJson;
  if (Array.isArray(responseJson.data)) return responseJson.data;
  if (Array.isArray(responseJson.objects)) return responseJson.objects;
  if (Array.isArray(responseJson.data?.objects)) return responseJson.data.objects;
  return [];
}

async function request(endpoint) {
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
  console.log("Inspecting Twenty metadata objects...\n");

  const objectsResponse = await request("/rest/metadata/objects");
  const objects = unwrap(objectsResponse);

  if (!objects.length) {
    console.log("No objects found or response shape is different.");
    console.log(JSON.stringify(objectsResponse, null, 2));
    return;
  }

  for (const obj of objects) {
    console.log("-----------------------------------");
    console.log("Label:", obj.labelSingular || obj.labelPlural);
    console.log("nameSingular:", obj.nameSingular);
    console.log("namePlural:", obj.namePlural);
    console.log("id:", obj.id);
    console.log("isCustom:", obj.isCustom);

    const fields =
      obj.fields ||
      obj.fieldsList ||
      obj.fieldMetadataItems ||
      obj.fieldMetadataItemsList ||
      [];

    if (Array.isArray(fields) && fields.length) {
      console.log("Fields:");
      for (const field of fields) {
        console.log(
          `  - ${field.label || field.name} | name: ${field.name} | type: ${field.type}`
        );
      }
    } else {
      console.log("Fields: not included in object response");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
