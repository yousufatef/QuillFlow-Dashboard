import { useTranslation } from 'react-i18next';

type PlaceholderPageProps = {
  title: string;
};

function PlaceholderPage({ title }: PlaceholderPageProps) {
  const { t } = useTranslation();

  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-2'>
      <h1 className='type-heading-lg text-foreground'>{title}</h1>
      <p className='type-body-md text-muted-foreground'>
        {t('errors.notFoundHint', { defaultValue: 'This page is coming soon.' })}
      </p>
    </div>
  );
}

export default PlaceholderPage;
