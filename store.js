// The address of your hidden helper. Every page asks this address for book data.
export const API_BASE = "https://ebook-store-helper.dbernardinvestments.workers.dev";

// Makes one page element, optionally with a CSS class and some text.
export function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Matches the "cover" colour name in the database to a colour style.
const coverStyles = { teal: "c-teal", navy: "c-navy", gold: "c-gold", rust: "c-rust" };

export function coverClass(name) {
  return coverStyles[name] || "c-teal";
}

// 15000 becomes "UGX 15,000"
export function formatPrice(amount) {
  return "UGX " + Number(amount || 0).toLocaleString("en-US");
}

// Turns a stored cover image key into the address that serves it.
export function coverImageUrl(book) {
  if (!book.coverImage) return null;
  return API_BASE + "/covers/" + book.coverImage;
}

// Builds a book cover. Pass false as the second value for a cover with no words on it.
export function makeCover(book, withText) {
  const cover = make("div", "cover " + coverClass(book.cover));

  const imageUrl = coverImageUrl(book);
  if (imageUrl) {
    cover.style.padding = "0";
    cover.style.overflow = "hidden";
    const img = make("img");
    img.src = imageUrl;
    img.alt = book.title || "Book cover";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.display = "block";
    cover.append(img);
    return cover;
  }

  if (withText !== false) {
    cover.append(make("span", "", book.title || "Untitled"), make("small", "", book.author || ""));
  }
  return cover;
}

// Asks the helper for every published book.
export async function fetchBooks() {
  const response = await fetch(API_BASE + "/books");
  if (!response.ok) throw new Error("Could not load books");
  return response.json();
}

// Asks the helper for one book. Returns null if it doesn't exist.
export async function fetchBook(id) {
  const response = await fetch(API_BASE + "/books/" + encodeURIComponent(id));
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Could not load book");
  return response.json();
}