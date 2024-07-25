'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import DropDownOption from './dropdownoption';
import { LinkContainerProps } from '@/app/contexts/linkcontext';

interface DropDownOptionsProps {
    iconUrl: string;
    iconName: string;
}

const dropDownOptions : DropDownOptionsProps[] = [
    {
        iconUrl: '/social_icons/github_dark.svg',
        iconName: 'GitHub'
    },
    {
        iconUrl: '/social_icons/youtube_dark.svg',
        iconName: 'YouTube'
    },
    {
        iconUrl: '/social_icons/linkedin_dark.svg',
        iconName: 'LinkedIn'
    },
    {
        iconUrl: '/social_icons/facebook_dark.svg',
        iconName: 'Facebook'
    },
    {
        iconUrl: '/social_icons/frontendmentor_dark.svg',
        iconName: 'Frontend Mentor'
    },
    {
        iconUrl: '/social_icons/hashnode_dark.svg',
        iconName: 'Hashnode'
    },
    {
        iconUrl: '/social_icons/stackoverflow_dark.svg',
        iconName: 'Stackoverflow'
    },
]

export default function LinkContainer({ indexLink, allLinks, setAllLinks }: LinkContainerProps) {
    const [showDropDown, setShowDropDown] = useState(false);
    const [counter, setCounter] = useState(0);
    const [errorEmptyLink, setEmptyLinkError] = useState<boolean | null>(null);
    const [errorInvalidLink, setInvalidLinkError] = useState<boolean | null>(null);

    const changeDropDown = () => {
        if (!showDropDown){
            setCounter(counter + 1);
        } else {
            setCounter(counter - 1);
        }
        setShowDropDown(!showDropDown);
    }

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const updatedLinks = allLinks.map((link, idx) =>
            idx === indexLink
                ? {
                    ...link,
                    iconLink: newValue
                }
                : link
        );
        setAllLinks(updatedLinks);

        if (newValue.trim() === '') {
            setEmptyLinkError(true);
            setInvalidLinkError(null);
        } else if (!isValidUrl(newValue)) {
            setInvalidLinkError(true);
            setEmptyLinkError(null);
        } else {
            setEmptyLinkError(null);
            setInvalidLinkError(null);
        }
    }

    const removeLink = () => {
        const updatedLinks = allLinks.filter((_, idx) => idx !== indexLink);
        setAllLinks(updatedLinks);
    }

    return (
        <div className='w-full rounded-[12px] p-[20px] gap-[12px] bg-[#FAFAFA] flex flex-col'>
            <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-[8px] items-center'>
                    <div className='relative w-[12px] h-[6px]'>
                        <Image fill src='/dashboard/double.svg' alt='double horizontal lines in vector'/>
                    </div>
                    <h2 className='font-[700] text-[16px] leading-[24px] text-[#737373]'>{`Link #${indexLink + 1}`}</h2>
                </div>
                <button type='button' onClick={removeLink} className='text-[#737373] text-[16px] font-[400] leading-[24px]'>Remove</button>
            </div>
            <div className='w-full gap-[4px] flex flex-col'>
                <h3 className='text-[12px] leading-[18px] font-[400] text-[#333333] text-left'>Platform</h3>
                <button type='button' onClick={changeDropDown} className='w-full relative h-[48px] border-[1px] border-[#D9D9D9] rounded-[8px] px-[16px] flex items-center gap-[12px] hover:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] hover:border-[#633CFF]'>
                    <span
                    style={{
                        maskImage: `url('${allLinks[indexLink].iconUrl === '/social_icons/frontendmentor.svg' ? 'social_icons/frontendmentor_dark.svg' : allLinks[indexLink].iconUrl}')`,
                    }}
                    className='w-[16px] h-[16px] bg-[#737373]'
                    ></span>
                    <p className='flex-1 text-left font-[400] text-[16px] leading-[24px] text-[#333333]'>{allLinks[indexLink].iconName}</p>
                    <div className='w-[12px] h-[6px] relative'>
                        <Image fill src={`${(showDropDown) ? '/dashboard/arrow_up.svg' : '/dashboard/arrow_down.svg'}`} className='object-cover' alt='arrow pointing icon'/>
                    </div>
                    <div style={{display: (showDropDown) ? 'block' : 'none', zIndex: `${counter * 10}`}} className='absolute shadow-[0px_0px_32px_0px_#0000001A] w-full h-[343px] bg-[#FFFFFF] rounded-[8px] border-[1px] py-[12px] px-[16px] border-[#D9D9D9] top-[60px] left-0 overflow-y-auto'>
                        <div className='flex flex-col gap-[12px] w-full'>
                            {
                                dropDownOptions.map((dropDownOption, index) => {
                                    return (
                                        <DropDownOption               
                                        isBottom={index !== dropDownOptions.length - 1} 
                                        iconUrl={dropDownOption.iconUrl}
                                        iconName={dropDownOption.iconName} 
                                        key={index}
                                        indexLink={indexLink}
                                        allLinks={allLinks}
                                        setAllLinks={setAllLinks}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>      
                </button>
            </div>
            <div className='flex flex-col w-full gap-[4px]'>
                <h3 className='text-[12px] leading-[18px] font-[400] text-[#333333] text-left'>Link</h3>
                <div className={`${errorEmptyLink || errorInvalidLink ? '!border-[#FF3939]' : 'border-[#D9D9D9]'} flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] hover:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] hover:border-[#633CFF]`}>
                    <div className="w-[16px] h-[16px] relative flex-shrink-0">
                        <Image fill src='/dashboard/link.svg' alt="vector of a link"/>
                    </div>
                    <input
                        value={allLinks[indexLink].iconLink}
                        onChange={handleChange}            
                        required            
                        placeholder="e.g. https://www.github.com/johnappleseed"
                        className="outline-none h-[24px] w-full text-[16px] font-[400] leading-[24px] bg-transparent text-[#333] focus:caret-[#633CFF]"
                    />
                {errorEmptyLink && <p className="text-[#FF3939] flex-shrink-0 text-[12px] leading-[18px] min-w-fit">Can’t be empty</p>}
                {errorInvalidLink && <p className="text-[#FF3939] flex-shrink-0 text-[12px] leading-[18px] min-w-fit">Please check the URL</p>}
                </div>
            </div>
        </div>
    )
}
