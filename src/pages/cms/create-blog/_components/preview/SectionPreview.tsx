import { cn } from '@/lib/utils';
import type { BlogFormState } from "@/types/blog.types";
import { useObjectUrl } from '@/hooks/blogs/useObjectUrl';


const PLACEHOLDER_SECTION_TITLE = 'Section title';
const PLACEHOLDER_SECTION_DESCRIPTION = 'Section description';

export function SectionPreview({
    section,
}: {
    section: BlogFormState['sections'][number];
}) {
    const imageUrl = useObjectUrl(section.image) ?? section.imagePreview;
    const hasSectionTitle = section.title.trim() !== '';
    const hasSectionDescription = section.description.trim() !== '';

    return (
        <article className="flex flex-col gap-3">
            <h4
                className={cn(
                    'text-[15px] leading-snug font-bold text-foreground',
                    !hasSectionTitle && 'text-muted-foreground',
                )}
            >
                {section.title.trim() || PLACEHOLDER_SECTION_TITLE}
            </h4>

            <p
                className={cn(
                    'text-[13px] leading-[1.45] text-foreground',
                    !hasSectionDescription && 'text-muted-foreground',
                )}
            >
                {section.description.trim() || PLACEHOLDER_SECTION_DESCRIPTION}
            </p>

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt=""
                    className="aspect-video w-full rounded-lg object-cover"
                />
            )}
        </article>
    );
}