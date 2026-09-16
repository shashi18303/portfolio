import { Project, ExperienceItem, EducationItem, CertificationItem, Skill } from '../types';

export const PERSONAL_INFO = {
  name: 'Shashikumar Naik',
  title: 'Java Developer & Backend Engineer',
  tagline: 'Building scalable backend systems with Spring Boot, PostgreSQL, and high-performance REST APIs.',
  email: 'shashikumarnaik101@gmail.com',
  phone: '+91 9019809226',
  location: 'Bengaluru, India',
  hometown: 'Belagavi, Karnataka, India',
  linkedin: 'https://linkedin.com/in/shashi2155b0325',
  linkedinDisplay: 'linkedin.com/in/shashi2155b0325',
  github: 'https://github.com/shashi18303',
  githubDisplay: 'github.com/shashi18303',
  cgpa: '7.7 / 10',
  availability: 'Open to Opportunities (Full-Time SDE & Backend Roles)',
  summary: `Computer Science graduate from Belagavi with hands-on enterprise experience as a Java Developer Intern at VStand4u Solutions in Bangalore. Skilled in Core Java, Spring Boot, Hibernate, RESTful APIs, PostgreSQL, and MySQL query optimization. Passionate about clean architecture, scalable background job schedulers, and efficient in-memory data structures.`
};

