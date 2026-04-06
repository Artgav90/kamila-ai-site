import { Outlet, useLocation } from "react-router-dom";
import AppHeaderBar from "../components/AppHeaderBar";
import BottomNav from "../components/BottomNav";
import InstallPromptCard from "../components/InstallPromptCard";

function AppLayout() {
  const location = useLocation();
  const isWelcome = location.pathname.startsWith("/welcome");
  const isHome = location.pathname === "/home";
  const isSchedule = location.pathname === "/schedule";
  const isProfile = location.pathname === "/profile";
  const isAdminArea = location.pathname.startsWith("/admin");
  const isFullScreenShell = isWelcome || isHome;
  const usesSharedHeader = !isWelcome && !isHome;
  const shellClassName = isFullScreenShell
    ? "mx-auto flex min-h-dvh w-full flex-col"
    : "mx-auto flex min-h-dvh w-full max-w-[430px] flex-col";
  const mainClassName = isFullScreenShell
    ? "flex flex-1 flex-col"
    : "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 sm:px-5";

  return (
    <div className={shellClassName}>
      {!isWelcome && !isHome && (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(200,164,106,0.18),transparent_25%),radial-gradient(circle_at_bottom,rgba(17,24,39,0.55),transparent_28%)]" />
      )}
      {usesSharedHeader && <AppHeaderBar />}
      <main className={mainClassName}>
        {!isWelcome && !isHome && !isSchedule && !isProfile && !isAdminArea && <InstallPromptCard />}
        <Outlet />
      </main>
      {!isWelcome && !isHome && <BottomNav />}
    </div>
  );
}

export default AppLayout;
