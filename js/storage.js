const FAVORITES_KEY = "english-course-favorites";
const STUDIED_KEY = "english-course-studied";

function readSet(key) {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return new Set();

    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return new Set();

    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function writeSet(key, values) {
  try {
    window.localStorage.setItem(key, JSON.stringify([...values]));
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

export function getFavorites() {
  return readSet(FAVORITES_KEY);
}

export function getStudied() {
  return readSet(STUDIED_KEY);
}

export function toggleStoredId(key, id, currentValues) {
  const values = currentValues instanceof Set ? new Set(currentValues) : readSet(key);
  if (values.has(id)) {
    values.delete(id);
  } else {
    values.add(id);
  }
  const result = writeSet(key, values);
  return { values, result };
}

export function toggleFavorite(id, currentValues) {
  return toggleStoredId(FAVORITES_KEY, id, currentValues);
}

export function toggleStudied(id, currentValues) {
  return toggleStoredId(STUDIED_KEY, id, currentValues);
}

function reconcileSet(key, validIds) {
  const allowed = new Set(validIds);
  const cleaned = new Set([...readSet(key)].filter((id) => allowed.has(id)));
  const result = writeSet(key, cleaned);
  return { values: cleaned, result };
}

export function reconcileStoredIds(validIds) {
  const favorites = reconcileSet(FAVORITES_KEY, validIds);
  const studied = reconcileSet(STUDIED_KEY, validIds);

  return {
    favorites: favorites.values,
    studied: studied.values,
    results: {
      favorites: favorites.result,
      studied: studied.result
    }
  };
}
