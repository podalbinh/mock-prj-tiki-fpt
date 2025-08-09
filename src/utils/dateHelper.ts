import dayjs from "dayjs";

export function formatDate(dateInput: string | Date): string {
  const formatted = dayjs(dateInput).format("DD/MM/YYYY");
  return formatted === "Invalid Date" ? "Invalid date" : formatted;
}

export function formatDateTime(dateInput: string | Date): string {
  const formatted = dayjs(dateInput).format("DD/MM/YYYY HH:mm:ss");
  return formatted === "Invalid Date" ? "Invalid date" : formatted;
}

export function parseDate(dateString: string): dayjs.Dayjs | null {
  const parsed = dayjs(dateString, "DD/MM/YYYY");
  return parsed.isValid() ? parsed : null;
}
