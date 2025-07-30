
import Footer from "@/app/[locale]/components/Footer/Footer";
import { Header } from "@/app/[locale]/components/Header/Header";
import { Hero } from "@/app/[locale]/components/Hero/Hero";
import { Market } from "@/app/[locale]/components/Market/Market";
import { Trading } from "@/app/[locale]/components/Trading/Trading";


export default function Home() {
  return (
    <main className='min-h-screen'>
      <Header />
       <Hero />
      <Trading />
      <Market />
      <Footer /> 
    </main>
  );
}
