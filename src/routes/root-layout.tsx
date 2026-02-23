import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <Outlet />
    </div>
  );
};
