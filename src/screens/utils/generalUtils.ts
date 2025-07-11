import {t} from "i18next";

export function getCurrentDateTime(): string {
  const date = new Date();
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function getDefaultUnionTitle(): string {
  return t("chipboard_sheet_list_title", {title: getCurrentDateTime()});
}
