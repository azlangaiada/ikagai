Detailed Prompt

Build a professional branding website using Next.js + Payload CMS + PostgreSQL, based on an existing basic template and existing partial Payload starter data/artifacts. The site should be modelled closely after the new Gaia Digital Agency website style, using:

Reference site: www.gaiada.com
Staging reference: 34.124.244.233/gaiada web

This is not a request for code output. The task is to produce and implement the project with clear structure, CMS modelling, content relationships, frontend rendering, and admin usability. The focus is on system structure, content architecture, CMS data design, page composition, frontend-to-CMS linkage, seed data, and implementation guidance.

1. Project Objective

Create a branding/corporate website with a modern, premium, agency-style design, using:

Frontend: Next.js
CMS: Payload CMS
Database: PostgreSQL

The website must allow non-technical admins to manage website content through Payload CMS, while the frontend renders all content dynamically from the CMS.

The solution should be built on top of the existing basic template and any existing Payload starter artifacts/data already available.

The site should feel like a polished digital agency website, with strong visual hierarchy, modern layout blocks, clean typography, image-led presentation, and structured section-based page design.

2. Core Principle

The CMS structure and the website structure must match.

That means:

Every editable section on the frontend should map clearly to a Payload collection or global
Field naming must be clear and admin-friendly
Admin users must be able to see:
database ID
field names
structured entries
Seed migration must include 5 sample data rows/items for each relevant CMS-managed area, where appropriate
3. CMS Requirements (Payload CMS)

Design the Payload CMS so the admin can manage the following areas.

3.1 General Settings

Create a General Settings global or equivalent CMS-managed configuration area containing:

A. Social Media Links

Manage social links for:

Facebook
Instagram
LinkedIn
TikTok
YouTube

Each social media item should support:

platform name
placeholder text
URL/link
image/icon

Admin should be able to edit each independently.

B. WhatsApp Number

A global field for the site-wide WhatsApp number, used by visible CTA buttons across the site.

C. Contact Email

A global field for the primary contact email used across the website.

3.2 Admin Login

Support admin users who can log into Payload CMS.

Fields:

email
password

Keep this simple but production-appropriate.

3.3 CMS Content Areas / Collections

The CMS should manage the following content areas.

Page 1 – Home

Manage the homepage as structured sections:

Hero Section
1 image
Introduction
text/content
1 image
Feature
text/content
1 image
Writing
text/content
1 image

This should be editable in CMS with clear section grouping.

Page 2 – Services

Manage services content.

Each service item should support:

image
title
paragraph/description

There should be 9 services.

Page 3 – Portfolio

Portfolio entries should support:

image
title
paragraph

The frontend currently requires 2 visible sections, but CMS should be flexible enough to manage multiple portfolio items.

Page 4 – About

About page entries should support:

image
title
paragraph

The frontend currently has 2 sections.

Page 5 – Blog

Blog entries should support:

title
article/body
image

Should be manageable as repeatable blog content, not hardcoded.

Page 6 – Team / Career / Departments

This area should support department-based team/career structure.

Base data should support:

department
name
role
image

Because the frontend also mentions career/job inquiry behavior, structure this area carefully so it can support both:

team presentation by department
department-based inquiry/application forms
Page 7 – Contact

Contact submissions should support:

name
message
email

This can be treated as a submissions collection if needed.

4. Seed Migration Requirements

Create seed migration/sample content with 5 sample entries/items for each relevant CMS-managed area.

This applies especially to repeatable content such as:

services
portfolio items
about items
blog items
team/department items
contact form submissions where appropriate
social links or general items as applicable

For single-instance page sections, seed them with realistic placeholder/sample data.

Important:

Seed data should look coherent and agency-appropriate
Use realistic titles, descriptions, and placeholders
Images can be placeholders, but structure must be correct
5. Frontend / Webpage Requirements

Build the frontend using Next.js, with all page content connected to Payload CMS.

The website should have 8 pages total, even though some earlier notes refer to 6 pages. Follow the structure below as the final required page set.

Each page should follow a clear, modular, section-based design.

Global UI Elements on Every Page
A. WhatsApp CTA Button

A visible Call To Action WhatsApp button should appear on every page.

Uses the WhatsApp number from CMS general settings
B. Back To Top Button

A visible back-to-top button on every page.

