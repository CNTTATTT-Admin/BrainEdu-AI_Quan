import { Outlet } from "react-router";
import AppHoc from "../hocs/appHocs";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 w-full flex flex-col relative">
        <div className="flex-1 w-full max-w-7xl py-4 mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
          <Outlet />
        </div>
        
        <div className="w-full mt-auto relative z-20 border-t border-gray-100 bg-white">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default AppHoc(MainLayout);