---
title: "Articulate Rise 360 Localization Guide"
slug: "rise-360-localization-guide"
description: "Learn how to localize Articulate Rise 360 courses effectively, manage XLIFF files, translate labels, and fix layout issues."
category: "localization"
resourceType: "guide"
publishedAt: "2026-02-12"
author: "TheEduAssist Editorial Team"
summary: "Articulate Rise 360 localization relies heavily on XLIFF export and import workflows. While Rise is responsive and handles text expansion better than slide-based tools, successful localization still requires manual label translation, media replacement, and fixing formatting breaks that occur during XLIFF import."
primaryKeyword: "Rise localization"
secondaryKeywords:
  - "Articulate Rise translation"
  - "Rise 360 localization"
searchIntent: "Informational"
relatedServices:
  - "articulate-rise-localization"
  - "elearning-localization-implementation"
---

## Introduction to Rise 360 Localization

Articulate Rise 360 is a rapid, responsive authoring tool. Because it is web-based and scrolls continuously rather than relying on fixed-size slides, it is generally much easier to localize than Articulate Storyline.

When text expands in translation (like translating from English to German), Rise's responsive blocks simply push the content further down the page.

However, Rise localization still requires a strict technical workflow to manage translations, replace media, and ensure the final course functions properly.

## Step 1: Duplicate the Course

Always begin by duplicating your final English source course. Never attempt to localize the original file. Rename the duplicate clearly (e.g., `Course Name - Spanish`).

Open the duplicated course and navigate to **Settings > Labels**. Switch the built-in course labels to your target language. Rise has many pre-built language sets. If your language is not supported, you must manually translate the labels in this menu.

## Step 2: Export for Translation

Navigate to **Settings > Translation**.

Rise 360 exports text exclusively via the **XLIFF** format.
*   Export the XLIFF file.
*   *Crucial Step:* Do not open or edit the XLIFF file in a standard text editor. It must be provided to a translation agency that uses Translation Memory software (like Trados or memoQ) to maintain the XML tagging.

## Step 3: Media Extraction

Rise does not automatically export your images, videos, or downloadable PDF attachments for translation.

You must manually review the course, identify all media assets that contain English text or English audio, and provide the original source files for those assets to your translation team.

## Step 4: Import and Implementation

Once the translation agency returns the translated XLIFF file, go back to **Settings > Translation** in your duplicated course and import the file.

### Fixing Import Breaks
XLIFF imports in Rise are not always perfect. You must manually review the entire course to fix:
*   **Bold/Italic Formatting:** Tags sometimes break during translation, causing bold text to revert to normal or display weird characters.
*   **Hyperlinks:** Links within text blocks can break or point to the wrong URLs.
*   **Bullet Points:** Lists sometimes lose their formatting and combine into a single paragraph.

### Replacing Media
Manually swap out the English images, videos, and attachments with the newly localized versions provided by your team.

*   *Captions:* If your videos use closed captions, upload the translated VTT files directly to the video blocks.

### Localizing Interactive Storyline Blocks
If your Rise course includes embedded Storyline 360 blocks, those blocks will *not* be translated via the Rise XLIFF export.
1.  You must localize the `.story` file separately.
2.  Publish the localized Storyline file to Review 360.
3.  Re-insert the localized block into your localized Rise course.

## Step 5: Quality Assurance

Because Rise is responsive, **Visual QA** is critical. You must preview the course on both desktop and mobile views to ensure that long translated words (especially in button blocks or flashcards) do not break the design or become unreadable on small screens.

Finally, conduct **Functional QA** by exporting the SCORM package and testing it in your target LMS to ensure completion tracking functions perfectly in the new language.
