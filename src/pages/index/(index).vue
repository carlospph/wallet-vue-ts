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
        <!-- <q-separator/> -->

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
        <div>
          <div class="d-flex">
            <q-icon name="wallet" size="3rem" />
            <h1 class="texto-logo">Carteira digita7</h1>
          </div>

          <span class="header-saldo"> {{ moedaBRL(totalSaldo) }}</span>
        </div>
        <q-btn
          icon="add"
          label="adicionaor"
          type="submit"
          color="orange"
          @click="exibirModal"
        />
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
     transacoes.value = transacoes.value.filter(
      u => u.id !== id
    );
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
