type ArticleStatsInput = {
  titleEn?: string;
  descriptionEn?: string;
  sections?: {
    titleEn?: string;
    descriptionEn?: string;
  }[];
};

export const calculateArticleStats: any = ({
  titleEn = '',
  descriptionEn = '',
  sections = [],
}: ArticleStatsInput) => {
  const text = [
    titleEn,
    descriptionEn,
    ...sections.flatMap((section) => [
      section.titleEn || '',
      section.descriptionEn || '',
    ]),
  ]
    .join(' ')
    .trim();

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const readTime = Math.ceil(wordCount / 100);

  return {
    readTime,
  };
};

