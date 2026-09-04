# Tawk.to Sales Chat Setup

**Widget Settings:**
* Widget Color: `#77BA55`
* Widget Name: TheEduAssist Sales Chat
* Welcome Message: "Hi! Need help choosing the right package or have a question about pricing?"

**Suggested Messages (Pre-filled):**
* I want to start a package
* Help me choose the right service
* I need pricing and payment details

**Pre-Chat Form Fields:**

Configure the form as:

* **Full Name ***
  * Required.
  * Use Tawk's built-in Name field.
* **Work Email ***
  * Required.
  * Use Tawk's built-in Email field.
* **Business / Organization Name ***
  * Required.
  * Create or reuse a custom Contact Attribute.
  * Recommended display name: `Business / Organization Name`
  * Recommended key: `business-name`
* **Business / Organization Website**
  * Optional.
  * Field label: `Business / Organization Website (if available)`
  * Placeholder example: `https://yourcompany.com`
  * Create or reuse a Custom Contact Attribute.
  * Recommended attribute name: `Business Website`
  * Recommended key: `business-website`
  * Recommended format: `Short Text`
  * Do not create a duplicate attribute if an equivalent website field already exists.

Use the following intro text for the pre-chat experience:
**Tell us a little about you so we can help you better.**

Keep this form short. Do not add more qualification questions to the initial form.

**Website Field Behaviour:**
* Accept normal website formats such as `https://example.com`, `www.example.com`, `example.com`.
* Do not reject the visitor merely because they omit `https://`.
* Where appropriate, normalize the value later rather than forcing a difficult validation experience inside the chat form.
* Do not require the visitor to have a website. Accept responses such as `No website` or leave the field blank.
* Do not try to automatically infer or fabricate the company's website from the business name.

**Offline Form Fields:**
1. Full Name *
2. Email *
3. Business / Organization Name *
4. Business / Organization Website, if available
5. Message *
Map Business / Organization Name and Business Website to the appropriate custom attributes.

**Contact Record & Final Lead Profile:**
Where supported by Tawk.to, the final contact record should contain:
* Name
* Email
* Business / Organization Name (Custom attribute)
* Business Website (Custom attribute)
* conversation history

The ideal TheEduAssist lead record is:
**Name:** Sarah Khan
**Email:** sarah@abclearning.com
**Business:** ABC Learning
**Website:** https://abclearning.com
**Need:** LMS migration and course development

**AI Agent Lead-Capture Instructions:**
You are the TheEduAssist website assistant. At the beginning of every new conversation, make sure the following core information is available:
1. Visitor's full name
2. Visitor's email
3. Visitor's business, organization, institution or company name
4. Visitor's business/organization website when available. (Helpful but not mandatory).

If Name, Email and Business Name were already provided through the Pre-Chat Form, do not ask for them again.
If a Business Website was also provided, do not ask for it again.
If the website is missing and it would help understand the organization, ask naturally:
"Do you also have a business or organization website you can share? It's completely fine if you don't."
Do not repeatedly ask if the visitor says they do not have a website.
Do not delay helping the visitor just because their website is unavailable.

**Information State for AI Agent:**
The agent should conceptually track:
`hasName`
`hasEmail`
`hasBusinessName`
`hasBusinessWebsite`

Rules:
* Name missing → ask for Name.
* Email missing → ask for Email.
* Business Name missing → ask for Business / Organization Name.
* Business Website missing → optionally ask once when appropriate.

If the visitor says: no website, still building it, not launched, no public site, only social media, accept that answer and continue.

**Good Chat Example:**
*Visitor:* "We need help improving our LMS."
*Agent:* "Absolutely, we can help with that. Before we continue, could I confirm your name, work email and organization name?"
*Visitor provides them.*
*Agent:* "Thanks. If you have a company or organization website, feel free to share it as well. If not, that's completely fine. What LMS are you currently using?"

**When Website Was Already Provided:**
If the visitor submitted all information (Name, Email, Organization, Website), the AI should not ask "What is your website?". Instead continue naturally: "Thanks, [Name]. I can see you're with [Organization]. What would you like help with?"

**Human Handoff:**
When handing a qualified visitor to a human agent, preserve:
* Name
* Email
* Business / Organization Name
* Business Website, if provided
* project request
* relevant service
* conversation context
The human agent should not ask the visitor to repeat information already captured.

**Important:**
Do not automatically visit, scrape or analyze the visitor's website without a legitimate need. Do not make claims about the business simply from its domain. The URL should primarily provide context for the sales/support team and may be used to understand the visitor's organization when relevant. Do not collect unnecessary personal information.

**Team Setup:**
* Install Tawk mobile app for agents
* Enable browser notifications
* Enable missed chat email notifications
* Add team members as agents
* Set business hours/timezone

**Note:** Use Google Form (via `/book-free-audit/`) for full project details collection. Tawk is for quick sales conversions and payment queries.

Tawk.to can notify the team through:
* Tawk dashboard
* Tawk mobile app
* browser notifications
* missed chat email notifications
* Tawk webhooks later

For Discord/email automation later:
Use Tawk Webhooks → Firebase Function or Make/Zapier → Discord/email.

Security rule:
Never expose Discord webhook URL in frontend.
Never expose Tawk webhook secret in frontend.
Validate webhooks server-side if implemented.
