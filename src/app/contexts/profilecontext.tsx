import { createContext, Dispatch, SetStateAction } from 'react';

interface ProfileContextType {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    imageURL: string | null;
    setImageURL: Dispatch<SetStateAction<string | null>>; 
}

export const ProfileContext = createContext<ProfileContextType>({
    firstName: '',
    setFirstName: () => {},
    lastName: '',
    setLastName: () => {},
    email: '',
    setEmail: () => {},
    imageURL: null,
    setImageURL: () => {},
});
