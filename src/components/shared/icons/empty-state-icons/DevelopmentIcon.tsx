import { memo } from 'react';

type DevelopmentIconProps = {
  className?: string;
};

const DevelopmentIcon = ({ className = '' }: DevelopmentIconProps) => {
  return (
    <svg
      width='120'
      height='120'
      viewBox='0 0 120 120'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      {/* Background Circle */}
      <circle
        cx='60'
        cy='60'
        r='60'
        fill='#F9F5FF'
      />

      {/* Code Brackets */}
      <path
        d='M42 45L32 60L42 75'
        stroke='#9E77ED'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M78 45L88 60L78 75'
        stroke='#9E77ED'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Slash in middle */}
      <path
        d='M68 40L52 80'
        stroke='#7F56D9'
        strokeWidth='3'
        strokeLinecap='round'
      />

      {/* Tools overlay */}
      <g opacity='0.8'>
        {/* Wrench */}
        <path
          d='M75 30L78 27C79.1046 25.8954 80.8954 25.8954 82 27C83.1046 28.1046 83.1046 29.8954 82 31L79 34L75 30Z'
          fill='#C5872B'
        />
        <rect
          x='72'
          y='32'
          width='3'
          height='15'
          rx='1.5'
          transform='rotate(-45 72 32)'
          fill='#C5872B'
        />

        {/* Hammer */}
        <rect
          x='36'
          y='28'
          width='3'
          height='18'
          rx='1.5'
          fill='#6941C6'
        />
        <rect
          x='33'
          y='26'
          width='9'
          height='5'
          rx='1'
          fill='#6941C6'
        />
      </g>
    </svg>
  );
};

export default memo(DevelopmentIcon);
