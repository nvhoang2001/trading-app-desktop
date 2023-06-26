import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
    return (
        <div>
            <Helmet>
                <title>Trading App</title>
            </Helmet>
            <div className="w-screen h-screen flex flex-col">
                <Header />
                <div className="flex-auto flex">
                    <Sidebar className="min-w-[15rem] bg-[#404e67] text-[#dcdcdc]" />
                    <main className="flex-auto overflow-auto bg-[#f6f7fb] p-3">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
