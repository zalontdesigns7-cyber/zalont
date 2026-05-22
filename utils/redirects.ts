export const ZALONT_EMAIL = "zalontdesigns7@gmail.com";

export const openEmail = (subject?: string, body?: string) => {
  const s = subject ? encodeURIComponent(subject) : "";
  const b = body ? encodeURIComponent(body) : "";
  window.open(`mailto:${ZALONT_EMAIL}${s ? `?subject=${s}` : ""}${b ? `&body=${b}` : ""}`, "_blank");
};
