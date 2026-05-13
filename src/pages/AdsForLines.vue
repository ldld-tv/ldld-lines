<template>
  <div class="fullscreen">
    <q-carousel animated navigation swipeable infinite arrows keep-alive control-color="white" v-model="slide"
      :autoplay="3000" transition-prev="slide-right" transition-next="slide-left" class="absolute-full container">
      <q-carousel-slide v-for="({ title, image, url }, index) in ads" :name="index" :key="index">
        <q-img class="absolute-center" fit="contain" :src="image" @click="click(url)" />
        <div class="absolute-center text-subtitle1 text-white text-center">
          <div v-if="title">{{ title }}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="absolute-top-right q-pa-md text-h6 text-white" @click="emits('enter')">
      {{ $t('enter') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useStore } from 'src/stores/store';
import { useI18n } from 'vue-i18n';
import type { Ads } from 'src/stores/models.js';

const store = useStore();
const router = useRouter();
const route = useRoute();

const q = useQuasar();
const { t } = useI18n();

const slide = ref(1);

const emits = defineEmits(['enter']);

const { ads } = defineProps({
  ads: Array<Ads>,
});

onMounted(async () => {
});

function click(link: string) {
  window.location.href = link;
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background-color: $primary;
}
</style>
