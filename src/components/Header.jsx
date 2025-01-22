import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

import { useNotifications } from "@/hooks/useNotifications";

export const Header = () => {
  const [isRead, setIsRead] = useState(true);

  const { notificationIsRead } = useNotifications();
  const { data, isLoading } = notificationIsRead();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setIsRead(data.isRead);
    }
  }, [isLoading, data]);

  return (
    <section className="fixed top-0 w-full h-14 flex justify-center bg-zinc-950 z-10">
      <header className="max-w-md w-full h-full flex items-center justify-between px-3">
        <h1 className="text-2xl font-bold text-zinc-50">LifeShots</h1>
        <button
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}>
          <Bell size={21} />
          {!isRead && (
            <div className="absolute top-3 right-4 w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full animate-ping bg-red-600" />
              <span className="absolute w-2 h-2 rounded-full bg-red-600" />
            </div>
          )}
        </button>
      </header>
    </section>
  );
};
