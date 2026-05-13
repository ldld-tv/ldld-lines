<template>
  <div class="container fullscreen column items-center justify-center">
    <div class="text-h3">ldld.tv</div>
    <div class="text-h5">{{ $t('permanent') }}</div>
    <div class="text-h5 q-mb-lg">{{ $t('bookmark') }}</div>
    <template v-if="!line">
      <div class="text-subtitle1">{{ $t('lineSelection') }}</div>
      <q-spinner-dots color="accent" size="36px"></q-spinner-dots>
    </template>
    <div v-else class="text-h6 click-to-enter text-white" @click="enterMain">
      {{ $t('clickToEnter') }}
    </div>
  </div>
  <!-- <div v-else-if="ads['launch'] && ads['launch']['ads'].length > 0">
    <AdsForLines :ads="ads['launch']['ads']" @enter="enterMain"></AdsForLines>
  </div> -->
</template>

<script setup lang="ts">
import url from 'url';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { env, useStore } from 'src/stores/store';
import { useI18n } from 'vue-i18n';
import { formatHost } from 'src/utils';
import AdsForLines from './AdsForLines.vue';
import type { Ads } from 'src/stores/models';

const store = useStore();
const q = useQuasar();
const { t } = useI18n();

const line = ref<string | null>(null);
const ads = ref<{ [key: string]: { status: string; ads: Ads[] } }>({});

onMounted(async () => {
  // line.value = await store.getLine();
  // ads.value = await store.getAds('launch');

  // if (!ads.value['launch'] || ads.value['launch']['ads'].length === 0) {
  //   enterMain()
  // }

  line.value = await store.getLine();
  // enterMain()
});

function enterMain() {
  if (env) {
    window.location.href = url.format({ protocol: import.meta.env.VITE_PROTOCOL, host: formatHost(line.value!), pathname: 'client', query: { env } })
  } else {
    window.location.href = url.format({ protocol: import.meta.env.VITE_PROTOCOL, host: formatHost(line.value!), pathname: 'client' })
  }
}
</script>

<style scoped lang="scss">
.container {
  color: $accent;
  background-color: $secondary;
}

.click-to-enter {
  cursor: pointer;
  text-decoration: underline;
}
</style>