C. Footer

Footer should contain:

Visitor Count
Copyright @2026
Developed by Gaia Digital Agency
Visitor Location
Current Local Time
Social media links:
YouTube
Instagram
TikTok
and other configured social links if desired

Note: footer content should pull from CMS where relevant.

6. Frontend Page-by-Page Requirements
Page 1 – Homepage

Homepage should contain 4 main sections:

Hero Section
1 image
Introduction
text/content
1 image
Feature
text/content
1 image
Writing
text/content
1 image

This page should feel premium and image-led, similar in mood and visual quality to the Gaia Digital Agency reference.

Page 2 – Services

Services page should contain 9 service sections/cards/items:

Branding
Design
Marketing
Ad & SEO
Website
Social Media
Content Creation
Consultation
Placeholder

Each service should support:

image
title
paragraph

Additionally, for the Consultation area, include a form with:

name
message
email
hCaptcha

This should be clearly separated from service display if needed, but visually consistent.

Page 3 – Portfolio

Portfolio page should contain 2 sections/items visible on the page:

Section 1
image
title
paragraph
Section 2
image
title
paragraph

CMS should still be designed flexibly enough for future expansion.

Page 4 – About

About page should contain 2 sections:

Section A
image
title
paragraph
Section B
image
title
paragraph
Page 5 – Blog

Blog page should display:

title
image
article

This page should render CMS-managed blog content cleanly.

Page 6 – Career

Career page should contain 2 main sections and support 9 departments.

For each department, support an inquiry/application form with:

name
email
PDF resume upload
message

This should be implemented cleanly and professionally. The CMS structure should support department listings and the frontend should allow users to apply or inquire by department.

Page 7 – Contact Us

Contact page should contain a consultation/contact form:

name
message
email

Can be simple, clean, and conversion-oriented.

Page 8 – Placeholder

Create a placeholder page for future expansion.
This page should still follow the site design system and not appear broken or incomplete.

7. Important Reconciliation of First Part and Second Part

There are overlaps and some inconsistencies between the CMS notes and webpage notes. Resolve them intelligently as follows:

The CMS and frontend must align
The frontend page structure is the main output requirement
The CMS should be designed flexibly enough to support those pages cleanly
Where “Team” and “Career” overlap, structure the CMS so it can support department-based content and career/application use cases without confusion
Keep naming clean, structured, and scalable

Do not create a messy one-off schema. Build a content model that is logical and maintainable.

8. CMS Modelling Expectations

The Payload content model should be designed with good content architecture principles.

Prefer a logical split such as:

globals for site-wide settings
collections for repeatable content
structured groups/arrays/blocks for page sections where appropriate

Admin experience should be clean and intuitive.

For each area, ensure:

readable labels
clear field names
visible IDs
image support where required
future extensibility
9. UX / Design Direction

The website should look like a premium digital branding agency website.

Expected qualities:

modern layout
clean spacing
section-based design
strong image usage
professional visual hierarchy
mobile responsive
clean footer and CTA behavior
polished hover states and transitions where appropriate
premium corporate-agency feel, modelled after Gaia Digital Agency’s new website style

Do not make it generic or overly plain.

10. Functional Expectations

The solution should include and account for:

CMS-managed content rendering
form handling for:
consultation
contact
career applications
PDF resume upload for career form
hCaptcha on consultation form
social links from CMS
WhatsApp CTA from CMS
footer visitor-related outputs
section-based page rendering
PostgreSQL-backed Payload setup
built from existing base template and existing starter Payload artifacts/data
11. Technical and Structural Guidance

This is not asking for raw code output only. The implementation should be guided by proper architectural thinking.

Important:

build from the existing base index.html / template foundation where applicable
use the current Payload starter artifacts/data as the starting point, not from zero unless necessary
connect PostgreSQL properly
keep structure production-oriented
keep content model future-proof
avoid hardcoding content that should live in CMS
prioritize maintainability and admin usability
12. Deliverable Expectations

The final result should reflect:

A clear CMS architecture in Payload
Proper PostgreSQL-backed content storage
Seed migration/sample content
Next.js frontend pages connected to CMS
Matching frontend and backend content structure
Good admin experience
Premium branding-agency design quality
Clean forms and interaction flows
Logical handling of global settings and repeatable content