import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileIdentitySection from "../components/profile/ProfileIdentitySection";
import ProfileMenuPanel from "../components/profile/ProfileMenuPanel";
import ProfileQrCard from "../components/profile/ProfileQrCard";
import ProfileStatsGrid from "../components/profile/ProfileStatsGrid";
import ProfileSubscriptionCard from "../components/profile/ProfileSubscriptionCard";
import { useStudentCheckIn } from "../context/StudentCheckInContext";

function ProfilePage() {
  const location = useLocation();
  const {
    profileIdentityView,
    profileStatsView,
    profileSubscriptionView,
    updateCurrentStudentAvatar
  } = useStudentCheckIn();

  useEffect(() => {
    if (!location.state?.focusQr) {
      return;
    }

    const scrollToQr = () => {
      const qrSection = document.getElementById("profile-checkin-qr");
      if (qrSection) {
        qrSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const raf = requestAnimationFrame(scrollToQr);
    return () => cancelAnimationFrame(raf);
  }, [location.state]);

  return (
    <section
      className="-mx-4 flex flex-1 flex-col bg-[#09090e] sm:-mx-5"
      style={{ background: "rgb(9, 9, 14)" }}
    >
      <div className="px-5 pt-2 pb-24">
        <ProfileIdentitySection
          identity={profileIdentityView}
          onAvatarChange={updateCurrentStudentAvatar}
        />
        <ProfileSubscriptionCard subscription={profileSubscriptionView} />
        <ProfileStatsGrid stats={profileStatsView} />
        <ProfileQrCard identity={profileIdentityView} />
        <ProfileMenuPanel />
      </div>
    </section>
  );
}

export default ProfilePage;
