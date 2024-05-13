import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWF-2xrCUXP8y_K00K3JWV8tppzuhJ8Mc",
  authDomain: "fauneroes.firebaseapp.com",
  projectId: "fauneroes",
  storageBucket: "fauneroes.appspot.com",
  messagingSenderId: "36191488925",
  appId: "1:36191488925:web:cdc9f95cb3f28ccd44bd74",
  measurementId: "G-1BHVL25HVE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document
  .getElementById("formEmail")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("inputEmail").value;

    if (email && email.trim() !== "") {
        addDoc(collection(db, "emails"), {
            email: email
        })
        .then(() => {
            console.log("Email enregistré avec succès !");
            const inputGroupEmail = document.getElementById("inputGroupEmail");
            const buttonEmail = document.getElementById("buttonEmail");
            const subscribeDone = document.getElementById("subscribeDone");
            inputGroupEmail.style.display = 'none';
            buttonEmail.style.display = 'none';
            subscribeDone.style.display = 'block';
        })
        .catch((error) => {
            console.error("Erreur lors de l'enregistrement de l'email : ", error);
            alert("Erreur lors de l'enregistrement de l'email.");
        });
    }
  });