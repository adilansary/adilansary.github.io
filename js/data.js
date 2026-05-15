/**
 * Portfolio Data — single source of truth.
 *
 * To add, update, or remove content: edit ONLY this file.
 * See CONTENT_GUIDE.md for full instructions and field reference.
 */
window.PortfolioData = {

  /* ---------------------------------------------------------------
     Meta — personal info shared across all sections
     --------------------------------------------------------------- */
  meta: {
    name:         'Adil Ansary',
    title:        'SQA Engineer II',
    subtitle:     'SQA Engineer · Automation Specialist',
    email:        'ansaryhere@gmail.com',
    github:       'https://github.com/adilansary',
    linkedin:     'https://www.linkedin.com/in/adilansary',
    phone:        '+8801521402253',
    phoneDisplay: '+880 1521 402253',
    resumeUrl:    'assets/cv/resume.pdf',
    profileImage: 'assets/images/profile.jpg',
  },

  /* ---------------------------------------------------------------
     Navigation links — drives both the navbar and footer nav
     --------------------------------------------------------------- */
  nav: {
    links: [
      { href: '#about',      label: 'About'      },
      { href: '#experience', label: 'Experience'  },
      { href: '#skills',     label: 'Skills'      },
      { href: '#projects',   label: 'Projects'    },
      { href: '#contact',    label: 'Contact'     },
    ],
  },

  /* ---------------------------------------------------------------
     Hero section
     --------------------------------------------------------------- */
  hero: {
    available:    true,
    badge:        'Available for opportunities',
    rolePrefix:   'I build ',
    bio:          'SQA Engineer II crafting resilient E2E & API automation frameworks with CI/CD pipelines that scale, speed up delivery, and ensure rock-solid quality.',
    typedPhrases: [
      'automation frameworks',
      'E2E test pipelines',
      'API test suites',
      'quality systems',
      'CI/CD workflows',
    ],
    stats: [
      { count: 2,   suffix: '+', label: 'Years Experience'      },
      { count: 500, suffix: '+', label: 'Test Cases Written'     },
      { count: 15,  suffix: '+', label: 'Automation Scripts'     },
      { count: 3,   suffix: '',  label: 'CI/CD Pipelines Built'  },
    ],
  },

  /* ---------------------------------------------------------------
     About section
     --------------------------------------------------------------- */
  about: {
    lead: "I'm an Automation Engineer focused on quality at speed — building systems that catch bugs before they reach users.",
    paragraphs: [
      'I create resilient E2E and API frameworks using POM design patterns, integrated into CI/CD pipelines with Jenkins and GitHub Actions to increase test coverage, reduce manual effort, and ship flake-free releases faster.',
      'Beyond automation, I bring strong manual testing expertise across exploratory, functional, and UAT testing — bridging the gap between development velocity and product quality.',
    ],
    highlights: [
      { icon: 'fas fa-robot',       title: 'Test Automation',   detail: 'Playwright · Selenium · Appium'  },
      { icon: 'fas fa-code-branch', title: 'CI/CD Integration',  detail: 'GitHub Actions · Jenkins'        },
      { icon: 'fas fa-plug',        title: 'API Testing',        detail: 'REST · Postman · Playwright API' },
      { icon: 'fas fa-mobile-alt',  title: 'Mobile Testing',     detail: 'Appium · WebDriverIO'            },
    ],
  },

  /* ---------------------------------------------------------------
     Experience
     Items are sorted by `order` (ascending = top of timeline).
     Required: role, company, period, location, order
     Optional: current (bool) — shows "Current" badge
     --------------------------------------------------------------- */
  experience: {
    sectionDesc: '2 years 7 months of professional quality engineering',
    items: [
      {
        order:    1,
        role:     'SQA Engineer II',
        company:  'Brotecs Technologies Limited',
        period:   'Jan 2025 – Present',
        location: 'Dhaka, Bangladesh',
        current:  true,
      },
      {
        order:    2,
        role:     'SQA Engineer I',
        company:  'Brotecs Technologies Limited',
        period:   'Jan 2024 – Dec 2024',
        location: 'Dhaka, Bangladesh',
        current:  false,
      },
      {
        order:    3,
        role:     'SQA Intern',
        company:  'Brotecs Technologies Limited',
        period:   'Jun 2023 – Dec 2023',
        location: 'Dhaka, Bangladesh',
        current:  false,
      },
    ],
  },

  /* ---------------------------------------------------------------
     Skills
     Groups are sorted by `order` (ascending).
     Each item: { label, accent }
       accent: true  → highlighted tag (tag-accent class)
       accent: false → default tag
     --------------------------------------------------------------- */
  skills: [
    {
      order: 1,
      icon:  'fas fa-clipboard-check',
      group: 'Manual Testing',
      items: [
        { label: 'Test Case Design',        accent: false },
        { label: 'Regression Testing',      accent: false },
        { label: 'Smoke Testing',           accent: false },
        { label: 'Exploratory Testing',     accent: false },
        { label: 'UAT',                     accent: false },
        { label: 'Bug Reporting & Triaging', accent: false },
        { label: 'Functional Testing',      accent: false },
        { label: 'Test Planning',           accent: false },
      ],
    },
    {
      order: 2,
      icon:  'fas fa-robot',
      group: 'Automation',
      items: [
        { label: 'Playwright',        accent: true  },
        { label: 'Selenium',          accent: true  },
        { label: 'Appium',            accent: true  },
        { label: 'WebDriverIO',       accent: false },
        { label: 'POM Pattern',       accent: false },
        { label: 'E2E Testing',       accent: false },
        { label: 'API Automation',    accent: false },
        { label: 'Mobile Automation', accent: false },
      ],
    },
    {
      order: 3,
      icon:  'fas fa-code',
      group: 'Languages',
      items: [
        { label: 'JavaScript', accent: true  },
        { label: 'TypeScript', accent: true  },
        { label: 'Python',     accent: false },
        { label: 'Java',       accent: false },
      ],
    },
    {
      order: 4,
      icon:  'fas fa-cogs',
      group: 'CI/CD & Tools',
      items: [
        { label: 'GitHub Actions', accent: true  },
        { label: 'Jenkins',        accent: true  },
        { label: 'Git',            accent: false },
        { label: 'Postman',        accent: false },
        { label: 'JIRA',           accent: false },
        { label: 'TestRail',       accent: false },
        { label: 'Redmine',        accent: false },
      ],
    },
  ],

  /* ---------------------------------------------------------------
     Projects
     Items are sorted by `order` (ascending).
     Required: title, desc, stack[], order
     Optional: icon (Font Awesome class), githubUrl, liveUrl
     Set liveUrl: null to hide the live-link button.
     --------------------------------------------------------------- */
  projects: {
    sectionDesc: 'Selected automation frameworks and testing projects',
    items: [
      {
        order:     1,
        icon:      'fas fa-robot',
        title:     'E2E Automation Framework',
        desc:      'Playwright-based end-to-end automation framework with POM design pattern, parallel execution, and GitHub Actions CI/CD integration for continuous testing.',
        stack:     ['Playwright', 'TypeScript', 'GitHub Actions'],
        githubUrl: 'https://github.com/adilansary',
        liveUrl:   null,
      },
      {
        order:     2,
        icon:      'fas fa-plug',
        title:     'API Test Suite',
        desc:      'Comprehensive REST API testing suite with schema validation, data-driven tests, and an automated regression pipeline integrated with Jenkins.',
        stack:     ['Playwright', 'JavaScript', 'Jenkins'],
        githubUrl: 'https://github.com/adilansary',
        liveUrl:   null,
      },
      {
        order:     3,
        icon:      'fas fa-mobile-alt',
        title:     'Mobile Automation Suite',
        desc:      'Cross-platform mobile testing framework using Appium and WebDriverIO targeting both Android and iOS applications with shared page objects.',
        stack:     ['Appium', 'WebDriverIO', 'JavaScript'],
        githubUrl: 'https://github.com/adilansary',
        liveUrl:   null,
      },
    ],
  },

  /* ---------------------------------------------------------------
     Education
     Items are sorted by `order` (ascending = most recent first).
     Required: years, degree, school, order
     Optional: icon (Font Awesome class), cgpa, thesis
     Set cgpa/thesis: null to hide those fields.
     --------------------------------------------------------------- */
  education: [
    {
      order:  1,
      icon:   'fas fa-graduation-cap',
      years:  '2017 – 2021',
      degree: 'B.Sc in Computer Science & Engineering',
      school: 'Daffodil International University, Dhaka, Bangladesh',
      cgpa:   '3.53 / 4.00',
      thesis: 'A Comparative Study on Detecting Bangla Fake News on Social Media Using Machine Learning Algorithms',
    },
    {
      order:  2,
      icon:   'fas fa-school',
      years:  '2014 – 2016',
      degree: 'Higher Secondary Certificate (HSC)',
      school: "Cox's Bazar Government College, Cox's Bazar, Bangladesh",
      cgpa:   null,
      thesis: null,
    },
  ],

  /* ---------------------------------------------------------------
     Contact section
     --------------------------------------------------------------- */
  contact: {
    sectionDesc:   "Have an opportunity or project in mind? I'd love to connect.",
    formRecipient: 'ansaryhere@gmail.com',
    cards: [
      { icon: 'fas fa-envelope',    label: 'Email',    value: 'ansaryhere@gmail.com',       href: 'mailto:ansaryhere@gmail.com',            external: false },
      { icon: 'fab fa-linkedin-in', label: 'LinkedIn', value: 'linkedin.com/in/adilansary', href: 'https://www.linkedin.com/in/adilansary', external: true  },
      { icon: 'fab fa-github',      label: 'GitHub',   value: 'github.com/adilansary',      href: 'https://github.com/adilansary',          external: true  },
      { icon: 'fas fa-phone',       label: 'Phone',    value: '+880 1521 402253',            href: 'tel:+8801521402253',                     external: false },
    ],
  },

};
