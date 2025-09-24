export function calculateAge(dob: Date): number {
  const diff = Date.now() - dob.getTime();
  const ageDate = new Date(diff); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
