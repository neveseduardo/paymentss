<template>
    <div class="fato-conduto-suspeita">
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
        
                <h4 class="card-title mt-2">Fato ou Conduta Suspeita</h4>
                <div class="row" v-show="!criacao">
                    <div class="col-md-12">
                        <div class="form-group mx-0">
                            <label class="control-label">Descrição</label>
                            <textarea v-model="condutaSuspeita" :required="required" class="form-control" rows="3"></textarea>
                            <span class="text-danger" v-if="campos.esclarecimento">Obrigatório</span>
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
import PSwitch from 'src/components/UIComponents/Switch.vue'

import ItemSolicitacaoPericia from '@/services/ItemSolicitacaoPericiaService.js'

export default {
    components: {
        PSwitch
    },
    props: [
        '_id', 'id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({
        obrigatorio: false,
        required: false,
        campos: {
            condutaSuspeita: false,
        },

        condutaSuspeita: '',
    }),
    watch: {
        condutaSuspeita () {
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
    },
    methods: {

        /**
         * @description A cada alteração, é enviado os dados alterados
         *              para o formulário principal
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        modificacoes() {
            this.$root.$emit('item-solicitacao-pericia:add', {
                id: this._id,
                is: 'conduta-suspeita',
                tipo: this.tipo,
                data: {
                    condutaSuspeita: this.condutaSuspeita,
                }
            })

            if (this.in_obrigatoriedade) {
                this._camposVazio()
            }
        },

        /**
         * @description Envio de dados do formulário para a matriz `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar() {
            this.$root.$emit('add', { 
                is: 'conduta-suspeita',
                nome: 'Fato ou Conduta Suspeita',
                tipo: this.tipo,                        // nome do componente
                index: this.id,                         // indíce do elemento
                contexto: 'Contexto de Solicitação',    // Em qual contexto do formulário se encaixa
                in_obrigatoriedade: this.obrigatorio,          // Campo de obrigatoriedade de preenchimento
                matrizContexto: 'ContextoSolicitacao',  // em qual array deve ser adicionar no componente CreateForm.js
            })
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Tavares <gerson.tavares@capgemini.com>
         */
        remove(id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        _load() {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this._id)
                    .then(doc => {
                        let info = doc.data
                        let item = doc.data.valor_item_solicitacao.data
                        this.condutaSuspeita = item.condutaSuspeita
                    })
                    .catch(err => console.error(err))
            }
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            if (!this.criacao) {
                let condutaSuspeita = this.condutaSuspeita.length === 0
                this.campos.condutaSuspeita = condutaSuspeita

                this.$root.$emit('vazios', {
                    is: 'conduta-suspeita',
                    condutaSuspeita,
                    status: [condutaSuspeita]
                })
            }
        },
    }
}
</script>