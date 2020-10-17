<template>
    <div class="modus-operandi">
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

                <h4 class="card-title mt-2">Modus Operandi do Agente</h4>

                <div class="row" v-if="!criacao">
                    <div class="col-md-12">
                        <div class="form-group mx-0">
                            <label class="control-label">Descrição</label>
                            <textarea v-model="modus" class="form-control" rows="3"></textarea>
                            <span class="text-danger" v-if="campos.modus">Obrigatório</span>
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
            modus: false,
        },
        modus: '',
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
        modus () {
            this.modificacoes()
        },
        obrigatorio() {
            this.adicionar()
        }
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
                is: 'modus-operandi',
                tipo: this.tipo,
                data: {
                    modus: this.modus,
                }
            })

            if (this.in_obrigatoriedade) {
                this._camposVazio()
            }
        },

        /**
         * @description Envio de dados do formulário para a 
         *              matriz `levels.ContextoSolicitacao` em Formulario.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'modus-operandi',
                nome: 'Modus Operandi do Agente',
                tipo: this.tipo,                        // nome do componente
                index: this.id,                         // indíce do elemento
                contexto: 'Contexto de Solicitação',    // Em qual contexto do formulário se encaixa
                matrizContexto: 'ContextoSolicitacao',  // em qual array deve ser adicionar no componente CreateForm.js
                in_obrigatoriedade: this.obrigatorio,
            })
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove: function (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        _load() {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this._id)
                    .then(doc => {
                        let info = doc.data
                        let item = doc.data.valor_item_solicitacao.data
                        this.modus = item.modus
                    })
                    .catch(err => console.error(err))
            }
        },

        _save() {
            this.$root.$on('atualizacao', () => {
                
            })
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            if (!this.criacao) {
                let modus = this.modus.length === 0
                this.campos.modus = modus

                this.$root.$emit('vazios', {
                    is: 'modus-operandi',
                    modus,
                    status: [modus]
                })
            }
        },
    }
}
</script>