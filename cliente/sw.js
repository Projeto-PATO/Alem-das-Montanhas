// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [

  // Cliente //

  './',
  './index.html',
  './manifest.json',
  './style.css',
  './sw.js',

  // .js //

  './js/axios.min.js',
  './js/cena-abertura.js',
  './js/cena-campo.js',
  './js/cena-cutscene.js',
  './js/cena-floresta.js',
  './js/cena-gameover-campo.js',
  './js/cena-gameover-floresta.js',
  './js/cena-gameover-mundo-magico.js',
  './js/cena-gameover-praia.js',
  './js/cena-menu.js',
  './js/cena-mundo-magico.js',
  './js/cena-praia.js',
  './js/cena-sala.js',
  './js/cena-vitoria-migalhas.js',
  './js/cena-vitoria.js',
  './js/config.js',
  './js/index.js',
  './js/phaser.min.js',

  // Assets //

  './assets/caixa-de-som.png',
  './assets/caldeirao-campo.png',
  './assets/caldeirao-mm.png',
  './assets/caldeirao.png',
  './assets/cutscene.png',
  './assets/dialogo.png',
  './assets/favicon.ico',
  './assets/fundo-preto.png',
  './assets/menu-sala.png',
  './assets/menu-selecao.png',
  './assets/migalha-pao.png',
  './assets/Silkscreen-Regular.ttf',
  './assets/tela-abertura-v3.png',
  './assets/tela-gameover.png',
  './assets/tela-vitoria.png',
  './assets/audios/clique.mp3',
  './assets/audios/credito.mp3',
  './assets/audios/dano.mp3',
  './assets/audios/erro.mp3',
  './assets/audios/gameover.mp3',
  './assets/audios/migalha.mp3',
  './assets/audios/trilha-campo.mp3',
  './assets/audios/trilha-floresta.mp3',
  './assets/audios/trilha-menu.mp3',
  './assets/audios/trilha-mm.mp3',
  './assets/audios/trilha-praia.mp3',
  './assets/audios/vitoria.mp3',
  './assets/botoes/baixo.png',
  './assets/botoes/barra.png',
  './assets/botoes/cima.png',
  './assets/botoes/direita.png',
  './assets/botoes/esquerda.png',
  './assets/botoes/iniciar.png',
  './assets/botoes/sala.png',
  './assets/botoes/sala0.png',
  './assets/botoes/sala1.png',
  './assets/botoes/sala2.png',
  './assets/botoes/sala3.png',
  './assets/botoes/sala4.png',
  './assets/botoes/sala5.png',
  './assets/botoes/sala6.png',
  './assets/botoes/sala7.png',
  './assets/botoes/sala8.png',
  './assets/botoes/sala9.png',
  './assets/botoes/selecionar.png',
  './assets/botoes/seta-barra.png',
  './assets/botoes/tela-cheia.png',
  './assets/hud/vida.png',
  './assets/inimigos/caranguejo.png',
  './assets/inimigos/cobra.png',
  './assets/inimigos/fantasma.png',
  './assets/inimigos/trator.png',
  './assets/inimigos/vaca.png',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './assets/mapa/mapa-full.json',
  './assets/mapa/tileset-geral.png',
  './assets/patos/cacique/cacique-cocar.png',
  './assets/patos/cacique/cacique-default.png',
  './assets/patos/cacique/cacique-mago.png',
  './assets/patos/cacique/cacique-oculos.png',
  './assets/patos/cacique/cacique-palha.png',
  './assets/patos/isa/isa-cocar.png',
  './assets/patos/isa/isa-default.png',
  './assets/patos/isa/isa-mago.png',
  './assets/patos/isa/isa-oculos.png',
  './assets/patos/isa/isa-palha.png',
  './assets/patos/mamae-pato/mamae-pato.png',
  './assets/patos/pam/pam-cocar.png',
  './assets/patos/pam/pam-default.png',
  './assets/patos/pam/pam-mago.png',
  './assets/patos/pam/pam-oculos.png',
  './assets/patos/pam/pam-palha.png',
  './assets/patos/thiaguinho/thiaguinho-cocar.png',
  './assets/patos/thiaguinho/thiaguinho-default.png',
  './assets/patos/thiaguinho/thiaguinho-mago.png',
  './assets/patos/thiaguinho/thiaguinho-oculos.png',
  './assets/patos/thiaguinho/thiaguinho-palha.png',
  './assets/patos/tucano/tucano-cocar.png',
  './assets/patos/tucano/tucano-default.png',
  './assets/patos/tucano/tucano-mago.png',
  './assets/patos/tucano/tucano-oculos.png',
  './assets/patos/tucano/tucano-palha.png'

]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
