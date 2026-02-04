
Thai Stargazer Community App
============================

PROJECT OVERVIEW
----------------
This project is a mini web application designed for stargazing enthusiasts in Thailand,
especially beginners. The app serves as a community platform that centralizes astronomical
news, visible sky events, and tools to identify celestial objects from photos.

The system is designed to be AI-assisted and API-driven, making it suitable for extension
into mobile applications in the future.

TARGET USERS
------------
- Beginner to intermediate stargazers
- Residents of Thailand
- Users interested in astronomy news, meteor showers, eclipses, and star identification

CORE FEATURES
-------------
1. Astronomical Event Calendar (Thailand-specific)
   - Shows visible events such as meteor showers, eclipses, and planetary visibility
   - Timezone: Asia/Bangkok
   - Supports Thai and English languages

2. AI-Powered Astronomy News Collector
   - AI agent scans astronomy-related websites (e.g., NARIT, GISTDA, observatories)
   - Stores only:
     * Headline
     * Source link
     * Date detected
   - No copyrighted article content is stored

3. Astrometry.net Image Identification
   - Users upload night-sky photos
   - Backend sends images to Astrometry.net API
   - Returns celestial coordinates and detected objects

4. User System
   - User authentication
   - Image upload and storage
   - History of astrometry results
   - Social sharing (Instagram, Facebook, LINE)

SYSTEM ARCHITECTURE
-------------------
Frontend (Web / Mobile-first)
    |
Backend REST API
    |
------------------------------------------------
| Auth | Calendar | AI Agent | Astrometry | Media |
------------------------------------------------
    |
Database + Object Storage

SUGGESTED TECH STACK
-------------------
Frontend:
- React or Next.js
- Tailwind CSS

Backend:
- Node.js (Express / Fastify)
- Python microservice for AI agent and Astrometry integration

Database & Storage:
- PostgreSQL (main database)
- Redis (caching calendar & news)
- S3-compatible object storage for images

DATA MODELS (SIMPLIFIED)
-----------------------
User
- id
- email
- password_hash
- display_name
- created_at

AstronomyEvent
- id
- title
- description
- event_type
- start_datetime
- end_datetime
- visibility_region
- source

AstronomyNews
- id
- headline
- source_url
- detected_at
- source_name

AstrometryResult
- id
- user_id
- image_url
- ra
- dec
- objects_detected
- solved_at

UserImage
- id
- user_id
- image_url
- uploaded_at
- astrometry_result_id

API MODULES (HIGH LEVEL)
-----------------------
Authentication:
- POST /auth/register
- POST /auth/login
- GET  /auth/me

Calendar:
- GET /calendar/events?month=YYYY-MM

Astrometry:
- POST /astrometry/submit
- GET  /astrometry/result/{job_id}

Images:
- POST /images/upload
- GET  /images/my

AI AGENT RULES
--------------
- Must not hallucinate astronomical events
- Must store metadata only (no full articles)
- Must keep source URLs for verification

DEVELOPMENT PHASES
------------------
Phase 1 (MVP):
- User authentication
- Event calendar
- AI news headlines
- Astrometry image upload and result
- User image gallery

Phase 2:
- Community features
- Comments
- Event reminders

SUCCESS CRITERIA
----------------
- Users can see upcoming astronomical events in Thailand
- Users can identify stars from uploaded images
- Users can store and share results
- AI agent reliably collects astronomy headlines without violating copyright

LICENSE
-------
This project is for educational and prototype purposes.
