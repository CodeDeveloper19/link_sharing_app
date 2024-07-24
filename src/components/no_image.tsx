import React from 'react';
import Image from 'next/image';

export default function IsNoImage() {
  return (
    <button className='rounded-[12px] w-[193px] h-[193px] bg-transparent relative flex items-center justify-center'>
        <div className='opacity-[.50] bg-[black] z-10 absolute w-full h-full rounded-[12px]'></div>
        <div className='absolute w-full h-full z-0'>
            <Image fill src='' className='object-cover rounded-[12px]' alt="user's image"/>
        </div>
        <div className='absolutemax-w-[116px] gap-[8px] flex flex-col items-center z-20'>
            <div className='w-[40px] h-[40px] relative'>
                <Image fill src='/dashboard/image_bland.svg' alt='illustration of image'/>
            </div>
            <p className='font-[600] text-[16px] leading-[24px] text-white'>+ Upload Image</p>
        </div>
    </button>
  )
}
