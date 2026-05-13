import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import url from 'url';
import { formatHost } from 'src/utils';
import type { Ads } from './models';


const query = new URLSearchParams(window.location.search);
export const env = query.get('env');

export const useStore = defineStore('store', () => {
  async function getLine(): Promise<string | null> {
    // const res = await api.get('/lines/list');
    const lines = import.meta.env.VITE_DOMAINS.split(',')//res.data;

    const line = await Promise.any(
      lines.map((line: string) => api.get(url.format({ protocol: import.meta.env.VITE_PROTOCOL, host: formatHost(line), pathname: 'client/index.html' })).then(() => line)),
    )
      .then((line) => {
        console.log(`line: ${line}`);
        return line;
      })
      .catch((err) => {
        console.log(`err: ${err}`);
        return null;
      });

    return line;
  }

  async function getAds(category: string): Promise<{ [key: string]: { status: string; ads: Ads[] } }> {
    const res = await api.get('/server/ads/get', { params: { env, category } });
    return res.data;
  }

  return {
    getLine,
    getAds
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
