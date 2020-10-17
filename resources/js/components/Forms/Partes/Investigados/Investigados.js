import Swal from 'sweetalert2'
import Validar from '@/helpers/validadores.js'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import { Input, DatePicker } from 'element-ui'
import { Card, Button, Modal, Tabs, TabPane } from 'src/components/UIComponents'
import { required, minLength } from 'vuelidate/lib/validators'

import Visualizacao from '@/components/Forms/Partes/Investigados/Visualizacao.vue'
import InvestigadosService from '@/services/InvestigadosService.js'

export default {
    props: [
        'id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_solicitacao_pericia', 'id_estrutura_layout', 'id_campo', 'view'
    ],
    components: {
        Card,
        Modal,
        Tabs, 
        TabPane,
        [Button.name]: Button,
        [DatePicker.name]: DatePicker,
        PSwitch,
        [Input.name]: Input,
        'visualizacao': Visualizacao,
    },
    data: () => ({
        nome: '',
        cpf_cnpj: '',
        in_agente_publico: 0,
        in_ativo_cargo: 0,
        dt_saida_cargo: null,
        dt_prescricao_improbidade: null,
        ds_ato_improbidade_cogitada: 'doloso',
        campos: {
            investigados: false
        },
        error: {
            cpf_cnpj: ''
        },
        obrigatorio: false,
    }),
    mounted() {
        this._load(this.id_solicitacao_pericia)
        if ( this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this._camposVazio()

            this.$root.$emit('vazios', {
                is: 'investigados-vazio', status: [true]
            })

            if (!this.criacao) {
                this.campos.investigados = this.in_obrigatoriedade
            }
        }
    },
    watch: {
        cpf_cnpj (val) {
            if (val.length > 14) {
                this.error.cpf_cnpj = !Validar.cnpj(val)
            } 
            if (val.length > 0 && val.length <= 14) {
                this.error.cpf_cnpj = !Validar.cpf(val)
            } 
            if (val.length === 0) {
                this.error.cpf_cnpj = false
            }
        },
        in_agente_publico(val){
            console.log('in_agente_publico: ' + val)
        },
        in_ativo_cargo(val){
            console.log('in_ativo_cargo: ' + val)
        },
        ds_ato_improbidade_cogitada(val){
            console.log('ds_ato_improbidade_cogitada: ' + val)
        },
        obrigatorio() {
            this.adicionar()
        }
    },
    validations: {
        nome: {
            required,
            minLength: minLength(4)
        }
    },
    methods: {

        /**
         * @description Envio de dados do formulário para a matriz 
         *              `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar () {
            this.$root.$emit('add', {
                is: 'investigados',
                nome: 'Investigados',
                tipo: this.tipo,
                index: this.id,
                contexto: 'Partes',
                matrizContexto: 'Partes',
                in_obrigatoriedade: this.obrigatorio,
            })
        },

        /**
         * @description Metodo para remoção de item, utilizando a emissão de evento do Vuejs
         * @author Santana <luis.santana@capgemini.com>
         */
        remove (id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        },

        /**
         * @description Encaminha para o método específico, de acordo
         *              com a tela atual. Caso seja:
         *                  - 'Edição': adicionar por requisição
         *                  - 'Nova Solicitação': adiciona ao localStorage para envio em massa
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        HubInvestigado () {
            this.$v.$touch()
            if (!this.$v.$invalid && !this.error.cpf_cnpj) {
                switch (this.$route.name) {
                    case 'Edição':
                        this._addInvestigado()
                        break;

                    case 'Nova Solicitação':
                        this.$root.$emit('investigados:add', {
                            id_solicitacao_pericia: this.id_solicitacao_pericia,
                            id_estrutura_layout: this.id_estrutura_layout,
                            id_campo: this.id_campo,
                            cpf_cnpj: this.cpf_cnpj,
                            nome: this.nome,
                            in_agente_publico: this.in_agente_publico,
                            in_ativo_cargo: this.in_ativo_cargo,
                            dt_saida_cargo: this.dt_saida_cargo,
                            dt_prescricao_improbidade: this.dt_prescricao_improbidade,
                            ds_ato_improbidade_cogitada: this.ds_ato_improbidade_cogitada
                        })
                        this._reset()
                        break;
                    }
            } else {
                Swal({title: 'Atenção', message: 'Campos inválidos', type: 'info'})
            }
        },

        /**
         * @private
         * @description Carrega todos os investigados com base 
         *              no ID da solicitação enviado para o componente
         *              Investigados.vue o _id para requisição
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load (id) {
            this._reset()
            this.$root.$emit('investigados:load', ({ id_solicitacao_pericia: id }))
        },

        /**
         * @private
         * @description Limpa todos os campo de da entidade
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _reset() {
            this.cpf_cnpj = ''
            this.nome = ''
            this.in_agente_publico = 0
            this.in_ativo_cargo = 0
            this.dt_saida_cargo = ''
            this.dt_prescricao_improbidade = ''
        },

        /**
         * @private
         * @description Adiciona um novo investigado por requisição
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _addInvestigado () {
            InvestigadosService
                .add({
                    id_solicitacao_pericia: this.id_solicitacao_pericia,
                    id_estrutura_layout: this.id_estrutura_layout,
                    id_campo: this.id_campo,
                    cpf_cnpj: this.cpf_cnpj,
                    nome: this.nome,
                    in_agente_publico: this.in_agente_publico,
                    in_ativo_cargo: this.in_ativo_cargo,
                    dt_saida_cargo: this.dt_saida_cargo,
                    dt_prescricao_improbidade: this.dt_prescricao_improbidade,
                    ds_ato_improbidade_cogitada: this.ds_ato_improbidade_cogitada
                })
                .then(doc => { 
                    this._reset()
                    this._load()
                })
                .catch(err => {
                    let errors = err.response.data.errors
					if (errors.nome) {
						this.$notify({ message: errors.nome[0], type: 'danger' })
					}
					if (errors.prefixo) {
						this.$notify({ message: errors.prefixo[0], type: 'danger' })
					}
                })
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazio() {
            let $this = this
            this.$root.$on('investigados:vazio', (e) => {
                $this.campos.investigados = !e.status
                $this.$root.$emit('vazios', {
                    is: 'investigados-vazio',
                    status: [!e.status]
                })
            })
        },
    },
}