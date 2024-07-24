'use client'
import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import LinkContainer from './linkcontainer';
import { linksContext } from '@/app/contexts/linkcontext';

export default function Links() {
    const [allLinks, setAllLinks] = useContext(linksContext);

    const addLink = () => {
        if (allLinks.length < 5) {
            setAllLinks([
                ...allLinks,
                { iconName: 'GitHub', iconUrl: '/social_icons/github.svg', backgroundColor: '#1A1A1A', iconLink: '' }
            ]);
        }
    };

    return (
        <div className='p-[16px] phone:p-[40px] flex flex-col gap-[40px]'>
            <div className='flex flex-col gap-[8px]'>
                <h1 className='font-[700] text-[32px] leading-[48px] text-[#333333]'>Customize your links</h1>
                <p className='font-[400] text-[16px] leading-[24px] text-[#737373]'>Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <div className='flex flex-col gap-[24px]'>
                <button onClick={addLink} className='w-full border-[1px] hover:bg-[#EFEBFF] border-[#633CFF] h-[46px] rounded-[8px] text-[16px] leading-[24px] text-[#633CFF] font-[600]'>
                + Add new link
                </button>
                {
                    (allLinks.length === 0) ?
                    (
                        <div className='rounded-[12px] p-[20px] w-full bg-[#FAFAFA] flex gap-[12px] items-center min-h-[469px]'>
                            <div className='flex flex-col gap-[40px] w-full items-center'>
                                <div className='relative w-[124.77px] smartPhone:w-[250px] h-[80px] smartPhone:h-[160px]'>
                                    <Image fill src='/dashboard/user_tapping.svg' alt='illustration of a user tapping'/>
                                </div>
                                <div className='flex flex-col gap-[24px] max-w-[488px]'>
                                    <h3 className='text-[32px] leading-[48px] font-[700] text-center text-[#333333]'>Let’s get you started</h3>
                                    <p className='font-[400] text-[16px] leading-[24px] text-center'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    allLinks.map((userLink, index) => {
                        return (
                            <LinkContainer key={index} indexLink={index} allLinks={allLinks} setAllLinks={setAllLinks} />
                        )
                    })
                }
            </div>
        </div>
    )
}
