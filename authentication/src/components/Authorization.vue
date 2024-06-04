<template>
<div>
  <div class="container">
    <div class="intro-section">
      <p class="header">Авторизация</p>
      <p class="description">Мы рады снова приветствовать Вас!<br>Введите данные от аккаунта, чтобы войти в игру.</p>
    </div>
    <form class="authorization-form">

      <!-- EMAIL -->
      <div class="input-container">

        <div @click="focusEmailInput" :class="{ 'custom-input': true, 'custom-input-error': !isEmailValid && hasAttemptedEmailValidation }">

          <img src="../assets/icons/email.svg">

          <input
            type="text" placeholder="Адрес электронной почты" maxlength="40"
            ref="selectEmailInput"
            v-model="email"
            @input="emailValidateInput"
          />
        </div>

        <div :class="{ 'input-error': true, 'display-flex': !isEmailValid && hasAttemptedEmailValidation }">
          <img src="../assets/icons/error.svg">
          <p class="input-error-message">{{ emailErrorMessage }}</p>
        </div>

      </div>


      <!-- PASSWORD -->
      <div class="input-container">

        <div @click="focusPasswordInput" :class="{ 'custom-input': true, 'custom-input-error': !isPasswordValid && hasAttemptedPasswordValidation }">
          <img src="../assets/icons/password.svg">
          <input 
          placeholder="Пароль" maxlength="64"
          ref="selectPasswordInput"
          v-model="password"
          @input="passwordValidateInput"
          :type="passwordInputType"
          />
          <img @click="switchPasswordHiddenStatus(false)" :class="{ 'input-error' : !isPasswordHidden}" src="../assets/icons/show_password.svg" style="cursor: pointer;">
          <img @click="switchPasswordHiddenStatus(true)" :class="{ 'input-error' : isPasswordHidden}" src="../assets/icons/hide_password.svg" style="cursor: pointer;">
        </div>

        <div :class="{ 'input-error': true, 'display-flex': !isPasswordValid && hasAttemptedPasswordValidation }">
          <img src="../assets/icons/error.svg">
          <p class="input-error-message">{{ passwordErrorMessage }}</p>
        </div>

      </div>

      <!-- BUTTONS -->
      <div class="buttons-container">
        <button type="button" @click="CEF_CLIENT_AUTHORIZATION_DATA" :class="{ 'button-active' : enterButtonActive}">Войти</button>
        <button type="button"@click="switchToRegistration" class="switch-type-authentication">Регистрация</button>
      </div>
    </form>
    <p class="forgot-password">Забыли пароль? - <a @click="switchToResetPassword" class="recovery">Восстановить</a></p>
  </div>
</div>
</template>

<script>

export default {
  name: 'Authorization',
  data() {
    return {
      email: '',
      emailErrorMessage: '',
      isEmailValid: false,
      hasAttemptedEmailValidation: false,
      
      password: '',
      passwordErrorMessage: '',
      isPasswordValid: false,
      isPasswordHidden: true,
      passwordInputType: 'password',
      hasAttemptedPasswordValidation: false,

      enterButtonActive: false
    };
  },

  methods: {
    focusEmailInput() {
      this.$refs.selectEmailInput.focus();
    },

    hideEmailError() {
      this.emailErrorMessage = '';
      this.isEmailValid = true;
    },
    showEmailError(message) {
      this.emailErrorMessage = message;
      this.isEmailValid = false;
      this.enterButtonActive = false;
      return;
    },

    emailValidateInput() {
      this.hasAttemptedEmailValidation = true;
      this.email = this.email.replace(/\s+/g, '');
      if(this.email === '') return this.showEmailError('Введите адрес электронной почты!');

      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regex.test(this.email)) return this.showEmailError('Неверный формат адреса электронной почты!');

      if(this.email.length > 40) return this.showEmailError('Слишком длинный адрес электронной почты!');
      if(this.email.length < 6) return this.showEmailError('Слишком короткий адрес электронной почты!');

      this.hideEmailError();
      this.buttonActivation();
      
    },

    focusPasswordInput() {
      this.$refs.selectPasswordInput.focus();
    },

    hidePasswordError() {
      this.passwordErrorMessage = '';
      this.isPasswordValid = true;
    },

    showPasswordError(message) {
      this.passwordErrorMessage = message;
      this.isPasswordValid = false;
      this.enterButtonActive = false;
      return;
    },

    passwordValidateInput() {
      this.hasAttemptedPasswordValidation = true;

      this.password = this.password.replace(/\s+/g, '');
      if(this.password === '') return this.showPasswordError('Введите пароль!');

      const regex = /^[A-Za-z0-9]+$/;
      if (!regex.test(this.password)) return this.showPasswordError('Пароль может состоять из латинских букв и цифр!');

      if(this.password.length > 64) return this.showPasswordError('Слишком длинный пароль!');
      if(this.password.length < 6) return this.showPasswordError('Слишком короткий пароль!');

      this.hidePasswordError();
      this.buttonActivation();
    },

    switchPasswordHiddenStatus(status) {
      this.isPasswordHidden = status;
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    },

    buttonActivation() {
      if(this.isPasswordValid && this.isEmailValid) this.enterButtonActive = true;
    },

    switchToRegistration() {
      this.$router.push("/registration");
    },

    switchToResetPassword() {
      this.$router.push("/reset-password");
    },

    CEF_CLIENT_AUTHORIZATION_DATA() {
      if(!this.isEmailValid) {
        this.hasAttemptedEmailValidation = true;
        this.showEmailError('Введите адрес электронной почты!');
        return;
      } 
      if (!this.isPasswordValid) {
        this.hasAttemptedPasswordValidation = true;
        this.showPasswordError('Введите пароль!');
        return;
      }
      // ----------
      // NEXT STEP
      // ----------
    }
  }
}

</script>