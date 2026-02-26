"""
Seed more diverse jobs into the database.
Run with:  Get-Content seed_more_jobs.py | python manage.py shell
"""
from employers_jobs.models import JobPost

JOBS = [
    # --- More Frontend ---
    {"employer_id": 11, "title": "Angular Frontend Developer", "description": "Build enterprise-grade web applications using Angular 17. You'll architect component libraries, implement complex state management with NgRx, and ensure our apps are accessible and performant.", "requirements": "Angular 15+ experience\nTypeScript and RxJS\nNgRx or similar state management\nUnit testing with Jasmine/Karma\nHTML5, CSS3, SCSS\nFigma to code workflows", "salary": "$80,000 - $110,000", "location": "Remote"},
    {"employer_id": 12, "title": "WordPress Developer", "description": "Maintain and build custom WordPress themes and plugins for our agency's clients. You'll translate designs from Figma into pixel-perfect WordPress sites using PHP, CSS, and JavaScript.", "requirements": "WordPress theme/plugin development\nPHP and MySQL\nHTML, CSS, JavaScript\nFigma or Adobe XD\nSEO best practices\nWooCommerce experience a plus", "salary": "$45,000 - $65,000", "location": "Lagos, Nigeria"},
    {"employer_id": 13, "title": "Frontend Performance Engineer", "description": "Obsess over page speed and user experience. You'll audit our React/Next.js applications, optimize bundle sizes, implement lazy loading strategies, and achieve perfect Lighthouse scores.", "requirements": "React and Next.js experience\nWebpack/Vite optimization\nPerformance profiling tools\nCore Web Vitals expertise\nCDN and caching strategies\nJavaScript, TypeScript", "salary": "$100,000 - $135,000", "location": "London, UK"},
    
    # --- More Backend ---
    {"employer_id": 14, "title": "Django REST Framework Developer", "description": "Build and maintain our Python/Django backend powering a fintech platform. You'll design RESTful APIs, implement payment integrations, and write comprehensive test suites.", "requirements": "Python and Django experience\nDjango REST Framework\nPostgreSQL\nCelery for async tasks\nStripe/Paystack integration\nDocker basics", "salary": "$85,000 - $120,000", "location": "Lagos, Nigeria"},
    {"employer_id": 15, "title": "PHP Laravel Developer", "description": "Join our team building a multi-tenant SaaS platform with Laravel. You'll implement admin dashboards, queued jobs, and integrate with third-party APIs.", "requirements": "PHP 8+ and Laravel 10+\nMySQL or PostgreSQL\nREST API development\nQueue systems (Redis, SQS)\nPHPUnit testing\nGit and CI/CD", "salary": "$60,000 - $85,000", "location": "Abuja, Nigeria"},
    {"employer_id": 11, "title": "Ruby on Rails Developer", "description": "Build features for our e-commerce platform using Ruby on Rails. You'll work on order management, inventory systems, and payment processing.", "requirements": "Ruby on Rails experience\nPostgreSQL\nSidekiq for background jobs\nRSpec testing\nREST API design\nAWS basics", "salary": "$90,000 - $125,000", "location": "Remote"},
    {"employer_id": 12, "title": "C# .NET Backend Developer", "description": "Develop microservices using .NET 8 and C#. You'll build APIs for our healthcare platform, implement HIPAA-compliant data handling, and integrate with HL7/FHIR standards.", "requirements": "C# and .NET 6+\nASP.NET Core Web API\nSQL Server or PostgreSQL\nEntity Framework Core\nAzure experience\nUnit testing with xUnit", "salary": "$95,000 - $130,000", "location": "Berlin, Germany"},

    # --- Data Science / Analytics ---
    {"employer_id": 14, "title": "Business Intelligence Analyst", "description": "Transform raw data into actionable business insights. Build dashboards in Power BI, write SQL queries, and present findings to stakeholders.", "requirements": "SQL proficiency\nPower BI or Tableau\nExcel and data modeling\nStatistical analysis\nPresentation skills\nPython or R a plus", "salary": "$55,000 - $80,000", "location": "Lagos, Nigeria"},
    {"employer_id": 15, "title": "AI/NLP Research Engineer", "description": "Push the boundaries of natural language processing. Fine-tune large language models, build RAG pipelines, and develop custom AI solutions for enterprise clients.", "requirements": "Python and PyTorch\nNLP and transformer architectures\nRAG and vector databases\nLLM fine-tuning experience\nResearch publication experience\nDocker and cloud deployment", "salary": "$130,000 - $180,000", "location": "Remote"},
    {"employer_id": 13, "title": "Computer Vision Engineer", "description": "Develop real-time object detection and image classification systems for our autonomous vehicle platform. You'll work with camera feeds, LiDAR data, and edge deployment.", "requirements": "Python, C++\nOpenCV and PyTorch\nCNNs and object detection (YOLO, SSD)\nEdge deployment (TensorRT, ONNX)\nLinux and embedded systems\nROS experience a plus", "salary": "$120,000 - $165,000", "location": "San Francisco, USA"},

    # --- DevOps / Infrastructure ---
    {"employer_id": 11, "title": "Platform Engineer", "description": "Build the internal developer platform that enables our 50+ engineers to ship faster. You'll create CI/CD pipelines, manage Kubernetes clusters, and build developer tooling.", "requirements": "Kubernetes and Helm\nTerraform\nGitHub Actions or GitLab CI\nAWS or GCP\nPython or Go scripting\nObservability (Datadog, Grafana)", "salary": "$115,000 - $150,000", "location": "Remote"},
    {"employer_id": 14, "title": "Database Administrator", "description": "Manage and optimize our PostgreSQL and MongoDB databases. You'll handle replication, backups, performance tuning, and capacity planning for databases serving 10M+ users.", "requirements": "PostgreSQL administration\nMongoDB experience\nPerformance tuning and query optimization\nBackup and disaster recovery\nReplication and sharding\nSQL expertise", "salary": "$90,000 - $120,000", "location": "Dublin, Ireland"},

    # --- Mobile ---
    {"employer_id": 15, "title": "Flutter Mobile Developer", "description": "Build beautiful cross-platform mobile apps with Flutter and Dart. You'll implement complex UI animations, integrate with REST APIs, and manage app store releases.", "requirements": "Flutter and Dart experience\nREST API integration\niOS and Android publishing\nState management (Riverpod/Bloc)\nFirebase integration\nUI/UX sensibility", "salary": "$75,000 - $105,000", "location": "Lagos, Nigeria"},
    {"employer_id": 12, "title": "Android Developer — Kotlin", "description": "Build native Android applications using Kotlin and Jetpack Compose. You'll work on our food delivery app used by 200K+ users across West Africa.", "requirements": "Kotlin and Android SDK\nJetpack Compose\nRoom Database\nRetrofit and Coroutines\nMVVM architecture\nGoogle Play publishing", "salary": "$70,000 - $100,000", "location": "Accra, Ghana"},

    # --- Design & Creative ---
    {"employer_id": 13, "title": "Product Designer", "description": "Own the end-to-end design process from research to high-fidelity prototypes. You'll work on consumer-facing products used by millions, conducting user interviews and iterating based on data.", "requirements": "Figma expertise\nUser research methodologies\nDesign systems experience\nPrototyping and animation\nData-informed design decisions\nPortfolio with shipped products", "salary": "$80,000 - $115,000", "location": "Remote"},
    {"employer_id": 11, "title": "Motion Graphics Designer", "description": "Create stunning animations and visual content for our marketing and product teams. You'll produce explainer videos, social media content, and in-app micro-animations.", "requirements": "After Effects proficiency\nIllustrator and Photoshop\nLottie animation experience\nVideo editing skills\nMotion design principles\nFigma basics", "salary": "$55,000 - $80,000", "location": "Lagos, Nigeria"},

    # --- Cybersecurity ---
    {"employer_id": 14, "title": "Penetration Tester", "description": "Conduct security assessments and penetration tests for enterprise clients. You'll identify vulnerabilities, write detailed reports, and assist development teams in remediation.", "requirements": "Penetration testing certifications (OSCP, CEH)\nBurp Suite and Metasploit\nWeb application security (OWASP)\nNetwork security fundamentals\nReport writing skills\nPython scripting", "salary": "$95,000 - $135,000", "location": "Remote"},
    {"employer_id": 15, "title": "SOC Analyst", "description": "Monitor our security operations center 24/7. You'll investigate alerts, respond to incidents, and continuously improve our detection capabilities using SIEM tools.", "requirements": "SIEM experience (Splunk, Sentinel)\nIncident response\nThreat hunting basics\nNetwork protocol analysis\nSecurity certifications a plus\nStrong analytical skills", "salary": "$65,000 - $90,000", "location": "London, UK"},

    # --- Project/Engineering Management ---
    {"employer_id": 12, "title": "Engineering Manager", "description": "Lead a team of 8 engineers building our core platform. You'll mentor developers, run sprint ceremonies, manage stakeholder expectations, and ensure technical quality.", "requirements": "5+ years software engineering\n2+ years people management\nAgile/Scrum experience\nTechnical architecture skills\nHiring and team building\nExcellent communication", "salary": "$130,000 - $170,000", "location": "Remote"},
    {"employer_id": 13, "title": "Scrum Master", "description": "Facilitate agile ceremonies and remove blockers for our development teams. You'll coach teams on Scrum practices, track velocity, and drive continuous improvement.", "requirements": "Certified Scrum Master (CSM)\nAgile methodology expertise\nJIRA and Confluence\nConflict resolution skills\nMetrics and reporting\nTechnical background preferred", "salary": "$70,000 - $100,000", "location": "Lagos, Nigeria"},

    # --- Specialized / Emerging ---
    {"employer_id": 11, "title": "Web3 Frontend Developer", "description": "Build decentralized application frontends using React and Web3 libraries. You'll integrate with smart contracts, implement wallet connections, and create token swap interfaces.", "requirements": "React and TypeScript\nWeb3.js or Ethers.js\nMetaMask integration\nSolidity basics\nUI/UX for DeFi products\nFamiliarity with ERC standards", "salary": "$100,000 - $145,000", "location": "Remote"},
    {"employer_id": 14, "title": "Game Developer — Unity", "description": "Develop mobile and WebGL games using Unity and C#. You'll implement gameplay mechanics, optimize performance, and integrate monetization systems.", "requirements": "Unity 3D experience\nC# programming\nGame design principles\n2D and 3D graphics\nPerformance optimization\nApp store publishing", "salary": "$70,000 - $100,000", "location": "Lagos, Nigeria"},
    {"employer_id": 15, "title": "Embedded Systems Engineer", "description": "Program microcontrollers and embedded systems for our IoT product line. You'll work with C/C++, RTOS, sensors, and wireless protocols.", "requirements": "C/C++ for embedded systems\nRTOS (FreeRTOS, Zephyr)\nHardware debugging tools\nI2C, SPI, UART protocols\nBluetooth/WiFi integration\nCircuit schematic reading", "salary": "$85,000 - $120,000", "location": "Berlin, Germany"},
    {"employer_id": 12, "title": "API Integration Specialist", "description": "Connect our platform with hundreds of third-party services. You'll build robust API integrations, handle webhooks, manage OAuth flows, and ensure data consistency.", "requirements": "REST and GraphQL APIs\nOAuth 2.0 and API security\nPython or Node.js\nWebhook handling\nAPI documentation\nError handling and retry patterns", "salary": "$65,000 - $90,000", "location": "Lagos, Nigeria"},

    # --- Entry level / Internship ---
    {"employer_id": 13, "title": "Graduate Software Engineer", "description": "Perfect for recent CS graduates! Join our 6-month rotational program where you'll work across frontend, backend, and DevOps teams with dedicated mentorship.", "requirements": "CS degree or equivalent\nBasic programming (any language)\nWillingness to learn\nProblem-solving aptitude\nTeam collaboration\nPersonal projects or portfolio", "salary": "$35,000 - $50,000", "location": "Lagos, Nigeria"},
    {"employer_id": 11, "title": "Software Engineering Intern", "description": "3-month paid internship working on real production features. You'll be paired with a senior developer and contribute to our React + Django tech stack.", "requirements": "Currently enrolled in CS program\nBasic HTML, CSS, JavaScript\nPython or Java basics\nGit fundamentals\nEager to learn\nAvailable full-time for 3 months", "salary": "$1,500/month", "location": "Lagos, Nigeria"},
    {"employer_id": 14, "title": "Graphic Designer", "description": "Design marketing materials, social media content, and brand assets. You'll work with our content team to create visually compelling graphics that drive engagement.", "requirements": "Adobe Creative Suite\nFigma experience\nBrand identity design\nSocial media asset creation\nTypography and color theory\nPortfolio required", "salary": "$40,000 - $60,000", "location": "Remote"},
    {"employer_id": 15, "title": "Content Marketing Manager", "description": "Lead our content strategy including blog posts, newsletters, case studies, and social media. You'll drive organic traffic, build thought leadership, and collaborate with the sales team.", "requirements": "3+ years content marketing\nSEO and keyword research\nCopywriting excellence\nAnalytics (Google Analytics, Ahrefs)\nB2B SaaS experience preferred\nProject management skills", "salary": "$60,000 - $85,000", "location": "Remote"},
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

print(f"Created {created} new job postings!")
print(f"Total jobs in database: {JobPost.objects.count()}")
