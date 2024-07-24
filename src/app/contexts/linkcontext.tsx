import React, { createContext } from 'react';

export interface AllLinksProps {
    iconUrl: string;
    iconName: string;
    backgroundColor: string;
    iconLink: string;
}

export interface LinkContainerProps {
    indexLink: number;
    allLinks: AllLinksProps[];
    setAllLinks: React.Dispatch<React.SetStateAction<AllLinksProps[]>>;
}

type LinksContextType = [AllLinksProps[], React.Dispatch<React.SetStateAction<AllLinksProps[]>>];

export const linksContext = createContext<LinksContextType>([[], () => {}]);
