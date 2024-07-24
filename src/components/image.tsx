import React from 'react';
import Image from 'next/image';

export default function IsImage() {
  return (
    <button className='rounded-[12px] w-[193px] h-[193px] bg-[#EFEBFF] flex items-center justify-center'>
        <div className='max-w-[116px] gap-[8px] flex flex-col items-center'>
            <div className='w-[40px] h-[40px] relative'>
                <Image fill src='/dashboard/image.svg' alt='illustration of image'/>
            </div>
            <p className='font-[600] text-[16px] leading-[24px] text-[#633CFF]'>+ Upload Image</p>
        </div>
    </button>
  )
}