export const QUICK_METRICS = [
  { label: 'Academic Standing', value: '7.7 CGPA', detail: 'B.E. Computer Science 2025' },
  { label: 'Core Language', value: 'Java 21 / 8', detail: 'Core Java, Streams, Concurrency' },
  { label: 'Framework', value: 'Spring Boot', detail: 'Hibernate, JPA, REST APIs' },
  { label: 'Databases', value: 'PostgreSQL & MySQL', detail: 'Schema Design & Optimization' },
  { label: 'Industry Internship', value: 'VStand4u Solutions', detail: 'Production Backend Modules' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: 'Java Intern',
    company: 'Vstand4U Technologies Private Limited',
    period: '07/2025 – 02/2026',
    location: 'Bengaluru, India',
    description: 'Developed and shipped production-grade Java and Spring Boot microservice modules in a live enterprise setting, focusing on secure client-server communication, database query efficiency, and team defect resolution.',
    achievements: [
      'Developed and shipped Java/Spring Boot backend modules within a live microservices architecture, participating in end-to-end design, implementation, code review, and production deployment.',
      'Built RESTful APIs for client-server communication and applied secure coding practices including rigorous input validation, parameterized queries, and authentication checks.',
      'Optimized MySQL queries using raw JDBC batching and indexing strategies to significantly improve backend response latency.',
      'Collaborated with cross-functional engineering teams through Agile/Scrum, including sprint planning, daily standups, and backlog grooming.',
      'Diagnosed and resolved production defects using structured exception handling and comprehensive JUnit test coverage, communicating root-cause analysis (RCA) findings to senior engineers.',
      'Contributed to technical design documentation and actively participated in peer code reviews following clean architecture principles.'
    ],
    skillsUsed: [
      'Java',
      'Spring Boot',
      'Microservices',
      'REST APIs',
      'MySQL',
      'JDBC',
      'JUnit',
      'Agile/Scrum',
      'Code Review',
      'Secure Coding'
    ],
    metrics: [
      { label: 'Tenure', value: '8 Months' },
      { label: 'Deployment', value: 'Production Microservices' },
      { label: 'Methodology', value: 'Agile/Scrum' }
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'distributed-scheduler',
    title: 'Distributed Job Scheduler with Leader Election',
    tagline: 'Fault-tolerant background task execution engine with PostgreSQL advisory lock coordination and heartbeat failover.',
    period: 'Java 21, Spring Boot, Distributed Systems',
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Distributed Systems', 'Concurrency', 'Docker', 'JUnit'],
    techStack: [
      'Java 21',
      'Spring Boot',
      'Spring Data JPA',
      'PostgreSQL',
      'Multithreading',
      'Concurrency',
      'Docker',
      'Maven',
      'Git',
      'JUnit'
    ],
    overview: 'A robust, high-availability distributed job scheduling system that orchestrates recurring and queued background tasks across multiple concurrent application instances without duplicate execution or split-brain scenarios.',
    bulletPoints: [
      'Developed a distributed job scheduler using Java 21 and Spring Boot to execute background tasks reliably across multiple application instances.',
      'Implemented database-backed leader election using PostgreSQL row locking and heartbeat timestamps to ensure exactly one application node executes scheduled jobs at any given time.',
      'Engineered heartbeat-based failover mechanism, allowing follower nodes to detect leader heartbeat expiration and seamlessly assume cluster leadership with zero manual intervention.',
      'Developed REST APIs backed by PostgreSQL to dynamically submit, pause, inspect, and monitor job execution statuses and execution history.',
      'Containerized the multi-node application using Docker and established comprehensive test coverage using JUnit 5 integration tests.'
    ],
    architectureSummary: 'Uses database-backed distributed coordination avoiding heavyweight external consensus clusters (like ZooKeeper/etcd) for microservice environments with existing relational databases.',
    architectureSteps: [
      {
        step: '1. Node Registration & Heartbeat Loop',
        detail: 'On startup, each node registers in the cluster table with a unique UUID, spinning up a scheduled daemon thread pulsing heartbeats every 3000ms.'
      },
      {
        step: '2. Leader Election via Atomic PostgreSQL Lock',
        detail: 'Nodes attempt to acquire or renew the active leadership lease using transactional PostgreSQL row updates with lease expiration thresholds (e.g. lease_duration = 10s).'
      },
      {
        step: '3. Task Partitioning & Execution',
        detail: 'The elected leader fetches due jobs from the job repository, assigns them to an internal thread pool executor, and logs execution telemetry.'
      },
      {
        step: '4. Automatic Failover Recovery',
        detail: 'If the leader crashes or network partitions occur, follower nodes observe stale heartbeat timestamps (now() - last_heartbeat > 10s) and atomically contest for the leader role.'
      }
    ],
    keyDecisions: [
      {
        decision: 'PostgreSQL-backed Lease Locking instead of ZooKeeper',
        why: 'Drastically reduces infrastructure operational complexity while leveraging ACID transactional guarantees already present in standard enterprise stacks.',
        alternative: 'Apache ZooKeeper / HashiCorp Consul'
      },
      {
        decision: 'ScheduledExecutorService with Virtual Threads (Java 21)',
        why: 'Enables high-concurrency non-blocking task execution with lightweight system overhead.',
        alternative: 'Heavy fixed OS thread pools'
      }
    ],
    codeSnippet: {
      language: 'java',
      filename: 'LeaderElectionService.java',
      code: `@Service
public class LeaderElectionService {
    private final String nodeId = UUID.randomUUID().toString();
    private final ClusterLockRepository lockRepo;
    private final AtomicBoolean isLeader = new AtomicBoolean(false);

    @Scheduled(fixedRate = 3000)
    public void tryAcquireOrRenewLeadership() {
        Instant now = Instant.now();
        Instant leaseThreshold = now.minusSeconds(10);

        // Atomic DB query: update lock if empty, or expired, or already owned by this nodeId
        int updated = lockRepo.acquireOrRenewLease(nodeId, now, leaseThreshold);
        boolean currentLeadership = updated > 0;

        if (currentLeadership && !isLeader.get()) {
            log.info("Node [{}] successfully assumed cluster leadership!", nodeId);
            isLeader.set(true);
            triggerJobExecutionEngine();
        } else if (!currentLeadership && isLeader.get()) {
            log.warn("Node [{}] lost cluster leadership lease.", nodeId);
            isLeader.set(false);
        }
    }
}`,
      explanation: 'Heartbeat and leader lease renewal algorithm ensuring single-master job execution with automatic failover.'
    },
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/v1/cluster/status',
        description: 'Get cluster nodes, current leader nodeId, and heartbeat status.',
        sampleResponse: '{"currentLeader": "node-us-east-1a", "nodesOnline": 3, "heartbeatIntervalMs": 3000}'
      },
      {
        method: 'POST',
        path: '/api/v1/jobs',
        description: 'Submit a new scheduled job definition with cron schedule and payload.',
        sampleResponse: '{"jobId": "job-742", "status": "SCHEDULED", "nextRunTime": "2026-09-16T12:00:00Z"}'
      },
      {
        method: 'GET',
        path: '/api/v1/jobs/executions',
        description: 'Retrieve paginated history of executed background tasks and latencies.',
        sampleResponse: '{"total": 128, "successRate": "99.8%", "executions": [{"jobId": "job-742", "durationMs": 342, "status": "SUCCESS"}]}'
      }
    ]
  },
  {
    id: 'lru-cache',
    title: 'In-Memory Key-Value Store with LRU Eviction',
    tagline: 'High-speed concurrent in-memory caching engine featuring O(1) operations, Doubly Linked List reordering, and REST telemetry.',
    period: 'Java, Spring Boot, Data Structures & Concurrency',
    tags: ['Java', 'Spring Boot', 'Data Structures', 'LRU Cache', 'Concurrency', 'REST APIs', 'Docker'],
    techStack: [
      'Java',
      'Spring Boot',
      'HashMap',
      'Doubly Linked List',
      'ReadWriteLock',
      'REST APIs',
      'Docker',
      'Maven'
    ],
    overview: 'A custom, low-latency in-memory key-value storage engine engineered from first principles using a custom Doubly Linked List and Hash Map to guarantee strict O(1) time complexity for GET, PUT, and DELETE operations with thread-safe concurrency.',
    bulletPoints: [
      'Developed an in-memory key-value store supporting strict O(1) GET, PUT, and DELETE operations combining a hash map lookup with a doubly linked list ordering.',
      'Implemented custom Least-Recently-Used (LRU) eviction algorithm that automatically discards the least accessed item upon hitting memory capacity limits.',
      'Engineered thread-safe concurrency safeguards using ReentrantReadWriteLock to support concurrent parallel reads without locking out readers while serializing write operations.',
      'Exposed cache operations via clean Spring REST APIs with full telemetry metrics (cache hits, misses, evictions, and memory utilization).',
      'Packaged and containerized the standalone application with multi-stage Docker builds for rapid deployment.'
    ],
    architectureSummary: 'Combines Hash Map pointer lookup with Doubly Linked List head/tail node manipulation to deliver deterministic O(1) time complexity.',
    architectureSteps: [
      {
        step: '1. Hash Map & Doubly Linked List Fusion',
        detail: 'The HashMap stores keys mapped directly to Node pointers in the Doubly Linked List, enabling immediate O(1) location without traversing nodes.'
      },
      {
        step: '2. Promotion on Access (Most Recently Used)',
        detail: 'When GET or PUT is invoked on an existing key, the node is spliced out of its current position and moved to the Head (MRU).'
      },
      {
        step: '3. Eviction on Capacity (Least Recently Used)',
        detail: 'When PUT exceeds maximum capacity, the node directly before the Dummy Tail is evicted in O(1) time and purged from the HashMap.'
      },
      {
        step: '4. Read/Write Concurrency Separation',
        detail: 'Utilizes ReentrantReadWriteLock: allows simultaneous concurrent GET operations while ensuring mutual exclusion during node mutation and eviction.'
      }
    ],
    keyDecisions: [
      {
        decision: 'Custom Doubly Linked List over Java LinkedHashMap',
        why: 'Provides granular control over node memory footprints, exact eviction hook callbacks, and metrics instrumentation without framework overhead.',
        alternative: 'java.util.LinkedHashMap'
      },
      {
        decision: 'ReentrantReadWriteLock over synchronized methods',
        why: 'In typical cache workloads with 90%+ read ratios, read locks prevent thread contention and maximize multicore CPU utilization.',
        alternative: 'synchronized block on entire cache'
      }
    ],
    codeSnippet: {
      language: 'java',
      filename: 'LruCacheEngine.java',
      code: `public class LruCacheEngine<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> map = new ConcurrentHashMap<>();
    private final Node<K, V> head = new Node<>(null, null); // Dummy head
    private final Node<K, V> tail = new Node<>(null, null); // Dummy tail
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.writeLock().lock(); // Promotes node to head on read
        try {
            Node<K, V> node = map.get(key);
            if (node == null) return null;
            moveToHead(node);
            return node.value;
        } finally {
            lock.writeLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            Node<K, V> node = map.get(key);
            if (node != null) {
                node.value = value;
                moveToHead(node);
            } else {
                if (map.size() >= capacity) {
                    Node<K, V> lru = removeTail();
                    map.remove(lru.key);
                }
                Node<K, V> newNode = new Node<>(key, value);
                map.put(key, newNode);
                addToHead(newNode);
            }
        } finally {
            lock.writeLock().unlock();
        }
    }
}`,
      explanation: 'Core LRU algorithm maintaining dummy head/tail pointers and thread-safe node splicing.'
    },
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/v1/cache/{key}',
        description: 'Fetch cached item in O(1) time and promote key to MRU.',
        sampleResponse: '{"key": "session_891", "value": "userDataPayload", "status": "HIT"}'
      },
      {
        method: 'POST',
        path: '/api/v1/cache',
        description: 'Insert or update key-value pair, evicting LRU if at capacity.',
        sampleResponse: '{"key": "session_891", "evictedKey": null, "cacheSize": 4}'
      },
      {
        method: 'GET',
        path: '/api/v1/cache/metrics',
        description: 'Retrieve real-time cache telemetry: hit count, miss count, hit ratio, eviction count.',
        sampleResponse: '{"hits": 4512, "misses": 312, "hitRatio": "93.5%", "evictions": 89}'
      }
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  // Languages
  { name: 'Java (Core, 17, 21)', category: 'Languages', level: 'Advanced', highlight: 'OOP, Streams, Collections, Multithreading, Concurrency, Lambdas', appliedIn: ['Distributed Job Scheduler', 'LRU Cache Store', 'Vstand4U Backend'] },
  { name: 'SQL', category: 'Languages', level: 'Proficient', highlight: 'Complex queries, indexing, joins, transactions, query tuning', appliedIn: ['Vstand4U MySQL Optimization', 'PostgreSQL Leader Election'] },
  { name: 'JavaScript', category: 'Languages', level: 'Proficient', highlight: 'ES6+, Async, DOM, REST Client Integration', appliedIn: ['Fullstack interfaces', 'APIs testing'] },
  { name: 'HTML5 & CSS3', category: 'Languages', level: 'Proficient', highlight: 'Semantic markup, modern layout, responsive design', appliedIn: ['Web applications', 'UI integration'] },

  // Backend
  { name: 'Spring Boot', category: 'Backend', level: 'Advanced', highlight: 'Dependency Injection, Auto-configuration, Starters, Actuator', appliedIn: ['Distributed Job Scheduler', 'Vstand4U Microservices'] },
  { name: 'REST APIs', category: 'Backend', level: 'Advanced', highlight: 'RESTful architecture, status codes, DTOs, validation, error mapping', appliedIn: ['All Backend Systems', 'Client-Server communication'] },
  { name: 'Spring Data JPA & Hibernate', category: 'Backend', level: 'Proficient', highlight: 'Entity mapping, derived queries, repositories, pagination', appliedIn: ['Job Scheduler Persistence', 'Microservice Repositories'] },
  { name: 'Spring MVC', category: 'Backend', level: 'Proficient', highlight: 'Controllers, filters, interceptors, exception advice', appliedIn: ['Vstand4U Backend', 'API Gateway routing'] },
  { name: 'Microservices Architecture', category: 'Backend', level: 'Proficient', highlight: 'Decoupled services, service contracts, REST communication', appliedIn: ['Vstand4U live microservices'] },
  { name: 'JDBC', category: 'Backend', level: 'Proficient', highlight: 'Raw batching, parameterized statements, connection tuning', appliedIn: ['Vstand4U MySQL query latency optimization'] },

  // Core Java
  { name: 'Multithreading & Concurrency', category: 'Core Java', level: 'Advanced', highlight: 'Executors, ReentrantLocks, Atomic variables, Thread safety', appliedIn: ['Distributed Scheduler heartbeats', 'LRU Cache thread safety'] },
  { name: 'Java Collections Framework', category: 'Core Java', level: 'Advanced', highlight: 'HashMap, ConcurrentHashMap, LinkedList, PriorityQueue', appliedIn: ['O(1) LRU Cache Data Structure', 'Job queueing'] },
  { name: 'Exception Handling', category: 'Core Java', level: 'Advanced', highlight: 'Custom exceptions, ControllerAdvice, root-cause triage', appliedIn: ['Vstand4U Production Defect Resolution'] },
  { name: 'Streams & Lambda Expressions', category: 'Core Java', level: 'Proficient', highlight: 'Functional programming, filters, collectors, parallel streams', appliedIn: ['Data transformation pipelines'] },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', level: 'Proficient', highlight: 'Row locking, advisory locks, ACID transactions, schema design', appliedIn: ['Distributed Leader Election system'] },
  { name: 'MySQL', category: 'Databases', level: 'Proficient', highlight: 'Relational design, indexing, execution plan analysis, tuning', appliedIn: ['Vstand4U Enterprise database'] },

  // Tools & DevOps
  { name: 'Docker', category: 'Tools & DevOps', level: 'Proficient', highlight: 'Dockerfile, multi-stage builds, container networking', appliedIn: ['Containerizing Job Scheduler & LRU Cache'] },
  { name: 'Git & GitHub', category: 'Tools & DevOps', level: 'Proficient', highlight: 'Branching strategies, PRs, version control workflows', appliedIn: ['Collaborative team repositories'] },
  { name: 'Maven', category: 'Tools & DevOps', level: 'Proficient', highlight: 'POM management, dependency scoping, lifecycle plugins', appliedIn: ['All Java projects build automation'] },
  { name: 'JUnit 5 & Mockito', category: 'Tools & DevOps', level: 'Proficient', highlight: 'Unit testing, regression prevention, test suites', appliedIn: ['Vstand4U defect verification', 'Job Scheduler tests'] },
  { name: 'Postman', category: 'Tools & DevOps', level: 'Proficient', highlight: 'API contract testing, environment variables, mock servers', appliedIn: ['REST API validation'] },
  { name: 'AI-Assisted Dev (Claude, Copilot)', category: 'Tools & DevOps', level: 'Proficient', highlight: 'Workflow acceleration, test case generation, boilerplate reduction', appliedIn: ['Modern software engineering practice'] },

  // Core CS & Practices
  { name: 'Data Structures & Algorithms (DSA)', category: 'Core CS & Practices', level: 'Strong Foundation', highlight: 'Hash maps, trees, linked lists, complexity analysis O(1)/O(log N)', appliedIn: ['Custom LRU Cache implementation'] },
  { name: 'Database Management Systems (DBMS)', category: 'Core CS & Practices', level: 'Strong Foundation', highlight: 'Normalization, ACID, transactions, concurrency anomalies', appliedIn: ['Distributed locking & query design'] },
  { name: 'Operating Systems & Networks', category: 'Core CS & Practices', level: 'Strong Foundation', highlight: 'Processes, threads, locks, TCP/IP, HTTP/HTTPS, sockets', appliedIn: ['Heartbeat failover, REST architecture'] },
  { name: 'Agile & Scrum Practices', category: 'Core CS & Practices', level: 'Practicing', highlight: 'Sprint planning, daily standups, backlog grooming, retrospective', appliedIn: ['Vstand4U team sprints'] },
  { name: 'Secure Coding & Code Reviews', category: 'Core CS & Practices', level: 'Practicing', highlight: 'Input sanitization, parameterized queries, authorization checks', appliedIn: ['Vstand4U production code reviews'] }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'B.E. in Computer Science',
    institution: 'Angadi Institute of Technology & Management',
    year: 'Graduated: Jun 2025',
    location: 'Belagavi, Karnataka, India',
    cgpa: '7.7 / 10',
    highlights: [
      'Graduated with 7.7 CGPA / 10 in Computer Science and Engineering.',
      'Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems, and Computer Networks.',
      'Applied CS theoretical concepts directly into real-world distributed systems, concurrency paradigms, and database optimizations.'
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: 'Full Stack Java Development',
    issuer: 'Coursera',
    type: 'Professional Credential',
    year: '2025',
    description: 'Comprehensive specialization covering Core Java, OOP, Collections, Multithreading, Spring Boot, REST APIs, and database connectivity.'
  },
  {
    title: 'Enterprise Application Development',
    issuer: 'IBM / ROOMAN / Skill India',
    type: 'Industry Certification',
    year: '2025',
    description: 'Specialized enterprise training in scalable architecture, microservices patterns, secure REST APIs, and client-server systems.'
  },
  {
    title: 'Web Development Fundamentals',
    issuer: 'W3Schools Certification',
    type: 'Foundational Certification',
    year: '2024',
    description: 'Proficiency in modern semantic HTML5, CSS3, JavaScript ES6+, and responsive web design best practices.'
  },
  {
    title: '6-Month Hands-on Experience Certificate',
    issuer: 'VStand4u Solutions',
    type: 'Enterprise Industry Credential',
    year: '2025',
    description: 'Verified real-world production engineering tenure developing Spring Boot backend microservices and optimizing JDBC/MySQL queries.'
  },
  {
    title: 'Professional Skills: Life Skills (Jeevan Kaushal 2.0)',
    issuer: 'Rooman Technologies',
    type: 'Workplace Excellence',
    year: '2024',
    description: 'Agile team dynamics, technical documentation, peer code review collaboration, and effective communication.'
  }
];
