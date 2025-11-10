import { Outlet, useLocation } from 'react-router';
import HomeButton from '../HomeButton';

const Layout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-stone-100">
      <main>
        {location.pathname !== '/' && <HomeButton />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;