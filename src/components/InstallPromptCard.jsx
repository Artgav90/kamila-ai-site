import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { useLanguage } from "../context/LanguageContext";
import Button from "./ui/Button";
import Card from "./ui/Card";

function InstallPromptCard() {
  const { canInstall, isInstalled, promptInstall } = useInstallPrompt();
  const { t } = useLanguage();

  if (isInstalled || !canInstall) {
    return null;
  }

  return (
    <Card className="animate-[fade-in_500ms_ease-out]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            {t("ui.75bdaf6754c0")}
          </p>
          <p className="mt-1 text-sm text-white/72">
            {t("ui.260ba0cf7866")}
          </p>
        </div>
        <Button onClick={promptInstall} size="sm">
          {t("ui.4e3afa839043")}
        </Button>
      </div>
    </Card>
  );
}

export default InstallPromptCard;
