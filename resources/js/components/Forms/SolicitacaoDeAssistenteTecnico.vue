<template>
	<div class="solicitacao-de-assistente-tecnico">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title mt-0 mb-4">Solicitação de {{nomeApoio}}</h4>

				<div class="row">
					<div class="col-md-6">
						<div class="form-group">
							<label class="control-label">Solicitante</label>
							<input type="text" v-model="solicitante.nome" class="form-control"/>
							<small class="help-block">Recuperado via Integração CAS - Usuário Logado</small>
						</div>
					</div>
					<div class="col-md-6">
						<label>Data</label>
						<div class="form-group">
							<el-date-picker disabled v-model="dt_solicitacao" type="date" placeholder="Selecionar"></el-date-picker>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 col-md-4">
						<label>Membro Solicitante</label>
						<fg-input>
							<el-select v-model="membroValue"  class="select-primary" size="medium" placeholder="Selecione">
								<el-option v-for="option in membros.nomes"
										class="select-default"
										:value="option"
										:label="option"
										:key="option">
								</el-option>
							</el-select>
						</fg-input>
					</div>
					<div class="col-sm-12 col-md-4">
						<label>Comarca</label>
						<fg-input>
							<el-select @change="carregarUnidades()" v-model="comarcaValue"  class="select-primary" size="medium" placeholder="Selecione">
								<el-option v-for="option in comarcas.nomes"
										class="select-default"
										:value="option"
										:label="option"
										:key="option">
								</el-option>
							</el-select>
						</fg-input>
					</div>
					<div class="col-sm-12 col-md-4">
						<label>Unidade</label>
						<fg-input>
							<el-select v-model="unidadeValue"  class="select-primary" size="medium" placeholder="Selecione">
								<el-option v-for="option in unidades.nomes"
										class="select-default"
										:value="option"
										:label="option"
										:key="option">
								</el-option>
							</el-select>
						</fg-input>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import MembroService from '@/services/MembroService.js'
import ComarcaService from '@/services/ComarcaService.js'
import UnidadeService from '@/services/UnidadeService.js'

import SolicitacaoPericiaService from '@/services/SolicitacaoPericiaService.js'
import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'
export default {
	components: {
		[DatePicker.name]: DatePicker,
		[TimeSelect.name]: TimeSelect,
		[Slider.name]: Slider,
		[Tag.name]: Tag,
		[Input.name]: Input,
		[Button.name]: Button,
		[Option.name]: Option,
		[Select.name]: Select,	
	},
	props: [
		'idSolicitacao', 'dtSolicitacao', 'isCreate', 'nomeApoio'],
	data: () => ({
		solicitante: {
			nome: null,
			cpf: ''
		},
		membroValue: null,
		comarcaValue: null,
		unidadeValue: null,
		membros: {
			lista: [],
			nomes: []
		},
		comarcas: {
			lista: [],
			nomes: []
		},
		unidades: {
			lista: [],
			nomes: []
		},
		dt_solicitacao: ''
	}),
	watch: {
		solicitante: {
			handler: function (val) {
				this.$root.$emit('solicitacao-assistente:solicitante', { data: this.solicitante })
            },
            deep: true
		},
		dt_solicitacao (v) {
			this.$root.$emit('solicitacao-assistente:dt_solicitacao', { data: v })
		},
		membroValue (v) {
			let opcao = []

			opcao = this.membros.lista.filter((value) => value.nome === v )
			if (opcao.length) {
				opcao = opcao.shift()
				this._eventIdMembroSolicitante (opcao._id)
			}
		},
		unidadeValue (v) {
			let opcao = []

			opcao = this.unidades.lista.filter((value) => value.nome === v )
			if (opcao.length) {
				opcao = opcao.shift()
				this._eventIdUnidade(opcao._id)
			}
		},
		comarcaValue (v) {
			if (v.length === 0) {
				this.unidades.lista = []
				this.unidades.nomes = []
				this.unidadeValue = ''
			} else {
				let opcao = []
				opcao = this.comarcas.lista.filter( (value) => v == value.nome )
				opcao = opcao.shift()
				this._eventIdComarca(opcao._id)
			}
		},
	},
	mounted() {
		this._carregarComarca()
		this._carregarMembros()

		this.block = this.$route.name === 'Criação de Formulário'

		if (this.idSolicitacao) {
			SolicitacaoPericiaService
                .find(this.idSolicitacao)
                .then(res => {
					let solicitacao = res.data.solicitacao
                    this.dt_solicitacao = solicitacao.dt_solicitacao
                    this.unidadeValue = solicitacao.unidade ? solicitacao.unidade.nome : ''
					this.comarcaValue = solicitacao.comarca ? solicitacao.comarca.nome : ''
					this.membroValue = solicitacao.membro ? solicitacao.membro.nome : ''
					this.solicitante = solicitacao.solicitante

					this._eventIdUnidade(solicitacao.id_unidade)
					this._eventIdComarca(solicitacao.id_comarca)
					this._eventIdMembroSolicitante(solicitacao.id_membro_solicitante)
                })
                .catch(err => console.error(err))
		}
	},
	methods: {

		/**
		 * @private
		 * @description Método para carregamento de comarcas
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_carregarComarca() {
			ComarcaService.all()
				.then(docs => {
					this.comarcas.lista = docs.data
					this._comarcaAutoComplete()
				})
				.catch(err => console.error(err))
		},

		/**
		 * @private
		 * @description Método para definir a lista de nomes para
		 * 				o auto-complete de comarcas
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_comarcaAutoComplete() {
			this.comarcas.nomes = this.comarcas.lista.map((value, index) => value.nome)
		},

		/**
		 * @description Carrega as unidades baseado na comarca.
		 * 				É utilizado como "chave de busca" o código da comarca
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		carregarUnidades() {
			let search = null
			let comarca = ''

			if (this.comarcaValue.length) {
				search = this.comarcas.lista.filter((value) => value.nome === this.comarcaValue )
				search = search.shift()

				if (search) {
					this._unidades(search.codigo)
				}
			}
		},

		/**
		 * @private
		 * @description Carrega os membros solicitantes
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_carregarMembros() {
			MembroService.all()
				.then(docs => {
					this.membros.lista = docs.data
					this.membros.nomes = docs.data.map((value) => value.nome)
				})
				.catch(err => console.error(err))
		},

		/**
		 * @private
		 * @description Carrega as unidades com base no código da comarca
		 * @param {string|number} codigo_comarca Código da comarca, pode ser um inteiro ou string
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_unidades(codigo_comarca) {
			UnidadeService.all(codigo_comarca)
				.then(docs => {
					this.unidades.lista = docs.data
					this.unidades.nomes = docs.data.map((value) => value.nome)
				})
				.catch(err => console.error(err))
		},

		/**
		 * @private
		 * @description Envio de id para a solicitação
		 * @param {string} id ObjectId da Unidade
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_eventIdUnidade(id) {
			this.$root.$emit('solicitacao-assistente:unidadeAdd', { id })
		},

		/**
		 * @private
		 * @description Envio de id para a solicitação
		 * @param {string} id ObjectId da Comarca
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_eventIdComarca(id) {
			this.$root.$emit('solicitacao-assistente:comarcaAdd', { id })
		},

		/**
		 * @private
		 * @description Envio de id para a solicitação
		 * @param {string} id ObjectId do Membro Solicitante
		 * @author Gerson <gerson.tavares@capgemini.com>
		 */
		_eventIdMembroSolicitante(id) {
			this.$root.$emit('solicitacao-assistente:membroAdd', { id })
		}
	}
}
</script>