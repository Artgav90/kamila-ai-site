import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminQrScannerModal from "../components/admin/AdminQrScannerModal";
import AdminMetricGrid from "../components/admin/AdminMetricGrid";
import AdminQuickActions from "../components/admin/AdminQuickActions";
import AdminRecentCheckIns from "../components/admin/AdminRecentCheckIns";
import AdminTodayClasses from "../components/admin/AdminTodayClasses";
import { useStudentCheckIn } from "../context/StudentCheckInContext";
import { useLanguage } from "../context/LanguageContext";
import { openCrmInNewTab } from "../services/crm";

function AdminPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { consumeClassFromPayload } = useStudentCheckIn();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanPayload = (payload) => consumeClassFromPayload(payload);

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "scan-qr":
        setIsScannerOpen(true);
        break;
      case "students":
        navigate("/admin/students");
        break;
      case "crm":
        openCrmInNewTab();
        break;
      case "schedule-editor":
        navigate("/admin/schedule-editor");
        break;
      default:
        break;
    }
  };

  return (
    <section
      className="-mx-4 flex flex-1 flex-col bg-[#09090e] sm:-mx-5"
      style={{ background: "rgb(9, 9, 14)" }}
    >
      <div className="px-5 pt-2 pb-4">
        <h2 className="text-2xl font-black text-white">{t("ui.6f3ce8f53280")}</h2>
      </div>

      <AdminMetricGrid />
      <AdminQuickActions onAction={handleQuickAction} />

      <AdminRecentCheckIns />

      <AdminTodayClasses onOpenSchedule={() => navigate("/schedule")} />

      <AdminQrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanPayload={handleScanPayload}
      />
    </section>
  );
}

export default AdminPage;
