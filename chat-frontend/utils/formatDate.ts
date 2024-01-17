export default function (dateStr: string | number | Date) {
    let date = new Date(dateStr);
    let options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date
      .toLocaleDateString("sv-SE", options)
      .replace(/\//g, "-")
      .replace(",", "");
};