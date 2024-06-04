<template>
    <div>
      <div class="container">
        <div class="intro-section">
          <p class="header">Регистрация</p>
          <p class="description">Приветствуем лучшего среди лучших!<br>Введите данные для будущего аккаунта.</p>
        </div>
        <form class="authorization-form">

          <!-- EMAIL -->
          <div class="input-container">
    
            <div @click="focusEmailInput" :class="{ 'custom-input': true, 'custom-input-error': !isEmailValid && hasAttemptedEmailValidation }">
    
              <img src="../assets/icons/email.svg">
    
              <input
                type="text" placeholder="Адрес электронной почты" value=this.email
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
              placeholder="Пароль"
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

          <!-- REPEAT PASSWORD -->
          <div class="input-container">
    
            <div @click="focusRepeatPasswordInput" :class="{ 'custom-input': true, 'custom-input-error': !isRepeatPasswordValid && hasAttemptedRepeatPasswordValidation }">
              <img src="../assets/icons/password.svg">
              <input 
              placeholder="Повтор пароля" type="password"
              ref="selectRepeatPasswordInput"
              v-model="repeat_password"
              @input="repeatPasswordValidateInput"
              />
            </div>

            <div :class="{ 'input-error': true, 'display-flex': !isRepeatPasswordValid && hasAttemptedRepeatPasswordValidation }">
              <img src="../assets/icons/error.svg">
              <p class="input-error-message">{{ repeatPasswordErrorMessage }}</p>
            </div>

          </div>

          <!-- CHECKBOX DATA PROCESSING -->
          <div class="checkbox-container" @click="changeDataProcessingCheckBoxStatus(isCheckDataProcessingBoxActive)" >
            <div class="checkbox">
              <img v-if="isCheckDataProcessingBoxActive" src="../assets/icons/checkmark.svg">
            </div>
            <p class="description">Даю согласие на обработку данных</p>
          </div>

          <!-- CHECKBOX SERVER RULES -->
          <div class="checkbox-container" @click="changeServerRulesCheckBoxStatus(isCheckServerRulesBoxActive)">
            <div class="checkbox">
              <img v-if="isCheckServerRulesBoxActive" src="../assets/icons/checkmark.svg">
            </div>
            <p class="description">Даю согласие соблюдать <a @click="switchToServerRules" class="recovery">Правила сервера</a></p>
          </div>

    
          <!-- BUTTONS -->
          <div class="buttons-container">
            <button type="button" @click="CEF_CLIENT_REGISTRATION_DATA" :class="{ 'button-active' : enterButtonActive}">Далее</button> 
            <button type="button"@click="switchToAuthorization" class="switch-type-authentication">Авторизация</button>
          </div>
        </form>
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

          repeat_password: '',
          repeatPasswordErrorMessage: '',
          isRepeatPasswordValid: false,
          hasAttemptedRepeatPasswordValidation: false,

          isCheckDataProcessingBoxActive: false,
          isCheckServerRulesBoxActive: false,
    
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

        focusRepeatPasswordInput() {
          this.$refs.selectRepeatPasswordInput.focus();
        },

        hideRepeatPasswordError() {
          this.repeatPasswordErrorMessage = '';
          this.isRepeatPasswordValid = true;
        },
    
        showRepeatPasswordError(message) {
          this.repeatPasswordErrorMessage = message;
          this.isRepeatPasswordValid = false;
          this.enterButtonActive = false;
          return;
        },

        repeatPasswordValidateInput() {
          this.hasAttemptedRepeatPasswordValidation = true;
    
          this.repeat_password = this.repeat_password.replace(/\s+/g, '');
          if(this.repeat_password === '') return this.showRepeatPasswordError('Повторите введенный пароль!');
          if(this.repeat_password !== this.password) return this.showRepeatPasswordError('Введенные пароли не совпадают!');
          this.hideRepeatPasswordError();
          this.buttonActivation();
        },

        changeDataProcessingCheckBoxStatus(status) {
          this.isCheckDataProcessingBoxActive = !status;
          this.buttonActivation();
        },

        changeServerRulesCheckBoxStatus(status) {
          this.isCheckServerRulesBoxActive = !status;
          this.buttonActivation();
        },

        switchToServerRules() {
          this.$router.push("/server-rules");
        },

        buttonActivation() {
          if(this.isPasswordValid 
          && this.isEmailValid 
          && this.isRepeatPasswordValid
          && this.isCheckDataProcessingBoxActive 
          && this.isCheckServerRulesBoxActive) 
          this.enterButtonActive = true;
          else this.enterButtonActive = false;
          
        },
    
        switchToAuthorization() {
          this.$router.push("/authorization");
        },
        
        // EDIT
        CEF_CLIENT_REGISTRATION_DATA() {
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

          if(!this.isRepeatPasswordValid) {
            this.hasAttemptedRepeatPasswordValidation = true;
            this.showRepeatPasswordError('Повторите введенный пароль!');
            return;
          }

          if(!this.isCheckDataProcessingBoxActive) {
            
          }

          // ----------
          // NEXT STEP
          // ----------
        }
        // EDIT
      }
    }
    
    </script>