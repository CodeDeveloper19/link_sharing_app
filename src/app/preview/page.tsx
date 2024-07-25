'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LinkBox from '@/components/linkbox';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../firebase'; 


export default function Preview() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/'); 
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const copyToClipBoard = async () => {
        const textToCopy = "This is the text to copy";

        try {
            await navigator.clipboard.writeText(textToCopy);
            setNotificationMessage("The link has been copied to your clipboard!");
            setShowNotification(true);
        } catch (err) {
            setNotificationMessage("Failed to copy link.");
            setShowNotification(true);
        }
    };

    return (
        <>
            <header className='w-full p-0 phone:p-[24px] gap-[8px] z-10 bg-white phone:bg-transparent'>
                <div className='w-full py-[16px] pr-[16px] pl-[24px] gap-[8px] rounded-t-none phone:rounded-t-[12px] rounded-b-[12px] bg-white'>
                    <div className='w-full flex flex-row justify-between'>
                        <Link href='/dashboard' className='hover:bg-[#EFEBFF] border-[1px] border-[#633CFF] w-[159px] h-[46px] flex items-center justify-center gap-[8px] rounded-[8px] text-[16px] leading-[24px] font-[600] text-[#633CFF]'>
                            Back to Editor
                        </Link>
                        <button onClick={copyToClipBoard} className='active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] rounded-[8px] text-[white] text-[16px] leading-[24px] font-[600] hover:bg-[#BEADFF] bg-[#633CFF] w-[159px] phone:w-[133px] h-[46px]'>
                            Share Link
                        </button>
                    </div>
                </div>
            </header>
            <div className='hidden phone:block w-full absolute top-0 z-0 bg-[#633CFF] rounded-b-[32px] h-[357px]'></div>
            <main className='w-full flex justify-center z-10 mb-0 phone:mb-[200px]'>
                <div className='w-full max-w-none phone:max-w-[349px] relative top-0 phone:top-[90px] rounded-none phone:rounded-[24px] gap-[8px] py-[48px] px-[56px] bg-white phone:shadow-[0_0_32px_0_#0000001A]'>
                    <div className='flex flex-col gap-[56px] w-full'>
                        <div className='w-full gap-[25px] flex flex-col items-center'>
                            <div className='relative rounded-full w-[104px] h-[104px] border-[4px] border-[#633CFF]'>
                                <Image fill src='/dashboard/testing.jpg' className='object-cover rounded-full' alt='image of user'/>
                            </div>
                            <div className='flex flex-col max-w-[173px] gap-[8px] text-center'>
                                <h1 className='font-[700] text-[32px] leading-[48px] text-[#333333]'>Ben Wright</h1>
                                <p className='font-[400] text-[16px] leading-[24px] text-[#737373]'>ben@example.com</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[20px] w-[237px]'>
                            {/* <LinkBox height='56px' textHeight='16px' />
                            <LinkBox height='56px'/>
                            <LinkBox height='56px'/> */}
                        </div>
                    </div>
                </div>
            </main>
            <section style={{display: showNotification ? 'flex' : 'none'}} className='fixed w-full h-full z-30 flex items-end justify-center pb-[40px] px-[20px]'> 
                <div className='max-w-[406px] min-h-[56px] bg-[#333333] flex flex-row rounded-[12px] gap-[8px] py-[16px] px-[24px] shadow-[0px_0px_32px_0px_rgba(0,0,0,0.1)]'>
                    <div className='relative w-[20px] h-[20px] flex-shrink-0'>
                        <Image fill src='/dashboard/link_dark.svg' alt='vector of a floppy disk'/>
                    </div>
                    <p className='font-[600] text-[16px] leading-[24px] text-[#FAFAFA] text-center'>{notificationMessage}</p>
                </div>
            </section>
        </>
    )
}
