<template>
  <section class="auth-template">
    <svg class="prodigy" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 1567.45 1495.3125" x="0px" y="0px">
      <path d="M1313.27,823.93c155.46-53.19,253.27-130.59,254.17-217.68,1.55-149.67-283.63-276.69-657.93-303.12C631.31,51.32,342.22-66.53,235.3,38.2c-62.22,60.94-50.36,185.11,18.88,334.11C98.72,425.5.91,502.91,0,590-1.55,739.66,283.63,866.69,657.94,893.11c278.2,251.81,567.29,369.66,674.22,264.93C1394.37,1097.1,1382.52,972.93,1313.27,823.93Zm3.38-220.28c-.46,44.22-20.16,85.86-54.87,122.76C1197.72,617.44,1108,500.51,998,388.24q-29.8-30.43-60-58.84C1158.17,366.2,1318,475.82,1316.66,603.65ZM1201.5,776.26C1103.25,841,951.14,881.73,780.8,880a997,997,0,0,1-114-7.65,997,997,0,0,1-84.44-77C463.17,673.65,387.23,535.71,366,420c98.24-64.77,250.35-105.46,420.69-103.7a997,997,0,0,1,114,7.65,997,997,0,0,1,84.44,77C1104.28,522.6,1180.22,660.53,1201.5,776.26ZM410.79,217.38c91.33-89.45,281.07-50,460.06,83.4q-41.4-2.12-84-2.58C629.7,296.57,483.18,312.76,360.2,342,362.79,291.37,379.2,248.32,410.79,217.38ZM250.8,592.6c.46-44.22,20.16-85.86,54.87-122.76C369.74,578.8,459.49,695.74,569.45,808q29.8,30.43,60,58.84C409.28,830.05,249.47,720.43,250.8,592.6Zm905.86,386.27c-91.33,89.45-281.07,50-460.06-83.4q41.4,2.12,84,2.58c157.14,1.63,303.65-14.56,426.64-43.76C1204.66,904.88,1188.25,947.92,1156.66,978.87Z"/>
    </svg>
    <h2 class="form-heading">ACCESS THE PROTOCOL</h2>
    <form @submit.prevent="handleRegister" class="form-panel">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <div class="form-buttons">
        <button type="submit">✅ Register</button>
      </div>
      <p class="switch-link" @click="$emit('switch')">Log In</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleRegister = async () => {
  try {
    await userStore.signUp(email.value, password.value)
    if (userStore.user) {
      router.push('/dashboard')
    }
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>

.auth-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.prodigy {
  fill: #00ffee;
  width: 8rem;
  filter: drop-shadow(0 0 4px #00fff7)
          drop-shadow(0 0 10px rgba(0, 255, 238, 0.5))
          drop-shadow(0 0 20px rgba(0, 255, 238, 0.5))
          drop-shadow(0 0 30px rgba(0, 255, 238, 0.5))
          drop-shadow(0 0 40px rgba(0, 132, 255, 0.5));
  animation: flicker 2.5s infinite;
}

@keyframes flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px #ff00d4,
      0 0 10px #ff00d4,
      0 0 20px #ff00d4,
      0 0 30px #002fff,
      0 0 40px #002fff;
  }

  20%, 24%, 55% {
    opacity: 0.4;
    text-shadow: none;
  }
}

.form-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 2rem;
  color: #00ffee;
  text-align: center;
  margin: 2rem 1rem 3rem 1rem;
}

.switch-link {
  font-size: 0.9rem;
  color: #00ffee;
  cursor: pointer;
  text-align: center;
  margin-top: 1rem;
}
</style>