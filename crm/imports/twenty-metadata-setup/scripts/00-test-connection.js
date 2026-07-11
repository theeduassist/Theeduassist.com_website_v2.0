require("dotenv").config();

const BASE_URL = process.env.TWENTY_BASE_URL;
const API_KEY = process.env.TWENTY_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error("Missing TWENTY_BASE_URL or TWENTY_API_KEY in .env");
  process.exit(1);
}

async function main() {
  console.log("Testing Twenty Metadata API connection...");
  console.log("Base URL:", BASE_URL);

  const res = await fetch(`${BASE_URL}/rest/metadata/objects`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    },
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Connection failed.");
    console.error("Status:", res.status);
    console.error("Response:", text);
    process.exit(1);
  }

  console.log("Connection successful.");
  console.log("Metadata API is responding.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
