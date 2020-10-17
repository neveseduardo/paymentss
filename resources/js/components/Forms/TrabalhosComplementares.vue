<template>
    <div class="trabalhos-complementares">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="view" class="close-button1 d-flex align-items-center justify-content-end">
                            <p-button class="mt-0 mb-1 ml-4" type="danger" size="sm" icon @click="remove(id, tipo, name)">
                                <i class="nc-icon nc-simple-remove"></i>
                            </p-button>
                        </div>
                    </div>
                </div>

                <h4 class="card-title mt-2">Documentos Complementares</h4>

                <tabs value="Description" v-if="!criacao">
                    <tab-pane title="Visualizar" key="visualizar">
                        <ul v-if="salvos.length">

                            <li v-bind:key="index" v-for="(doc, index) in salvos">
                                {{doc.detalhes.nome}}
                                <br>
                                {{doc.tx_complemento}}
                            </li>

                        </ul>
                    </tab-pane>
                    <tab-pane title="Adicionar" key="adicionar">
                        <div class="row">
                            <div class="col-md-12 col-sm-12" v-bind:key="index"  v-for="(el, index) in items">
                                <div class="d-flex align-items-center">
                                    <p-checkbox v-model="selecionados" :value="el.codigo" :checked="false">{{el.nome}}</p-checkbox>
                                    <div v-show="el.in_texto_complemento" class="ml-3">
                                        <input class="form-control form-control-sm" @keydown="$emit('tx_complemento', {
                                                'index': index,
                                                'codigo': el.codigo, 
                                                'texto': $event.target.value
                                            })">
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-end">
                                <p-button type="primary" @click="salvar()">Salvar</p-button>
                            </div>
                        </div>
                    </tab-pane>
                </tabs>
        
                <div class="d-flex mt-4 align-items-center justify-content-end" v-show="criacao">
                    <div class="d-flex align-items-center">
                        <p class="category mb-1 mr-3">Obrigatório</p>
                        <p-switch v-model="obrigatorio" type="primary" on-text="Sim" off-text="Não"></p-switch>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Collapse, CollapseItem, Tabs, TabPane, Card} from 'src/components/UIComponents'
import {Input} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'

import TipoDocumentoComplementoService from "@/services/TipoDocumentoComplementoService.js"
import DocumentoComplementoService from "@/services/DocumentoComplementoService.js"


export default {
    components: {
        TabPane,
        Tabs,
        PSwitch,
        [Input.name]: Input,
    },
    props: [
        '_id', 'id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data() {
        return {
            obrigatorio: false,
            campos: {
                selecionados: false
            },
            items: [],
            salvos: [],
            selecionados: [],
            tx_complemento: Object(),
        }
    },
    watch: {
        selecionados() {
            this.modificacoes()
        },
        salvos() {
            this.modificacoes()
        },
        obrigatorio() {
            this.adicionar()
        }
    },
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this._camposVazio()
        } else {
            this.campos.selecionados = false
        }

        this.$on('tx_complemento', (e) => {
            this.tx_complemento['codigo-' + e.codigo] = e
            this.modificacoes()
        })

        this._load()
    },
    methods: {

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            if (!this.criacao) {
                let selecionados = ''
                selecionados = !!this.salvos.length || !!this.selecionados.length
                this.campos.selecionados = selecionados
                this.$root.$emit('vazios', {
                    is: 'trabalhos-complementares',
                    selecionados: !selecionados,
                    status: [!selecionados]
                })
            }
        },

        salvar() {
            if (this.id_solicitacao_pericia) {
                DocumentoComplementoService
                    .add({
                        id_solicitacao_pericia: this.id_solicitacao_pericia,
                        data: {
                            tx_complemento: this.tx_complemento,
                            selecionados: this.selecionados,
                        }
                    })
                    .then(res => {
                        this.tx_complemento = Object
                        this.selecionados = []
                        this._loadChanges()
                    })
                    .catch(err => console.error(err))
            }
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Santana <luis.santana@capgemini.com>
         */
        remove(id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        /**
         * @description Envio de dados do formulário para a matriz `levels.trabalhosComplementares` 
         *              em Formulario/Formulario.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar() {
            this.$root.$emit('add', {
                is: 'trabalhos-complementares',
                nome: 'Trabalhos Complementares',
                tipo: this.tipo,
                index: this.id,
                contexto: 'Trabalhos Complementares',
                matrizContexto: 'trabalhosComplementares',
                in_obrigatoriedade: this.obrigatorio,
            })
        },

        /** 
         * @method
         * @description Quando um campo é modificado, também é modificado
         *              na matriz do respectivo formulário
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        modificacoes() {
            if (!this.id_solicitacao_pericia) {
                this.$root.$emit('trabalhos-complementares:add', {
                    id: this._id,
                    is: 'trabalhos-complementares',
                    tipo: 'trabalhos-complementares',
                    data: {
                        tx_complemento: this.tx_complemento,
                        selecionados: this.selecionados,
                    }
                })

                if (this.in_obrigatoriedade) {
                    this._camposVazio()
                }
            }
        },

        _load() {
            TipoDocumentoComplementoService.all()
                .then(res => {
                    this.items = res.data
                })
                .catch(err => console.error(err))

            if (this.id_solicitacao_pericia) {
                DocumentoComplementoService
                    .all(this.id_solicitacao_pericia)
                    .then(res => {
                        this.salvos = res.data
                        this._camposVazio()
                    })
                    .catch(err => console.error(err))
            }
        },

        _loadChanges() {
            if (this.id_solicitacao_pericia) {
                DocumentoComplementoService
                    .all(this.id_solicitacao_pericia)
                    .then(res => {
                        this.salvos = res.data
                        this._camposVazio()
                    })
                    .catch(err => console.error(err))
            }
        }
    },
}
</script>
<style lang="scss">
.trabalhos-complementares {
    .nav-tabs-navigation {
        text-align: left;
    }
}
</style>