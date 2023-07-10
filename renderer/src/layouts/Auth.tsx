import ParticleBackground from '@/components/shared/ParticleBackground';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen relative">
            <ParticleBackground className="absolute top-0 left-0 w-full h-full -z-10" />
            <main className="relative z-0">
                <div className="w-full rounded-2xl">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AuthLayout;
