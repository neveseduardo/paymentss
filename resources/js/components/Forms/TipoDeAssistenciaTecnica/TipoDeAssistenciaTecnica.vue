<template>
    <div class="tipo-assistencia-tecnica">
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

                <h4 class="card-title mt-2">Solicitar Tipo de Apoio</h4>

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
import PSwitch from 'src/components/UIComponents/Switch.vue'

import AssistenteTecnicoService from '@/services/AssistenteTecnicoService.js'
import KindTechnicalAssistantService from '@/services/TipoDeAssistenciaTecnicaService.js'

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
        lista: [],
        kindChoiceIdx: '',
        kindChoiceObj: {
            nome: false,
            data: false,
            observacao: false
        },
        add: {
            nome: '',
            data: '',
            observacao: ''
        },

    }),
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
        }
    },
    watch: {
        obrigatorio() {
            this.adicionar()
        }
    },
    methods: {

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove: function (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        /**
         * @description Envio de dados do formulário para a matriz `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'tipo-de-assistencia-tecnica',
                nome: 'Tipo de Assistência Técnica',
                tipo: this.tipo,
                index: this.id,
                contexto: 'Tipo de Assistência Técnica',
                in_obrigatoriedade: this.obrigatorio,
                matrizContexto: 'TipoAssistenciaTecnica',
            })
        },
    }
}
</script>