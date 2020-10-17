<template>
    <div class="solicitar-urgencia">
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

                <h4 class="card-title mt-2">Solicitar Urgência?</h4>
        
                <div class="row mt-4" v-if="!criacao">
                    <div class="col-md-12">
                        <div class="d-flex">
                            <p-radio v-model="solicitar" :label="'sim'" class="mr-3">Sim</p-radio>
                            <p-radio v-model="solicitar" :label="'nao'" class="mr-3">Não</p-radio>
                        </div>
                    </div>
                </div>

                <div class="row mt-2" v-if="!criacao">
                    <div class="col-md-6" v-if="solicitar === 'sim'">
                        <label>Tipos de Urgência</label>
                        <fg-input>
                            <el-select class="select-primary"
                                        size="large"
                                        placeholder="Selecione"
                                        v-model="prioridade">
                                <el-option v-for="option in tiposDeUrgencias"
                                        class="select-primary"
                                        :value="option.nome"
                                        :label="option.nome"
                                        :key="option.nome">
                                </el-option>
                            </el-select>
                        </fg-input>
                        <span class="text-danger" v-if="campos.prioridade">Obrigatório</span>
                    </div>
                </div>

                <div class="row" v-if="!criacao">
                    <div class="col-md-12" v-if="solicitar === 'sim'">
                        <div class="form-group mx-0">
                            <label class="control-label">Observações</label>
                            <textarea v-model="observacoes" class="form-control" rows="3"></textarea>
                            <span class="text-danger" v-if="campos.observacoes">Obrigatório</span>
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
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'

import TipoUrgenciaService from '@/services/TipoUrgenciaService.js'
import ItemSolicitacaoPericia from '@/services/ItemSolicitacaoPericiaService.js'

export default {
    components: {
      [Option.name]: Option,
      [Select.name]: Select,
      PSwitch,
    },
    props: [
        'id', '_id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({
        obrigatorio: false,
        tiposDeUrgencias: [],
        solicitarUrgencia: '',
        required: false,
        campos: {
            prioridade: false,
            observacoes: false,
        },

        solicitar: 'nao',
        prioridade: '',
        observacoes: ''
    }),
    watch: {
        solicitar() {
            this.modificacoes()
        },
        prioridade() {
            this.modificacoes()
        },
        observacoes() {
            this.modificacoes()
        },
        obrigatorio() {
            this.adicionar()
        }
    },
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this.required = this.in_obrigatoriedade
            this._camposVazio()
        }

        this._load()
        this._carregaTipos()
    },
    methods: {

        /**
         * @description Envio de dados do formulário para a matriz 
         *              `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'solicitar-urgencia',
                nome: 'Solicitar Urgencia',
                tipo: this.tipo,                        // nome do componente
                index: this.id,                         // indíce do elemento
                contexto: 'Contexto de Solicitação',    // Em qual contexto do formulário se encaixa
                in_obrigatoriedade: this.obrigatorio,          // Campo de obrigatoriedade de preenchimento
                matrizContexto: 'ContextoSolicitacao',  // em qual array deve ser adicionar no componente CreateForm.js
            })
        },

        /**
         * @description As modificações são enviadas a matriz principal
         *              que fará parte do formulário de envio
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        modificacoes() {
            if (!this.criacao) {
                this.$root.$emit('solicitar-urgencia:add', {
                    id: this._id,
                    is: 'solicitar-urgencia',
                    tipo: this.tipo,
                    data: {
                        solicitar: this.solicitar,
                        prioridade: this.prioridade,
                        observacoes: this.observacoes
                    }
                })

                if (this.in_obrigatoriedade) {
                    this._camposVazio()
                }
            }
        },

        /**
         * @description Carregamento inicial dos parâmetros do item
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load() {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this.id_campo)
                    .then(res => {
                        let data = res.data.valor_item_solicitacao.data
                        this.prioridade = data.prioridade
                        this.observacoes = data.observacoes
                        this.solicitar = data.solicitar
                    })
                    .catch(err => console.log('Error' + err))
            }
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove: function (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            if (!this.criacao) {
                let prioridade = ''
                let observacoes = ''

                if (this.solicitar === 'nao') {
                    prioridade = false
                    observacoes = false
                    this.campos.prioridade = prioridade
                    this.campos.observacoes = observacoes

                } else {
                    prioridade = this.prioridade.length === 0
                    observacoes = this.observacoes.length === 0
                    this.campos.prioridade = prioridade
                    this.campos.observacoes = observacoes
                }


                this.$root.$emit('vazios', {
                    is: 'solicitar-urgencia',
                    prioridade,
                    observacoes,
                    status: [prioridade, observacoes]
                })
            }
        },

        _carregaTipos() {
             TipoUrgenciaService.all()
                .then(res => this.tiposDeUrgencias = res.data)
                .catch(err => console.error(err))
        }
    }
}
</script>