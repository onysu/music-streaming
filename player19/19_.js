$('#playlist').musicPlaylist({
  // Opsi Utama
  playerWidth: '100%', // Lebar player. Atur dalam persen (%) untuk membuatnya responsif atau dalam piksel (px) untuk membuatnya tetap lebar
  playerColor: '#eee', // Warna latar belakang pemutar
  playerOpacity: '1', // Opasitas latar belakang pemutar dan daftar putar: 0,1 - 1
  iconColor: '#333', // Warna ikon player
  slidersBackgroundColor: '#ddd', // Warna latar slider waktu dan volume
  slidersValueColor: 'red', // Penggeser waktu dan volume warna aktif
  playerSize: 'small', // ukuran karya seni: big, small
  titleSize: '15px', // ukuran judul
  titleColor: '#222', // Warna judul lagu
  titleFontFamily: 'arial', // font judul
  startingVolume: '100', // Volume player awal: 0 - 100

  // Opsi Daftar Putar
  showPlayList: 'show', // Tunjukkan playlist pada awalnya: tampilkan, sembunyikan
  trackImageSize: '30px', // ukuran foto dalam playlist
  trackTextColor: '#111', // warna judul dalam playlist
  trackTextSize: '12px', // ukuran judul dalam playlist
  trackFontFamily: 'arial', // font judul dalam playlist
  playlistColor: '#999', // Warna latar daftar putar
  activeTrackBackground: '#333', // Track aktif dalam warna playlist
  activeTrackTextColor: 'yellow', // Warna judul track aktif dalam playlist
  separatorColor: '#333', // warna pemisah
});

// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
      console.log('Reload langsung diaktifkan.');
      sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
  })();
} else {
  console.error('Tingkatkan versi browser Anda. Browser ini TIDAK mendukung WebSocket untuk Live-Reloading.');
}