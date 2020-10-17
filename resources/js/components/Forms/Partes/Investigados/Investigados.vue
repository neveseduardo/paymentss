<template>
    <div class="investigados">
        <div class="card">
            <div class="card-body">
                <div v-if="view" class="row">
                    <div class="col-md-12">
                        <div class="close-button1 d-flex align-items-center justify-content-end">
                            <p-button class="mt-0 mb-1 ml-4" type="danger" size="sm" icon @click="remove(id, tipo, name)">
                                <i class="nc-icon nc-simple-remove"></i>
                            </p-button>
                        </div>
                    </div>
                </div>

                <h4 class="card-title mt-2 mb-4">Investigados</h4>
                <tabs v-if="!criacao">
                    <tab-pane title="Visualizar" key="visualizar">
                        <div>
                            <visualizacao 
                                :criacao="criacao"
                                :in_obrigatoriedade="in_obrigatoriedade"
                                :id_solicitacao_pericia="id_solicitacao_pericia">
                            </visualizacao>
                        </div>
                    </tab-pane>
                    <tab-pane title="Adicionar" key="adicionar">
                        <div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">Nome</label>
                                            <input v-model.trim="nome" type="text" class="form-control">
                                            <span v-if="$v.nome.$error" class="help-block text-danger">Nome é obrigatório</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="control-label">CPF/CNPJ Envolvido</label>
                                        <input v-model="cpf_cnpj" class="form-control" v-mask="['###.###.###-##', '##.###.###/####-##']">
                                        <span class="help-block text-danger" v-if="error.cpf_cnpj">CPF/CNPJ inválido</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p class="text-secondary">Investigado é Agente Público?</p>
                                        <div class="d-flex">
                                            <p-radio v-model="in_agente_publico" label="1" class="mr-3">Sim</p-radio>
                                            <p-radio v-model="in_agente_publico" label="0">Não</p-radio>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group" v-show="in_agente_publico === '1'">
                                        <p class="text-secondary">Ainda está no cargo?</p>
                                        <div class="d-flex">
                                            <p-radio v-model="in_ativo_cargo" label="1" class="mr-3">Sim</p-radio>
                                            <p-radio v-model="in_ativo_cargo" label="0">Não</p-radio>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3" v-show="in_agente_publico === '1'">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p class="text-secondary">Deixou o Cargo em:</p>
                                        <el-date-picker v-model="dt_saida_cargo" type="date" placeholder="Selecionar Data"></el-date-picker>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p class="text-secondary">Prescrição Improbidade:</p>
                                        <el-date-picker v-model="dt_prescricao_improbidade" type="date" placeholder="Selecionar Data"></el-date-picker>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3" v-show="in_agente_publico === '1'">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <p class="text-secondary">O Ato de Improbidade Cogitado?</p>
                                        <div class="d-flex">
                                            <p-radio :label="'doloso'"  v-model="ds_ato_improbidade_cogitada" class="mr-3">Doloso</p-radio>
                                            <p-radio :label="'culposo'" v-model="ds_ato_improbidade_cogitada" >Culposo</p-radio>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-12 text-right">
                                <p-button type="success" @click="HubEnvolvido()">
                                    Adicionar
                                </p-button>
                            </div>
                        </div>
                    </tab-pane>
                </tabs>

                <div class="close-button1 mt-3 d-flex align-items-center justify-content-end" v-show="criacao">
                    <div class="d-flex align-items-center">
                        <p class="category mb-1 mr-3">Obrigatório</p>
                        <p-switch v-model="obrigatorio" type="primary" @change="adicionar()" on-text="Sim" off-text="Não"></p-switch>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./Investigados.js"></script>
<style lang="scss">
.investigados {
    .nav-tabs-navigation { text-align: left }

    .nav-link {
        outline: none;
        &:hover { outline: none }
    }
}
</style>