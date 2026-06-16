// useArticleSections.ts
import { MAX_BLOG_SECTIONS } from '@/constants/blogs.constants';
import {
  createNewSection,
  type BlogFormSchema,
} from '@/pages/cms/(blogs)/create-blog/components/article/blogForm.schema';
import { useEffect, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function useArticleSections() {
  const { control, setValue, getValues, setError, formState } = useFormContext<BlogFormSchema>();

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'sections',
    keyName: 'fieldKey',
  });

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const shouldScrollToLast = useRef(false);

  const handleAddSection = () => {
    const sections = getValues('sections') || [];

    if (sections.length >= MAX_BLOG_SECTIONS) {
      setError('sections', {
        type: 'max',
        message: `Maximum ${MAX_BLOG_SECTIONS} article sections are allowed`,
      });
      return;
    }

    shouldScrollToLast.current = true;

    sections.forEach((_, sectionIndex) => {
      setValue(`sections.${sectionIndex}.isExpanded`, false);
    });

    const newSection = createNewSection(fields.length);
    append(newSection);
  };

  const handleToggle = (index: number) => {
    const sections = getValues('sections') || [];
    const target = sections[index];

    if (!target) return;

    const willExpand = !target.isExpanded;

    sections.forEach((section, sectionIndex) => {
      if (sectionIndex === index) {
        setValue(`sections.${sectionIndex}.isExpanded`, willExpand);
        return;
      }

      setValue(`sections.${sectionIndex}.isExpanded`, willExpand ? false : section.isExpanded);
    });
  };

  useEffect(() => {
    if (!shouldScrollToLast.current) return;

    const lastSection = fields.at(-1);
    if (!lastSection) return;

    sectionRefs.current[lastSection.id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    shouldScrollToLast.current = false;
  }, [fields]);

  return {
    fields,
    sectionRefs,
    sectionsError: formState.errors.sections?.message as string | undefined,
    canAddSection: fields.length < MAX_BLOG_SECTIONS,
    handleAddSection,
    handleToggle,
    handleMoveUp: (index: number) => () => move(index, index - 1),
    handleMoveDown: (index: number) => () => move(index, index + 1),
    handleDelete: (index: number) => () => {
      // Prevent deletion if it's the first section or only one section remains
      if (index === 0 || fields.length <= 1) return;
      remove(index);
    },
  };
}
