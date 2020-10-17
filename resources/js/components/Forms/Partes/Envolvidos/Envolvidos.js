import Swal from 'sweetalert2'
import Validar from '@/helpers/validadores.js'
import PSwitch from 'src/components/UIComponents/Switch.vue'
import {required, minLength} from 'vuelidate/lib/validators'
import { Card, Button, Modal, Tabs, TabPane } from 'src/components/UIComponents'

import Visualizacao from '@/components/Forms/Partes/Envolvidos/Visualizacao.vue'
import EnvolvidosService from '@/services/EnvolvidosService.js'

export default {
    props: [
        'id', 'tipo', 'name', 'in_obrigatoriedade', 'criacao',
        'id_solicitacao_pericia', 'id_estrutura_layout', 'id_campo', 'view'
    ],
    validations: {
        nome: {
            required,
            minLength: minLength(3)
        }
    },
    components: {
        Card,
        Modal,
        Tabs, 
        TabPane,
        [Button.name]: Button,
        PSwitch,
        Visualizacao,
    },
    data: () => ({
        envolvido: {
            id_solicitacao_pericia: null,
            id_estrutura_layout: null,
            id_campo: null,
            cpf_cnpj: null,
            nome: null
        },
        cpf_cnpj: '',
        nome: '',
        campos: {
            envolvidos: false,
        },
        errors: {
            cpf_cnpj: false
        },
        obrigatorio: false,
        processing: {
            add: false
        }
    }),
    mounted() {
        this._load()
        if (this.in_obrigatoriedade) {
            this.obrigatorio = this.in_obrigatoriedade
            this._camposVazio()

            this.$root.$emit('vazios', {
                is: 'envolvidos-vazio', status: [true]
            })

            if (!this.criacao) {
                this.campos.envolvidos = this.in_obrigatoriedade
            }
        }
    },
    watch: {
        cpf_cnpj(val) {
            if (val.length > 14) {
                this.errors.cpf_cnpj = !Validar.cnpj(val)
            } 
            if (val.length > 0 && val.length <= 14) {
                this.errors.cpf_cnpj = !Validar.cpf(val)
            } 
            if (val.length === 0) {
                this.errors.cpf_cnpj = false
            }
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
            let $this = this
            this.$root.$on('envolvidos:vazio', (e) => {
                $this.campos.envolvidos = !e.status
                $this.$root.$emit('vazios', {
                    is: 'envolvidos-vazio',
                    status: [!e.status]
                })
            })
        },

        HubEnvolvido() {
            this.$v.$touch()
            if (!this.$v.$invalid && !this.errors.cpf_cnpj) {
                switch (this.$route.name) {
                    case 'Edição':
                        this._addEnvolvido()
                        break;

                    case 'Nova Solicitação':
                        this._addLocalStorage()
                        this._reset()
                        break;
                }
            } else {
                Swal.fire('Atenção', 'Campos inválidos', 'info')
            }
        },

        /**
         * @private
         * @description Carrega todos os investigados com base 
         *              no ID da solicitação enviado para o componente
         *              Investigados.vue o _id para requisição
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load() {
            this._reset()
            this.$root.$emit('envolvidos:load', ({ id_solicitacao_pericia: this.id_solicitacao_pericia }))
        },

        /**
         * @private
         * @description Limpa todos os campo de da entidade
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _reset() {
            this.cpf_cnpj = ''
            this.nome = ''
        },

        _addEnvolvido() {
            EnvolvidosService
                .add({
                    cpf_cnpj: this.cpf_cnpj,
                    nome: this.nome,
                    id_campo: this.id_campo,
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
         * @private
         * @description Método para adicionar ao localStorage os valores temporariamente
         *              dos envolvidos
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _addLocalStorage() {
            let data = {
                cpf_cnpj: this.cpf_cnpj,
                nome: this.nome,
                id_campo: this.id_campo,
            }

            try {
                EnvolvidosService.tmp.add(data)            
                this.$root.$emit('envolvidos:tmp-load')
            } catch(e) {
                Swal.fire('Atenção!', 'CPF já registrado', 'info')
            }
        },

        /**
         * @description Envio de dados do formulário para a 
         *              matriz `levels.ContextoSolicitacao` em CreateForm.js
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        adicionar() {
            this.$root.$emit('add', {
                is: 'envolvidos',
                nome: 'Envolvidos',
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
        remove(id, tipo, name) {
            this.$root.$emit('emitted', { id, tipo, name })
        }
    },
}