import React from 'react';
import { LinkContainerProps } from '@/app/contexts/linkcontext';

interface DropDownOptionProps extends LinkContainerProps {
  iconUrl: string;
  iconName: string;
  isBottom: boolean;
}

const iconUrlMapping: Record<string, string> = {
  'GitHub': '/social_icons/github.svg',
  'YouTube': '/social_icons/youtube.svg',
  'LinkedIn': '/social_icons/linkedin.svg',
  'Facebook': '/social_icons/facebook.svg',
  'Frontend Mentor': '/social_icons/frontendmentor.svg',
  'Hashnode': '/social_icons/hashnode.svg',
  'Stackoverflow': '/social_icons/stackoverflow.svg'
};

const backgroundColorMapping: Record<string, string> = {
  'GitHub': '#1A1A1A',
  'YouTube': '#EE3939',
  'LinkedIn': '#2D68FF',
  'Facebook': '#2442ac',
  'Frontend Mentor': '#d0d0d0',
  'Hashnode': '#0330d1',
  'Stackoverflow': '#ec7100'
};


export default function DropDownOption({ iconUrl, iconName, isBottom, indexLink, allLinks, setAllLinks }: DropDownOptionProps) {
    const setLink = () => {
        const updatedLinks = allLinks.map((link, idx) =>
          idx === indexLink
              ? {
                  ...link,
                  iconUrl: iconUrlMapping[iconName] || '',
                  iconName, 
                  backgroundColor: backgroundColorMapping[iconName] || ''
              }
              : link
      );
      setAllLinks(updatedLinks);
    }
    
    return (
      <>
          <button type='button' onClick={setLink} className='w-full flex flex-row gap-[12px] items-center group'>
              <span style={{maskImage: `url('${iconUrl}')`}} className='w-[16px] h-[16px] group-hover:bg-[#633CFF] bg-[#737373]'>
              </span>
              <p className='flex-1 text-left font-[400] text-[16px] leading-[24px] text-[#333333] group-hover:text-[#633CFF]'>{iconName}</p>
          </button>
          <div style={{display: (isBottom) ? 'block' : 'none'}} className='w-full h-[1px] bg-[#D9D9D9]'></div>
      </>
    )
}
