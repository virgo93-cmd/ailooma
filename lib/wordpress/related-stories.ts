/** Editorially selected complementary reads. Keep both ends of a relationship
 * where useful; unlisted stories do not receive a recency-only rail item. */
export const relatedStorySlugs: Record<string, string[]> = {
  'how-ai-agents-improve-everyday-productivity': [
    'how-to-use-ai-agents-for-everyday-work-without-losing-control',
    'ai-agents-vs-ai-assistants-practical-difference',
  ],
  'how-ai-agents-changing-workflows-2026': [
    'ai-implementation-roadmap-prototype-responsible-production',
    'ai-agents-vs-ai-assistants-practical-difference',
  ],
  'ai-agents-for-productivity-practical-use-cases': [
    'when-you-should-not-use-ai-five-tasks-human-judgment',
    'how-to-use-ai-agents-for-everyday-work-without-losing-control',
  ],
  'how-to-use-ai-agents-for-everyday-work-without-losing-control': [
    'ai-agents-vs-ai-assistants-practical-difference',
    'how-ai-agents-improve-everyday-productivity',
  ],
  'ai-agents-vs-ai-assistants-practical-difference': [
    'how-to-use-ai-agents-for-everyday-work-without-losing-control',
    'ai-agents-for-productivity-practical-use-cases',
  ],
  'best-ai-software-tutorials-for-beginners': [
    'how-to-learn-ai-from-scratch-project-tutorial',
    'ai-tutorials-for-non-programmers',
    'best-free-ai-tutorials',
  ],
  'best-ai-tutorials-for-beginners': [
    'best-free-ai-tutorials',
    'step-by-step-ai-tutorials',
  ],
  'step-by-step-ai-tutorials': [
    'how-to-learn-ai-from-scratch-project-tutorial',
    'free-ai-development-resources-hands-on-learning',
  ],
  'free-ai-development-resources-hands-on-learning': [
    'ai-tutorials-for-developers',
    'ai-software-guide-developers',
  ],
  'ai-software-guide-developers': [
    'ai-implementation-roadmap-prototype-responsible-production',
    'free-ai-development-resources-hands-on-learning',
  ],
  'ai-tutorials-for-developers': [
    'ai-software-guide-developers',
    'free-ai-development-resources-hands-on-learning',
  ],
  'ai-software-tutorials-for-non-programmers': [
    'interactive-ai-tutorials-non-technical-users',
    'ai-tutorials-for-non-programmers',
  ],
  'ai-tutorials-for-non-programmers': [
    'how-non-technical-professionals-use-ai-safely',
    'best-ai-software-tutorials-for-beginners',
  ],
  'how-to-fact-check-ai-generated-answers': [
    'practical-framework-evaluating-ai-answers',
    'how-to-use-ai-for-research-without-spreading-misinformation',
  ],
  'practical-framework-evaluating-ai-answers': [
    'how-to-fact-check-ai-generated-answers',
    'how-to-use-ai-for-research-without-spreading-misinformation',
  ],
  'how-to-use-ai-for-research-without-spreading-misinformation': [
    'how-to-fact-check-ai-generated-answers',
    'build-weekly-research-digest-n8n-google-sheets',
  ],
  'how-to-build-automated-workflow-with-n8n': [
    'build-weekly-research-digest-n8n-google-sheets',
    'n8n-tutorial-for-beginners-build-first-workflow',
  ],
  'how-to-build-simple-n8n-automation-workflow': [
    'n8n-tutorial-for-beginners-build-first-workflow',
    '10-everyday-tasks-automate-n8n',
  ],
  'n8n-tutorial-for-beginners-build-first-workflow': [
    'how-to-build-simple-n8n-automation-workflow',
    'how-to-build-automated-workflow-with-n8n',
  ],
  'n8n-research-automation-workflow-examples': [
    'build-weekly-research-digest-n8n-google-sheets',
    'google-sheets-api-integration-notion-n8n',
  ],
  'build-weekly-research-digest-n8n-google-sheets': [
    'n8n-research-automation-workflow-examples',
    'google-sheets-api-integration-notion-n8n',
  ],
  'google-sheets-api-integration-notion-n8n': [
    'notion-n8n-windows11-google-sheets-sync',
    'build-weekly-research-digest-n8n-google-sheets',
  ],
  'notion-n8n-windows11-google-sheets-sync': [
    'google-sheets-api-integration-notion-n8n',
    'windows-11-backup-google-sheets-api',
  ],
  'windows-11-backup-google-sheets-api': [
    'practical-guide-backing-up-digital-life',
    'notion-n8n-windows11-google-sheets-sync',
  ],
  'best-browser-tools-faster-remote-work': [
    'best-browser-productivity-tools-remote-work',
    'best-browser-productivity-tools-remote-work-2',
  ],
  'best-browser-productivity-tools-remote-work': [
    'best-browser-tools-faster-remote-work',
    'best-browser-productivity-tools-remote-work-2',
  ],
  'best-browser-productivity-tools-remote-work-2': [
    'best-browser-productivity-tools-remote-work',
    'best-browser-tools-faster-remote-work',
  ],
  'how-to-secure-windows-11-pc-step-by-step': [
    'how-to-secure-windows-11-pc-privacy-backup-guide',
    'practical-guide-backing-up-digital-life',
  ],
  'how-to-secure-windows-11-pc-privacy-backup-guide': [
    'how-to-secure-windows-11-pc-step-by-step',
    'how-to-secure-windows-11-privacy-backup-recovery',
  ],
  'how-to-secure-windows-11-privacy-backup-recovery': [
    'practical-guide-backing-up-digital-life',
    'how-to-secure-windows-11-pc-step-by-step',
  ],
  'best-free-productivity-software-windows-users': [
    'best-free-microsoft-office-alternatives-work-study',
    'best-free-pdf-editors-windows-features-limits-privacy',
    'how-to-choose-note-taking-software-you-keep-using',
  ],
  'best-free-microsoft-office-alternatives-work-study': [
    'best-free-productivity-software-windows-users',
    'best-free-pdf-editors-windows-features-limits-privacy',
  ],
  'best-free-pdf-editors-windows-features-limits-privacy': [
    'best-free-productivity-software-windows-users',
    'best-free-microsoft-office-alternatives-work-study',
  ],
  'how-to-choose-note-taking-software-you-keep-using': [
    'how-to-build-simple-digital-productivity-system',
    'best-free-productivity-software-windows-users',
  ],
  'how-to-build-simple-digital-productivity-system': [
    'how-to-choose-note-taking-software-you-keep-using',
    'practical-guide-backing-up-digital-life',
  ],
  'practical-guide-backing-up-digital-life': [
    'windows-11-backup-google-sheets-api',
    'how-to-secure-windows-11-privacy-backup-recovery',
  ],
};
