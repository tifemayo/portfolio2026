export const CV_URL = "/Tife_Olusina_CV.pdf";
export const EMAIL = "tifemayo25@gmail.com";
export const LINKEDIN = "https://linkedin.com/in/tifemayo";

/** Lets any button on the page open the chat assistant. */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent("tife:chat", { detail: { question } }));
}
