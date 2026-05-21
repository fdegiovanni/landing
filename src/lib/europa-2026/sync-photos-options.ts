export function resolvePhotoSourceDate(dateISO: string, sourceDateParam: string | null): string {
  return sourceDateParam ?? dateISO
}
