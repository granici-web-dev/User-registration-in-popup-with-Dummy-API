// API
const BASE_URL = 'https://dummyjson.com';

// Modal
const registrationBtn = document.querySelector('.registrationBtn');
const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modalInner');
const closeBtn = document.querySelector('.closeBtn');
const cancelBtn = document.querySelector('.cancelBtn');


// Form
const formRegistration = document.querySelector('.formRegistration');
const registerFormButton = document.querySelector('.registerFormButton');
// Username
const usernameLabel = document.querySelector('.usernameLabel');
const usernameInput = document.querySelector('.usernameInput');
// Email
const emailLabel = document.querySelector('.emailLabel');
const emailInput = document.querySelector('.emailInput');
// Password
const passwordLabel = document.querySelector('.passwordLabel');
const passwordInput = document.querySelector('.passwordInput');
// Confirm password
const confirmPasswordLabel = document.querySelector('.confirmPasswordLabel');
const confirmPasswordInput = document.querySelector('.confirmPasswordInput');
// Firstname
const firstnameLabel = document.querySelector('.firstnameLabel');
const firstnameInput = document.querySelector('.firstnameInput');
// Lastname
const lastnameLabel = document.querySelector('.lastnameLabel');
const lastnameInput = document.querySelector('.lastnameInput');
// Age
const ageLabel = document.querySelector('.ageLabel');
const ageInput = document.querySelector('.ageInput');

// Массив пользователей
let users = JSON.parse(localStorage.getItem('users')) || [];

// Loader
const loader = document.querySelector('.loader');
loader.style.display = 'none';

let isLoading = false;
let isFormValid = false;
// registerFormButton.disabled = true

// Modal toggle function
const toggleModalWindow = () => {
  modal.classList.toggle('hiddenModal');
};

// Закрыть по кнопке Register
registrationBtn.addEventListener('click', toggleModalWindow);
// Закрыть по любому место window
modal.addEventListener('click', toggleModalWindow);
// Закрыть по иконке
closeBtn.addEventListener('click', toggleModalWindow);
// Закрыть по кнопке Cancel
cancelBtn.addEventListener('click', toggleModalWindow);
// Stop Propagation
modalInner.addEventListener('click', (e) => e.stopPropagation());
// Закрыть по клавише ESC
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    toggleModalWindow();
  }
});

// Функция рендер сообщения об ощибке
const renderErrorMessage = (parent, input, message) => {
  // Удаляем старую ошибку, если она есть
  const existingError = parent.querySelector('.errorMessage');
  if (existingError) {
    existingError.remove();
  }

  // Создаем новый элемент <span> для ошибки
  const errorSpan = document.createElement('span');
  errorSpan.classList.add('errorMessage'); // Класс для стилизации ошибки
  errorSpan.textContent = message;

  // Делаем border: red
  input.classList.add('errorBorder');

  // Добавляем ошибку в родительский элемент
  parent.appendChild(errorSpan);
};

// Функция рендер сообщения об ощибке
const renderSuccessMessage = (parent, message) => {
  // Удаляем старую ошибку, если она есть
  const existingSuccess = parent.querySelector('.successMessage');
  if (existingSuccess) {
    existingSuccess.remove();
  }

  // Создаем новый элемент <span> для ошибки
  const successSpan = document.createElement('span');
  successSpan.classList.add('successMessage'); // Класс для стилизации ошибки
  successSpan.textContent = message;

  // Добавляем ошибку в родительский элемент
  parent.prepend(successSpan);
};

// Функция для очистки ошибок
const clearErrorMessage = (input, label) => {
  const parent = label; // Находим родительский элемент (например, label)
  const existingError = parent.querySelector('.errorMessage');
  if (existingError) {
    existingError.remove(); // Удаляем старую ошибку
  }
  input.classList.remove('errorBorder'); // Убираем подсветку
};


// Валидация для username
const usernameValidation = (usernameInputValue) => {
  const username = usernameInputValue.value.trim();
  console.log(username);
  
  // Проверка на длину
  if (username.length < 2 || username.length > 26) {
    renderErrorMessage(
      usernameLabel,
      usernameInput,
      'Username must be between 2 and 26 characters',
    );
    return false;
  }

  // Убираем ошибку, если поле валидно
  clearErrorMessage(usernameInput, usernameLabel);
  return true;
};


// Валидация для email
const emailValidation = (emailInputValue) => {
  const email = emailInputValue.value.trim();
 
  if (!email.includes('@')) {
    renderErrorMessage(emailLabel, emailInput, 'Email need to have @');
    return false;
  }

  // Убираем ошибку, если поле валидно
  clearErrorMessage(emailInput, emailLabel);
  return true;
}

// Валидация для password
const passwordValidation = (passwordInputValue) => {
  const password = passwordInputValue.value.trim();

  if (password.length < 6) {
    renderErrorMessage(
      passwordLabel,
      passwordInput,
      'Password must be more than 6 characters',
    );
    return false;
  }

  clearErrorMessage(passwordInput, passwordLabel);
  return true;
}

// Валидация пароля поддтверждения 
const confirmPasswordValidation = (passwordInputValue, confirmPasswordInputValue) => {
  const password = passwordInputValue.value.trim();
  const confirmPassword = confirmPasswordInputValue.value.trim();

  if (password !== confirmPassword) {
    renderErrorMessage(
      confirmPasswordLabel,
      confirmPasswordInput,
      'The confirmed password must be identical to the password.',
    );
    return false;
  }

  clearErrorMessage(confirmPasswordInput, confirmPasswordLabel);
  return true;
}

