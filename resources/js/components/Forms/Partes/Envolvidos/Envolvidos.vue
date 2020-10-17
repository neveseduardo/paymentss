<template>
    <div class="envolvidos">
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

                <h4 class="card-title mt-2 mb-4">Envolvidos</h4>
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
                                        <span class="help-block text-danger" v-if="errors.cpf_cnpj">CPF/CNPJ inválido</span>
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

<script src="./Envolvidos.js"></script>
<style lang="scss" src="./Envolvidos.scss"></style>