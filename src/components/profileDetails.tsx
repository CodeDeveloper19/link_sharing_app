import React from 'react';
import IsImage from './image';
import IsNoImage from './no_image';

export default function ProfileDetails() {
  return (
        <div className='p-[16px] phone:p-[40px] flex flex-col gap-[40px]'>
            <div className='flex flex-col gap-[8px]'>
                <h1 className='font-[700] text-[32px] leading-[48px] text-[#333333]'>Profile Details</h1>
                <p className='font-[400] text-[16px] leading-[24px] text-[#737373]'>Add your details to create a personal touch to your profile.</p>
            </div>
            <div className='flex flex-col gap-[24px] w-full'>
                <div className='rounded-[12px] flex flex-col p-[20px] gap-[12px] bg-[#FAFAFA] w-full'>
                    <div className='flex flex-col minTablet:flex-row minLaptop:flex-col laptop:flex-row gap-[16px] w-full justify-between items-start minTablet:items-center minLaptop:items-start laptop:items-center'>
                        <p className='font-[400] text-[16px] leading-[24px] text-[#737373] text-left'>Profile picture</p>
                        <div className='flex flex-col minTablet:flex-row gap-[24px] items-start minTablet:items-center'>
                            {
                                <IsImage />
                                // <IsNoImage/>
                            }
                            <p className='font-[400] text-[12px] leading-[18px] text-[#737373] text-left max-w-[215px]'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                        </div>
                    </div>
                </div>
                <div className='rounded-[12px] flex flex-col p-[20px] gap-[12px] bg-[#FAFAFA] w-full'>
                    <div className='flex flex-row gap-[16px] w-full justify-between items-center'>
                        <p className='flex-shrink-0 text-left font-[400] text-[16px] leading-[24px] text-[#737373]'>First name*</p>
                        <div className="flex-grow flex flex-row w-full max-w-[432px] h-[48px] items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
                            <input
                                placeholder="e.g. John"
                                required
                                className="outline-none bg-transparent h-[24px] w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-[16px] w-full justify-between items-center'>
                        <p className='flex-shrink-0 text-left font-[400] text-[16px] leading-[24px] text-[#737373]'>Last name*</p>
                        <div className="flex-grow flex flex-row w-full max-w-[432px] h-[48px] items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
                            <input
                                placeholder="e.g. Appleseed"
                                required
                                className="outline-none bg-transparent h-[24px] w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                            />
                        </div>
                    </div>
                    <div className='flex flex-row gap-[16px] w-full justify-between items-center'>
                        <p className='flex-shrink-0 text-left font-[400] text-[16px] leading-[24px] text-[#737373]'>Email</p>
                        <div className="flex-grow flex flex-row w-full max-w-[432px] h-[48px] items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
                            <input
                                placeholder="e.g. email@example.com"
                                required
                                className="outline-none bg-transparent h-[24px] w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
