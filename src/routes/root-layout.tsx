import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen min-w-68.75 flex bg-background md:flex-row flex-col-reverse">
      <Outlet />
    </div>
  );
};
