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

type LinksContextType = {
    allLinks: AllLinksProps[];
    setAllLinks: React.Dispatch<React.SetStateAction<AllLinksProps[]>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    imageURL: string | null;
    setImageURL: React.Dispatch<React.SetStateAction<string | null>>;
};

export const linksContext = createContext<LinksContextType>({
    allLinks: [],
    setAllLinks: () => {},
    firstName: '',
    setFirstName: () => {},
    lastName: '',
    setLastName: () => {},
    email: '',
    setEmail: () => {},
    imageURL: null,
    setImageURL: () => {}
});

