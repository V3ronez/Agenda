const bcrypt = require("bcryptjs/dist/bcrypt");
const { default: mongoose } = require("mongoose");
const validator = require('validator');
const bcrypjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true }
})

const LoginModel = mongoose.model('Login', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.useExists();

        if (this.errors.length > 0) return;
        const salt = bcrypjs.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);

    }

    async login() {
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário ou senha inválido')
            return;
        }
        if (!bcrypjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return
        }
    }

    async useExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já cadastrado.');
    }

    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido');
        if (this.body.password.length < 6 || this.body.password.length >= 30) this.errors.push('A senha precisa ter entre 6 e 30 caracteres');

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    };
}

module.exports = Login;
