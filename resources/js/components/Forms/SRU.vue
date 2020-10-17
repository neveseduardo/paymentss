<template>
    <div class="sru">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div v-if="view" class="d-flex align-items-center justify-content-end">
                            <p-button @click="remove(id, tipo, name)" class="mt-0 mb-1 ml-4" type="danger" size="sm" icon >
                                <i class="nc-icon nc-simple-remove"></i>
                            </p-button>
                        </div>
                    </div>
                </div>

                <h4 class="card-title mt-2 mb-4">N° do Procedimento/Processo</h4>

                <div class="form-horizontal" v-if="!criacao">
                    <div class="row">
                        <label class="col-md-3 col-form-label">Número</label>
                        <div class="col-md-6">
                            <fg-input :disabled="block" :required="required" v-model="numero_processo"></fg-input>
                        </div>
                        <div class="col-md-3">
                            <div v-show="criacao" class="d-flex align-items-center">
                                <p class="category mb-1 mr-3">Obrigatório</p>
                                <p-switch v-model="obrigatorio" type="primary" @change="adicionar()" on-text="Sim" off-text="Não"></p-switch>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <label class="col-md-3 col-form-label">Número de Volumes</label>
                        <div class="col-md-6">
                            <fg-input :disabled="block" :required="required" v-model="numero_volumes"></fg-input>
                        </div>
                        <div class="col-md-3">
                            <div v-show="criacao" class="d-flex align-items-center">
                                <p class="category mb-1 mr-3">Obrigatório</p>
                                <p-switch v-model="obrigatorio" type="primary" @change="adicionar()" on-text="Sim" off-text="Não"></p-switch>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <label class="col-md-3 col-form-label">Município do Fato</label>
                        <div class="col-md-6">
                            <fg-input :disabled="block" :required="required"  v-model="municipio"></fg-input>
                        </div>
                        <div class="col-md-3">
                            <div v-show="criacao" class="d-flex align-items-center">
                                <p class="category mb-1 mr-3">Obrigatório</p>
                                <p-switch v-model="obrigatorio" type="primary" @change="adicionar()" on-text="Sim" off-text="Não"></p-switch>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <label class="col-md-3 col-form-label">Objeto da Investigação</label>
                        <div class="col-md-6">
                            <fg-input :disabled="block" :required="required" v-model="objeto"></fg-input>
                        </div>
                    </div>
                </div>

                <div class="d-flex mt-3 align-items-center justify-content-end" v-if="criacao">
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
import SRUService from '@/services/SRUService.js'
import ItemSolicitacaoPericia from '@/services/ItemSolicitacaoPericiaService.js'
import swal from 'sweetalert2'

import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'

export default {
    components: {
        [DatePicker.name]: DatePicker,
        PSwitch,
    },
    props: [
        '_id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({

        // configurações
        block: false,
        obrigatorio: false,
        required: false,
        processing: {
            save: false
        },
        campos: {
            objeto: false,
            municipio: false,
            numero_volumes: false,
            numero_processo: false,
        },

        // atributos
        id_item_solicitacao_pericia: null,
        objeto: '',
        municipio: '',
        numero_volumes: '',
        numero_processo: '',

    }),
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this.required = this.in_obrigatoriedade
            this._camposVazio()
        }

        this._load()
        this._save()
    },
    watch: {
        objeto() { this.modificacoes() },
        municipio() { this.modificacoes() },
        numero_volumes() { this.modificacoes() },
        numero_processo() { this.modificacoes() },
        obrigatorio() { this.adicionar() }
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
                let objeto = ''
                let municipio = ''
                let numero_volumes = ''
                let numero_processo = ''

                objeto = !!this.objeto.length
                municipio = !!this.municipio.length
                numero_volumes = !!this.numero_volumes.length
                numero_processo = !!this.numero_processo.length

                this.campos.objeto = !objeto
                this.campos.municipio = !municipio
                this.campos.numero_volumes = !numero_volumes
                this.campos.numero_processo = !numero_processo

                this.$root.$emit('vazios', {
                    is: 'solicitar-urgencia',
                    objeto,
                    municipio,
                    numero_volumes,
                    numero_processo,
                    status: [!objeto, !municipio, !numero_volumes, !numero_processo]
                })
            }
        },

        /**
         * @description Método para carregar informações do dado referente a SRU
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load() {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this.id_campo)
                    .then(doc => {
                        let data = doc.data.valor_item_solicitacao.data

                        this.objeto = data.objeto
                        this.municipio = data.municipio
                        this.numero_volumes = data.numero_volumes
                        this.numero_processo = data.numero_processo
                        this.id_item_solicitacao_pericia = data._id

                        // Se o número do processo existir, bloqueio os campos
                        this.block = this.numero_processo ? true : false
                    })
                    .catch(err => console.log(err))
            }
        },

        /**
         * @todo Implementar método de salvar independente
         */
        _save() { 
            this.$root.$on('atualizacao', (e) => {
                this.processing.save = true

                if (this.id_item_solicitacao_pericia) {
                    ItemSolicitacaoPericia
                        .update(this.id_item_solicitacao_pericia, {
                            objeto: this.objeto,
                            municipio: this.municipio,
                            numero_volumes: this.numero_volumes,
                            numero_processo: this.numero_processo,
                        })
                        .then(doc => {
                            console.log(doc.data)
                        })
                        .catch(err => console.error(err))
                } else {
                    let data = {
                        id_solicitacao_pericia: this.id_solicitacao_pericia,
                        id_estrutura_layout: this.id_estrutura_layout,
                        id_campo: this.id_campo,
                        valor_item_solicitacao: {
                            objeto: this.objeto,
                            municipio: this.municipio,
                            numero_volumes: this.numero_volumes,
                            numero_processo: this.numero_processo,
                        }
                    }

                    if (this.processing.save) {
                        ItemSolicitacaoPericia.add(data)
                            .then(doc => {
                                this.processing.save = false
                            })
                            .catch(err => console.error(err))
                    }
                }
            })
        },

        /** 
         * @method
         * @description Quando um campo é modificado, também é modificado
         *              na matriz do respectivo formulário
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        modificacoes() {
            if (!this.id_solicitacao) {
                this.$root.$emit('sru:add', {
                    id: this._id,
                    is: 'SRU',
                    tipo: 'SRU',
                    data: {
                        numero_processo: this.numero_processo,
                        numero_volumes: this.numero_volumes,
                        objeto: this.objeto,
                        municipio: this.municipio,
                    }
                })
            }

            if (this.in_obrigatoriedade) {
                this._camposVazio()
            }
        },

        /**
         * @description Envio de dados do formulário para a matriz `levels.dataSRU` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        obrigatoriedade () {
            this.$root.$emit('add', {
                is: 'sru',
                nome: 'SRU',
                tipo: this.tipo,
                index: this.id,
                contexto: 'SRU',
                matrizContexto: 'SRU',
                in_obrigatoriedade: this.obrigatorio,
            })
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Santana <luis.santana@capgemini.com>
         */
        remove: function (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },
    },
}
</script>