const events = [
  "enterprise_cta_click",
  "enterprise_form_error",
  "generate_lead",
  "procurement_cta_click",
  "trust_content_click"
];

let errors = [];

events.forEach(event => {
    if (event.match(/[A-Z\s]/)) {
        errors.push(`Event ${event} contains spaces or uppercase letters.`);
    }
});

if (errors.length > 0) {
  console.error("Analytics Events Validation Failed:");
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log("Analytics events validated successfully.");
}
