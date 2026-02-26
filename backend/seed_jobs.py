"""
Seed the database with realistic job postings across various tech roles.
Run with:  python manage.py shell < seed_jobs.py
"""
from employers_jobs.models import JobPost
from users.models import User, EmployerProfile

# Map employer IDs to company names
employers = {
    11: "TechFlow Systems",
    12: "NexGen Labs",
    13: "CloudBase Inc.",
    14: "DataPulse Analytics",
    15: "GreenLeaf Digital",
}

# Update employer profiles with real company names
for uid, name in employers.items():
    try:
        user = User.objects.get(id=uid)
        profile, _ = EmployerProfile.objects.get_or_create(user=user)
        profile.company_name = name
        profile.save()
        user.first_name = name.split()[0]
        user.last_name = name.split()[-1]
        user.save()
    except User.DoesNotExist:
        pass

JOBS = [
    # --- Frontend / Full-Stack ---
    {
        "employer_id": 11,
        "title": "Senior React Developer",
        "description": "We are looking for a Senior React Developer to join our growing frontend team. You will build and maintain high-performance web applications using React, TypeScript, and modern tooling. Work closely with designers to deliver pixel-perfect UIs and collaborate with backend engineers on API integrations.",
        "requirements": "3+ years of React experience\nStrong TypeScript skills\nExperience with Redux or Zustand\nFamiliarity with REST and GraphQL APIs\nExperience with CI/CD pipelines\nStrong CSS skills (Tailwind or styled-components)",
        "salary": "$95,000 - $130,000",
        "location": "Remote",
    },
    {
        "employer_id": 12,
        "title": "Full Stack JavaScript Developer",
        "description": "Join our product team to build end-to-end features using Node.js and React. You will own entire features from database schema to frontend UI. We value clean code, test coverage, and shipping fast.",
        "requirements": "Experience with Node.js and Express\nReact or Next.js proficiency\nPostgreSQL or MongoDB knowledge\nGit and version control best practices\nUnit and integration testing experience",
        "salary": "$80,000 - $110,000",
        "location": "Lagos, Nigeria",
    },
    {
        "employer_id": 13,
        "title": "Frontend Engineer — Vue.js",
        "description": "Our design-driven team is hiring a Frontend Engineer specializing in Vue.js. You'll create beautiful, responsive interfaces for our SaaS platform used by thousands of SMBs. We care deeply about accessibility and performance.",
        "requirements": "2+ years with Vue.js (Vue 3 preferred)\nHTML5, CSS3, JavaScript ES6+\nExperience with Vuex or Pinia\nResponsive design and mobile-first development\nFamiliarity with Figma or Sketch",
        "salary": "$70,000 - $95,000",
        "location": "London, UK",
    },
    # --- Backend ---
    {
        "employer_id": 14,
        "title": "Python Backend Engineer",
        "description": "We need a strong Python backend engineer to design and build scalable microservices. You'll work on our data pipeline infrastructure serving millions of events per day. Django and FastAPI experience is a major plus.",
        "requirements": "Strong Python fundamentals\nDjango or FastAPI experience\nPostgreSQL and Redis\nDocker and Kubernetes basics\nREST API design best practices\nExperience with message queues (RabbitMQ, Kafka)",
        "salary": "$100,000 - $140,000",
        "location": "Remote",
    },
    {
        "employer_id": 15,
        "title": "Java Spring Boot Developer",
        "description": "Join our enterprise platform team building scalable microservices with Java and Spring Boot. You will design APIs consumed by mobile and web clients, optimize database queries, and ensure 99.9% uptime.",
        "requirements": "3+ years Java development\nSpring Boot and Spring Security\nMySQL or PostgreSQL\nRESTful API design\nUnit testing with JUnit\nBasic AWS or Azure knowledge",
        "salary": "$90,000 - $125,000",
        "location": "Abuja, Nigeria",
    },
    {
        "employer_id": 11,
        "title": "Go (Golang) Systems Engineer",
        "description": "Build high-performance backend services in Go for our real-time communication platform. You'll work on WebSocket servers, message routing, and event-driven architectures handling 100K+ concurrent connections.",
        "requirements": "Go programming experience\nSystems-level thinking\nExperience with gRPC or WebSockets\nLinux and networking fundamentals\nDocker and container orchestration",
        "salary": "$110,000 - $150,000",
        "location": "San Francisco, USA",
    },
    # --- Data & AI/ML ---
    {
        "employer_id": 14,
        "title": "Machine Learning Engineer",
        "description": "Design, train, and deploy ML models at scale. You'll work on recommendation engines, NLP pipelines, and computer vision models. Collaborate with data scientists to move models from research to production.",
        "requirements": "Python and PyTorch or TensorFlow\nExperience deploying ML models to production\nFamiliarity with MLOps (MLflow, Kubeflow)\nStrong mathematics and statistics background\nExperience with NLP or computer vision\nSQL and data pipeline experience",
        "salary": "$120,000 - $170,000",
        "location": "Remote",
    },
    {
        "employer_id": 12,
        "title": "Data Analyst",
        "description": "Help us make data-driven decisions by analyzing product metrics, building dashboards, and uncovering insights. You'll work directly with the CEO and product leads to shape our roadmap based on usage patterns.",
        "requirements": "SQL proficiency (complex queries, window functions)\nPython or R for analysis\nExperience with Tableau, Looker, or Power BI\nStatistical analysis fundamentals\nExcel/Google Sheets advanced usage\nStrong communication skills",
        "salary": "$60,000 - $85,000",
        "location": "Lagos, Nigeria",
    },
    {
        "employer_id": 15,
        "title": "Data Engineer",
        "description": "Build and maintain our data warehouse and ETL pipelines. You'll ensure data quality, design schemas, and make terabytes of data queryable for our analytics and ML teams.",
        "requirements": "Python and SQL expertise\nExperience with Airflow or dbt\nAWS (S3, Redshift, Glue) or GCP (BigQuery)\nData modeling and warehousing concepts\nSpark or similar distributed computing",
        "salary": "$95,000 - $130,000",
        "location": "Berlin, Germany",
    },
    # --- DevOps / Cloud ---
    {
        "employer_id": 13,
        "title": "DevOps Engineer",
        "description": "Own our cloud infrastructure and CI/CD pipelines. You'll manage Kubernetes clusters, automate deployments, monitor production systems, and improve developer experience across the engineering org.",
        "requirements": "AWS or GCP hands-on experience\nKubernetes and Docker\nTerraform or Pulumi for IaC\nCI/CD (GitHub Actions, Jenkins, or GitLab CI)\nMonitoring (Prometheus, Grafana, Datadog)\nLinux administration",
        "salary": "$100,000 - $140,000",
        "location": "Remote",
    },
    {
        "employer_id": 11,
        "title": "Cloud Security Engineer",
        "description": "Protect our cloud-native applications and infrastructure. You'll design security architectures, conduct penetration tests, implement zero-trust networking, and lead incident response efforts.",
        "requirements": "Cloud security (AWS/GCP/Azure)\nIAM, VPC, and network security\nOWASP Top 10 knowledge\nPenetration testing experience\nSOC 2 or ISO 27001 familiarity\nScripting (Python, Bash)",
        "salary": "$115,000 - $155,000",
        "location": "New York, USA",
    },
    # --- Mobile ---
    {
        "employer_id": 12,
        "title": "React Native Mobile Developer",
        "description": "Build our cross-platform mobile app used by 50K+ users. You will implement new features, optimize performance, manage app store releases, and integrate with native device APIs.",
        "requirements": "React Native experience (2+ years)\nJavaScript/TypeScript proficiency\niOS and Android platform knowledge\nREST API integration\nApp Store and Play Store publishing\nExperience with push notifications",
        "salary": "$85,000 - $115,000",
        "location": "Lagos, Nigeria",
    },
    {
        "employer_id": 14,
        "title": "iOS Developer — Swift",
        "description": "We're looking for an iOS developer to build a best-in-class native app. You'll work with SwiftUI and UIKit, integrate Core Data, and deliver smooth 60fps animations.",
        "requirements": "Swift and SwiftUI proficiency\nUIKit experience\nCore Data or Realm\nRESTful API consumption\nXcode and Instruments proficiency\nApp Store submission experience",
        "salary": "$90,000 - $130,000",
        "location": "London, UK",
    },
    # --- Design / UX ---
    {
        "employer_id": 15,
        "title": "UI/UX Designer",
        "description": "Create intuitive and beautiful user experiences for our web and mobile products. You'll conduct user research, build wireframes and prototypes, and collaborate closely with engineers to bring designs to life.",
        "requirements": "Figma expertise\nUser research and usability testing\nDesign system creation and maintenance\nResponsive and mobile design\nBasic HTML/CSS understanding\nPortfolio showcasing shipped products",
        "salary": "$65,000 - $90,000",
        "location": "Remote",
    },
    # --- Product / Management ---
    {
        "employer_id": 13,
        "title": "Technical Product Manager",
        "description": "Drive the product roadmap for our developer tools platform. You'll translate customer needs into technical requirements, prioritize the backlog, and work hands-on with engineering teams to ship features on time.",
        "requirements": "3+ years product management experience\nTechnical background (CS degree or engineering experience)\nAgile/Scrum methodology\nData-driven decision making\nExcellent stakeholder communication\nExperience with B2B SaaS products",
        "salary": "$105,000 - $145,000",
        "location": "Remote",
    },
    # --- More varied roles ---
    {
        "employer_id": 11,
        "title": "QA Automation Engineer",
        "description": "Build and maintain our automated test suite. You'll write end-to-end tests, API tests, and performance tests to ensure quality at every release. Work with Cypress, Playwright, and Jest.",
        "requirements": "Experience with Cypress or Playwright\nJavaScript/TypeScript testing frameworks\nAPI testing (Postman, RestAssured)\nCI/CD integration for automated tests\nPerformance testing basics\nAgile development experience",
        "salary": "$75,000 - $100,000",
        "location": "Lagos, Nigeria",
    },
    {
        "employer_id": 14,
        "title": "Blockchain Developer",
        "description": "Build decentralized applications and smart contracts on Ethereum and Solana. You'll work on DeFi protocols, implement token standards, and audit smart contracts for security vulnerabilities.",
        "requirements": "Solidity development experience\nWeb3.js or Ethers.js\nSmart contract security auditing\nRust (for Solana) is a plus\nDeFi protocol understanding\nJavaScript/TypeScript",
        "salary": "$100,000 - $160,000",
        "location": "Remote",
    },
    {
        "employer_id": 12,
        "title": "Technical Writer",
        "description": "Create clear, comprehensive documentation for our APIs, SDKs, and developer tools. You'll write tutorials, API references, and onboarding guides that help developers integrate our products quickly.",
        "requirements": "Technical writing experience (2+ years)\nAbility to understand and document APIs\nMarkdown and docs-as-code tools\nExperience with developer documentation\nBasic programming knowledge\nExcellent written English",
        "salary": "$55,000 - $75,000",
        "location": "Remote",
    },
    {
        "employer_id": 15,
        "title": "Site Reliability Engineer (SRE)",
        "description": "Keep our platform running at 99.99% uptime. You'll build observability tooling, automate incident response, optimize infrastructure costs, and conduct blameless post-mortems.",
        "requirements": "Production operations experience\nKubernetes and Docker\nPrometheus, Grafana, PagerDuty\nPython or Go scripting\nIncident management experience\nSLA/SLO/SLI understanding",
        "salary": "$110,000 - $145,000",
        "location": "Dublin, Ireland",
    },
    {
        "employer_id": 13,
        "title": "Junior Web Developer",
        "description": "Perfect for recent graduates! Join our team to learn and grow as a web developer. You'll work on real projects with mentorship from senior engineers, building features in HTML, CSS, JavaScript, and React.",
        "requirements": "Basic HTML, CSS, and JavaScript\nWillingness to learn React\nFamiliarity with Git\nProblem-solving mindset\nPortfolio or personal projects\nGood communication skills",
        "salary": "$40,000 - $55,000",
        "location": "Lagos, Nigeria",
    },
]

created = 0
for job_data in JOBS:
    JobPost.objects.create(
        employer_id=job_data["employer_id"],
        title=job_data["title"],
        description=job_data["description"],
        requirements=job_data["requirements"],
        salary=job_data["salary"],
        location=job_data["location"],
        status=JobPost.STATUS_OPEN,
    )
    created += 1

print(f"\n✅ Created {created} new job postings!")
print(f"Total jobs in database: {JobPost.objects.count()}")
