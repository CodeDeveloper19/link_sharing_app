'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 

    const loginAccount = (event: React.FormEvent) => {
      event.preventDefault();
      router.push("/dashboard");
    }

    return (
      <main className="w-full min-h-screen h-full flex flex-col justify-center items-center py-0 phone:py-[20px]">
        <div className="w-full hidden phone:flex justify-center">
          <div className="w-[183px] h-[40px] relative">
            <Image fill src='/login/app_logo.svg' alt="logo of the app"/>
          </div>
        </div>
        <section className="mt-0 phone:mt-[51px] p-[32px] phone:p-[40px] flex flex-col gap-[64px] phone:gap-[40px] bg-[#FFF] rounded-none phone:rounded-[12px] min-h-screen phone:min-h-0 w-full h-full phone:h-fit phone:w-fit">
          <div className="w-[183px] h-[40px] relative flex phone:hidden">
            <Image fill src='/login/app_logo.svg' alt="logo of the app"/>
          </div>
          <div className="flex flex-col">
            <h1 className="font-[700] text-[32px] leading-[48px] mb-[8px] text-[#333]">Login</h1>
            <p className="text-[16px] font-[400] leading-[24px] text-[#737373]">Add your details below to get back into the app</p>
          </div>
          <form className="flex flex-col gap-[24px] w-full phone:w-[396px]">
            <div className="flex flex-col gap-[4px]">
              <label className="text-[12px] leading-[18px] font-[400] text-[#333]">Email address</label>
              <div className="flex flex-row items-center py-[12px] px-[16px] gap-[12px] rounded-[8px] border-[1px] border-[#D9D9D9] focus-within:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] focus-within:border-[#633CFF]">
                <div className="w-[16px] h-[16px] relative">
                  <Image fill src='/login/mail.svg' alt="vector of a mail"/>
                </div>
                <input
                  placeholder="e.g. alex@email.com"
                  required
                  className="outline-none h-[24px] bg-transparent w-full text-[16px] font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
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
                  required
                  placeholder="Enter your password"
                  className="outline-none h-[24px] w-full text-[16px] bg-transparent font-[400] leading-[24px] text-[#333] focus:caret-[#633CFF]"
                />
              </div>
            </div>
            <button onSubmit={loginAccount} className="hover:bg-[#BEADFF] active:shadow-[0_0_32px_0_rgba(99,60,255,0.25)] px-[27px] py-[11px] rounded-[8px] flex justify-center items-center w-full bg-[#633CFF] text-[16px] font-[600] leading-[24px] text-[#FFF]">Login</button>
            <p className="text-[16px] w-full text-center font-[400] leading-[24px] text-[#737373]">Don&apos;t have an account? <Link href='/signup' className="text-[#633CFF] hover:text-[#BEADFF]">Create account</Link></p>
          </form>
        </section>
      </main>
    );
}
