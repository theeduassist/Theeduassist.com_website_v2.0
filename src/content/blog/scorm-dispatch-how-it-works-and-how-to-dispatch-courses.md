---
title: "SCORM Dispatch: How It Works and How to Dispatch Courses"
slug: scorm-dispatch
featured: false
excerpt: Learn what SCORM Dispatch is, how SCORM Cloud Dispatch works, how to
  distribute SCORM courses across multiple LMS platforms, and the benefits and
  challenges of centralized eLearning content delivery.
aiSummary: SCORM Dispatch allows eLearning providers to deliver centrally hosted
  courses to multiple LMS platforms without distributing the complete course
  files to every customer. This guide explains how SCORM Dispatch works, what a
  Dispatch package is, how it differs from traditional SCORM uploads, and when
  organizations should consider using it.
author: editorial-team
category: lms-learning-technology
tags:
  - SCORM
  - SCORM Dispatch
  - SCORM Cloud
  - eLearning
  - xAPI
  - Learning Management System
  - eLearning Content
  - cmi5
  - LMS Integration
  - eLearning Content
  - Learning Management System
draft: false
publishedAt: 2026-09-30
updatedAt: 2026-09-30
heroImageAlt: SCORM Dispatch delivering eLearning courses to multiple LMS platforms
heroImageCaption: SCORM Dispatch connects centrally hosted eLearning content
  with multiple LMS platforms.
seoTitle: "SCORM Dispatch: How It Works & How to Dispatch Courses"
seoDescription: "SCORM Dispatch explained: learn how it works, how to dispatch
  SCORM courses, SCORM Cloud Dispatch packages, benefits, challenges, and LMS
  compatibility."
focusKeyword: SCORM Dispatch
secondaryKeywords:
  - SCORM Dispatch package
  - SCORM Cloud Dispatch
  - how SCORM Dispatch works
  - how to dispatch a SCORM course
  - SCORM LMS integration
  - SCORM course distribution
  - SCORM content delivery
  - SCORM and xAPI
  - LMS content distribution
  - SCORM vs SCORM Dispatch
searchIntent: Informational
advancedSeo:
  noindex: false
keyTakeaways:
  - SCORM Dispatch can simplify multi-LMS distribution, especially for course
    publishers and training providers.
  - Centralized hosting makes course updates and version management easier
    across multiple LMS environments.
  - Testing is essential because LMS compatibility, tracking, reporting, and
    technical configuration can vary between platforms.
  - SCORM Dispatch delivering eLearning courses to multiple LMS platforms
  - SCORM Dispatch connects centrally hosted eLearning content with multiple LMS
    platforms.
faqs:
  - question: What is SCORM Dispatch?
    answer: SCORM Dispatch is a method of distributing eLearning content to another
      LMS while keeping the original course hosted and managed separately.
  - question: What is a SCORM Dispatch package?
    answer: A SCORM Dispatch package is a small package that connects a destination
      LMS with centrally hosted learning content.
  - question: Is SCORM Dispatch the same as uploading a SCORM course?
    answer: No. With a traditional SCORM upload, the complete course package is
      generally uploaded to the LMS. With Dispatch, the destination LMS can
      receive a package that connects it to externally hosted content.
  - question: What is SCORM Cloud Dispatch?
    answer: SCORM Cloud Dispatch is Rustici Software's solution for delivering
      centrally hosted eLearning content to third-party LMS platforms.
  - question: Can SCORM Dispatch be used with xAPI?
    answer: SCORM Cloud Dispatch supports delivery of content including xAPI and
      cmi5 through supported Dispatch methods and destination environments.
  - question: Is SCORM Dispatch useful for course publishers?
    answer: Yes. It can be particularly relevant for course publishers and training
      providers that need to distribute the same content to multiple
      organizations and LMS platforms.
  - question: Do you need an LMS for SCORM Dispatch?
    answer: The destination learning system needs to support the relevant delivery
      method. SCORM Cloud Dispatch can deliver through SCORM 1.2 or LTI,
      depending on the setup.
editorialManagement:
  dueDate: 2026-09-30
  scheduledPublicationDate: 2026-09-30
  lastReviewedDate: 2026-09-30
  nextReviewDate: 2026-09-30
