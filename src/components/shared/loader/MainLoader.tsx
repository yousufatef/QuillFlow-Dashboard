const MainLoader = () => {
  return (
    <div className='flex min-h-75 items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900' />
        <p className='text-sm text-neutral-500'>Loading...</p>
      </div>
    </div>
  );
};

export default MainLoader;
