<template>
  <header class="app-header">
    <button @click="showLogoutModal = true">
      <svg class="logout" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.36 6.64A9 9 0 0 1 20.77 15"/><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68"/><path d="M12 2v4"/><path d="m2 2 20 20"/></svg>
    </button>
    <div class="title-frame">
      <h1 class="title-glint">BEFORE THE WORLD ENDS</h1>
    </div>
    <Modal
      v-if="showLogoutModal"
      title="Confirm Log Out"
      @confirm="handleLogout"
      @close="showLogoutModal = false"
    >
      <p>Are you sure you want to log out?</p>
    </Modal>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import Modal from './Modal.vue'

const showLogoutModal = ref(false)
const userStore = useUserStore()
const router = useRouter()

const handleLogout = async () => {
  await userStore.signOut()
  router.push('/auth')
}
</script>

<style scoped>
.app-header {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 2rem 0rem 0.5rem 0rem;
}

.app-header button {
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: flex-end;
}

.logout {
  display: flex;
  width: 0.7rem;
  height: 0.7rem;
  color: #00ffee;
}

.title-frame {
  padding: 1rem 1rem;
  margin: 0.5rem 1rem;
  background-color: #151922;
  border: 2px solid #00ffee;
  border-radius: 1rem;
  box-shadow:
    0 0 6px #00ffee,
    0 0 12px #00ffee,
    0 0 20px #ff00d4;
  animation: frameGlow 3s ease-in-out infinite;
  display: inline-block;
}

@keyframes shine {
  0% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
}

.title-glint {
  position: relative;
  display: flex;
  justify-content: center;
  font-family: 'Share Tech Mono';
  font-size: 1.3rem;
  background: linear-gradient(
    -120deg,
    #151922 0%,
    #151922 50%,
    #00ffee 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 7s ease-in-out infinite;
}

@keyframes frameGlow {
  0%, 100% {
    box-shadow:
      0 0 6px #00ffee,
      0 0 12px #00ffee,
      0 0 20px #ff00d4;
  }
  50% {
    box-shadow:
      0 0 3px #00ffee,
      0 0 6px #00ffee,
      0 0 10px #ff00d4;
  }
}

</style>