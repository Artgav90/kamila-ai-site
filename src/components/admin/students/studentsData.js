export function getStudentsSummary(t, totalStudents = 0) {
  return {
    title: t("ui.e161fcab4c90"),
    subtitle: t("ui.m.students.summary.subtitle", { total: totalStudents }),
    searchPlaceholder: t("ui.878ce0f888d2")
  };
}

export const tierStyles = {
  Gold: {
    background: "rgba(255, 214, 0, 0.12)",
    color: "rgb(255, 214, 0)"
  },
  Silver: {
    background: "rgba(192, 192, 192, 0.12)",
    color: "rgb(160, 160, 184)"
  },
  Platinum: {
    background: "rgba(168, 85, 247, 0.12)",
    color: "rgb(168, 85, 247)"
  },
  Bronze: {
    background: "rgba(205, 127, 50, 0.12)",
    color: "rgb(205, 127, 50)"
  }
};

export function getClassesBalanceColor(classesLeft) {
  if (classesLeft <= 0) {
    return "rgb(239, 68, 68)";
  }

  if (classesLeft <= 3) {
    return "rgb(245, 158, 11)";
  }

  return "rgb(16, 185, 129)";
}

export const studentsList = [];
