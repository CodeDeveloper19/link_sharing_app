'use client'
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Links from '@/components/links';
import ProfileDetails from '@/components/profileDetails';
import Link from 'next/link';
import LinksProfileDetails from '@/components/linksprofiledetails';
import PhoneProfileDetails from '@/components/phoneprofiledetails';
import { AllLinksProps, linksContext } from '../contexts/linkcontext';

export default function DashBoard() {
    const [hoverUrl, setHoverUrl] = useState('/dashboard/user.svg');
    const [hoverLinkUrl, setHoverLinkUrl] = useState('/dashboard/link_onhover.svg');
    const [currenPage, setCurrentPage] = useState('links');
    const [allLinks, setAllLinks] = useState<AllLinksProps[]>([]);

    return (
        <>
            <header className="w-full p-[24px]">
                <div className='py-[16px] pr-[16px] pl-[24px] w-full rounded-[12px] bg-[#FFF] flex flex-row justify-between items-center'>
                    <div className='w-[146px] h-[32px] relative'>
                        <Image fill src='/login/app_logo.svg' alt='logo of the app'/>
                    </div>
                    <div className='flex flex-row gap-[16px]'>
                        <button
                            onMouseOver={() => setHoverLinkUrl('/dashboard/link_onhover.svg')} 
                            onMouseLeave={() => currenPage !== 'links' && setHoverLinkUrl('/dashboard/link.svg')}
                            onClick={() => {setCurrentPage('links'); setHoverUrl('/dashboard/user.svg'); setHoverLinkUrl('/dashboard/link_onhover.svg')}}
                            style={{backgroundColor: currenPage === 'links' ? '#EFEBFF' : 'transparent'}}
                            className='rounded-[8px] flex flex-row h-[46px] w-[122px] items-center justify-center gap-[6px] group'>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image fill src={hoverLinkUrl} alt='illustration of a link'/>
                            </div>
                            <p 
                                style={{color: currenPage === 'links' ? '#633CFF' : '#737373'}}
                                className='font-[600] text-[16px] leading-[24px] group-hover:!text-[#633CFF]'>
                                Links
                            </p>
                        </button>
                        <button                          
                            onMouseOver={() => setHoverUrl('/dashboard/user_onhover.svg')} 
                            onMouseLeave={() => currenPage !== 'profile' && setHoverUrl('/dashboard/user.svg')}
                            onClick={() => {setCurrentPage('profile'); setHoverUrl('/dashboard/user_onhover.svg'); setHoverLinkUrl('/dashboard/link.svg')}}
                            style={{backgroundColor: currenPage === 'profile' ? '#EFEBFF' : 'transparent'}}
                            className="w-[187px] h-[46px] rounded-[8px] flex flex-row justify-center items-center gap-[8px] group">
                            <div className="relative w-[20px] h-[20px]">
                                <Image fill src={hoverUrl} alt="user icon" />
                            </div>
                            <p 
                                style={{color: currenPage === 'profile' ? '#633CFF' : '#737373'}}
                                className="font-[600] text-[16px] leading-[24px] group-hover:!text-[#633CFF]">
                                Profile Details
                            </p>
                        </button>
                    </div>
                    <Link href='/preview' className='w-[114px] h-[46px] flex justify-center items-center rounded-[8px] hover:bg-[#EFEBFF] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px] leading-[24px] font-[600]'>
                        Preview
                    </Link>
                </div>
            </header>
            <main className='w-full flex justify-center'>
                <div className="w-full max-w-[1349px] px-[24px] pb-[24px] flex flex-row gap-[24px]">
                    <section className='p-[24px] min-w-[506px] h-[834px] flex justify-center items-center flex-shrink-0 rounded-[12px] bg-white'>
                        <div className='w-[307px] h-[631px] relative flex items-center justify-center'>
                            <Image fill src='/dashboard/phone.svg' alt='illustration of a phone'/>
                            {
                                currenPage === 'profile' ? (
                                    <linksContext.Provider value={[allLinks, setAllLinks]}>
                                        <PhoneProfileDetails />
                                    </linksContext.Provider>
                                ) : (
                                    <linksContext.Provider value={[allLinks, setAllLinks]}>
                                        <LinksProfileDetails />
                                    </linksContext.Provider>
                                )
                            }
                        </div>
                    </section>
                    <section className='flex-grow min-h-full rounded-[12px] bg-white flex flex-col'>
                        {
                            currenPage === 'links' ?
                            <linksContext.Provider value={[allLinks, setAllLinks]}>
                                <Links />
                            </linksContext.Provider>
                            : 
                            <ProfileDetails />
                        }
                        <div className='relative border-t-[1px] border-[#D9D9D9] px-[40px] flex items-center justify-end py-[24px] w-full'>
                            <div style={{display: (allLinks.length > 0) ? 'none': 'block'}} className='bg-transparent rounded-[8px] z-10 w-[91px] h-[46px] absolute'></div>
                            <button style={{opacity: (allLinks.length > 0) ? '1' : '0.25'}} className='active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] rounded-[8px] text-[white] text-[16px] leading-[24px] font-[600] hover:bg-[#BEADFF] bg-[#633CFF] w-[91px] h-[46px]'>
                                Save
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

