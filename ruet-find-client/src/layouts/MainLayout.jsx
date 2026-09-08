import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import MobileNav from '../components/navbar/MobileNav';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full max-w-[1400px] mx-auto">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
