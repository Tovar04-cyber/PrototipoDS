//Importaciones Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, query, orderBy 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWgQXxmWoCUh6SSivDZaLouLFyfJ7o-VE",
  authDomain: "foroprototipo-a73e7.firebaseapp.com",
  projectId: "foroprototipo-a73e7",
  storageBucket: "foroprototipo-a73e7.firebasestorage.app",
  messagingSenderId: "11486663958",
  appId: "1:11486663958:web:a593e4e6eb01f75f146c37",
  measurementId: "G-3N84H2R5ST"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const comentariosCol = collection(db, "comentarios");

// Cargar comentarios

window.addEventListener("DOMContentLoaded", () => {
  cargarComentarios();
});

async function cargarComentarios() {
  const lista = document.querySelector("#comentariosList ul");
  lista.innerHTML = "";

  const q = query(comentariosCol, orderBy("fecha", "asc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="usuario">Anónimo</div>
      <div class="texto">${escapeHtml(data.comentario)}</div>
    `;

    lista.prepend(li);
  });

  if (lista.children.length > 0) {
    mostrar("comentariosList");
  }
}

// Enviar comentario


window.enviarComentario = async function () {
  const textarea = document.querySelector("#formComentario textarea");
  const texto = textarea.value.trim();

  if (!texto) return;

  await addDoc(comentariosCol, {
    comentario: texto,
    fecha: new Date()
  });

  textarea.value = "";
  await cargarComentarios();
  mostrar("comentariosList");
};


function mostrar(id) {
  const element = document.getElementById(id);
  if (element) element.classList.add("activo");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
