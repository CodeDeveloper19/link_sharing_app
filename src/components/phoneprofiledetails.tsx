'use client';
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { linksContext } from '@/app/contexts/linkcontext';
import LinkBox from './linkbox';
import LinksProfileDetails from './linksprofiledetails';

export default function PhoneProfileDetails() {
    const [allLinks] = useContext(linksContext);
    const [userImageLink, setUserImageLink] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
    }, []);

    return (
        userImageLink === '' && userFirstName === '' && userLastName === '' && userEmail === '' ? (
            <LinksProfileDetails />
        ) : (
            <div className='relative w-[237px] h-[514px] flex flex-col gap-[56px] top-[5px] bg-white'>
                <div className='flex flex-col gap-[25px] items-center'>
                    <div className={`${userImageLink === '' ? 'hidden' : 'block'} rounded-full w-[96px] h-[96px] relative border-[4px] bg-[#EEEEEE] border-[#633CFF]`}>
                        <Image fill src={userImageLink} className='rounded-full object-cover' alt='image of user'/>
                    </div>
                    <div className='flex flex-col max-w-[123px] gap-[8px] text-center'>
                        <h2 className={`${userImageLink === '' ? 'hidden' : 'block'} font-[600] text-[18px] leading-[27px] text-[#333333]`}>
                            {`${userFirstName} ${userLastName}`}
                        </h2>
                        <p className={`${userImageLink === '' ? 'hidden' : 'block'} font-[400] text-[14px] leading-[21px] text-[#737373]`}>
                            {userEmail}
                        </p>
                    </div>
                </div>
                <div className='w-full gap-[20px] flex flex-col'>
                    {allLinks.map((link, index) => (
                        <LinkBox
                            key={index}
                            height='44px'
                            textHeight='12px'
                            backgroundColor={link.backgroundColor}
                            iconLink={link.iconLink}
                            iconName={link.iconName}
                            iconUrl={link.iconUrl} 
                        />
                    ))}
                </div>
            </div>
        )
    );
}
