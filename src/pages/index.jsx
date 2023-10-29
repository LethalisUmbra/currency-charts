import Currencies from "@/components/currencies";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-12 px-5 gap-5 bg-gray-900 text-white ${font.className}`}
    >
      <h1 className='text-4xl lg:text-5xl font-light'>Currencies</h1>
      <div className='w-4/5 h-px bg-white' />
      <Currencies />
      <footer className='bg-neutral-800 text-gray-200 text-xs p-2 text-center w-full'>
        Developed by LethalisUmbra
      </footer>
    </main>
  );
}
