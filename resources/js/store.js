import Vue from "vue";
import Vuex from "vuex";
// import PrestacaoContas from "./pages/PrestacaoContas/PrestacaoContas";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    prestacaoContas: {
      tab: 0,
      acao: {
        adiantamento: "listar",
        despesa: "",
        restituicao: "",
        ateste: "",
        aprovacao: "",
        suf: "",
      },
    },

    //BENEFICIARIO
    beneficiario_filtro: {
      id_colaborador: null,
      id_unidade: null,
      id_unidade_faturamento: null,
      flg_situacao: null,
    },

    //PERIODO
    periodo_filtro: {
      des_periodo: null,
      data_inicio_periodo: null,
      data_fim_periodo: null,
      flg_situacao: null,
    },

    //UNIDADE DE FATURAMENTO
    unidade_faturamento_filtro: {
      id_comarca: null,
      id_centro_custo: null,
      nom_unidade_faturamento: null,
      num_unidade_faturamento: null,
      flg_situacao: null,
    },

    //DELEGADO
    delegado_filtro: {
      id_colaborador: null,
      id_colaborador_delegado: null,
      flg_situacao: null,
    },

    //PRESTAÇÃO DE CONTAS
    prestacao_contas_filtro: {
      id_colaborador: null,
      id_colaborador_delegado: null,
      id_periodo: null,
      id_situacao_prestacao_contas: null,
      flg_situacao: null,
    },

    //Despesa
    despesa_filtro: {
      id_beneficiario: null,
      id_periodo: null,
      id_situacao_despesa: null,
    },
  },

  actions: {},
});
