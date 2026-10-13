import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/boot/supabase";

const email = ref("");
const password = ref("");

const router = useRouter();

async function handleLogin() {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) {
      throw error;
    }

    await router.push("/home");
  } catch (error: any) {
    console.error(error.message);
  }
}

export function useUsuario() {
  return {
    email,
    password,
    handleLogin
  };
}
