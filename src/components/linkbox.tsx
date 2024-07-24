import React from 'react';
import Image from 'next/image';

interface LinkBoxProps {
    height: string;
}

export default function LinkBox({ height }: LinkBoxProps) {
  return (
    //44px 56px
    <a target="_blank" rel="noopener noreferrer" href='' style={{height, backgroundColor: '#1A1A1A'}} className='w-full gap-[8px] rounded-[8px] flex flex-row items-center justify-between px-[16px] hover:opacity-[.6]'>
        <div className='w-[16px] h-[16px] relative'>
            <Image fill src='/social_icons/github.svg' alt='social icon'/>
        </div>
        <p className='flex-1 text-left font-[400] text-[16px] leading-[24px] text-white'>GitHub</p>
        <div className='w-[16px] h-[16px] relative'>
            <Image fill src='/dashboard/arrow_right.svg' alt='arrow pointing right icon'/>
        </div>
    </a>
  )
}
