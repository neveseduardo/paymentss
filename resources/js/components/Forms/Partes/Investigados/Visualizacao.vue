<template>
    <div class="investigados">
        <el-table :data="investigados" header-row-class-name="text-primary text-small">
            <el-table-column prop="nome" label="Nome"></el-table-column>
            <el-table-column prop="cpf_cnpj" label="CPF/CNPJ"></el-table-column>
            <el-table-column prop="in_agente_pubico" label="Agente Público"></el-table-column>
            <el-table-column prop="in_ativo_cargo" label="Cargo Público Vigente"></el-table-column>
            <el-table-column prop="dt_prescricao_improbidade | moment('DD-MM-YYYY')" label="Prescrição"></el-table-column>
            <el-table-column
                class-name="action-buttons td-actions" 
                align="right"
                label="Ações">
                <template slot-scope="props">
                    <p-button type="danger" size="sm" icon @click="remove(props.row)">
                        <i class="nc-icon nc-simple-remove"></i>
                    </p-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import InvestigadosService from '@/services/InvestigadosService.js'
import Swal from 'sweetalert2'

export default {
    props: [
        'id_solicitacao_pericia', 'acoes',
        'in_obrigatoriedade', 'criacao'
    ],
    data: () => ({
        investigados: [],
        id: null,
        tmp: [],
        estado: {
            add: false
        }
    }),
    mounted() {
        if (!!this.id_solicitacao_pericia) {
            let $this = this
            this.id = this.id_solicitacao_pericia
            this._load()
            this.$root.$on('investigados:load', (e) => $this._load(e.id_solicitacao_pericia) )
        }

        this._add()
        this._tmpLoad()
        this._camposVazios()
    },
    beforeDestroy() {
        this.$root.$off('investigados:add')
    },
    watch: {
        investigados() {
            this._camposVazios()
        }
    },
    methods: {

        /**
         * @description Método para remoção de investigado de acordo com
         *              o modo de criação de solicitação:
         *                  - Nova solicitação: é removido a partir do localStorage
         *                  - Edição: é removido no banco de dados
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        remove (objeto) {
            if (!!this.id) {
                this._removeRequest(objeto)
            } else {
                this._removeLocalStorage(objeto)
            }
        },

        /**
         * @private
         * @description Carrega os investigados por requisição
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load () {
            InvestigadosService
                .all(this.id)
                .then(doc => {
                    this.investigados = doc.data
                })
                .catch(err => console.log(err))
        },

        /**
         * @private
         * @description Método para carregamento de investigados
         *              salvo no localStorage
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _tmpLoad () {
            this.investigados = JSON.parse(localStorage.getItem('investigados:tmp'))
        },

        /**
         * @private
         * @description método auxiliar para inserir investigados no localStorage,
         *              quando o formulário for submetido, o mesmo utilizará os
         *              dados armazenados para enviar. Toda via, a gestão ocorrerá dentro
         *              deste componente em novas solicitações.
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _add() {
            this.$root.$on('investigados:add', (e) => {
                try {
                    InvestigadosService.tmp.add(e)
                    this._tmpLoad()
                } catch (error) {
                    Swal.fire(
                        'Atenção!',
                        'CPF já está cadastrado',
                        'warning'
                    )
                }
            })
        },

        /**
         * @private
         * @description Remove um investigado salvo no localStorage
         * @param {object} objeto Elemento a ser removido
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _removeLocalStorage(objeto) {
            InvestigadosService.tmp.remove(objeto)
            this._tmpLoad()
        },

        /**
         * @private
         * @description Remove o investigado por requisição ao servidor
         * @param {object} objeto Elemento a ser removido
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _removeRequest(objeto) {
            InvestigadosService
                .delete(objeto._id)
                .then((doc) => {
                    this.$notify({
                        message: `Investigado removido`,
                        type: 'success'
                    })
                    this._load()
                })
                .catch(err => {
                    console.error(err)
                    this.$notify({
                        message: `Não foi possível remover, tente novamente`,
                        type: 'warning'
                    })
                })
        },

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazios() {
            if (!this.criacao) {
                let status = false
                if (this.investigados != null && this.investigados.length > 0) {
                    status = true
                }
                this.$root.$emit('investigados:vazio', {status})
            }
        },
    }
}
</script>
<style lang="scss">
.investigados {
    margin: 1em 0 3em 0;
}
</style>