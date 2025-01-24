export function convertToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}hr ${mins}minutes`;
}
