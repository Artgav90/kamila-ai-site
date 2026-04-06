import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { scheduleRepository } from "../repositories/cloud";
import { isSupabaseConfigured } from "../services/supabase";
import {
  DEFAULT_WEEKLY_SCHEDULE_TEMPLATE,
  normalizeWeeklyScheduleTemplate
} from "../components/schedule/scheduleData";

const GROUP_OPTIONS = [
  {
    value: "KINDER",
    labelRu: "Kinder",
    labelDe: "Kinder",
    color: "rgb(245, 158, 11)"
  },
  {
    value: "PROF KINDER",
    labelRu: "Prof Kinder",
    labelDe: "Prof Kinder",
    color: "rgb(59, 130, 246)"
  },
  {
    value: "LATINA",
    labelRu: "Latina",
    labelDe: "Latina",
    color: "rgb(255, 95, 160)"
  },
  {
    value: "HIGH HEELS",
    labelRu: "High Heels",
    labelDe: "High Heels",
    color: "rgb(168, 85, 247)"
  }
];

const WEEKDAY_OPTIONS = [
  { value: 1, shortRu: "ПН", shortDe: "MO", fullRu: "Понедельник", fullDe: "Montag" },
  { value: 2, shortRu: "ВТ", shortDe: "DI", fullRu: "Вторник", fullDe: "Dienstag" },
  { value: 3, shortRu: "СР", shortDe: "MI", fullRu: "Среда", fullDe: "Mittwoch" },
  { value: 4, shortRu: "ЧТ", shortDe: "DO", fullRu: "Четверг", fullDe: "Donnerstag" },
  { value: 5, shortRu: "ПТ", shortDe: "FR", fullRu: "Пятница", fullDe: "Freitag" },
  { value: 6, shortRu: "СБ", shortDe: "SA", fullRu: "Суббота", fullDe: "Samstag" },
  { value: 7, shortRu: "ВС", shortDe: "SO", fullRu: "Воскресенье", fullDe: "Sonntag" }
];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function normalizeEditorScheduleState(rawState, options = {}) {
  const { fallbackToDefaultTemplate = true } = options;

  return {
    activeFilter: typeof rawState?.activeFilter === "string" ? rawState.activeFilter : null,
    bookedClassKeys: Array.isArray(rawState?.bookedClassKeys)
      ? rawState.bookedClassKeys.filter((item) => typeof item === "string")
      : [],
    weeklyTemplate: normalizeWeeklyScheduleTemplate(rawState?.weeklyTemplate, {
      fallbackToDefault: fallbackToDefaultTemplate
    })
  };
}

function createSlotKey(slot) {
  return `${slot.weekday}-${slot.type}-${slot.start}`;
}

