export enum HomeState {
  SENSITIVE = "SENSITIVE",
  ACTIVE = "ACTIVE",
  SILENT = "SILENT",
}

export interface HomeStateContext {
  lastMeaningfulInteractionAt?: Date | null;
  lastSensitiveContentAccessAt?: Date | null;
  now?: Date;
}

const DAYS = 24 * 60 * 60 * 1000;

// Politica de produto (ajustavel)
const SENSITIVE_WINDOW_DAYS = 5;
const ACTIVE_WINDOW_DAYS = 7;

export function getHomeState(context: HomeStateContext): HomeState {
  const now = context.now ?? new Date();

  const { lastMeaningfulInteractionAt, lastSensitiveContentAccessAt } = context;

  // Estado Sensivel sempre vence
  if (lastSensitiveContentAccessAt) {
    const diff = now.getTime() - new Date(lastSensitiveContentAccessAt).getTime();

    if (diff <= SENSITIVE_WINDOW_DAYS * DAYS) {
      return HomeState.SENSITIVE;
    }
  }

  // Estado Ativo
  if (lastMeaningfulInteractionAt) {
    const diff = now.getTime() - new Date(lastMeaningfulInteractionAt).getTime();

    if (diff <= ACTIVE_WINDOW_DAYS * DAYS) {
      return HomeState.ACTIVE;
    }
  }

  // Estado Silencioso (default)
  return HomeState.SILENT;
}
