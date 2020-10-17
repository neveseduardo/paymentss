<template>
    <div class="login-container">
        <div class="mb-2">
            <el-card>
                <h5 class="text-center mb-3">Autenticação</h5>

                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                    auto-complete="off"
                    label-position="left"
                >
                    <el-form-item prop="email">
                        <el-input
                            v-model="loginForm.email"
                            placeholder="Usuário"
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-user"
                            ></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="loginForm.password"
                            placeholder="Digite sua senha"
                            show-password
                        >
                            <i
                                slot="prefix"
                                class="el-input__icon el-icon-lock"
                            ></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="loading"
                            type="primary"
                            style="width: 100%"
                            icon="el-icon-right"
                            @click.native.prevent="handleLogin"
                            >ENTRAR</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div>
            <el-card>
                <el-button type="text">Esqueceu a senha ?</el-button>
            </el-card>
        </div>
    </div>
</template>

<script>
import http from '@/http';
import { login } from '@/services/authentication';
import NProgress from 'nprogress';

export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            loginRules: {
                email: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (value === '') {
                                callback(new Error('Digite um email.'));
                            } else if (!re.test(value)) {
                                callback(new Error('Digite um e-mail válido.'));
                            } else {
                                callback();
                            }
                        },
                    },
                ],
                password: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('Digite uma senha.'));
                            } else if (value.length < 4) {
                                callback(
                                    new Error(
                                        'A senha não pode ser menor que 4 caracteres.'
                                    )
                                );
                            } else {
                                callback();
                            }
                        },
                    },
                ],
            },
            loading: false,
        };
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    NProgress.start();
                    const { login: requestLogin } = http.authentication;
                    const data = this.loginForm;
                    try {
                        const req = await requestLogin(data);

                        const { user } = req.data;

                        login(user);
                        this.$router.push({ name: 'Admin'});
                    } catch (error) {
                        console.log(error);
                    }

                    this.loading = false;
                    NProgress.done();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss">
.login-container {
    min-width: 30%;
}
</style>