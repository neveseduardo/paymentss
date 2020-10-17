<template>
    <div class="data-do-fato">
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

                <h4 class="card-title mt-2">Data do Fato</h4>
                <div class="row" v-if="!criacao">
                    <div class="col-md-12">
                        <el-date-picker v-model="dataDoFato" type="date" placeholder="Data"></el-date-picker>
                        <span class="text-danger" v-if="campos.dataDoFato">Obrigatório</span>
                    </div>
                </div>

                <div class="d-flex align-items-center justify-content-end" v-if="criacao">
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
import ItemSolicitacaoPericia from '@/services/ItemSolicitacaoPericiaService.js'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
import PSwitch from 'src/components/UIComponents/Switch.vue'

export default {
    components: {
        [DatePicker.name]: DatePicker,
        PSwitch,
    },
    props: [
        'id', '_id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({
        dataDoFato: '',
        obrigatorio: '',
        requiredBool: false,
        campos: {
            dataDoFato: false,
        },
    }),
    mounted() {
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this.requiredBool = this.in_obrigatoriedade
            this._camposVazio()
        }

        if (this.id_solicitacao_pericia) {
            this._load()
        }
    },
    watch: {
        dataDoFato (v) {
            let now = this.$moment()
            let diferencas = this.$moment(v).diff(now, 'days')

            if (diferencas > 0) {
                this.$notify({
                    message: 'Não é possível setar essa data',
                    type: 'danger'
                })

                this.dataDoFato = ''
            }
            this.modificacoes()
        },
        obrigatorio() {
            this.adicionar()
        }
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
                let dataDoFato = this.dataDoFato.length === 0
                this.campos.dataDoFato = dataDoFato

                this.$root.$emit('vazios', {
                    is: 'data-do-fato',
                    dataDoFato,
                    status: [dataDoFato]
                })
            }
        },

        /**
         * @description Envio de dados do formulário para a 
         *              matriz `levels.ContextoSolicitacao` em 
         *              Formulario.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            let obrigatorio = (this.obrigatorio && this.obrigatorio == 'sim') ? 'sim' : 'nao'

            this.$root.$emit('add', {
                is: 'data-do-fato',
                nome: 'Data do Fato',
                tipo: 'data-do-fato',                   // nome do componente
                index: this.id,                         // indíce do elemento
                contexto: 'Contexto de Solicitação',    // Em qual contexto do formulário se encaixa
                dataDoFato: this.dataDoFato,            // data do fato (atributo deste componente)
                obrigatorio: obrigatorio,           // Campo de obrigatoriedade de preenchimento
                matrizContexto: 'ContextoSolicitacao',  // em qual array deve ser adicionar no componente CreateForm.js
            })
        },
        

        modificacoes() {
            this.$root.$emit('item-solicitacao-pericia:add', {
                id: this._id,
                is: 'data-do-fato',
                tipo: this.tipo,
                data: {
                    dataDoFato: this.dataDoFato,
                }
            })

            if (this.in_obrigatoriedade === 'sim') {
                this._camposVazio()
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
                        this.dataDoFato = data.dataDoFato
                    })
                    .catch(err => console.log('Error' + err))
            }
        },

        /**
         * @description método para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        }
    }
}
</script>