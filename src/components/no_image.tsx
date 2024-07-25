import React, { useState } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../firebase'; 
import { auth } from '../../firebase'; 

interface IsNoImageProps {
  imageURL: string | null;
  setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function IsNoImage({ imageURL, setImageURL }: IsNoImageProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const user = auth.currentUser;
    const userId = user?.uid; 

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && userId) {
            setUploading(true);
            setError(null); 

            const storage = getStorage(app);
            const storageRef = ref(storage, `user_images/${userId}/${file.name}`);

            try {
                // Upload the file
                await uploadBytes(storageRef, file);
                // Get the download URL
                const url = await getDownloadURL(storageRef);
                setImageURL(url);

                // Update Firestore with the image URL or create the document if it does not exist
                const db = getFirestore(app);
                const userDocRef = doc(db, 'users', userId); 
                await setDoc(userDocRef, { profileImage: url }, { merge: true });

            } catch (error) {
                setError('Upload failed. Please try again.');
            } finally {
                setUploading(false);
            }
        } else if (!userId) {
            setError('User not authenticated. Please log in.');
        }
    };

    return (
        <div>
            <button
                type='button'
                className='relative rounded-[12px] w-[193px] h-[193px] bg-[#EFEBFF] flex items-center justify-center flex-shrink-0'>
                <div className={`${imageURL ? 'block' : 'hidden'} opacity-[.50] bg-[black] z-10 absolute w-full h-full rounded-[12px]`}></div>
                <div className={`${imageURL ? 'block' : 'hidden'}  absolute w-full h-full z-0`}>
                    <Image fill unoptimized src={imageURL ?? ''} className='object-cover rounded-[12px]' alt="user's image"/>
                </div>
                <div className='max-w-[116px] gap-[8px] flex flex-col items-center z-20'>
                    <div className='w-[40px] h-[40px] relative'>
                        <Image fill src={`${(imageURL) ? '/dashboard/image_bland.svg' : '/dashboard/image.svg'}`} alt='illustration of image'/>
                    </div>
                    <p className={`font-[600] text-[16px] leading-[24px] ${imageURL ? 'text-white' : 'text-[#633CFF]'}`}>
                        {uploading ? 'Uploading...' : (imageURL) ? 'Change Image' : '+ Upload Image'}
                    </p>
                </div>
                <input
                    type='file'
                    accept='image/*'
                    className='z-20'
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id='file-input'
                />
                <label htmlFor='file-input' className='absolute inset-0 cursor-pointer z-20'>
                    <span className={`sr-only text-white`}>Upload Image</span>
                </label>
            </button>
            {error && <p className='text-[#FF3939] text-[16px] leading-[24px] font-[400]'>{error}</p>}
        </div>
    );
}
