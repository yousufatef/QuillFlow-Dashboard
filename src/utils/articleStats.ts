type ArticleStatsInput = {
    title?: string;
    description?: string;
    sections?: {
        title?: string;
        description?: string;
    }[];
};

export const calculateArticleStats = ({
    title = '',
    description = '',
    sections = [],
}: ArticleStatsInput) => {
    const text = [
        title,
        description,
        ...sections.flatMap((section) => [
            section.title || '',
            section.description || '',
        ]),
    ]
        .join(' ')
        .trim();


    const wordCount = text.split(/\s+/).filter(Boolean).length;

    const readTime = Math.max(1, Math.ceil(wordCount / 100));

    return {
        readTime,
    };
};