// Валидация имени
const firstnameValidation = (firstNameInputValue) => {
  const firstname = firstNameInputValue.value.trim();

  if (firstname.length < 2 || firstname.length > 24) {
    renderErrorMessage(
      firstnameLabel,
      firstnameInput,
      'Firstname must be between 2 and 24 characters',
    );
    return false
  }

  clearErrorMessage(firstnameInput, firstnameLabel);
  return true;
}

// Валидация фамилии
const lastnameValidation = (lastNameInputValue) => {
  const lastname = lastNameInputValue.value.trim();

  if (lastname.length < 2 || lastname.length > 26) {
    renderErrorMessage(
      lastnameLabel,
      lastnameInput,
      'Lastname must be between 2 and 26 characters',
    );
    return false;
  }

  clearErrorMessage(lastnameInput, lastnameLabel);
  return true;
}

// Валидация возраста
const ageValidation = (ageInputValue) => {
  const age = ageInputValue.value.trim();

  if (age < 18 || age > 100) {
    renderErrorMessage(
      ageLabel,
      ageInput,
      'Age must be more than 18',
    );
    return false;
  }

  clearErrorMessage(ageInput, ageLabel);
  return true;
}

// Отслеживаем по типу input все ошибки
usernameInput.addEventListener('input', () => usernameValidation(usernameInput));
emailInput.addEventListener('input', () => emailValidation(emailInput));
passwordInput.addEventListener('input', () => passwordValidation(passwordInput));
firstnameInput.addEventListener('input', () => firstnameValidation(firstnameInput));
lastnameInput.addEventListener('input', () => lastnameValidation(lastnameInput));
ageInput.addEventListener('input', () => ageValidation(ageInput));

// Убираем возможность стпвить пробелы
usernameInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});

emailInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});

passwordInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});

confirmPasswordInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});

firstnameInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});

lastnameInput.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    event.preventDefault();
  }
});



// Собираем данные из формы
formRegistration.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = event.target.elements['username'];
  const email = event.target.elements['email'];
  const password = event.target.elements['password'];
  const confirmePassword = event.target.elements['confirm_password'];
  const firstname = event.target.elements['firstName'];
  const lastname = event.target.elements['lastName'];
  const age = event.target.elements['age'];

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  // const confirmePasswordValue = confirmePassword.value.trim();
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const ageValue = age.value.trim();

  if (
    usernameValidation(username) &&
    emailValidation(email) &&
    passwordValidation(password) &&
    confirmPasswordValidation(password, confirmePassword) &&
    firstnameValidation(firstname) &&
    lastnameValidation(lastname) &&
    ageValidation(age)
  ) {
    const newUser = {
      id: Math.floor(Math.random() * (99 - 1 + 1)) * 9,
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      firstName: firstnameValue,
      lastName: lastnameValue,
      age: ageValue,
      token: Math.floor(Math.random() * (99 - 1 + 1)) * 999,
    };

    // registerFormButton.disabled = false;

    users.push(newUser);
    console.log(newUser);

    registerUser(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    formRegistration.reset();
    showLoader();
  }

  setTimeout(() => {
    hideLoader();
  }, 3000);
});

// Обработка ошибки API
const handleApiError = (message) => {
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('username')) {
    renderErrorMessage(usernameLabel, usernameInput, 'Invalid username');
  } else if (lowerCaseMessage.includes('email')) {
    renderErrorMessage(emailLabel, emailInput, 'Invalid email');
  } else if (lowerCaseMessage.includes('password')) {
    renderErrorMessage(passwordLabel, passwordInput, 'Invalid password');
  } else if (lowerCaseMessage.includes('firstname')) {
    renderErrorMessage(firstnameLabel, firstnameInput, 'Invalid firstname');
  } else if (lowerCaseMessage.includes('lastname')) {
    renderErrorMessage(lastnameLabel, lastnameInput, 'Invalid lastname');
  } else if (lowerCaseMessage.includes('age')) {
    renderErrorMessage(ageLabel, ageInput, 'Invalid age');
  }
}

// Асинхронная функция регистрации пользователя
const registerUser = async (user) => {
  try {
    const userResponse = await fetch(`${BASE_URL}/users`)
    const userData = await userResponse.json()

    const userExist = userData.some((u) => {
      return u.username.toLowerCase() === user.username.toLowerCase();
    });

    if (userExist) {
      throw new Error('This username is already exist, choose another username!');
    }

    const response = await fetch(`${BASE_URL}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    const data = response.json()

    if (response.status >= 200 && response.status <= 299) {
      renderSuccessMessage(formRegistration, 'Success! User created');

      console.log(data);

      setTimeout(() => {
        toggleModalWindow();
      }, 3000);

    } else {
      renderErrorMessage(formRegistration, cancelBtn, 'Error! Failed connection');
    }
    
  } catch (error) {
    handleApiError(error.message);
  }
}

// Функция показ loader
const showLoader = () => {
  loader.style.display = 'inline-block';
  isLoading = true;
  formRegistration.style.opacity = '0.5';
  updateSubmitButtonState();
}

// Функция скрытие loader
const hideLoader = () => {
  loader.style.display = 'none';
  isLoading = false;
  formRegistration.style.opacity = '1';
  updateSubmitButtonState();
};

// Функция изменение состояния кнопки
const updateSubmitButtonState = () => {
  if (isLoading) {
    registerFormButton.textContent = 'Sending...'
    registerFormButton.disabled = true;
    cancelBtn.disabled = true;
  } else {
    registerFormButton.disabled = !isFormValid; 
    registerFormButton.textContent = 'Register';
    cancelBtn.disabled = false;
  }
}
