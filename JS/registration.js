// queryselector for all input fields
let form = document.querySelector('#form')
let firstName = document.querySelector('#fname')
let lastName = document.querySelector('#lname')
let emailID = document.querySelector('#email')
let mobileNumber = document.querySelector('#number')
let TnC = document.querySelector('.TnC')
let checkBox = document.querySelector('#tncbox')
let otpBox = document.querySelector('.otp-section')
let otpInput = document.querySelector('#otp')

// queryselector for label
let firstNameLabel = document.querySelector('.firstName-label')
let lastNameLabel = document.querySelector('.lastName-label')
let emailLabel = document.querySelector('.email-label')
let mobileNumberLabel = document.querySelector('.number-label')

// queryselector for error-msg
let firstNameError = document.querySelector('.f-error')
let lastNameError = document.querySelector('.l-error')
let emailError = document.querySelector('.e-error')
let otpErrorMsg = document.querySelector('.otp-msg')
let mobileNumberError = document.querySelector('.m-error')

// querryselector for buttons
let emailVerifyBtn = document.querySelector('.emailVerify')
let proceedBtn = document.querySelector('.proceed')
let otpVerify = document.querySelector('.otpVerify')

emailVerifyBtn.disabled = true
proceedBtn.disabled = true
otpVerify.disabled = false


let firstNameVal = firstName.value.trim()
let lastNameVal = lastName.value.trim()
let emailIDVal = emailID.value.trim()
let mobileNumberVal = mobileNumber.value.trim()


// first-name validation
function firstNameValidate(){
  let regExp = /^[A-Za-z. ]{3,20}$/

  if(firstName.value.match(regExp)){
    firstNameError.innerHTML = ``
    firstName.classList.remove('alert')
    firstNameLabel.classList.remove('alert')
    firstNameError.classList.remove('alert')
  }
  else{
    firstNameError.innerHTML = `Please enter correct name`
    firstName.classList.add('alert')
    firstNameLabel.classList.add('alert')
    firstNameError.classList.add('alert')
  }

  if(firstName.value == ''){
    firstNameError.innerHTML = `*Mandetory fields cannot be empty`
    firstName.classList.add('alert')
    firstNameLabel.classList.add('alert')
    firstNameError.classList.add('alert')
    proceedBtn.disabled = true
  }
}


// last-name validation
function lastNameValidate(){
  let regExp = /^[A-Za-z. ]{3,20}$/

  if(lastName.value.match(regExp)){
    lastNameError.innerHTML = ``
    lastName.classList.remove('alert')
    lastNameLabel.classList.remove('alert')
    firstNameError.classList.remove('alert')
  }
  else{
    lastNameError.innerHTML = `Please enter correct name`
    lastName.classList.add('alert')
    lastNameLabel.classList.add('alert')
    lastNameError.classList.add('alert')
  }

  if(lastName.value == ''){
    lastNameError.innerHTML = `*Mandetory fields cannot be empty`
    lastName.classList.add('alert')
    lastNameLabel.classList.add('alert')
    lastNameError.classList.add('alert')
    proceedBtn.disabled = true
  }
  else if(firstName.value == lastName.value){
    lastNameError.innerHTML = `First name and Last name cannot be same`
    lastName.classList.add('alert')
    lastNameLabel.classList.add('alert')
    lastNameError.classList.add('alert')
    proceedBtn.disabled = true
  }
}



// email-validation
function emailValidate(){
  let regExp = /^[A-Za-z\d_.]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

  if(emailID.value.match(regExp)){
    emailError.innerHTML = ``
    emailID.classList.remove('alert')
    emailLabel.classList.remove('alert')
    emailError.classList.remove('alert')
    emailVerifyBtn.disabled = false
    emailVerifyBtn.classList.add('unabled')
  }
  else{
    emailError.innerHTML = `Please enter valid email address`
    emailID.classList.add('alert')
    emailLabel.classList.add('alert')
    emailError.classList.add('alert')
    emailVerifyBtn.classList.remove('unabled')
  }

  if(emailID.value == ''){
    emailError.innerHTML = `*Mandetory fields cannot be empty`
    emailID.classList.add('alert')
    emailLabel.classList.add('alert')
    emailError.classList.add('alert')
    proceedBtn.disabled = true
  }
}

// email-verify
emailVerifyBtn.addEventListener('click', function(){

  if(emailVerifyBtn.disabled == false){
    emailVerifyBtn.style.display = 'none'
    otpBox.classList.remove('inactive')

    // Function to generate OTP
    function generateOTP() {
      let OTP = Math.floor(Math.random() * 10000)
      localStorage.setItem("OTP", OTP);
      return OTP;
    }
    setTimeout(() => {
      alert("Your OTP is " + generateOTP());
    }, 1000)
  }
})


function otpVerifyBtn(){
  let otp = localStorage.getItem('OTP')

  if(otpInput.value == otp){
    TnC.classList.remove('inactive')
    otpVerify.innerHTML = `<div class='loader'></div>`
    otpVerify.style.backgroundColor = 'transparent'
    setTimeout(() => {
      otpBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> OTP verified successfully`
      otpBox.classList.add('verified')
    }, 1500)
  }
  else{
    otpErrorMsg.innerHTML = `Please enter correct OTP`
    otpErrorMsg.classList.add('alert')
  }
}


// mobile-verify
mobileNumber.disabled = true
if(localStorage.getItem('userMobile') != null){
  mobileNumber.value = localStorage.getItem('userMobile')
}



// checkbox is checked or not
checkBox.addEventListener('click', () => {
  if((checkBox.checked)){
    proceedBtn.disabled = false
    proceedBtn.classList.add('unabled')
  }
  else{
    proceedBtn.disabled = true
    proceedBtn.classList.remove('unabled')
  }
})


function signUp(){
  if((firstName.value == '')||(lastName.value == '')){
    alert(`*Mandetory fields cannot be empty`)
  }
  else{

    let FirstName, LastName, EmailID, MobileNumber
    FirstName = firstName.value
    LastName = lastName.value
    EmailID = emailID.value
    MobileNumber = mobileNumber.value
  
    let userRecords = []
    userRecords = JSON.parse(localStorage.getItem('userData'))?JSON.parse(localStorage.getItem('userData')) : []
  
    if(userRecords.some((v) => {return v.emailID == EmailID})){
      emailError.innerHTML = `This email is already registered with us`
      emailError.classList.add('alert')
      emailID.classList.add('alert')
      emailLabel.classList.add('alert')
    }
    else{
      userRecords.push({
        'firstName' : FirstName,
        'lastName' : LastName,
        'emailID' : EmailID,
        'mobileNumber' : MobileNumber
      })
      
      localStorage.setItem('userName', FirstName)
      localStorage.setItem('userEmail', EmailID)
      localStorage.setItem('userData', JSON.stringify(userRecords))

      document.querySelector('.register-msg').style.display = 'block'
      setTimeout(() => {
        window.location.href = 'index.html'
      }, 1500)
    }
  }
}
