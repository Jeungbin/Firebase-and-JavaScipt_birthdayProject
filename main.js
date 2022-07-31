const firebaseConfig = {
  apiKey: "AIzaSyD0pWJRL3pSk4Cpg2rnD5QU7STnoItIvuA",
  authDomain: "witdemo-48d48.firebaseapp.com",
  databaseURL: "https://witdemo-48d48-default-rtdb.firebaseio.com",
  projectId: "witdemo-48d48",
  storageBucket: "witdemo-48d48.appspot.com",
  messagingSenderId: "421663516829",
  appId: "1:421663516829:web:02025c732e513162dd8c74",
  measurementId: "G-B9MLW9JKBW",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const userName = document.getElementById("name_register");
const userbirth = document.getElementById("birth_register");
const userEmail = document.getElementById("email_register");
const userPassword = document.getElementById("password_register");

const loginPassword = document.getElementById("password-login");
const mainSection = document.querySelector(".section-center");
const formSection = document.getElementById("form");
const loginForm = document.getElementById("login-Form");
const signupButtonsection = document.getElementById("signup-button-section");
const signupButton = document.getElementById("signup-button");
const loginEmail = document.getElementById("email-login");
const btnLogin = document.getElementById("btnLogin");

function handleSignUp(e) {
  e.preventDefault();
  signupButtonsection.classList.add("hide");

  formSection.innerHTML = ` <form id="signup-Form">
        <h2>SIGN UP</h2>
        <input type='name' name='name' id='name_register' placeholder='name'>
        <input type='email' name='email' id='email_register'  placeholder='email'>
        <input type='password' name='password' id='password_register' placeholder='password'>
        <input id='birth_register' type="date" name='birth' value="2022-07-15" min="1950-01-01" max="2022-12-30">
        <div>  
           <button type='submit' id='btnRegister'> SIGN UP</button>
        </div>
      </form>
      `;

  const userEmail = document.getElementById("email_register");
  const userPassword = document.getElementById("password_register");
  const signupForm = document.getElementById("signup-Form");

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = userEmail.value;
    const password = userPassword.value;

    console.log(email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        uid = credential.user.uid;
        console.log("user created", uid);
        signupForm.reset();
        signupForm.classList.add("hide");
        signupButtonsection.classList.remove("hide");
        location.reload();
        alert("WELCOME ! Log In to use your account :)");
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Can you check your Email? And Password should be at least 6 characters"
        );
      });

    const obj = {
      name: getFormInput("name_register"),
      email: getFormInput("email_register"),
      password: getFormInput("password_register"),
      birth: getFormInput("birth_register"),
    };
    postToFirebase(obj);
    document.getElementById("name_register").value = null;
    document.getElementById("email_register").value = null;
    document.getElementById("password_register").value = null;
    document.getElementById("birth_register").value = null;
  };
  firebase.initializeApp(firebaseConfig);
  function getFormInput(id) {
    return document.getElementById(id).value;
  }

  function generateId() {
    const id = "uuid_" + String(Math.floor(Math.random() * 10000000));
    console.log(id);
    return id;
  }

  function postToFirebase(obj) {
    const ref = firebase.database().ref(generateId());
    ref.set({
      name: obj.name,
      email: obj.email,
      password: obj.password,
      birth: obj.birth,
    });
  }

  document
    .getElementById("signup-Form")
    .addEventListener("submit", handleRegister);
}
//signin
const handleSignIn = (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((credential) => {
      console.log("user has successfully logged");
      openMainSEction(email);
    })
    .catch((error) => {
      alert("📢 Can you check your email and password again?");
      console.log(error);
    });
};

