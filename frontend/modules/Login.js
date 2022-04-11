import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }
    init() {
        this.events();
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]')
        const passwordInput = el.querySelector('input[name="password"]')
        let erros = false;

        if (!validator.isEmail(emailInput.value)) {
            alert('Email inválido');
            erros = true;
        }
        if (passwordInput.value.length < 5 || passwordInput.value.length > 20) {
            alert('Senha inválida - a senha deve ter entre 5 e 50 caracteres')
            erros = true;
        }
        if (!erros) el.submit();
    }

}