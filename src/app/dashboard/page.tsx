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

    const saveToDatabase = (event: React.FormEvent) => {
        event.preventDefault();
      }

    return (
        <>
            <header className="w-full p-0 phone:p-[24px] bg-white phone:bg-transparent">
                <div className='py-[16px] pr-[16px] pl-[24px] w-full rounded-t-none phone:rounded-t-[12px] rounded-b-[12px] bg-[#FFF] flex flex-row justify-between items-center'>
                    <div className='w-[146px] h-[32px] relative hidden phone:block'>
                        <Image fill src='/login/app_logo.svg' alt='logo of the app'/>
                    </div>
                    <div className='w-[32px] h-[32px] relative block phone:hidden'>
                        <Image fill src='/small_logo.svg' alt='logo of the app'/>
                    </div>
                    <div className='flex flex-row gap-[16px]'>
                        <button
                            onMouseOver={() => setHoverLinkUrl('/dashboard/link_onhover.svg')} 
                            onMouseLeave={() => currenPage !== 'links' && setHoverLinkUrl('/dashboard/link.svg')}
                            onClick={() => {setCurrentPage('links'); setHoverUrl('/dashboard/user.svg'); setHoverLinkUrl('/dashboard/link_onhover.svg')}}
                            style={{backgroundColor: currenPage === 'links' ? '#EFEBFF' : 'transparent'}}
                            className='rounded-[8px] flex flex-row h-[46px] w-fit px-[27px] minTablet:px-0 minTablet:w-[122px] items-center justify-center gap-[6px] group'>
                            <div className='relative w-[20px] h-[20px]'>
                                <Image fill src={hoverLinkUrl} alt='illustration of a link'/>
                            </div>
                            <p 
                                style={{color: currenPage === 'links' ? '#633CFF' : '#737373'}}
                                className='font-[600] text-[16px] leading-[24px] group-hover:!text-[#633CFF] hidden minTablet:block'>
                                Links
                            </p>
                        </button>
                        <button                          
                            onMouseOver={() => setHoverUrl('/dashboard/user_onhover.svg')} 
                            onMouseLeave={() => currenPage !== 'profile' && setHoverUrl('/dashboard/user.svg')}
                            onClick={() => {setCurrentPage('profile'); setHoverUrl('/dashboard/user_onhover.svg'); setHoverLinkUrl('/dashboard/link.svg')}}
                            style={{backgroundColor: currenPage === 'profile' ? '#EFEBFF' : 'transparent'}}
                            className="px-[27px] minTablet:px-0 w-fit minTablet:w-[187px] h-[46px] rounded-[8px] flex flex-row justify-center items-center gap-[8px] group">
                            <div className="relative w-[20px] h-[20px]">
                                <Image fill src={hoverUrl} alt="user icon" />
                            </div>
                            <p 
                                style={{color: currenPage === 'profile' ? '#633CFF' : '#737373'}}
                                className="font-[600] text-[16px] leading-[24px] group-hover:!text-[#633CFF] hidden minTablet:block">
                                Profile Details
                            </p>
                        </button>
                    </div>
                    <Link href='/preview' className='w-fit px-[16px] minTablet:px-0 minTablet:w-[114px] h-[46px] flex justify-center items-center rounded-[8px] hover:bg-[#EFEBFF] border-[1px] border-[#633CFF] text-[#633CFF] text-[16px] leading-[24px] font-[600]'>
                        <p className='minTablet:block hidden'>Preview</p>
                        <span className='block minTablet:hidden w-[20px] h-[20px] relative'>
                            <Image fill src='/eye.svg' className='object-cover' alt='vector of an eye'/>
                        </span>
                    </Link>
                </div>
            </header>
            <main className='w-full flex justify-center'>
                <div className="w-full max-w-[1349px] pt-[16px] phone:pt-0 px-[16px] phone:px-[24px] pb-[16px] phone:pb-[24px] flex flex-col minLaptop:flex-row gap-[24px]">
                    <section className='p-[24px] min-w-[506px] h-[834px] hidden tablet:flex justify-center items-center flex-shrink-0 rounded-[12px] bg-white'>
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
                    <form onSubmit={saveToDatabase} className='flex-grow rounded-[12px] bg-white flex flex-col'>
                        {
                            currenPage === 'links' ?
                            <linksContext.Provider value={[allLinks, setAllLinks]}>
                                <Links />
                            </linksContext.Provider>
                            : 
                            <ProfileDetails />
                        }
                        <div className='relative border-t-[1px] border-[#D9D9D9] px-[16px] phone:px-[40px] flex items-center justify-end py-[24px] w-full'>
                            <div style={{display: (allLinks.length > 0) ? 'none': 'block'}} className='bg-transparent rounded-[8px] z-10 w-full phone:w-[91px] h-[46px] absolute'></div>
                            <button type='submit' style={{opacity: (allLinks.length > 0) ? '1' : '0.25'}} className='active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] rounded-[8px] text-[white] text-[16px] leading-[24px] font-[600] hover:bg-[#BEADFF] bg-[#633CFF] w-full phone:w-[91px] h-[46px]'>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

