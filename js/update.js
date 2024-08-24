import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';
import { getFirestore, collection, getDocs, updateDoc} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

const authToken = localStorage.getItem("authToken");
if (!authToken) {
    window.location.href = "index.html";
}

const firebaseConfig = {
    apiKey: "AIzaSyAHWDe05u7Fn7Y3I3WQugdu2FpCn44g7lg",
    authDomain: "fire-d5c6e.firebaseapp.com",
    projectId: "fire-d5c6e",
    storageBucket: "fire-d5c6e.appspot.com",
    messagingSenderId: "2231146188",
    appId: "1:2231146188:web:6e0ae975a56c2b0d765469",
    measurementId: "G-YB81Y74BGS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const add = document.getElementById("add");
const sub = document.getElementById("sub");

add.addEventListener("click", function(e){
    e.preventDefault();

    const usersCollection = collection(db, 'attendance');
    const fieldName = "Year";

    async function update() {
        try {
            const querySnapshot = await getDocs(usersCollection);

            var conf = prompt("Enter code to update");
            if(conf == "add one year"){
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                var uyr = Number(data.Year) + 1;
                    updateDoc(doc.ref, {
                        [fieldName]: uyr
                    })
                })
            }else{
                alert("Wrong code");
                window.location.reload();
            }
            alert("Added a year");
        } catch (error) {
            console.error("Error updating documents: ", error);
            alert("Error updating documents: " + error.message);
        }
    }
    update();
})

sub.addEventListener("click", function(e){
    e.preventDefault();

    const usersCollection = collection(db, 'attendance');
    const fieldName = "Year";

    async function update() {
        try {
            const querySnapshot = await getDocs(usersCollection);

            var conf = prompt("Enter code to update");
            if(conf == "subtract one year"){
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                var uyr = Number(data.Year) - 1;
                    updateDoc(doc.ref, {
                        [fieldName]: uyr
                    })
                })
            }else{
                alert("Wrong code");
                window.location.reload();
            }
            alert("Subtracted a year from all Members");
        } catch (error) {
            console.error("Error updating documents: ", error);
            alert("Error updating documents: " + error.message);
        }
    }
    update();
})