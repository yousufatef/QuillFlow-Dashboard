import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';

export function PhoneStatusBar() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return (
    <div className='bg-primary-500'>
      <div className='flex shrink-0 items-center justify-between px-5 pt-2'>
        <span className='text-primary-50 text-[13px] leading-none font-semibold'>
          {currentTime}
        </span>
        <div className='text-primary-50 flex items-center gap-1.5'>
          <BlogIcons name='Signal' />
          <BlogIcons name='Wifi' />
          <BlogIcons name='BatteryFull' />
        </div>
      </div>
      <div className='flex h-11 shrink-0 items-center justify-center'>
        <span className='text-primary-50 font-serif text-[15px] font-medium tracking-[0.12em]'>
          KARAT
        </span>
      </div>
    </div>
  );
}
