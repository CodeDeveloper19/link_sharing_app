import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { linksContext } from '@/app/contexts/linkcontext';
import LinkBox from './linkbox';

export default function PhoneProfileDetails() {
    const [allLinks] = useContext(linksContext);

    return (
        <div className='relative w-[237px] h-[514px] flex flex-col gap-[56px] top-[5px] bg-white'>
            <div className='flex flex-col gap-[25px] items-center'>
                <div className='rounded-full w-[96px] h-[96px] relative border-[4px] bg-[#EEEEEE] border-[#633CFF]'>
                    <Image fill src='/dashboard/testing.jpg' className='rounded-full object-cover' alt='image of user'/>
                </div>
                <div className='flex flex-col max-w-[123px] gap-[8px] text-center'>
                    <h2 className='font-[600] text-[18px] leading-[27px] text-[#333333]'>Ben Wright</h2>
                    <p className='font-[400] text-[14px] leading-[21px] text-[#737373]'>ben@example.com</p>
                </div>
            </div>
            <div className='w-full gap-[20px] flex flex-col'>
                {
                    allLinks.map((link, index) => (
                        <LinkBox
                        key={index}
                        height='44px'
                        textHeight='12px'
                        backgroundColor={link.backgroundColor}
                        iconLink={link.iconLink}
                        iconName={link.iconName}
                        iconUrl={link.iconUrl} 
                         />
                    ))
                }
            </div>
        </div>
    );
}

