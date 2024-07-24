'use client'
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { FirebaseError } from "firebase/app";

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setEmailError] = useState<boolean | null>(null);
    const [errorEmailExists, setEmailExistsError] = useState<boolean | null>(null);
    const [errorPassword, setPasswordError] = useState<boolean | null>(null);
    const [errorPasswordLength, setPasswordLengthError] = useState<boolean | null>(null);
    const [errorConfirmPassword, setConfirmPasswordError] = useState<boolean | null>(null);
    

    const createUserAccount = async (event: React.FormEvent) => {
      event.preventDefault();

      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
      setPasswordLengthError(null);
      setEmailExistsError(null);

      if (password.length < 8) {
        setPasswordLengthError(true);
        return;
      } 

      if (password !== confirmPassword) {
        setConfirmPasswordError(true);
        return;
      }
      
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/invalid-email':
                setEmailError(true);
                break;
            case 'auth/email-already-in-use':
                setEmailExistsError(true);
                break;
            case 'auth/weak-password':
                setPasswordError(true);
                break;
            default:
              setEmailError(true);
              setPasswordError(true);
          }
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    }

    return (
      <main className="w-full min-h-screen h-full flex flex-col justify-center items-center py-0 phone:py-[20px]">
        <div className="w-full justify-center hidden phone:flex ">
          <div className="w-[183px] h-[40px] relative">
            <Image fill src='/login/app_logo.svg' alt="logo of the app"/>
          </div>
        </div>
        <section className="mt-0 phone:mt-[51px] p-[32px] phone:p-[40px] flex flex-col gap-[64px] phone:gap-[40px] bg-[#FFF] rounded-none phone:rounded-[12px] min-h-screen phone:min-h-0 w-full h-full phone:h-fit phone:w-fit">
          <div className="w-[183px] h-[40px] relative flex phone:hidden">
            <Image fill src='/login/app_logo.svg' alt="logo of the app"/>
          </div>
          <div className="flex flex-col">
            <h1 className="font-[700] text-[32px] leading-[48px] mb-[8px] text-[#333]">Create account</h1>
            <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Let&apos;s get you started sharing your links!</p>
          </div>
          <form onSubmit={createUserAccount} className="flex flex-col gap-[24px] w-full phone:w-[396px]">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Email address</label>
              <div className={`${errorEmail ? '!border-[#FF3939]' : 'border-[#D9D9D9]'} flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]`}>
                <div className="w-[16px] h-[16px] relative">
                  <Image fill src='/login/mail.svg' alt="vector of a mail"/>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@email.com"
                  required
                  className="outline-none h-[24px] bg-transparent flex-1 text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                />
                {errorEmail && <p className="text-[#FF3939] text-[12px] leading-[18px]">Invalid email address</p>}
                {errorEmailExists && <p className="text-[#FF3939] text-[12px] leading-[18px]">Already Exists</p>}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Create Password</label>
              <div className={`${errorPassword || errorPasswordLength ? '!border-[#FF3939]' : 'border-[#D9D9D9]'} flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]`}>
                <div className="w-[16px] h-[16px] relative">
                  <Image fill src='/login/lock.svg' alt="vector of a lock"/>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="outline-none bg-transparent h-[24px] flex-1 text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                />
                {errorPassword && <p className="text-[#FF3939] text-[12px] leading-[18px]">Weak Password</p>}
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Confirm password</label>
              <div className={`${errorConfirmPassword ? '!border-[#FF3939]' : 'border-[#D9D9D9]'} flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]`}>
                <div className="w-[16px] h-[16px] relative">
                  <Image fill src='/login/lock.svg' alt="vector of a lock"/>
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="outline-none bg-transparent h-[24px] flex-1 text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                />
                {errorConfirmPassword && <p className="text-[#FF3939] text-[12px] leading-[18px]">Doesn&apos;t match</p>}
              </div>
            </div>
            <p className={`${errorPasswordLength ? 'text-[#FF3939]' : 'text-[#737373]'} font-[400] text-[12px] leading-[18px]`}>Password must contain at least 8 characters</p>
            <button type='submit' className="hover:bg-[#BEADFF] active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] px-[27px] py-[11px] rounded-[8px] flex justify-center items-center w-full bg-[#633CFF] text-[16px] font-[600] leading-[24px] text-[#FFF]">Create new account</button>
            <p className="text-[16px] w-full text-center font-[400] leading-[24px] text-[#737373]">Already have an account? <Link href='/' className="text-[#633CFF] hover:text-[#BEADFF]">Login</Link></p>
          </form>
        </section>
      </main>
    );
}
