// get all alerts of the form
const avisos = document.querySelectorAll(".alert")

// SEND FORM -- fetch api

const form = document.getElementById("regForm")

// MODAL
/* The form is inside a modal, which is display: none by default 
   The main purpose of the modal is to add a darker background behind the form
*/

//get the modal
const modal = document.querySelector(".modal")

// Get the button that opens the modal
const ctas = document.querySelectorAll(".btn--cta")

// person's name to be exhibited
const nomePessoa = document.querySelectorAll(".nomePessoa")

// add click listeners to button to open the modal
for (let i = 0; i < ctas.length; i++) {
  ctas[i].addEventListener("click", openModal, true)
}

// (F) OPENMODAL

function openModal() {
  if (modal.style.display == "none") {
    modal.style.display = "flex"
  }
  modal.classList.remove("is-hidden")
  modal.style.animation = "fade-in 1s both"
}

// Get the button element that closes the modal
const span = document.querySelector(".btn--close")

span.onclick = function () {
  modal.classList.add("is-hidden")
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    // delays the addition of the class for 1s to play the animation
    setTimeout(() => {
      modal.classList.add("is-hidden")
    }, 1000)
    modal.style.animation = "fade-out 1s both"
  }
}

form.addEventListener(
  "submit",
  function (e) {
    // this refers to the form itself
    // const formData = new FormData(form)

    /* Reload the window independent of where the user click
       To prevent bugs or undesirable behavior*/
    // window.onclick = function () {
    //   location.reload()
    // }

    // iterate through the formData
    // for (let key of formData.keys()) {
    // if (key === "g-recaptcha-response") {
    // if validation returns true
    // console.log(formData.get(key)) -- OK, RECEIVING THE KEY
    // if (validateCaptcha(formData.get(key))) {
    modal.classList.add("is-hidden")

    // Swal.fire({
    //   title: "Obrigado," + nomePessoa[0].innerHTML + "!",
    //   text: "O quanto antes nossa equipe entrará em contato com você!",
    //   icon: "success",
    //   showCancelButton: false,
    //   confirmButtonColor: "#a52a2a",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Ok!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     location.reload()
    //   }
    // })

    // fetch("./envia.php", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(function (response) {
    //     return response.text()
    //   })
    //   .then(function (text) {
    //     console.log(text)
    //   })
    //   .catch(function (error) {
    //     console.log(error)
    //   })

    gtag("event", "conversion", {
      send_to: "AW-305973276/Ke9oCMiz3fECEJyQ85EB",
    })

    return true
    // form.reset()
    // currentTab = 0
    // } else {
    //   console.log("captcha response false")
    //   return false
    // }
    // }
    // }
  },
  true
)

// prevent the key "Enter" from submitting the form
window.addEventListener(
  "keydown",
  function (e) {
    if (
      e.keyIdentifier == "U+000A" ||
      e.keyIdentifier == "Enter" ||
      e.keyCode == 13
    ) {
      if (e.target.nodeName == "INPUT" && e.target.type !== "textarea") {
        e.preventDefault()

        // go to the next tab
        nextPrev(1)
        return false
      }
    }
  },
  true
)

// FORM

let currentTab = 0
showTab(currentTab)

// (F) SHOWTAB

function showTab(n) {
  // This function will display the specified tab of the form ...
  const x = document.getElementsByClassName("tab")

  if (typeof x[n] !== "undefined") {
    x[n].style.animation = "fade-in 1s both"
    x[n].style.display = "flex"
  }

  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none"
  } else {
    document.getElementById("prevBtn").style.display = "inline"
  }
  if (n == x.length - 1) {
    // document.getElementById("nextBtn").innerHTML = "Enviar"
    document.getElementById("nextBtn").classList.add("is-hidden")
    document.querySelector(".btn--submit-safari").classList.remove("is-hidden")
  } else {
    document.getElementById("nextBtn").classList.remove("is-hidden")
    document.querySelector(".btn--submit-safari").classList.add("is-hidden")
    // document.getElementById("nextBtn").innerHTML = "&gt;"
  }

  // fixStepIndicator(n)
}

// (F) NEXTPREV

function nextPrev(n) {
  // This function will figure out which tab to display
  const x = document.getElementsByClassName("tab")

  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) {
    return false
  }

  // Hide the current tab:
  x[currentTab].style.display = "none"
  // Increase or decrease the current tab by 1 if not the last:
  if (currentTab < x.length) {
    currentTab = currentTab + n
  }

  // Keeps the variables up-to-date
  let firstName = firstWord(capitalize(document.querySelector("#firstName").value))

  nomePessoa.forEach((nome) => {
    nome.innerHTML = firstName
  })

  // if you have reached the end of the form... :
  // if (currentTab >= x.length) {
  //   //...the form gets submitted:
  //   const form = document.getElementById("regForm")
  //   form.requestSubmit()
  //   modal.classList.add("is-hidden")
  // }

  // code above removed due to a bug on safari that the form wasn't sending
  // the bug consists in safari not being to handle correctly the form submition via js

  if (currentTab <= x.length) {
    showTab(currentTab)
  }
}