function AdminScheduleEditorPage() {
  const navigate = useNavigate();
  const { lt } = useLanguage();
  const cloudMode = isSupabaseConfigured();
  const skipNextCloudWriteRef = useRef(false);
  const [isCloudReady, setIsCloudReady] = useState(!cloudMode);
  const [scheduleState, setScheduleState] = useState(() =>
    normalizeEditorScheduleState(
      {
        activeFilter: null,
        bookedClassKeys: [],
        weeklyTemplate: cloudMode ? [] : DEFAULT_WEEKLY_SCHEDULE_TEMPLATE
      },
      { fallbackToDefaultTemplate: !cloudMode }
    )
  );
  const [editor, setEditor] = useState({
    weekday: 1,
    type: "LATINA",
    start: "18:00"
  });
  const [editingSlotKey, setEditingSlotKey] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [syncStatus, setSyncStatus] = useState(cloudMode ? "idle" : "local");

  useEffect(() => {
    if (!cloudMode) {
      return;
    }

    let isMounted = true;
    const hydrate = async () => {
      try {
        const cloudState = await scheduleRepository.load();
        if (!isMounted) {
          return;
        }

        skipNextCloudWriteRef.current = true;
        setScheduleState(
          normalizeEditorScheduleState(cloudState, {
            fallbackToDefaultTemplate: false
          })
        );
        setSyncStatus("synced");
      } catch (error) {
        console.error("Schedule editor hydration failed:", error);
        if (isMounted) {
          setSyncStatus("error");
        }
      } finally {
        if (isMounted) {
          setIsCloudReady(true);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [cloudMode]);

  useEffect(() => {
    if (!cloudMode) {
      return;
    }

    let isMounted = true;
    const unsubscribe = scheduleRepository.subscribe((nextCloudState) => {
      try {
        if (!isMounted) {
          return;
        }

        skipNextCloudWriteRef.current = true;
        setScheduleState(
          normalizeEditorScheduleState(nextCloudState, {
            fallbackToDefaultTemplate: false
          })
        );
        setSyncStatus("synced");
      } catch (error) {
        console.error("Schedule editor realtime sync failed:", error);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [cloudMode]);

  useEffect(() => {
    if (!cloudMode || !isCloudReady) {
      return;
    }

    if (skipNextCloudWriteRef.current) {
      skipNextCloudWriteRef.current = false;
      return;
    }

    setSyncStatus("saving");
    scheduleRepository
      .save(scheduleState)
      .then(() => {
        setSyncStatus("synced");
      })
      .catch((error) => {
        console.error("Schedule editor cloud sync failed:", error);
        setSyncStatus("error");
      });
  }, [cloudMode, isCloudReady, scheduleState]);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [feedback]);

  const slotsByWeekday = useMemo(() => {
    const byWeekday = new Map();
    WEEKDAY_OPTIONS.forEach((weekday) => {
      byWeekday.set(weekday.value, []);
    });

    scheduleState.weeklyTemplate.forEach((slot) => {
      const currentSlots = byWeekday.get(slot.weekday) ?? [];
      currentSlots.push(slot);
      byWeekday.set(slot.weekday, currentSlots);
    });

    return byWeekday;
  }, [scheduleState.weeklyTemplate]);

  const totalClassesPerWeek = scheduleState.weeklyTemplate.length;

  const handleApplyEditor = () => {
    const nextWeekday = Number.parseInt(String(editor.weekday), 10);
    const nextType = String(editor.type ?? "").trim().toUpperCase();
    const nextStart = String(editor.start ?? "").trim();

    if (!Number.isFinite(nextWeekday) || nextWeekday < 1 || nextWeekday > 7) {
      setFeedback({
        tone: "error",
        message: lt("Выбери корректный день недели.", "Waehle einen gueltigen Wochentag.")
      });
      return;
    }

    if (!GROUP_OPTIONS.some((group) => group.value === nextType)) {
      setFeedback({
        tone: "error",
        message: lt("Выбери группу занятия.", "Waehle eine Kursgruppe.")
      });
      return;
    }

    if (!TIME_PATTERN.test(nextStart)) {
      setFeedback({
        tone: "error",
        message: lt("Укажи время в формате ЧЧ:ММ.", "Zeitformat HH:MM verwenden.")
      });
      return;
    }

    const nextSlot = {
      weekday: nextWeekday,
      type: nextType,
      start: nextStart
    };
    const nextSlotKey = createSlotKey(nextSlot);
    const hasDuplicate = scheduleState.weeklyTemplate.some((slot) => {
      const slotKey = createSlotKey(slot);
      return slotKey === nextSlotKey && slotKey !== editingSlotKey;
    });

    if (hasDuplicate) {
      setFeedback({
        tone: "error",
        message: lt(
          "Такое занятие уже есть в расписании.",
          "Dieser Termin existiert bereits im Plan."
        )
      });
      return;
    }

    setScheduleState((currentState) => {
      const baseTemplate = Array.isArray(currentState.weeklyTemplate)
        ? currentState.weeklyTemplate
        : [];
      const nextTemplate = editingSlotKey
        ? baseTemplate.map((slot) =>
            createSlotKey(slot) === editingSlotKey ? nextSlot : slot
          )
        : [...baseTemplate, nextSlot];

      return {
        ...currentState,
        weeklyTemplate: normalizeWeeklyScheduleTemplate(nextTemplate, {
          fallbackToDefault: false
        })
      };
    });

    setEditingSlotKey(null);
    setFeedback({
      tone: "success",
      message: editingSlotKey
        ? lt("Занятие обновлено и сохранено.", "Termin aktualisiert und gespeichert.")
        : lt("Занятие добавлено и сохранено.", "Termin hinzugefuegt und gespeichert.")
    });
  };

  const handleEditSlot = (slot) => {
    setEditor({
      weekday: slot.weekday,
      type: slot.type,
      start: slot.start
    });
    setEditingSlotKey(createSlotKey(slot));
  };

  const handleDeleteSlot = (slotToDelete) => {
    const slotKey = createSlotKey(slotToDelete);
    setScheduleState((currentState) => ({
      ...currentState,
      weeklyTemplate: currentState.weeklyTemplate.filter(
        (slot) => createSlotKey(slot) !== slotKey
      )
    }));

    if (editingSlotKey === slotKey) {
      setEditingSlotKey(null);
    }

    setFeedback({
      tone: "success",
      message: lt("Занятие удалено.", "Termin entfernt.")
    });
  };

  const handleCancelEditing = () => {
    setEditingSlotKey(null);
    setEditor((currentEditor) => ({
      ...currentEditor,
      start: "18:00"
    }));
  };

  return (
    <section
      className="-mx-4 flex flex-1 flex-col bg-[#09090e] sm:-mx-5"
      style={{ background: "rgb(9, 9, 14)" }}
    >
      <div className="px-5 pt-3 pb-4">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="mb-3 inline-flex h-9 items-center gap-2 rounded-xl border px-3 text-xs font-bold uppercase tracking-[0.08em] text-white/85"
          style={{
            borderColor: "rgba(255, 255, 255, 0.1)",
            background: "rgba(255, 255, 255, 0.04)"
          }}
        >
          {lt("Назад", "Zurueck")}
        </button>

        <h2 className="text-2xl font-black text-white">{lt("Редактор расписания", "Stundenplan Editor")}</h2>
        <p className="mt-1 text-sm text-white/55">
          {lt(
            "Добавляй, редактируй и удаляй занятия по дням недели. Изменения сразу сохраняются в облаке.",
            "Kurse pro Wochentag anlegen, bearbeiten und loeschen. Aenderungen werden sofort in die Cloud gespeichert."
          )}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <div
            className="rounded-xl border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor: "rgba(255, 95, 160, 0.3)",
              background: "rgba(255, 95, 160, 0.1)",
              color: "rgb(255, 95, 160)"
            }}
          >
            {lt(`Классов в неделю: ${totalClassesPerWeek}`, `Klassen pro Woche: ${totalClassesPerWeek}`)}
          </div>
          <div
            className="rounded-xl border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor:
                syncStatus === "error"
                  ? "rgba(239, 68, 68, 0.35)"
                  : "rgba(255, 255, 255, 0.12)",
              background:
                syncStatus === "error"
                  ? "rgba(239, 68, 68, 0.12)"
                  : "rgba(255, 255, 255, 0.04)",
              color:
                syncStatus === "saving"
                  ? "rgb(245, 158, 11)"
                  : syncStatus === "error"
                    ? "rgb(248, 113, 113)"
                    : "rgba(255, 255, 255, 0.8)"
            }}
          >
            {syncStatus === "saving"
              ? lt("Сохранение...", "Speichern...")
              : syncStatus === "error"
                ? lt("Ошибка синка", "Sync-Fehler")
                : lt("Синхронизировано", "Synchronisiert")}
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 pb-24">
        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: "rgba(255, 255, 255, 0.08)",
            background: "rgba(19, 19, 31, 0.95)"
          }}
        >
          <h3 className="text-sm font-bold text-white">{lt("Добавить / редактировать занятие", "Termin erstellen / bearbeiten")}</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-white/70">{lt("День недели", "Wochentag")}</span>
              <select
                value={editor.weekday}
                onChange={(event) =>
                  setEditor((currentEditor) => ({
                    ...currentEditor,
                    weekday: Number.parseInt(event.target.value, 10)
                  }))
                }
                className="h-11 rounded-xl border px-3 text-sm font-semibold text-white outline-none"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.09)",
                  background: "rgba(255, 255, 255, 0.04)"
                }}
              >
                {WEEKDAY_OPTIONS.map((weekday) => (
                  <option key={weekday.value} value={weekday.value} className="text-black">
                    {lt(weekday.fullRu, weekday.fullDe)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-white/70">{lt("Время", "Uhrzeit")}</span>
              <input
                type="time"
                value={editor.start}
                onChange={(event) =>
                  setEditor((currentEditor) => ({
                    ...currentEditor,
                    start: event.target.value
                  }))
                }
                className="h-11 rounded-xl border px-3 text-sm font-semibold text-white outline-none"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.09)",
                  background: "rgba(255, 255, 255, 0.04)"
                }}
              />
            </label>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {GROUP_OPTIONS.map((group) => {
              const isActive = editor.type === group.value;
              return (
                <button
                  key={group.value}
                  type="button"
                  onClick={() =>
                    setEditor((currentEditor) => ({
                      ...currentEditor,
                      type: group.value
                    }))
                  }
                  className="rounded-xl border px-3 py-2 text-sm font-bold transition-all active:scale-95"
                  style={
                    isActive
                      ? {
                          color: "white",
                          borderColor: `${group.color}66`,
                          background: `linear-gradient(135deg, ${group.color}, rgba(168, 85, 247, 0.7))`,
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.35)"
                        }
                      : {
                          color: "rgba(255,255,255,0.8)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          background: "rgba(255, 255, 255, 0.03)"
                        }
                  }
                >
                  {lt(group.labelRu, group.labelDe)}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleApplyEditor}
              className="h-11 rounded-xl px-4 text-sm font-black text-white transition-transform active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgb(255, 95, 160), rgb(168, 85, 247))",
                boxShadow: "0 10px 24px rgba(255, 95, 160, 0.32)"
              }}
            >
              {editingSlotKey
                ? lt("Сохранить изменения", "Aenderung speichern")
                : lt("Добавить занятие", "Termin hinzufuegen")}
            </button>
            {editingSlotKey && (
              <button
                type="button"
                onClick={handleCancelEditing}
                className="h-11 rounded-xl border px-4 text-sm font-bold text-white/80"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.12)",
                  background: "rgba(255, 255, 255, 0.04)"
                }}
              >
                {lt("Отмена", "Abbrechen")}
              </button>
            )}
          </div>

          {feedback && (
            <p
              className="mt-3 text-sm font-semibold"
              style={{
                color: feedback.tone === "error" ? "rgb(248, 113, 113)" : "rgb(16, 185, 129)"
              }}
            >
              {feedback.message}
            </p>
          )}
        </div>

        {WEEKDAY_OPTIONS.map((weekday) => {
          const daySlots = slotsByWeekday.get(weekday.value) ?? [];
          return (
            <article
              key={weekday.value}
              className="rounded-2xl border p-4"
              style={{
                borderColor: "rgba(255, 255, 255, 0.08)",
                background: "rgba(18, 18, 28, 0.9)"
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-black text-white">
                  {lt(weekday.fullRu, weekday.fullDe)}
                </p>
                <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold text-white/75">
                  {daySlots.length}
                </span>
              </div>

              {daySlots.length > 0 ? (
                <div className="space-y-2">
                  {daySlots.map((slot) => {
                    const groupStyle =
                      GROUP_OPTIONS.find((group) => group.value === slot.type) ?? GROUP_OPTIONS[2];

                    return (
                      <div
                        key={createSlotKey(slot)}
                        className="flex items-center justify-between gap-3 rounded-xl border px-3 py-2"
                        style={{
                          borderColor: "rgba(255, 255, 255, 0.08)",
                          background: "rgba(255, 255, 255, 0.03)"
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-lg px-2 py-1 text-xs font-black uppercase"
                            style={{
                              color: "white",
                              background: groupStyle.color
                            }}
                          >
                            {lt(groupStyle.labelRu, groupStyle.labelDe)}
                          </span>
                          <span className="text-sm font-semibold text-white/85">{slot.start}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditSlot(slot)}
                            className="rounded-lg border px-2.5 py-1 text-xs font-bold text-white/80"
                            style={{
                              borderColor: "rgba(255, 255, 255, 0.12)",
                              background: "rgba(255, 255, 255, 0.04)"
                            }}
                          >
                            {lt("Изм.", "Edit")}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSlot(slot)}
                            className="rounded-lg border px-2.5 py-1 text-xs font-bold"
                            style={{
                              borderColor: "rgba(239, 68, 68, 0.35)",
                              color: "rgb(248, 113, 113)",
                              background: "rgba(239, 68, 68, 0.08)"
                            }}
                          >
                            {lt("Удалить", "Loeschen")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-white/45">
                  {lt("На этот день занятий нет.", "Fuer diesen Tag sind keine Kurse geplant.")}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AdminScheduleEditorPage;
