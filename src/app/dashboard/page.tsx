'use client'
import React from 'react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Links from '@/components/links';
import ProfileDetails from '@/components/profileDetails';
import Link from 'next/link';
import LinksProfileDetails from '@/components/linksprofiledetails';
import PhoneProfileDetails from '@/components/phoneprofiledetails';
import { AllLinksProps, linksContext } from '../contexts/linkcontext';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ProfileContext } from '../contexts/profilecontext';
import { signOut } from 'firebase/auth';

export default function DashBoard() {
    const [hoverUrl, setHoverUrl] = useState('/dashboard/user.svg');
    const [hoverLinkUrl, setHoverLinkUrl] = useState('/dashboard/link_onhover.svg');
    const [currenPage, setCurrentPage] = useState('links');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [allLinks, setAllLinks] = useState<AllLinksProps[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [imageURL, setImageURL] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/');
            } else {
                fetchUserData(user.uid);
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

    const fetchUserData = async (userId: string) => {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', userId);
        try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                setAllLinks(data.links || []);
                setFirstName(data.firstName || '');
                setLastName(data.lastName || '');
                setEmail(data.email || '');
                setImageURL(data.profileImage || null);
            } 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const isValidURL = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const saveLinksToDatabase = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const allLinksValid = allLinks.every(link => {
            const isNotEmpty = link.iconLink.trim() !== '';
            const isValid = isValidURL(link.iconLink);
            return isNotEmpty && isValid;
        });
    
        if (allLinksValid) {
            const user = auth.currentUser;
    
            if (user) {
                const userId = user.uid; // User ID from Firebase Authentication
                const db = getFirestore();
    
                try {
                    // Reference the user's document in the 'links' collection (or another suitable collection)
                    const userLinksDocRef = doc(db, 'users', userId);
    
                    // Create or update the document with the links data
                    await setDoc(userLinksDocRef, {
                        links: allLinks
                    }, { merge: true });
    
                    setNotificationMessage('Your changes have been successfully saved!');
                    setShowNotification(true);
                } catch (error) {
                    setNotificationMessage('Error saving links. Please try again.');
                    setShowNotification(true);
                }
            } else {
                setNotificationMessage('User not authenticated. Please log in.');
                setShowNotification(true);
            }
        } else {
            setNotificationMessage('You provided one or more invalid links');
            setShowNotification(true);
        }
    };

    const saveProfileToDatabase = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const user = auth.currentUser;
    
        if (user) {
            const userId = user.uid; // User ID from Firebase Authentication
            const db = getFirestore();
    
            try {
                // Reference the user's document in the 'users' collection
                const userDocRef = doc(db, 'users', userId);
    
                // Create or update the document with the profile data
                await setDoc(userDocRef, {
                    firstName,
                    lastName,
                    email
                }, { merge: true }); // Use merge: true to update existing fields or create the document if it doesn't exist
    
                setNotificationMessage('Your changes have been successfully saved!');
                setShowNotification(true);
            } catch (error) {
                setNotificationMessage('Error updating profile. Please try again.');
                setShowNotification(true);
            }
        } else {
            setNotificationMessage('User not authenticated. Please log in.');
            setShowNotification(true);
        }
    };

    const logUserOut = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            setNotificationMessage('Error logging out. Please try again.');
            setShowNotification(true);
        }
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
                                    <linksContext.Provider value={{ allLinks, setAllLinks, firstName, setFirstName, lastName, setLastName, email, setEmail, imageURL, setImageURL }}>
                                        <PhoneProfileDetails />
                                    </linksContext.Provider>
                                ) : (
                                    <linksContext.Provider value={{ allLinks, setAllLinks, firstName, setFirstName, lastName, setLastName, email, setEmail, imageURL, setImageURL }}>
                                        <LinksProfileDetails />
                                    </linksContext.Provider>
                                )
                            }
                        </div>
                    </section>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        if (currenPage === 'links') {
                            saveLinksToDatabase(event);
                        } else if (currenPage === 'profile') {
                            saveProfileToDatabase(event);
                        }
                    }} className='flex-grow rounded-[12px] bg-white flex flex-col'>
                        {
                            currenPage === 'links' ?
                            <linksContext.Provider value={{ allLinks, setAllLinks, firstName, setFirstName, lastName, setLastName, email, setEmail, imageURL, setImageURL }}>
                                <Links />
                            </linksContext.Provider>
                            : 
                            <ProfileContext.Provider value={{ firstName, setFirstName, lastName, setLastName, email, setEmail, imageURL, setImageURL }}>
                                <ProfileDetails />
                            </ProfileContext.Provider>
                        }
                        <div className='relative border-t-[1px] border-[#D9D9D9] px-[16px] phone:px-[40px] flex items-center justify-end py-[24px] w-full'>
                            <div style={{display: (allLinks.length > 0) || (email !== '' && firstName !== '' && lastName !== '') ? 'none': 'block'}} className='bg-transparent rounded-[8px] z-10 w-full phone:w-[91px] h-[46px] absolute'></div>
                            <button type='submit' style={{opacity: (allLinks.length > 0) || (email !== '' && firstName !== '' && lastName !== '') ? '1' : '0.25'}} className='active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] rounded-[8px] text-[white] text-[16px] leading-[24px] font-[600] hover:bg-[#BEADFF] bg-[#633CFF] w-full phone:w-[91px] h-[46px]'>
                                Save
                            </button>
                        </div>
                        <div className='px-[16px] phone:px-[40px] flex items-center justify-end'>
                            <button onClick={logUserOut} type='button'className='active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] rounded-[8px] text-[white] text-[16px] leading-[24px] font-[600] hover:opacity-[.7] w-full phone:w-[91px] h-[46px] bg-[#FF3939]'>
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <section style={{display: showNotification ? 'flex' : 'none'}} className='fixed w-full h-full z-30 flex items-end justify-center pb-[40px] px-[20px]'> 
                <div className='max-w-[406px] min-h-[56px] bg-[#333333] flex flex-row rounded-[12px] gap-[8px] py-[16px] px-[24px] shadow-[0px_0px_32px_0px_rgba(0,0,0,0.1)]'>
                    <div className='relative w-[20px] h-[20px] flex-shrink-0'>
                        <Image fill src='/dashboard/disk.svg' alt='vector of a floppy disk'/>
                    </div>
                    <p className='font-[600] text-[16px] leading-[24px] text-[#FAFAFA] text-center'>{notificationMessage}</p>
                </div>
            </section>
        </>
    );
}
