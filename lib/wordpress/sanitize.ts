import sanitizeHtml from 'sanitize-html';

export function sanitizeContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'h2',
      'h3',
      'h4',
      'ul',
      'ol',
      'li',
      'strong',
      'em',
      'a',
      'blockquote',
      'pre',
      'code',
      'figure',
      'figcaption',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'hr',
      'sup',
      'sub',
      'div',
      'span',
      'iframe',
      'video',
      'source',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      div: ['class'],
      span: ['class'],
      figure: ['class'],
      p: ['class'],
      pre: ['class'],
      code: ['class'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      iframe: [
        'src',
        'title',
        'width',
        'height',
        'allow',
        'allowfullscreen',
        'loading',
      ],
      video: ['src', 'controls', 'poster', 'preload'],
      source: ['src', 'type'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedIframeHostnames: [
      'www.youtube.com',
      'youtube.com',
      'player.vimeo.com',
    ],
    transformTags: {
      a: (_tag, attrs) => ({
        tagName: 'a',
        attribs: {
          ...attrs,
          ...(attrs.target === '_blank' ? { rel: 'noopener noreferrer' } : {}),
        },
      }),
    },
  });
}

export type ArticleHeading = { id: string; text: string; level: 2 | 3 };

export function prepareArticleContent(source: string) {
  const headings: ArticleHeading[] = [];
  const used = new Map<string, number>();
  const html = sanitizeContent(source).replace(
    /<h([23])(?:\s+id="[^"]*")?>([\s\S]*?)<\/h\1>/gi,
    (_match, rawLevel: string, inner: string) => {
      const text = sanitizeHtml(inner, {
        allowedTags: [],
        allowedAttributes: {},
      }).trim();
      const base =
        text
          .toLowerCase()
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') || 'section';
      const count = used.get(base) || 0;
      used.set(base, count + 1);
      const id = count ? `${base}-${count + 1}` : base;
      const level = Number(rawLevel) as 2 | 3;
      headings.push({ id, text, level });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    },
  );
  return { html, headings };
}
