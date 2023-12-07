
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword
    , onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

import {
    getFirestore, getDocs, doc,
    collection, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEjXEMT9bwe7Y2Yoh5DoUsIuuD0CWDlV4",
    authDomain: "blog-app-1c1fd.firebaseapp.com",
    projectId: "blog-app-1c1fd",
    storageBucket: "blog-app-1c1fd.appspot.com",
    messagingSenderId: "1038578812778",
    appId: "1:1038578812778:web:66d1e641777fdb35d74713",
    measurementId: "G-4H1JJNP4SY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//initialize
const db = getFirestore(app);
const todosCollectionRef = collection(db, 'todos')

const registerForm = document.getElementById('register-form')
const loginForm = document.getElementById('login-form')
const loader = document.getElementById('loader-div')
const userDiv = document.getElementById('user-info')
const auhDiv = document.getElementById('auth')
const logout = document.getElementById('logout')
const userEmail = document.getElementById('user-email')
const addInfo = document.getElementById('addInfo')
const todoInput = document.getElementById('todo_input')
const todosContainer = document.getElementById('todos_container')

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('user is logged in')
if (auhDiv!=null) {
    
    loader.style.display = 'none'
    auhDiv.style.display = 'none'
    userDiv.style.display = 'block'
    userEmail.innerText = `User email is ${user.email} and User uid is ${uid}`
    // ...
}
    } else {
        // User is signed out
        // loader.style.display = 'none'
        // auhDiv.style.display = 'block'
        // userDiv.style.display = 'none'

        // ...
    }
});

registerForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e)
    const email = e.target[0].value
    const password = e.target[1].value

    createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed up 
            const user = userCredential.user;
            try {
                const docRef = await addDoc(collection(db, "users"), {
                  "uid": user.uid,
                  "email":user.email
                
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", );
              }
              
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert('User is not register because of ' + errorMessage)
        });
})

loginForm?.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e)
    if(userEmail!=null){
    userEmail.innerHTML=`user email hai`}
    const email = e.target[0].value
    const password = e.target[1].value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user.email)
            // userDiv.style.display='block'
            window.location.href = '/'
           
                
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('User is not logged in because of ' + errorMessage,errorCode)
        });
})

logout?.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('signedout')
    }).catch((error) => {
        // An error happened.
        console.log('signedout', error)

    });
})


//DB Section--->

// addInfo.addEventListener('click', async () => {
//     if (!todoInput.value) return alert('Please add todo')
//     try {
//         const docAdded = await addDoc(todosCollectionRef, {
//             todo: todoInput.value
//         });
//         todoInput.value = ''
//         getTodos()
//         console.log("Document written with ID: ", docAdded);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// async function getTodos() {
//     todosContainer.innerHTML = null
//     const querySnapshot = await getDocs(todosCollectionRef);
//     querySnapshot.forEach((todoDoc) => {
//         const todoObj = todoDoc.data()
//         const div = document.createElement('div')
//         div.className = 'todo-div'
//         const span = document.createElement('span')
//         span.innerText = todoObj.todo
//         const button = document.createElement('button')
//         button.innerText = 'Delete'
//         button.id = todoDoc.id

//         button.addEventListener('click', async function () {
//             console.log(this)

//             const docRef = doc(db, 'todos', this.id)
//             console.log(docRef)
//             await deleteDoc(docRef)
//             getTodos()
//         })

//         div.appendChild(span)
//         div.appendChild(button)

//         todosContainer.appendChild(div)

//     });
// }

