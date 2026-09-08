export type TopicHub = {
  slug: string;
  categorySlug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  introduction: readonly string[];
  focus: readonly string[];
  paths: readonly {
    title: string;
    description: string;
    keywords: readonly string[];
  }[];
  faqs: readonly { question: string; answer: string }[];
};

export const topicHubs = [
  {
    slug: 'artificial-intelligence',
    categorySlug: 'ai',
    label: 'Artificial Intelligence',
    eyebrow: 'Understand AI',
    title: 'Artificial intelligence, without the guesswork.',
    description:
      'Practical explanations, responsible workflows, and clear guidance for choosing and using AI.',
    introduction: [
      'Artificial intelligence is most useful when its capabilities, limitations, and risks are understood together. This hub organizes AILooma’s AI coverage around real tasks instead of hype or abstract predictions.',
      'Start with the fundamentals, move into practical workflows, or explore how agents and language models fit into everyday work. Each guide is reviewed for clear assumptions, privacy considerations, and the need for human verification.',
    ],
    focus: [
      'Plain-language explanations of AI concepts',
      'Practical workflows with meaningful human oversight',
      'Privacy, accuracy, security, and responsible adoption',
    ],
    paths: [
      {
        title: 'Build the foundations',
        description:
          'Understand models, agents, prompts, and the limits behind common AI claims.',
        keywords: ['beginner', 'language model', 'fundamental', 'introduction'],
      },
      {
        title: 'Use AI at work',
        description:
          'Apply AI to useful tasks while keeping decisions and sensitive data under control.',
        keywords: ['productivity', 'workflow', 'everyday', 'use case'],
      },
      {
        title: 'Evaluate AI tools',
        description:
          'Compare capabilities, trade-offs, and safeguards before adopting a tool.',
        keywords: ['best', 'tools', 'comparison', 'software'],
      },
    ],
    faqs: [
      {
        question: 'Where should an AI beginner start?',
        answer:
          'Start with a narrow task and learn how to verify outputs before adding automation. The foundations path prioritizes concepts and practical examples that do not require programming experience.',
      },
      {
        question: 'Does AILooma recommend trusting AI output automatically?',
        answer:
          'No. Important facts, decisions, code, and instructions should be reviewed against appropriate sources or tested safely. Human accountability remains essential.',
      },
      {
        question: 'Are the AI tools covered here always free?',
        answer:
          'Not necessarily. Plans, limits, and features change frequently. Articles identify relevant limitations where possible, but readers should confirm current terms with the provider.',
      },
    ],
  },
  {
    slug: 'tutorials',
    categorySlug: 'tutorials',
    label: 'Tutorials',
    eyebrow: 'Learn by doing',
    title: 'Technology tutorials you can actually follow.',
    description:
      'Step-by-step instructions for building workflows, configuring software, and solving practical problems.',
    introduction: [
      'AILooma tutorials are designed to move from a clear starting point to a useful result. We explain prerequisites, decisions, and risks instead of presenting unexplained steps that only work in one environment.',
      'Use this hub to find beginner walkthroughs, automation projects, and troubleshooting guides. Before changing an important device or account, review the requirements, protect credentials, and keep a current backup.',
    ],
    focus: [
      'Prerequisites and expected outcomes stated up front',
      'Steps organized around verifiable checkpoints',
      'Security, privacy, backups, and common failure points',
    ],
    paths: [
      {
        title: 'Start from zero',
        description:
          'Beginner-friendly walkthroughs with definitions and setup guidance.',
        keywords: ['beginner', 'first', 'start', 'non-programmer'],
      },
      {
        title: 'Build a workflow',
        description:
          'Create useful automations and connected systems one stage at a time.',
        keywords: ['workflow', 'automation', 'n8n', 'build'],
      },
      {
        title: 'Fix and improve',
        description:
          'Diagnose common problems and make an existing setup more dependable.',
        keywords: ['fix', 'slow', 'troubleshoot', 'optimize'],
      },
    ],
    faqs: [
      {
        question: 'Do I need programming experience?',
        answer:
          'Many tutorials are suitable for non-programmers, while developer-focused guides identify the technical knowledge they expect. Read the prerequisites before starting.',
      },
      {
        question: 'What if my interface looks different?',
        answer:
          'Software interfaces and plans change. Check the article date and the provider’s current documentation, then use the described goal and checkpoint to locate the equivalent setting.',
      },
      {
        question: 'Should I run every command exactly as shown?',
        answer:
          'Review commands and confirm paths, permissions, and consequences first. Back up important data and test safely when a command can modify a system or account.',
      },
    ],
  },
  {
    slug: 'software',
    categorySlug: 'software',
    label: 'Software',
    eyebrow: 'Choose better software',
    title: 'Software choices based on the work you need to do.',
    description:
      'Clear comparisons, practical alternatives, and setup guidance for work, study, and everyday computing.',
    introduction: [
      'The best software is not always the product with the longest feature list. It is the option that fits your workflow, platform, budget, privacy expectations, and ability to maintain it.',
      'This hub brings together comparisons, alternatives, and practical software guidance. Recommendations explain trade-offs and intended users so you can create a shortlist instead of relying on a universal ranking.',
    ],
    focus: [
      'Features and limitations that affect real tasks',
      'Compatibility, privacy, pricing, and maintenance',
      'Alternatives for different budgets and skill levels',
    ],
    paths: [
      {
        title: 'Compare your options',
        description:
          'Build a shortlist using relevant features, limits, and costs.',
        keywords: ['best', 'comparison', 'alternatives', 'free'],
      },
      {
        title: 'Set up your software',
        description:
          'Learn the configuration and workflow behind a useful installation.',
        keywords: ['guide', 'tutorial', 'setup', 'how to'],
      },
      {
        title: 'Protect your work',
        description:
          'Improve privacy, reliability, backups, and control over important data.',
        keywords: ['privacy', 'security', 'backup', 'reliable'],
      },
    ],
    faqs: [
      {
        question: 'How does AILooma choose software recommendations?',
        answer:
          'Criteria vary by task and may include capability, usability, compatibility, privacy, support, pricing, and limitations. Articles should explain the factors behind a recommendation.',
      },
      {
        question: 'Does “free” mean there are no limits?',
        answer:
          'No. Free software may have feature, storage, usage, licensing, support, or privacy trade-offs. Confirm the current plan and license before depending on it.',
      },
      {
        question: 'How current are software comparisons?',
        answer:
          'We date and update articles, but products can change between reviews. Verify critical features and prices on the provider’s official website before making a decision.',
      },
    ],
  },
  {
    slug: 'tools',
    categorySlug: 'tools',
    label: 'Tools',
    eyebrow: 'Build your toolkit',
    title: 'Useful digital tools, matched to real needs.',
    description:
      'Discover productivity, automation, browser, and AI tools without collecting software you do not need.',
    introduction: [
      'A good tool removes friction without creating a larger problem in cost, complexity, privacy, or maintenance. This hub organizes tools by the job they perform and the trade-offs that matter after initial setup.',
      'Explore AI assistants, automation platforms, browser-based utilities, and productivity tools. Before connecting accounts or uploading data, review permissions, retention settings, export options, and the provider’s current terms.',
    ],
    focus: [
      'Tools organized by task rather than popularity',
      'Practical limits, permissions, and workflow fit',
      'Safer adoption with export and recovery options',
    ],
    paths: [
      {
        title: 'AI-assisted tools',
        description:
          'Find focused AI capabilities and understand where human review still matters.',
        keywords: ['ai', 'assistant', 'agent', 'language model'],
      },
      {
        title: 'Automation tools',
        description:
          'Connect repetitive tasks while maintaining visibility and control.',
        keywords: ['automation', 'n8n', 'workflow', 'integrate'],
      },
      {
        title: 'Productivity tools',
        description:
          'Reduce everyday friction across browsers, documents, and team workflows.',
        keywords: ['productivity', 'browser', 'remote', 'office'],
      },
    ],
    faqs: [
      {
        question: 'Should I use every tool AILooma mentions?',
        answer:
          'No. A tool should solve a specific problem and justify its cost, permissions, and maintenance. Use the criteria in each article to decide whether it fits your situation.',
      },
      {
        question: 'What should I check before connecting an account?',
        answer:
          'Review requested permissions, data retention, sharing settings, security controls, export options, and how to revoke access. Avoid providing more data than the task requires.',
      },
      {
        question: 'Can tool features and prices change?',
        answer:
          'Yes. Providers frequently change plans and features. Treat article details as a researched starting point and confirm important terms directly with the provider.',
      },
    ],
  },
  {
    slug: 'guides',
    categorySlug: 'guides',
    label: 'Guides',
    eyebrow: 'Keep a reliable reference',
    title: 'Practical technology guides for confident decisions.',
    description:
      'Durable explanations for setup, troubleshooting, privacy, security, backups, and everyday technology.',
    introduction: [
      'AILooma guides are designed to remain useful after the first read. They explain the reasoning behind a process, highlight common failure points, and show when official documentation or professional help is appropriate.',
      'Browse foundational explainers, troubleshooting references, and safer-computing guidance. For instructions that can affect important data or access, begin with a backup and confirm that you have the required permissions.',
    ],
    focus: [
      'Context and decision points, not isolated instructions',
      'Troubleshooting from low-risk checks to deeper changes',
      'Privacy, security, recovery, and long-term maintenance',
    ],
    paths: [
      {
        title: 'Get started properly',
        description:
          'Create a sound foundation before adding complexity or automation.',
        keywords: ['beginner', 'build', 'setup', 'system'],
      },
      {
        title: 'Troubleshoot a problem',
        description:
          'Identify likely causes and work through safer checks first.',
        keywords: ['fix', 'slow', 'problem', 'troubleshoot'],
      },
      {
        title: 'Improve resilience',
        description:
          'Protect devices, accounts, privacy, and recoverable copies of your work.',
        keywords: ['security', 'privacy', 'backup', 'protect'],
      },
    ],
    faqs: [
      {
        question: 'What makes an AILooma guide different from a short tip?',
        answer:
          'A guide provides context, prerequisites, trade-offs, and checkpoints so readers can understand both the action and its consequences.',
      },
      {
        question: 'How should I approach troubleshooting?',
        answer:
          'Confirm the symptom, preserve important data, start with reversible checks, document changes, and move to higher-risk steps only when the evidence supports them.',
      },
      {
        question: 'Can I request a new guide or correction?',
        answer:
          'Yes. Use the AILooma Contact page and include the topic or public article URL, the problem you are trying to solve, and any relevant evidence.',
      },
    ],
  },
] as const satisfies readonly TopicHub[];

export function getTopicHub(slug: string) {
  return topicHubs.find((hub) => hub.slug === slug);
}
