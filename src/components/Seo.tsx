import { useEffect } from "react";

export interface SeoProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({ title, description, ogTitle, ogDescription, ogImage }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle ?? title);
    setMeta("property", "og:description", ogDescription ?? description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", ogTitle ?? title);
    setMeta("name", "twitter:description", ogDescription ?? description);
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
      setMeta("name", "twitter:image", ogImage);
    }
  }, [title, description, ogTitle, ogDescription, ogImage]);

  return null;
}
