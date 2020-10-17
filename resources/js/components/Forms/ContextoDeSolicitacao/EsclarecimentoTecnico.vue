<template>
    <div class="esclarecimento-tecnico">
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

                <h4 class="card-title mt-2">Esclarecimento Técnico Pretendido</h4>

                <div class="row" v-if="!criacao">
                    <div class="col-md-12">
                        <div class="form-group mx-0">
                            <label class="control-label">Descrição</label>
                            <textarea class="form-control" v-model="esclarecimento" rows="2"></textarea>
                            <span class="text-danger" v-if="campos.esclarecimento">Obrigatório</span>
                        </div>
                    </div>
                </div>

                <div class="row mt-2 mb-4" v-if="!criacao">
                    <div class="col-md-4">
                        <p class="text-secondary">É Licitação?</p>
                        <div class="d-flex">
                            <p-radio v-model="e_licitacao" label="sim" class="mr-3">Sim</p-radio>
                            <p-radio v-model="e_licitacao" label="nao">Não</p-radio>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="e_licitacao === 'sim'">
                        <p class="text-secondary">Quantos são Objetos da Investigação?</p>
                        <input v-model="objetos" type="number" class="form-control" min="0">
                    </div>
                </div>

                <div class="d-flex mt-3 align-items-center justify-content-end">
                    <div v-if="criacao" class="d-flex align-items-center">
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
        '_id', 'tipo', 'in_obrigatoriedade', 'criacao', 'view',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia',
    ],
    data: () => ({
        obrigatorio: false,
        campos: {
            objetos: false,
            esclarecimento: false
        },

        objetos: '',
        e_licitacao: 'nao',
        esclarecimento: '',
    }),
    watch: {
        obrigatorio() {
            this.adicionar()
        }
    },
    mounted() {
        this.campos.objetos = this.in_obrigatoriedade
        this.campos.esclarecimento = (this.e_licitacao === 'sim' && this.in_obrigatoriedade)
        this.obrigatorio = this.in_obrigatoriedade

        // this._load()
        this.$root.$on('atualizacao', () => this.atualizacao())
        this.$root.$on('verificar-campos', () => this._camposVazio())
    },
    methods: {

        atualizacao() {

        },

        /**
         * @deprecated
         * @description A cada alteração, é enviado os dados alterados
         *              para o formulário principal
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        modificacoes () {
            this.$root.$emit('item-solicitacao-pericia:add', {
                id: this._id,
                is: 'esclarecimento-tecnico-pretendido',
                tipo: this.tipo,
                data: {
                    esclarecimento: this.esclarecimento,
                    e_licitacao: this.e_licitacao,
                    objetos: this.objetos
                }
            })
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * 
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            let esclarecimento = this.esclarecimento.length === 0
            let objetos = this.objetos.length === 0 && this.e_licitacao === 'sim'

            this.campos.objetos = objetos
            this.campos.esclarecimento = esclarecimento

            this.$root.$emit('vazios', {
                is: 'esclarecimento-tecnico-pretendido',
                esclarecimento, objetos,
                status: [esclarecimento, objetos]
            })
        },

        /**
         * @description Envio de dados do formulário para a 
         *              matriz `levels.ContextoSolicitacao`
         * 
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar() {
            this.$root.$emit('add', {
                is: 'esclarecimento-tecnico-pretendido',
                nome: 'Esclarecimento Técnico Pretendido',
                tipo: 'esclarecimento-tecnico-pretendido',
                index: this.id,
                contexto: 'Contexto Solicitação',
                matrizContexto: 'ContextoSolicitacao',
                in_obrigatoriedade: this.obrigatorio,
            })
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove(id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        _load () {
            if (this.id_solicitacao_pericia) {
                ItemSolicitacaoPericia
                    .find(this.id_solicitacao_pericia, this._id)
                    .then(doc => {
                        let info = doc.data
                        let item = doc.data.valor_item_solicitacao.data
                        this.objetos = item.objetos
                        this.e_licitacao = item.e_licitacao
                        this.esclarecimento = item.esclarecimento
                    })
                    .catch(err => console.error(err))
            }
        }
    }
}
</script>