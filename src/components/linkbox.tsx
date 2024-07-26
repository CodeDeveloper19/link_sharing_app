import React from 'react';
import Image from 'next/image';
import { AllLinksProps } from '@/app/contexts/linkcontext';

interface LinkBoxProps extends AllLinksProps {
    height: string;
    textHeight: string;
}

export default function LinkBox({ height, textHeight, backgroundColor, iconName, iconUrl, iconLink }: LinkBoxProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={iconLink} style={{height, backgroundColor: backgroundColor}} className='w-full gap-[8px] rounded-[8px] flex flex-row items-center justify-between px-[16px] hover:opacity-[.6]'>
        <div className='w-[16px] h-[16px] relative'>
            <Image fill src={iconUrl} alt='social icon'/>
        </div>
        <p style={{fontSize: textHeight}} className='flex-1 text-left font-[400] leading-[24px] text-white'>{iconName}</p>
        <div className='w-[16px] h-[16px] relative'>
            <Image fill src='/dashboard/arrow_right.svg' alt='arrow pointing right icon'/>
        </div>
    </a>
  )
}
