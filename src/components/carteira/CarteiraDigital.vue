<template>
  <section id="page-form">
    <q-dialog v-model="modalAdd">
      <q-card style="width: 100%; max-width: 580px; padding: 40px 30px">
        <q-btn
          label="X"
          color="red"
          class="absolute-top-right q-ma-md"
          @click="fecharModal"
        />

        <h3>Formulário de cadastro</h3>

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
          <q-select
            outlined
            :options="tiposEventos"
            v-model="formulario.tipoEvento"
            class="select-personalizado"
            label="Selecione o tipo"
          />
          <q-btn color="green" icon="add" label="Adicionar" type="submit" />
        </q-form>
      </q-card>
    </q-dialog>

    <div class="container">
      <div class="header-carteira">
        <div class="row-top">
          <div class="flex items-center q-gutter-sm">
            <q-icon name="wallet" size="3rem" />
            <h1 class="q-pa-none q-ma-none">Carteira <span class="text-secondary">digital</span></h1
            >
          </div>

          <q-btn icon="add" type="submit" color="orange" @click="exibirModal"
            ><span class="btn-add-label">Adicionar</span></q-btn
          >
        </div>

        <div class="resume">
          <p class="box-saldo">
            <span>Saldo: </span>
            {{ moedaBRL(totalSaldo) }}
          </p>

          <p class="box-despesa">
            <span>Despesas: </span>
            {{ moedaBRL(totalDespesa) }}
          </p>

          <p class="box-receita row-box-full">
            <span>Receita: </span>
            {{ moedaBRL(totalReceita) }}
          </p>
        </div>
      </div>

      <div class="bar-search">
        <h4>Movimentações</h4>
        <q-select
          outlined
          :options="tipoEventosFilter"
          v-model="filtroTipo"
          class="select-personalizado"
          label="Selecione o filtro"
        />
      </div>

      <ul class="lista-transacoes">
        <li v-for="transacao in transacoes" :key="transacao.id">
          <p class="item-w">{{ transacao.descricao }}</p>
          <p>{{ transacao.dataEvento }}</p>
          <p>{{ transacao.tipoEvento }}</p>
          <p class="item-w">{{ moedaBRL(transacao.valor) }}</p>
          <div class="actions">
            <q-btn icon="delete" color="red" @click="remover(transacao.id)" />
            <q-btn icon="edit" color="orange" @click="editar(transacao)" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCarteira } from "@/composable/useCarteira";
import { Notify } from "quasar";
const { alertar, modalAdd, exibirModal, fecharModal } = useCarteira();
const tipo = ref(null);
const options = ["Receita", "Despesa"];

function editar(transacao: Transacao) {
  console.log(transacao);
}

const filtroTipo = ref("");

interface Formulario {
  valor: number | null;
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
    valor: 50,
    descricao: "Mercado",
    tipoEvento: "Despesa",
    dataEvento: "09-09-2026"
  },
  {
    id: 101,
    valor: 100,
    descricao: "Salário",
    tipoEvento: "Receita",
    dataEvento: "09-09-2026"
  }
]);

const tiposEventos = ["Receita", "Despesa"];
const tipoEventosFilter = ["Todos", "Receita", "Despesa"];

function adicionar(): void {
  if (
    formulario.value.valor === null ||
    !formulario.value.descricao.trim() ||
    !formulario.value.dataEvento ||
    !formulario.value.tipoEvento
  ) {
    Notify.create({
      message: "Preencha todos os campos!",
      color: "negative",
      timeout: 1000,
      position: "center"
    });
    return;
  }

  if (formulario.value.valor <= 0) {
    alert("Valor digitado não pode ser 0 ou menor do que zero!");
    return;
  }

  transacoes.value.push({
    id: Date.now(),
    valor: Number(formulario.value.valor),
    descricao: formulario.value.descricao,
    dataEvento: formulario.value.dataEvento,
    tipoEvento: formulario.value.tipoEvento
  });

  formulario.value.valor = null;
  formulario.value.descricao = "";
  formulario.value.dataEvento = "";
  formulario.value.tipoEvento = "";

  Notify.create({
    message: "Operação adicionada!",
    color: "positive",
    position: "center",
    timeout: 1000
  });

  fecharModal();
}

function remover(id: number): void {
  if (confirm("Deseja excluir transação?")) {
    transacoes.value = transacoes.value.filter(u => u.id !== id);
    Notify.create({
      message: "Operação apagada!",
      color: "positive",
      position: "center",
      timeout: 1000
    });
  }
}

// utils/moedaBRL.ts
function moedaBRL(valor: number | null): string {
  if (valor === null) {
    return "R$ 0,00";
  }

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

//Realizar calculos
const totalReceita = computed(() =>
  transacoes.value
    .filter(t => t.tipoEvento === "Receita")
    .reduce((acumulador, t) => acumulador + (t.valor ?? 0), 0)
);

const totalDespesa = computed(() =>
  transacoes.value
    .filter(t => t.tipoEvento === "Despesa")
    .reduce((acumulador, t) => acumulador + (t.valor ?? 0), 0)
);

const totalSaldo = computed(() => totalReceita.value - totalDespesa.value);
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

#page-form {
  background: #f2f2f2;
  padding: 1.5rem;
}

.header-carteira {
  background-color: #2d004d;
  border-radius: 20px 20px 0 0;
  padding: 1rem;
  color: white;
}

.resume {
  display: flex;
  gap: 1rem;
}

@media (max-width: 640px) {
  .resume {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .row-box-full {
    grid-column: 1/-1;
  }
}

.resume p {
  font-size: 2rem;
}

@media (max-width: 425px) {
  .resume p {
    font-size: 1rem;
  }

  .btn-add-label {
    display: none;
  }
}

.resume span {
  font-size: 1rem;
  display: block;
}

.row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.texto-logo {
  font-size: 1.2rem;
  font-weight: bold;

  @media (min-width: 500px) {
    font-size: 1.5rem;

  }
}

.logo-pan {
  display: none;

  @media (min-width: 500px) {
    display: flex;
  }
}

.box-saldo,
.box-despesa,
.box-receita {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.box-saldo {
  background-color: #2563eb;
  color: white;
}

.box-despesa {
  background-color: #dc2626;
  color: white;
}

.box-receita {
  background-color: #059669;
  color: white;
}

.form {
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 1rem;
}

.select-personalizado {
  max-width: 300px;
  width: 100%;
}

.bar-search {
  background-color: #fff;
  margin: 1rem 0;
  padding: 1.5rem;
  border-radius: 5px;
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
