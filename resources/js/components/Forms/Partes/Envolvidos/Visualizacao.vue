<template>
    <div class="envolvidos">
        <el-table :data="envolvidos" header-row-class-name="text-primary">
            <el-table-column prop="nome" label="Nome"></el-table-column>
            <el-table-column prop="cpf_cnpj" label="CPF/CNPJ"></el-table-column>
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
import EnvolvidosService from '@/services/EnvolvidosService.js'

export default {
    props: [
        'id_solicitacao_pericia', 'in_obrigatoriedade', 'criacao'
    ],
    data: () => ({
        envolvidos: [],
        id: null,
    }),
    mounted() {
        let $this = this

        if (!!this.id_solicitacao_pericia) {
            this.id = this.id_solicitacao_pericia
            this._load()
            this.$root.$on('envolvidos:load', (e) => $this._load(e.id_solicitacao_pericia) )
        }
        
        this.$root.$on('envolvidos:tmp-load', (e) => $this._tmpLoad() )
        this._add()
        this._tmpLoad()        
        this._camposVazios()
    },
    watch: {
        envolvidos() {
            this._camposVazios()
        }
    },
    methods: {

        /**
         * @description Método para notificação de campos vazios
         *              a matriz principal e exibição de campos obrigatórios vazios
         *              no componente
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _camposVazios() {
            if (!this.criacao) {
                let status = false
                if (this.envolvidos != null && this.envolvidos.length > 0) {
                    status = true
                }
                this.$root.$emit('envolvidos:vazio', {status})
            }
        },

        /**
         * @description Método para remoção de envolvido de acordo com
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
                this._tmpLoad()
            }
        },

        /**
         * @private
         * @description Carrega os envolvidos por requisição
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _load () {
            EnvolvidosService
                .all(this.id)
                .then(doc => {
                    this.envolvidos = doc.data
                })
                .catch(err => console.log(err))
        },

        /**
         * @private
         * @description Método para carregamento de envolvidos
         *              salvo no localStorage
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _tmpLoad () {
            this.envolvidos = JSON.parse(localStorage.getItem('envolvidos:tmp'))
        },

        /**
         * @private
         * @description método auxiliar para inserir envolvidos no localStorage,
         *              quando o formulário for submetido, o mesmo utilizará os
         *              dados armazenados para enviar. Toda via, a gestão ocorrerá dentro
         *              deste componente em novas solicitações.
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _add () {
            let $this = this
            this.$root.$on('envolvidos:add', (e) => {
                var items = JSON.parse(localStorage.getItem('envolvidos:tmp'))
                var box = []
                if (!!items) {
                    box = JSON.parse(localStorage.getItem('envolvidos:tmp'))
                    box.push(e)
                    localStorage.setItem('envolvidos:tmp', JSON.stringify(box))
                } else {
                    box.push(e)
                    localStorage.setItem('envolvidos:tmp', JSON.stringify(box))
                }

                $this._tmpLoad()
            })
        },

        /**
         * @private
         * @description Remove um envolvido salvo no localStorage
         * @param {object} objeto Elemento a ser removido
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _removeLocalStorage(objeto) {
            EnvolvidosService.tmp.remove(objeto)
        },

        /**
         * @private
         * @description Remove o envolvido por requisição ao servidor
         * @param {object} objeto Elemento a ser removido
         * @author Gerson <gerson.tavares@capgemini.com>
         */
        _removeRequest(objeto) {
            EnvolvidosService
                .delete(objeto._id)
                .then((doc) => {
                    this._load()
                    this.$notify({
                        message: `Envolvido removido`,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        message: `Não foi possível remover, tente novamente`,
                        type: 'warning'
                    })
                })
        }
    }
}
</script>
<style lang="scss">
.envolvidos {
    margin: 1em 0 3em 0;
}
</style>