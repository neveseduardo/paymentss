<template>
    <div class="trabalhos-anteriores">
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

                <h4 class="card-title mt-2">Trabalhos Anteriores</h4>

        <!-- Substituir por abas. Exibir fora do modo "criação"
        <md-dialog :md-active.sync="showDialog" class="md-dialog">
            <md-dialog-title >Trabalhos Anteriores</md-dialog-title>
            <div class="wrapper">
                <table>
                    <tbody>
                        <tr>
                            <td>Numero do Procedimento/Processo: <b>00123456</b></td>
                            <td>Numero do CEAT: <b>456</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="wrapper">
                <label>Numero do CEAT vinculado ao mesmo Numero do Procedimento</label>
                <table>
                    <thead>
                        <tr>
                            <th>N° CEAT</th>
                            <th>Perito</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="reg in previousWorksFound">
                            <td>{{reg.nceat}}</td>
                            <td>{{reg.perito}}</td>
                            <td><md-icon @click.prevent="showDocument()">remove_red_eye</md-icon></td>
                        </tr>
                    </tbody>
                </table>
                <md-button class="md-primary" @click.prevent="showDialog = false">Close</md-button>
            </div>
        </md-dialog>

        <div class="close-button" v-show="criacao" v-on:click="remove(id, tipo, name)">
            <md-icon class="position">close</md-icon>
        </div>

        <div class="opcoes">
            <div class="inner">
                <p>Trabalhos anteriores: <span>{{num}}</span> </p>
                <md-button class="md-icon-button md-raised" @click.prevent="adicionar()">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
        </div>
        -->
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

export default {
    components: {
        PSwitch
    },
    props: [
        '_id', 'id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_campo', 'id_estrutura_layout', 'id_solicitacao_pericia', 'view'
    ],
    data: () => ({
      num: 0,
      showDialog: false,
      obrigatorio: false,
      previousWorksRequested: [],
      previousWorksFound: [
          {
              id: '1',
              nceat: '002',
              perito: 'Fulano Silva',

          },
          {
              id: '2',
              nceat: '005',
              perito: 'Cicrano Silva'
          }
      ]
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
         * @description Envio de dados do formulário para a matriz `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'trabalhos-anteriores',
                nome: 'Trabalhos Anteriores',
                tipo: this.tipo,
                index: this.id,
                contexto: 'Já existe trabalho anterior elaborado pelo CEAT?',
                in_obrigatoriedade: this.obrigatorio,
                matrizContexto: 'trabalhosAnteriores',
            })
        },

        /**
         * @description Metodo para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Santana <luis.santana@capgemini.com>
         */
        remove: function (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },
    },
}
</script>