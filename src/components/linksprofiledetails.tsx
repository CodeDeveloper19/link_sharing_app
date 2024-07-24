import React from 'react';
import { useContext } from 'react';
import { linksContext } from '@/app/dashboard/page';
import LinkBox from './linkbox';

export default function LinksProfileDetails() {
    const [allLinks] = useContext(linksContext);

    return (
        <div className='relative w-[237px] h-[514px] flex flex-col gap-[56px] top-[5px]'>
            <div className='w-full gap-[20px] flex flex-col relative top-[214px]'>
                {
                    allLinks.map((link, index) => (
                        <LinkBox key={index} height='44px' />
                    ))
                }
            </div>
        </div>
    );
}

