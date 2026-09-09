<template>
  <section id="page-form">

    <div class="container">

    <div class="header-carteira">
      <div>
        <div class="d-flex">
          <q-icon name="wallet" size="3rem" />
          <h1 class="texto-logo">Carteira digita7</h1>
        </div>

        <span class="header-saldo">R$ 6.000,00</span>
      </div>
      <q-btn icon="add" label="adicionaor" type="submit" color="orange" />
    </div>

    <q-form class="form" @submit.prevent="adicionar">
      <q-input
        type="number"
        placeholder="R$ 1000,00"
        outlined
        v-model="formulario.valor"
      />
      <q-input
        type="text"
        placeholder="Descrição"
        outlined
        v-model="formulario.descricao"
      />
      <q-input
        type="date"
        placeholder="Data do evento"
        outlined
        v-model="formulario.dataEvento"
      />
      <q-select outlined :options="tiposEventos" v-model="formulario.tipoEvento" class="select-personalizado" label="Selecione o tipo"/>
      <q-btn color="green" icon="add" label="Adicionar" type="submit" />
    </q-form>


    <div class="bar-search">
      <h4>Movimentações</h4>
      <q-select outlined :options="tipoEventosFilter" v-model="filtroTipo" class="select-personalizado" label="Selecione o filtro"/>
    </div>

    <ul class="lista-transacoes">
      <li v-for="transacao in transacoes" :key="transacao.id">
        <p class="item-w">{{ transacao.descricao }}</p>
        <p>{{ transacao.dataEvento }}</p>
        <p>{{ transacao.tipoEvento }}</p>
        <p class="item-w">{{ transacao.valor }}</p>
        <div class="actions">
          <q-btn icon="delete" color="red" @click="remover(transacao.id)"/>
          <q-btn icon="edit" color="orange" />
        </div>
      </li>
    </ul>
  </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const filtroTipo = ref('');

interface Formulario {
  valor: null;
  descricao: string;
  tipoEvento: string;
  dataEvento: string;
}

interface Transacao extends Formulario {
  id: number;
}

const formulario = ref<Formulario>({
  valor: null,
  descricao: "",
  tipoEvento: "",
  dataEvento: ""
});

const transacoes = ref<Transacao[]>([
  {
    id: 100,
    valor: 2000,
    descricao: "Mercado",
    tipoEvento: "Despesa",
    dataEvento: "09-09-2026"
  },
  {
    id: 101,
    valor: 2000,
    descricao: "Salário",
    tipoEvento: "Renda",
    dataEvento: "09-09-2026"
  }
]);

const tiposEventos = ["Renda", "Despesa"];
const tipoEventosFilter = ["Todos", "Renda", "Despesa"];


function adicionar(): void {
  transacoes.value.push({
    id: Date.now(),
    valor: formulario.value.valor,
    descricao: formulario.value.descricao,
    dataEvento: formulario.value.dataEvento,
    tipoEvento: formulario.value.tipoEvento
  });

  alert("Adicionado com sucesso!");
}

function remover(id:number) :void{
  if(confirm("Deseja excluir transação?")){
    transacoes.value = transacoes.value.filter(u=>u.id !== id)
  }
}
</script>

<style scoped>
#page-form {
  background: #f2f2f2;
  padding: 1.5rem;
}

.header-carteira {
  background-color: rgba(16, 16, 96, 1);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  margin-bottom: 1rem;
}

.header-carteira--logo {
  display: flex;
}

.d-flex {
  display: flex;
  align-items: center;
  gap: 4px;
}

.texto-logo {
  font-size: 1rem;
}
.header-saldo {
  font-size: 2.5rem;
  font-weight: 800;
}

.form {
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 1rem;
}

.select-personalizado{
  max-width: 300px;
  width:100%;
}


.bar-search{
  background-color: #fff;
  margin:1rem 0;
  padding:1.5rem;
  border-radius:5px;
  display: flex;
  justify-content: space-between;
}

.lista-transacoes {
  background: #fff;
  padding: 1.5rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.lista-transacoes li {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 120px;
  align-items: center;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  background: #f2f2f2;
}

.item-w {
  font-weight: bold;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 0.8rem;
}
</style>