heroImage: /images/blog/scorm-dispatch-lms-course-delivery.webp
sources:
  - title: " Rustici Software. Getting Started: Creating a Dispatch."
    url: https://support.scorm.com/hc/en-us/articles/206164116-Getting-started-Creating-a-Dispatch
    accessedAt: 2026-10-01
  - title: SCORM Cloud Documentation. Getting Started.
    url: https://cloud.scorm.com/docs/user-guide/getting-started/
    accessedAt: 2026-10-01
  - title: Rustici Software. Dispatch Documentation
    url: Rustici Software. Dispatch Documentation
    accessedAt: 2026-10-01
  - title: Advanced Distributed Learning (ADL). Sharable Content Object Reference
      Model (SCORM).
    url: https://adlnet.gov/projects/scorm/
    accessedAt: 2026-10-01
  - title: 1EdTech Consortium. Learning Tools Interoperability (LTI).
    url: https://www.1edtech.org/standards/lti
    accessedAt: 2026-10-01
---
**SCORM Dispatch** is a way to deliver eLearning content to another LMS while keeping the original course hosted and managed separately. It is especially useful for course publishers, training providers, and organizations that need to distribute the same content across multiple learning platforms.

[SCORM Cloud Dispatch documentation](https://support.scorm.com/hc/en-us/articles/206164116-Getting-started-Creating-a-Dispatch) explains how content providers can host courses in SCORM Cloud and distribute them to third-party LMS platforms through Dispatch packages.

In this guide, you will learn what SCORM Dispatch means, how it works, what a SCORM Dispatch package is, how it differs from a traditional SCORM upload, and when it can be useful for your eLearning strategy.

## What Is SCORM Dispatch?

**SCORM Dispatch** is a method of distributing online learning content from a central hosting environment to an external LMS.

With a traditional SCORM setup, you normally upload the complete SCORM package directly to your LMS:

**Authoring Tool → SCORM Package → LMS**

With a Dispatch setup, the workflow is different:

**Authoring Tool → SCORM Cloud → Dispatch Package → Customer LMS**

The Dispatch package acts as a connection between the destination LMS and the centrally hosted course. When a learner launches the package from the LMS, the learning content is loaded from the hosting environment.

SCORM Cloud Dispatch uses supported delivery methods to distribute content to learning platforms. The original content remains hosted in SCORM Cloud, while results can be reported back to the destination LMS depending on the configuration.

This approach can be particularly useful when one course needs to be delivered to multiple organizations using different LMS platforms.

Organizations planning this type of setup may also benefit from understanding the wider process involved in [LMS implementation and migration](https://www.theeduassist.com/lms-implementation-guide/), including configuration, content organization, testing, and compatibility.

## How Does SCORM Dispatch Work?

The basic SCORM Dispatch process looks like this:

**Course → Central Hosting → Dispatch Package → LMS → Learner**

First, the course is created using an eLearning authoring tool. The course is then uploaded to the hosting platform.

A Dispatch package is generated for the destination LMS. The customer imports that package into their LMS just as they would normally import a SCORM package.

When the learner launches the package, the LMS connects to the hosted course and the content is delivered to the learner.

SCORM Cloud explains that its Dispatch package can be imported into an LMS while the actual content is hosted and delivered through SCORM Cloud.

This creates a separation between **course hosting** and **course access**.

For organizations comparing different LMS technologies, TheEduAssist's guide to [the best learning management systems](https://www.theeduassist.com/best-learning-management-systems/) can also help explain how LMS platforms differ in features and implementation requirements.

## What Is a SCORM Dispatch Package?

A **SCORM Dispatch package** is a package that allows an LMS to access learning content hosted elsewhere.

Unlike a traditional SCORM package, which normally contains the complete course files, a Dispatch package can function as a shell connecting the destination LMS with the centrally hosted content.

SCORM Cloud Dispatch supports different delivery configurations, including SCORM-based Dispatch and LTI-based options. Rustici Software's documentation also covers Dispatch functionality and supported content delivery approaches.

For LTI-based integrations, [1EdTech's LTI standard](https://www.1edtech.org/standards/lti) explains how LMS platforms can integrate remote tools and content using a standardized approach.

This can make content distribution easier for organizations that work with multiple customers or LMS platforms.

## SCORM Dispatch vs. Traditional SCORM

The biggest difference is where the course is hosted.

### Traditional SCORM

A normal SCORM workflow looks like:

**Authoring Tool → SCORM ZIP → LMS**

The LMS receives and hosts the course package.

### SCORM Dispatch

A Dispatch workflow looks like:

**Authoring Tool → Central Hosting → Dispatch Package → LMS**

The LMS receives the Dispatch package, while the original course remains hosted separately.

This can be useful when a training provider wants to maintain one centrally managed version of a course instead of distributing a complete course package every time an update is made.

SCORM Cloud Dispatch allows course providers to manage centrally hosted content and distribute it to LMS destinations.

For organizations modernizing older training materials before moving them into a new LMS, [TheEduAssist's guide to converting legacy training content to modern eLearning](https://www.theeduassist.com/how-to-convert-legacy-training-content-to-modern-elearning/) provides additional guidance.

## What Is SCORM Cloud Dispatch?

**SCORM Cloud Dispatch** is a solution from Rustici Software for delivering eLearning content to third-party LMS platforms while hosting the content in SCORM Cloud.

It is designed for organizations that need to distribute courses to customers or other learning systems while retaining centralized control over content delivery, versions, access, and reporting.

For example, imagine an eLearning company sells the same compliance course to 50 businesses.

Each business may use a different LMS.

Instead of maintaining 50 completely separate copies of the course, the provider can host the content centrally and use Dispatch packages to provide access through the customers' LMS platforms.

This can simplify content distribution and version management.

Rustici Software's current documentation describes Dispatch as a way to host content in SCORM Cloud and deliver it to LMS platforms.

## How to Dispatch a SCORM Course

The exact process depends on the platform you are using, but the general workflow includes the following steps.

### 1. Create Your SCORM Course

Start by creating your eLearning course using a SCORM-compatible authoring tool.

Common authoring tools include Articulate Storyline, Articulate Rise, Adobe Captivate, iSpring, and other eLearning development platforms.

Before distributing the course, test the package for:

- Course navigation
- Completion tracking
- Quiz scores
- Pass/fail status
- Time tracking
- Resume behavior
- LMS compatibility

### 2. Upload the Course to the Hosting Platform

The next step is to upload your course to the platform that will host and deliver the content.

With SCORM Cloud Dispatch, the course can be uploaded to SCORM Cloud and managed from there. Rustici Software's documentation provides current instructions for creating a Dispatch package from content stored in SCORM Cloud.

### 3. Create the Dispatch Package

After uploading and testing the course, create a Dispatch package for the destination LMS.

The package provides the connection between the customer LMS and the hosted learning content.

### 4. Import the Package Into the LMS

The destination organization can then upload the Dispatch package to its LMS.

From the LMS administrator's perspective, this can look similar to importing a normal SCORM package.

### 5. Test the Course

Testing is an important part of the implementation process.

Check:

- Course launch
- Learner access
- Navigation
- Completion
- Quiz results
- Pass/fail status
- Resume functionality
- Reporting
- Course relaunch

The target LMS should be tested before the course is released to a large learner population.

TheEduAssist's [LMS Implementation and Migration Services](https://www.theeduassist.com/lms-implementation-guide/) include LMS configuration, content organization, testing, and SCORM/xAPI compatibility considerations.

## Benefits of SCORM Dispatch

### Centralized Course Management

One of the main benefits of SCORM Dispatch is centralized content management.

Instead of maintaining separate versions of a course for every customer LMS, the provider can manage the source content centrally.

### Easier Course Updates

When a course needs to be updated, the provider can update the centrally hosted version rather than sending a completely new course package to every LMS.

SCORM Cloud Dispatch provides functionality for managing distributed content and Dispatch destinations, including options for controlling access and managing content versions.

### Distribution Across Multiple LMS Platforms

SCORM Dispatch can be useful for organizations that distribute training content to customers using different LMS platforms.

Potential users include:

- eLearning companies
- Course publishers
- Compliance training providers
- Corporate training providers
- Associations
- Franchise networks
- Customer education providers

Organizations managing employee learning can also review [employee training LMS technology](https://www.theeduassist.com/employee-training-lms-technology/) to understand the broader role of LMS platforms in corporate training.

### Greater Control Over Content

Centralized hosting allows content providers to control course access and manage versions from one environment.

SCORM Cloud Dispatch also provides functionality for managing access to distributed content.

### Consolidated Reporting

When content is distributed across multiple LMS environments, understanding how learners use the content can become difficult.

SCORM Cloud provides reporting functionality for tracking learners and course data, while the exact information available through the destination LMS can depend on the implementation.

## SCORM Dispatch and xAPI

SCORM Dispatch is also relevant when organizations want to deliver modern learning content through LMS platforms with limited standards support.

Rustici Software documents SCORM Cloud support for content standards including xAPI and cmi5, while Dispatch provides supported methods for distributing content to LMS environments.

This can be useful when the content standard and the destination LMS do not perfectly match.

For a deeper comparison of the two major standards, read our guide:

**[xAPI vs SCORM: Everything You Need to Know Before Choosing an LMS in 2026](https://www.theeduassist.com/blog/xapi-vs-scorm/)**

That guide explains differences in tracking, data collection, compatibility, reporting, and implementation.

Organizations also exploring AI-enabled LMS integrations can read [Model Context Protocol (MCP) for LMS](https://www.theeduassist.com/model-context-protocol-mcp-for-lms-everything-you-need-to-know/) to understand another emerging area of LMS technology.

## When Should You Use SCORM Dispatch?

SCORM Dispatch may be worth considering when you need to distribute learning content across multiple LMS environments.

It can be relevant when:

- You sell courses to multiple organizations.
- Your customers use different LMS platforms.
- You want to manage course content centrally.
- You frequently update your courses.
- You want to control course access.
- You need reporting across different LMS environments.
- Your content uses standards that the destination LMS may not directly support.

For a company using a single LMS with a straightforward course library, traditional SCORM uploading may be enough.

Dispatch becomes more relevant when **content distribution, centralized management, and multi-LMS delivery** are important parts of the business model.

## Common SCORM Dispatch Challenges

Although Dispatch can simplify distribution, implementation still requires testing.

### LMS Compatibility

Different LMS platforms can handle SCORM and related standards differently.

A package that works correctly in one LMS should still be tested in the destination environment.

### Tracking Issues

Completion, scores, status, and other tracking data may depend on the configuration of both the course and the destination LMS.

### Version Management

Organizations should establish a clear process for updating courses and handling learners who are already enrolled in an older version.

### Reporting Differences

The LMS may receive high-level results while more detailed course activity is available in the central hosting environment, depending on the implementation. SCORM Cloud Dispatch specifically documents this type of distributed content model.

### Technical Configuration

Cross-system content delivery can require careful configuration and testing, particularly when different standards or LMS environments are involved.

For organizations moving older courses to newer systems, careful planning around content formats, LMS compatibility, and testing is important.

## SCORM Dispatch for LMS Implementation

SCORM Dispatch should be considered as part of the wider LMS and eLearning architecture rather than as an isolated feature.

Before implementing it, organizations should evaluate:

- LMS compatibility
- SCORM version
- xAPI or cmi5 requirements
- Reporting requirements
- Course hosting
- Content updates
- Learner access
- Data and privacy requirements
- Technical support

TheEduAssist helps organizations plan LMS requirements, organize courses, configure platforms, prepare content, and test systems before launch. Its LMS implementation service also addresses SCORM and xAPI compatibility and emphasizes testing in the intended LMS environment.

For organizations managing SCORM, xAPI, or LMS migrations, **TheEduAssist LMS Implementation and Migration Services** can help with the technical and operational side of implementation.

## Frequently Asked Questions About SCORM Dispatch

### What is SCORM Dispatch?

SCORM Dispatch is a method of distributing eLearning content to another LMS while keeping the original course hosted and managed separately.

### What is a SCORM Dispatch package?

A SCORM Dispatch package is a package that connects a destination LMS with centrally hosted learning content.

### Is SCORM Dispatch the same as uploading a SCORM course?

No. With a traditional SCORM upload, the complete course package is generally uploaded to the LMS. With Dispatch, the destination LMS can receive a package that connects it to externally hosted content.

### What is SCORM Cloud Dispatch?

SCORM Cloud Dispatch is Rustici Software's solution for delivering centrally hosted eLearning content to third-party LMS platforms.

### Can SCORM Dispatch be used with xAPI?

SCORM Cloud supports content standards including xAPI and cmi5, and its Dispatch documentation describes methods for distributing content to LMS destinations. The exact implementation depends on the destination environment and delivery configuration.

### Is SCORM Dispatch useful for course publishers?

Yes. It can be particularly relevant for course publishers and training providers that need to distribute the same content to multiple organizations and LMS platforms.

### Do you need an LMS for SCORM Dispatch?

The destination learning system needs to support the relevant delivery method. SCORM Cloud Dispatch can use supported SCORM or LTI delivery methods depending on the setup. 1EdTech describes LTI as a standard for connecting LMS platforms with remote tools and content.

## Final Thoughts

**SCORM Dispatch** provides an alternative to distributing complete SCORM course files separately to every LMS.

By keeping learning content centrally hosted and using a Dispatch package to connect with destination LMS platforms, organizations can simplify content distribution, course updates, access management, and reporting.

It can be especially relevant for **eLearning publishers, training companies, compliance providers, and organizations delivering courses across multiple LMS platforms**.

However, successful implementation depends on the target LMS, content standards, tracking requirements, and technical configuration. Testing the complete learner experience before launch is therefore essential.

If your organization is planning an LMS implementation, migration, or SCORM/xAPI setup, **TheEduAssist's LMS Implementation and Migration Services** can help you plan, configure, and test the learning environment.