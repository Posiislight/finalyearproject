# Agent Instructions / Prompts

Given the size of the backend and context window limits, the work has been divided by domain and phase. **Provide the `implementation_plan.md` file to all agents** before giving them their specific prompt, so they understand how their piece fits into the larger puzzle.

---

## 0. Setup Agent (The Architect)
*Must be executed FIRST. Do not start other agents until this is complete, as changing the User model later is very difficult in Django.*

**Prompt:**
> "You are the Setup Agent for our Django backend. Please read the `implementation_plan.md` to understand our architecture. Your task is to establish the foundation of the project.
> 1. Create a new Django app called `users`.
> 2. Define a Custom User model (`AbstractUser`) in `users/models.py`.
> 3. Update `backend_project/settings.py` to use this new `AUTH_USER_MODEL`.
> 4. Install and configure `djangorestframework-simplejwt` for JWT authentication in `settings.py`.
> 5. Set up the base API routing in `backend_project/urls.py` to include a path for `api/v1/` routes.
> 6. Create the initial migrations for the `users` app (`python manage.py makemigrations users`).
> Do NOT build any views, serializers, or other apps outside of this. Stop after completing these setup steps."

---

## 1. Agent A: Core User Auth & Profiles (`users` domain)
*Can begin after Setup Agent is finished.*

**Phase 1 Prompt (Data Layer):**
> "You are Agent A, responsible for the `users` domain data layer. Read `implementation_plan.md` for context. The Custom User model already exists.
> 1. In the `users` app, define `JobSeekerProfile` and `EmployerProfile` models. Let them relate to the Custom User model via OneToOneFields.
> 2. Ensure basic profile fields (bio, location, profile picture URL, role indicators) are present.
> 3. Register these models in `users/admin.py` for easy access.
> 4. Run `makemigrations` to generate the migration files for these profiles."

**Phase 2 Prompt (Logic Layer):**
> "You are Agent A, responsible for the `users` domain logic layer. You previously defined the models.
> 1. Create `users/serializers.py` to serialize the User, JobSeekerProfile, and EmployerProfile.
> 2. Create `users/views.py` using Django REST Framework for: User Registration (Signup), Login (JWT token issuance endpoint overrides), and retrieving/updating the logged-in user's profile.
> 3. Create `users/urls.py` to route these views, and include them in the main `backend_project/urls.py` under the `api/v1/users/` path."

---

## 2. Agent B: Job Seeker Features (`job_seekers` domain)

**Phase 1 Prompt (Data Layer):**
> "You are Agent B, responsible for the `job_seekers` domain data layer. Read `implementation_plan.md` for context.
> 1. Create a new Django app called `job_seekers`.
> 2. Define models in `job_seekers/models.py` for items like `Education`, `Experience`, `Skill`, and `JobApplication`. These should properly relate to the `JobSeekerProfile` from the `users` app or Django's base User model.
> 3. Register these models in `job_seekers/admin.py`.
> 4. Run `makemigrations` and ensure the foreign keys correctly reference the `users` app."

**Phase 2 Prompt (Logic Layer):**
> "You are Agent B, responsible for the `job_seekers` domain logic layer. 
> 1. Create `job_seekers/serializers.py` for the Education, Experience, Skill, and Application models.
> 2. Create `job_seekers/views.py` using DRF ViewSets/APIViews to allow a Job Seeker to CRUD their own education, experience, and skills. Also include an endpoint to view matches/data feeds.
> 3. Create `job_seekers/urls.py` and hook it into the main project urls under `api/v1/job-seekers/`."

---

## 3. Agent C: Employer Job Management (`employers_jobs` domain)

**Phase 1 Prompt (Data Layer):**
> "You are Agent C, responsible for the `employers_jobs` domain data layer. Read `implementation_plan.md` for context.
> 1. Create a new Django app called `employers_jobs`.
> 2. Define models in `employers_jobs/models.py` for `JobPost` (requirements, salary, location, status). This should link to the `EmployerProfile`.
> 3. Register `JobPost` in `employers_jobs/admin.py`.
> 4. Run `makemigrations`."

**Phase 2 Prompt (Logic Layer):**
> "You are Agent C, responsible for the `employers_jobs` domain logic layer.
> 1. Create `employers_jobs/serializers.py` for the `JobPost` model.
> 2. Create `employers_jobs/views.py` with DRF ViewSets allowing an employer to CRUD their job postings, and another endpoint for returning applicants for a specific job post.
> 3. Create `employers_jobs/urls.py` and hook it into the main project urls under `api/v1/employers/jobs/`."

---

## 4. Agent D: Employer Analytics & Company (`employers_company` domain)

**Phase 1 & 2 Prompt:**
*(This domain is smaller, so it can be combined into one prompt)*
> "You are Agent D, responsible for the `employers_company` domain. Read `implementation_plan.md` for context.
> 1. Create a new Django app called `employers_company`.
> 2. Define Data Layer: Create models for expanded Company details (galleries, culture) and Analytics metric caching for employers. Run `makemigrations`.
> 3. Define Logic Layer: Create serializers and views for Analytics aggregation (views, clicks, shortlists) and updating the public Company profile.
> 4. Hook up `employers_company/urls.py` into the main project urls under `api/v1/employers/company/`."

---

## 5. Agent E: Auxiliary Services (`messaging` domain)

**Phase 1 & 2 Prompt:**
> "You are Agent E, responsible for the `messaging` domain. Read `implementation_plan.md` for context.
> 1. Create a new Django app called `messaging`.
> 2. Define Data Layer: Create `Thread` and `Message` models to track conversations between Job Seekers and Employers. Run `makemigrations`.
> 3. Define Logic Layer: Create serializers and REST endpoints for fetching active chat threads and sending messages to a thread. 
> 4. Hook up `messaging/urls.py` into the main project urls under `api/v1/messaging/`. Note: We are sticking to basic REST polling for MVP, no WebSockets yet."
