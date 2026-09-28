import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Lets the pages use these database tools without importing them again.
export { collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// These settings tell the pages which Firebase project to talk to.
const firebaseConfig = {
  apiKey: "AIzaSyBYkOERyILn2ikGJVM8-dqkMaew17c9n6U",
  authDomain: "e-books-store-7e6ae.firebaseapp.com",
  projectId: "e-books-store-7e6ae",
  storageBucket: "e-books-store-7e6ae.firebasestorage.app",
  messagingSenderId: "881233235481",
  appId: "1:881233235481:web:041c102d14363fdf5b2488"
};

export const db = getFirestore(initializeApp(firebaseConfig));

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

// Builds a book cover. Pass false as the second value for a cover with no words on it.
export function makeCover(book, withText) {
  const cover = make("div", "cover " + coverClass(book.cover));
  if (withText !== false) {
    cover.append(make("span", "", book.title || "Untitled"), make("small", "", book.author || ""));
  }
  return cover;
}