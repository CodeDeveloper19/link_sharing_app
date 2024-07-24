import Image from "next/image";
import { Instrument_Sans } from 'next/font/google';
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen h-full flex flex-col justify-center items-center py-[20px]">
      <div className="w-full flex justify-center">
        <div className="w-[183px] h-[40px] relative">
          <Image fill src='/login/app_logo.svg' alt="logo of the app"/>
        </div>
      </div>
      <section className="mt-[51px] p-[40px] flex flex-col gap-[40px] bg-[#FFF] rounded-[12px]">
        <div className="flex flex-col">
          <h1 className="font-[700] text-[32px] leading-[48px] mb-[8px] text-[#333]">Login</h1>
          <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Add your details below to get back into the app</p>
        </div>
        <form className="flex flex-col gap-[24px] w-[396px]">
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Email address</label>
            <div className="flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
              <div className="w-[16px] h-[16px] relative">
                <Image fill src='/login/mail.svg' alt="vector of a mail"/>
              </div>
              <input
                placeholder="e.g. alex@email.com"
                className="outline-none h-[24px] w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[4px]">
            <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Password</label>
            <div className="flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
              <div className="w-[16px] h-[16px] relative">
                <Image fill src='/login/lock.svg' alt="vector of a lock"/>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="outline-none h-[24px] w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
              />
            </div>
          </div>
          <button className="hover:bg-[#BEADFF] active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] px-[27px] py-[11px] rounded-[8px] flex justify-center items-center w-full bg-[#633CFF] text-[16px] font-[600] leading-[24px] text-[#FFF]">Login</button>
          <p className="text-[16px] w-full text-center font-[400] leading-[24px] text-[#737373]">Don&apos;t have an account? <Link href='/signup' className="text-[#633CFF] hover:text-[#BEADFF]">Create account</Link></p>
        </form>
      </section>
    </main>
  );
}