//Open main page
const data = [
  {
    name: "Aquarium",
    startDate: [1, 20],
    image: "./starSignImg/Aquarium.png",
  },
  {
    name: "Pisces",
    startDate: [2, 19],
    image: "./starSignImg/Pisces.png",
  },
  {
    name: "Aries",
    startDate: [3, 21],
    image: "./starSignImg/Aries.png",
  },
  {
    name: "Taurus",
    startDate: [4, 20],
    image: "./starSignImg/Taurus.png",
  },
  {
    name: "Gemini",
    startDate: [5, 21],
    image: "./starSignImg/Gemini.png",
  },
  {
    name: "Cancer",
    startDate: [6, 22],
    image: "./starSignImg/Cancer.png",
  },
  {
    name: "Leo",
    startDate: [7, 23],
    image: "./starSignImg/Leo.png",
  },
  {
    name: "Virgo",
    startDate: [8, 23],
    image: "./starSignImg/Virgo.png",
  },
  {
    name: "Libra",
    startDate: [9, 24],
    image: "./starSignImg/Libra.png",
  },
  {
    name: "Scorpio",
    startDate: [10, 23],
    image: "./starSignImg/Scorpio.png",
  },
  {
    name: "Sagittarius",
    startDate: [11, 23],
    image: "./starSignImg/Sagittarius.png",
  },
  {
    name: "Capricorn",
    startDate: [12, 25],
    image: "./starSignImg/Capricorn.png",
  },
];
const openMainSEction = (email) => {
  const app = firebase.initializeApp(firebaseConfig);
  const dbRef = firebase.database().ref();
  const signOutBtn = document.querySelector(".sign-out-button");

  dbRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const i of Object.entries(data)) {
          if (i[1].email === email) {
            const user = i[1];
            console.log(user.name);
            makeMainPage(user);
          }
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
  const makeMainPage = (user) => {
    // Data Json fetch
    const fetchData = async () => {
      const response = await fetch("https://type.fit/api/quotes");
      const quotes = await response.json();
      signOutBtn.style.display = "block";
      signOutBtn.addEventListener("click", () => location.reload());
      randomQuote(quotes);
    };
    fetchData();
    const randomQuote = (quotes) => {
      const randomNum = Math.floor(Math.random() * quotes.length - 1);
      function getRemainingDays() {
        const birth = user.birth;
        const birthArray = birth.split("-");
        let starSign = "";
        let image = "";
        const birthNumArray = birthArray.map((i) => {
          return parseInt(i);
        });

        const currDay = new Date();
        const birthDay = new Date(
          `${currDay.getFullYear()}-${birthNumArray[1]}-${birthNumArray[2]}`
        );

        // fix personal starsign
        function handleStarSign(month, date) {
          for (let i = 0; i < data.length; i++) {
            console.log(i);
            if (month === data[i].startDate[0]) {
              if (month === 1) {
                if (date < data[i].startDate[1]) {
                  starSign = data[data.length - 1].name;
                  image = data[data.length].image;
                } else {
                  starSign = data[0].name;
                  image = data[0].image;
                }
              } else {
                if (date < data[i].startDate[1]) {
                  starSign = data[i - 1].name;
                  image = data[i - 1].image;
                } else {
                  starSign = data[i].name;
                  image = data[i].image;
                }
              }
            }
          }
        }
        handleStarSign(birthNumArray[1], birthNumArray[2]);
        let remainingDays = Math.floor(
          (birthDay.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24)
        );
        remainingDays = remainingDays + 1;

        if (remainingDays === 0) {
          mainSection.innerHTML = `
          <h1>Happy Birthday, ${user.name}</h1>
          <h4>' ${quotes[randomNum].text} '</h4>
          <p>${quotes[randomNum].author}</p>
         `;
        } else if (remainingDays === 1) {
          mainSection.innerHTML = `
          <div class='greetiingSection'>
          <img class='starSignImg' src=${image} />
          <div>
          <h3>Your birthday is tommorow!</h3>
          <h4>Your Starsign is ${starSign}</h4>
          </div>
          </div>
         `;
        } else {
          if (remainingDays < 0) {
            remainingDays = 365 - Math.abs(remainingDays);
          }
          mainSection.innerHTML = `
          <div class='greetiingSection'>
          <img src=${image} />
          <div>
          <h3>Your birthday left ${remainingDays} days</h3>
          <h4>Your Starsign is ${starSign}</h4>
          </div>
          </div>
         `;
        }
      }

      getRemainingDays();
    };
  };
};
btnLogin.addEventListener("click", handleSignIn);
signupButton.addEventListener("click", handleSignUp);
// set birthday
