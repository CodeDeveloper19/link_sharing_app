'use client'
import { useEffect, useState } from 'react';
import LinkBox from '@/components/linkbox';
import Image from 'next/image';

const ViewUser = () => {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const parseQueryParams = () => {
            // Get the current URL
            const url = new URL(window.location.href);
            const queryParams = new URLSearchParams(url.search);
            
            // Extract query parameters
            const userData = {
                firstName: queryParams.get('firstName') || '',
                lastName: queryParams.get('lastName') || '',
                email: queryParams.get('email') || '',
                imageURL: queryParams.get('imageURL') || '',
                links: JSON.parse(queryParams.get('links') || '[]') || []
            };
            setUserData(userData);
        };

        parseQueryParams();
    }, []);

    if (!userData) return <div></div>;

    return (
        <>
            <div className='hidden phone:block w-full absolute top-0 z-0 bg-[#633CFF] rounded-b-[32px] h-[357px]'></div>
            <main className='w-full flex justify-center z-10 mb-0 phone:mb-[200px]'>
                <div className='w-full max-w-none phone:max-w-[349px] relative top-0 phone:top-[90px] rounded-none phone:rounded-[24px] gap-[8px] py-[48px] px-[56px] bg-white phone:shadow-[0_0_32px_0_#0000001A]'>
                    <div className='flex flex-col gap-[56px] w-full'>
                        <div className='w-full gap-[25px] flex flex-col items-center'>
                            <div className='relative rounded-full w-[104px] h-[104px] border-[4px] border-[#633CFF]'>
                                <Image unoptimized fill src={userData.imageURL || '/default_image.png'} className='object-cover rounded-full' alt='User image'/>
                            </div>
                            <div className='flex flex-col gap-[8px] text-center'>
                                <h1 className='font-[700] text-[32px] leading-[48px] text-[#333333]'>{userData.firstName} {userData.lastName}</h1>
                                <p className='font-[400] text-[16px] leading-[24px] text-[#737373]'>{userData.email}</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[20px] w-full phone:w-[237px]'>
                            {userData.links.map((link: any, index: number) => (
                                <LinkBox
                                    key={index}
                                    height='56px'
                                    textHeight='16px'
                                    backgroundColor={link.backgroundColor}
                                    iconLink={link.iconLink}
                                    iconName={link.iconName}
                                    iconUrl={link.iconUrl}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ViewUser;
