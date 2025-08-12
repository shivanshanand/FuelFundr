export function getInitials(name) {
  if (!name) return "";
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0][0].toUpperCase();
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
}
