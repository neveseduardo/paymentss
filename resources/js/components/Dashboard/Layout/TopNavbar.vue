<template>
    <navbar v-model="showNavbar">
        <div class="navbar-wrapper">
            <div class="navbar-minimize">
                <button
                    id="minimizeSidebar"
                    class="btn btn-icon btn-round"
                    @click="minimizeSidebar"
                >
                    <i
                        class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"
                    ></i>
                    <i
                        class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"
                    ></i>
                </button>
            </div>
            <div class="navbar-toggle">
                <navbar-toggle-button @click.native="toggleSidebar">
                </navbar-toggle-button>
            </div>
            <a class="navbar-brand" href="#pablo"></a>
        </div>

        <template slot="navbar-menu">
            <form>
                <div class="input-group no-border">
                    <input
                        type="text"
                        value=""
                        class="form-control"
                        placeholder="Pesqusiar..."
                    />
                </div>
            </form>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link btn-magnify" href="#pablo">
                        <i class="nc-icon nc-layout-11"></i>
                        <p>
                            <span class="d-lg-none d-md-block">Stats</span>
                        </p>
                    </a>
                </li>
                <drop-down
                    icon="nc-icon nc-bell-55"
                    tag="li"
                    position="right"
                    direction="none"
                    class="nav-item btn-rotate dropdown"
                >
                    <a
                        slot="title"
                        slot-scope="{ isOpen }"
                        class="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        :aria-expanded="isOpen"
                        ><button
                            v-if="notificacaoNaoLida > 0"
                            type="button"
                            class="btn btn-danger btn-sm"
                        >
                            {{ notificacaoNaoLida }}
                        </button>
                        <i
                            v-if="notificacaoNaoLida > 0"
                            class="fa fa-bell text-danger"
                        ></i>
                        <i v-else class="fa fa-bell"></i>
                    </a>
                    <div class="container">
                        <div class="row justify-content-md-center"></div>

                        <!-- <div class="col">
                <br>
                <div class="text-center">
                  <p class="text-uppercase">Notificação</p>
                </div>
                <div class="text-right">
                  <p-button @click="limparNotificacoes" class="btn btn-primary btn-sm">Limpar</p-button>
                </div>
              </div>  -->

                        <!-- <nav class="navbar navbar-expand-md">
                            <div
                                class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2"
                            >
                                <ul class="navbar-nav mr-auto"></ul>
                            </div>
                            <div class="mx-auto order-0">
                                <p class="text-uppercase">Notificação</p>
                                <button
                                    class="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target=".dual-collapse2"
                                >
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                            <div
                                class="navbar-collapse collapse w-100 order-3 dual-collapse2"
                            >
                                <ul class="navbar-nav ml-auto">
                                    <li class="nav-item">
                                        <p-button
                                            @click="limparNotificacoes"
                                            title="Lidas com dados corrigidos."
                                            class="btn btn-warning btn-sm"
                                            >Limpar</p-button
                                        >
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <hr />
                        <div
                            v-for="item in notificacao"
                            v-bind:key="item.id_notificacao_beneficiario"
                        >
                            <div v-if="item.flg_notificacao_lida == 0">
                                <button
                                    class="dropdown-item"
                                    @click="corrigirInformacoes(item)"
                                >
                                    <span class="text-uppercase"
                                        ><b
                                            >Atenção ({{
                                                item.data_ult_notificacao
                                            }}):
                                        </b></span
                                    ><br />
                                    <span
                                        ><b>
                                            Existem dados a serem corrigidos
                                            para <br />
                                            {{ item.nom_colaborador }} -
                                            {{ item.nom_comarca }} -
                                            {{ item.nom_unidade_faturamento }} -
                                            {{ item.des_periodo }}
                                            {{
                                                item.qtd_despesa > 0
                                                    ? ' (' +
                                                      item.qtd_despesa +
                                                      ')'
                                                    : ''
                                            }}, <br />
                                            para fazê-lo
                                            <span class="text-primary"
                                                ><b>clique aqui.</b></span
                                            >
                                        </b></span
                                    >
                                </button>
                            </div>

                            <div v-if="item.flg_notificacao_lida != 0">
                                <button
                                    class="dropdown-item"
                                    @click="corrigirInformacoes(item)"
                                >
                                    <span class="text-uppercase"
                                        >Atenção ({{
                                            item.data_ult_notificacao
                                        }}): </span
                                    ><br />
                                    <span
                                        >Existem dados a serem corrigidos para
                                        <br />
                                        {{ item.nom_colaborador }} -
                                        {{ item.nom_comarca }} -
                                        {{ item.nom_unidade_faturamento }} -
                                        {{ item.des_periodo }}
                                        {{
                                            item.qtd_despesa > 0
                                                ? ' (' + item.qtd_despesa + ')'
                                                : ''
                                        }}, <br />
                                        para fazê-lo
                                        <span class="text-primary"
                                            >clique aqui.</span
                                        >
                                    </span>
                                </button>
                            </div>
                            <hr />
                        </div> -->
                    </div>
                </drop-down>
                <li class="nav-item">
                    <a class="nav-link btn-rotate" href="#pablo">
                        <i class="nc-icon nc-settings-gear-65"></i>
                        <p>
                            <span class="d-lg-none d-md-block">Account</span>
                        </p>
                    </a>
                </li>
            </ul>
        </template>
    </navbar>
</template>
<script>
import { Navbar, NavbarToggleButton } from 'src/components/UIComponents';

export default {
    components: {
        Navbar,
        NavbarToggleButton,
    },
    data() {
        return {
            activeNotifications: false,
            showNavbar: false,
            notificacao: [],
            notificacaoNaoLida: null,
            id_notificacao_beneficiario_array: [],
            usuario: JSON.parse(localStorage.getItem('usuario')),
        };
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleNotificationDropDown() {
            this.activeNotifications = !this.activeNotifications;
        },
        closeDropDown() {
            this.activeNotifications = false;
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        minimizeSidebar() {
            this.$sidebar.toggleMinimize();
        },
        toggleNavbar() {
            this.showNavbar = !this.showNavbar;
        },
    },
};
</script>
<style>
.text-center {
    text-align: right;
}
</style>
