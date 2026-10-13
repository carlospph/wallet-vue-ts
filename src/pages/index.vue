<template>
<section class="container">
  <h1>Acesso ao sistema</h1>
  <p>Gerencie suas atividades</p>

  <q-form @submit.prevent="handleLogin" class="flex column q-gutter-lg">
    <q-input type="email" v-model="email" placeholder="E-mail" outlined/>
    <q-input type="password" v-model="password" placeholder="Senha" outlined/>
    <q-btn type="submit" label="entrar" color="green"/>
  </q-form>
</section>
</template>

<script setup lang="ts">
import { useUsuario } from '@/composable/useUsuario';
const { handleLogin,email,password} = useUsuario();
</script>

<style scoped>
.container{
  max-width:450px;
  width: 100%;
  box-shadow: 0 0 10px #00000050;
  margin:3rem auto 1rem;
}
</style>
