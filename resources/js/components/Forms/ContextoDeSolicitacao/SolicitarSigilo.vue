<template>
    <div class="solicitar-sigilo">
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

                <h4 class="card-title mt-2">Solicitar Sigilo?</h4>

                <div class="row" v-show="!criacao">
                    <div class="col-md-12">
                        <div class="d-flex">
                            <p-radio v-model="sigilo" :label="'sim'" class="mr-3">Sim</p-radio>
                            <p-radio v-model="sigilo" :label="'nao'">Não</p-radio>
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
        'id', '_id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({
        obrigatorio: false,
        requiredBool: false,
        sigilo: 'nao'
    }),
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this.requiredBool = this.in_obrigatoriedade
        }

        if (this.selecionado) {
            this.radio = this.selecionado
        }

        this.modificacoes()
        this._load()
    },
    watch: {
        obrigatorio() {
            this.adicionar()
        }
    },
    methods: {

        /**
         * @description Envio de dados do formulário para a matriz `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'solicitar-sigilo',
                nome: 'Solicitar Sigilo',
                tipo: this.tipo,
                index: this.id,
                contexto: 'Contexto de Solicitação',
                in_obrigatoriedade: this.obrigatorio,
                matrizContexto: 'ContextoSolicitacao',
            })
        },

        modificacoes () {
            if (!this.criacao) {
                this.$root.$emit('sigilo:add', {
                    id: this._id,
                    is: 'solicitar-sigilo',
                    tipo: this.tipo,
                    data: {
                        sigilo: this.sigilo
                    }
                })
            }
        },

        _load() {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this.id_campo)
                    .then(res => {
                        let data = res.data.valor_item_solicitacao.data
                        this.sigilo = data.sigilo
                    })
                    .catch(err => console.log('Error' + err))
            }
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Tavares <gerson.tavares@capgemini.com>
         */
        remove (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        }
    },
}
</script>