function Validator(formSelector) {
  const formRules = {}

  const validationRules = {
    required: function (value) {
      let isValid = !!value
      if (isValid) {
        return undefined
      } else {
        let errorMessage = 'Please enter this field'
        return errorMessage
      }
    },

    email: function (value) {
      let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let isValid = value.match(mailFormat)
      if (isValid) {
        return undefined
      } else {
        let errorMessage = 'Please enter a valid email'
        return errorMessage
      }
    },

    password: function (value) {
      //>=8 character, at lease 1 uppercase character, 1 lowercase character, 1 number, 1 special character
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      let passwordFormat = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/
      let isValid = value.match(passwordFormat)
      if (isValid) {
        return undefined
      } else {
        let errorMessage = 'Too weak'
        return errorMessage
      }
    },

    min: function (min) {
      return function (value) {
        let isValid = value.length >= min
        if (isValid) {
          return undefined
        } else {
          let errorMessage = `Must have at least ${min} characters`
          return errorMessage
        }
      }
    },
  }

  const formElement = document.querySelector(formSelector)

  if (formElement) {
    const inputElements = formElement.querySelectorAll('[rules][name]')
    inputElements.forEach(inputElement => {
      //String array
      let rules = inputElement.getAttribute('rules').split('|')
      //String array -> Function array
      rules = Array.from(rules).map(rule => {
        if (rule.includes(':')) {
          let ruleInfo = rule.split(':')
          let param = ruleInfo[1]
          rule = ruleInfo[0]
          return validationRules[rule](param)
        }
        return validationRules[rule]
      })
      //Function array
      formRules[inputElement.name] = rules

      //Event Listener

      inputElement.oninput = function () {
        handleValidate(this)
      }
    })

    function handleValidate(inputElement) {
      let rules = formRules[inputElement.name]
      let errorMessage

      // for (let i = 0; i < rules.length; i++) {
      //     errorMessage = rules[i](inputElement.value)
      //     if (errorMessage) break
      // }

      switch (inputElement.type) {
        case 'checkbox':
          break
        case 'radio':
          let value = formElement.querySelector('[type="radio"]:checked')?.value
          errorMessage = rules.find(rule => rule(value) !== undefined)?.(value)
          break
        default:
          errorMessage = rules.find(
            rule => rule(inputElement.value) !== undefined
          )?.(inputElement.value)
      }

      if (errorMessage) {
        inputElement.closest('.form-group').classList.add('invalid')
        inputElement
          .closest('.form-group')
          .querySelector('.form-message').innerHTML = errorMessage
      } else {
        inputElement.closest('.form-group').classList.remove('invalid')
        inputElement
          .closest('.form-group')
          .querySelector('.form-message').innerHTML = ''
      }

      return !errorMessage
    }

    formElement.onsubmit = event => {
      event.preventDefault()

      const inputElements = Array.from(
        formElement.querySelectorAll('[rules][name]')
      )

      let isValid = inputElements.filter(
        inputElement => handleValidate(inputElement) === false
      )

      if (!isValid.length) {
        let result = inputElements.reduce((result, inputElement) => {
          switch (inputElement.type) {
            case 'checkbox':
              if (!Array.isArray(result[inputElement.name]))
                result[inputElement.name] = []
              if (inputElement.checked)
                result[inputElement.name].push(inputElement.value)
              break
            case 'radio':
              if (inputElement.checked)
                result[inputElement.name] = inputElement.value
              break
            default:
              result[inputElement.name] = inputElement.value
          }
          return result
        }, {})
        if (typeof this.onSubmit === 'function') {
          this.onSubmit(result)
        }
      } else {
      }
    }
  }
}