// (F) VALIDATEFORM

// Regex
const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
const cellphoneRegex =
  /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

function validateForm() {
  // This function deals with validation of the form fields
  let valid = true

  const x = document.getElementsByClassName("tab")
  const y = x[currentTab].getElementsByTagName("input")

  // A loop that checks every input field in the current tab:
  // let i = 0

  // for text inputs
  for (let i = 0; i < y.length; i++) {
    if (y[i].type === "text") {
      // If a field is empty
      if (y[i].value === "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid"
        // and set the current valid status to false:
        valid = false
      }
    }

    //  for checkbox inputs
    if (y[i].type === "radio") {
      if (y[i].checked === false) {
        // add an "invalid" class to the field:
        y[i].className += " invalid"
        // and set the current valid status to false:
        valid = false

        const currentTabChildren = x[currentTab].children

        currentTabChildren.namedItem("alert").classList.remove("is-hidden")
      } else {
        valid = true
        break
      }
    }

    // for email inputs
    if (y[i].type === "email") {
      // regExp for e-mail verification (characters@characters.domain)
      if (emailRegex.test(y[i].value) === false) {
        // add an "invalid" class to the field:
        y[i].className += " invalid"
        // and set the current valid status to false:
        valid = false

        const currentTabChildren = x[currentTab].children

        currentTabChildren.namedItem("alert").classList.remove("is-hidden")
      }
    }

    // for telephone numbers
    if (y[i].type === "tel") {
      if (cellphoneRegex.test(y[i].value) === false) {
        console.log(y[i].value)
        // add an "invalid" class to the field:
        y[i].className += " invalid"
        // and set the current valid status to false:
        valid = false

        const currentTabChildren = x[currentTab].children

        currentTabChildren.namedItem("alert").classList.remove("is-hidden")
      }
    }
  }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    // document.getElementsByClassName("step")[currentTab].className += " finish"

    for (let i = 0; i < avisos.length; i++) {
      if (!avisos[i].classList.contains("is-hidden")) {
        avisos[i].classList.remove("is-hidden")
      }
    }
  }
  return valid // return the valid status
}

function validateCaptcha(token) {
  // OK - GOOGLE ANSWERING THE FETCH
  let response = fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=6Lf_RCQcAAAAAFzuwE-1IBg6kmvye6NLcqFdN2Zw&response=${token}`,
    {
      method: "POST",
      mode: "cors",
    }
  )
    .then(function (response) {
      // if (!response.ok) {
      //   throw new Error("Network response was not ok")
      // }

      // transform from json to a js object
      response.json()
    })
    .then((response) => {
      console.log(response)

      return true
    })
    .catch(function (err) {
      console.log(err)

      return false
    })

  console.log(response)
  return true
}

// // (F) FIXSTEPINDICATOR

// function fixStepIndicator(n) {
//   // This function removes the "active" class of all steps...
//   const x = document.getElementsByClassName("step")

//   for (let i = 0; i < x.length - 1; i++) {
//     x[i].className = x[i].className.replace(" active", "")
//   }

//   //... and adds the "active" class to the current step:
//   if (typeof x[n] !== "undefined") {
//     x[n].className += " active"
//   }
// }

// (F) CAPITALIZE

function capitalize(word) {
  let arr = word.split(" ")
  let i = 0
  for (i; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }

  return arr.join(" ")
}

// (F) FIRST-WORD

function firstWord(word) {
  let arr = word.split(" ")

  return arr[0]
}

// (F) MASCARA

function mascara(telefone) {
  if (telefone.value.length == 0) telefone.value = "(" + telefone.value

  if (telefone.value.length == 3) telefone.value = telefone.value + ") " //quando o campo já tiver 3 caracteres (um parênteses e 2 números) o script irá inserir mais um parênteses, fechando assim o código de área.

  if (telefone.value.length == 10) telefone.value = telefone.value + "-" //quando o campo já tiver 10 caracteres, o script irá inserir um tracinho, para melhor visualização do telefone.
}

// ---------------- //

// OBSERVER

let observer = new IntersectionObserver(
  function (entries) {
    if (entries[0].isIntersecting) {
      document.getElementById("fadeIn").style.animation = "zoomIn 1s both"
      // wait 1,5s to apply the pulsing animation
      setTimeout(() => {
        document.getElementById("fadeIn").style.animation = "pulse 2s infinite"
      }, 1500)
    }
  },
  { thresold: 2 }
)

observer.observe(document.querySelector("#fadeIn"))

let videoObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting) {
    setTimeout(() => {
      try {
        document.getElementById("video-1").play()
      } catch (err) {
        console.log(err)
      }
    }, 500)
  }
})

videoObserver.observe(document.querySelector(".videos"))
