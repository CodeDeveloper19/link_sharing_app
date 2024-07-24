import React from 'react';

interface DropDownOptionProps {
    iconUrl: string;
    iconName: string;
    isBottom: boolean;
  }

export default function DropDownOption({ iconUrl, iconName, isBottom }: DropDownOptionProps) {
  return (
    <>
        <button className='w-full flex flex-row gap-[12px] items-center group'>
            <span style={{maskImage: `url('${iconUrl}')`}} className='w-[16px] h-[16px] group-hover:bg-[#633CFF] bg-[#737373]'>
            </span>
            <p className='flex-1 text-left font-[400] text-[16px] leading-[24px] text-[#333333] group-hover:text-[#633CFF]'>{iconName}</p>
        </button>
        <div style={{display: (isBottom) ? 'block' : 'none'}} className='w-full h-[1px] bg-[#D9D9D9]'></div>
    </>
  )
}
