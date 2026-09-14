import {ref} from 'vue';
import {Notify} from 'quasar';

const modalAdd = ref(false);

function exibirModal(){
  modalAdd.value = true;
}

function fecharModal(){
    modalAdd.value = false;
}

function alertar(){
  Notify.create({
    message:"Notify acionado com sucesso!",
    color:'positive',
    position:'top'
  })
}


export function useCarteira () {

  return {alertar, modalAdd, exibirModal, fecharModal}

}
