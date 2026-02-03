"use client";

import { getHomeState, HomeState } from "@/features/home/state";

export type PushId =
  | "weekly-check-in"
  | "quiet-continuity"
  | "pattern-insight";

export type PushMessage = {
  id: PushId;
  title: string;
  body: string;
};

export type PushContext = {
  now?: Date;
  firstAccessAt?: Date | null;
  lastCheckInAt?: Date | null;
  lastRecordAt?: Date | null;
  lastSensitiveContentAt?: Date | null;
  lastActiveNavigationAt?: Date | null;
  lastInteractionAt?: Date | null;
  lastPushAt?: Date | null;
  lastPatternPushAt?: Date | null;
  weeksWithCheckIns?: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const PUSHES: Record<PushId, PushMessage> = {
  "weekly-check-in": {
    id: "weekly-check-in",
    title: "Um momento da semana",
    body: "Se fizer sentido, voce pode registrar como foi a semana. Mesmo poucas anotacoes ja ajudam a acompanhar.",
  },
  "quiet-continuity": {
    id: "quiet-continuity",
    title: "Tudo bem por aqui",
    body: "Algumas semanas sao mais silenciosas, e isso tambem faz parte. Quando quiser, e so retomar.",
  },
  "pattern-insight": {
    id: "pattern-insight",
    title: "Algo para observar",
    body: "Alguns comportamentos apareceram de forma parecida nas ultimas semanas. Isso pode ajudar a observar com mais calma.",
  },
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysSince(date: Date | null | undefined, now: Date) {
  if (!date) {
    return null;
  }
  const diffMs = startOfDay(now).getTime() - startOfDay(date).getTime();
  return Math.floor(diffMs / DAY_MS);
}

function getMostRecentDate(dates: Array<Date | null | undefined>) {
  return dates.reduce<Date | null>((latest, current) => {
    if (!current) {
      return latest;
    }
    if (!latest) {
      return current;
    }
    return current.getTime() > latest.getTime() ? current : latest;
  }, null);
}

export function getNextWeeklyPush(context: PushContext): PushMessage | null {
  const now = context.now ?? new Date();

  const lastMeaningfulInteractionAt = getMostRecentDate([
    context.lastCheckInAt,
    context.lastRecordAt,
    context.lastActiveNavigationAt,
  ]);
  const homeState = getHomeState({
    lastMeaningfulInteractionAt,
    lastSensitiveContentAccessAt: context.lastSensitiveContentAt,
    now,
  });
  if (homeState === HomeState.SENSITIVE) {
    return null;
  }

  const daysSinceLastPush = daysSince(context.lastPushAt, now);
  if (daysSinceLastPush !== null && daysSinceLastPush < 7) {
    return null;
  }

  const daysSinceActivity = daysSince(lastMeaningfulInteractionAt, now);
  if (daysSinceActivity !== null && daysSinceActivity < 7) {
    return null;
  }

  const weeksWithCheckIns = context.weeksWithCheckIns ?? 0;
  const daysSincePatternPush = daysSince(context.lastPatternPushAt, now);
  const canSendPattern =
    weeksWithCheckIns >= 2 &&
    (daysSincePatternPush === null || daysSincePatternPush >= 14);
  if (canSendPattern) {
    return PUSHES["pattern-insight"];
  }

  const checkInAnchor = context.lastCheckInAt ?? context.firstAccessAt;
  const daysSinceCheckIn = daysSince(checkInAnchor, now);
  if (daysSinceCheckIn !== null && daysSinceCheckIn >= 7) {
    return PUSHES["weekly-check-in"];
  }

  const daysSinceInteraction = daysSince(context.lastInteractionAt, now);
  if (
    daysSinceInteraction !== null &&
    daysSinceInteraction >= 7 &&
    daysSinceInteraction <= 10
  ) {
    return PUSHES["quiet-continuity"];
  }

  return null;
}
