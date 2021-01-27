const ap = new APlayer({
  container: document.getElementById('player'),
  listFolded: false,
  listMaxHeight: '520px',
  lrcType: 1,
  audio: [{
      name: 'A Feast Of Friends',
      artist: 'The Doors',
      url: 'files/The Doors - A Feast Of Friends.mp3',
      cover: 'files/The-Doors.jpg',
      // lrc: 'lrc1.lrc',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#ebd0c2'
    },
    {
      name: 'Suffer The Children',
      artist: 'Napalm Death',
      url: 'files/Napalm Death - Suffer The Children.mp3',
      cover: 'files/Napalm-Death---suffer-the-children.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Pierced from Within',
      artist: 'Suffocation',
      url: 'files/Suffocation - Pierced from Within.mp3',
      cover: 'files/Pierced-From-Within.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Infecting The Crypts',
      artist: 'Suffocation',
      url: 'files/Suffocation - Infecting The Crypts.mp3',
      cover: 'files/Suffocation---Infecting-The-Crypts.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'After World Obliteration',
      artist: 'Terrorizer',
      url: 'files/Terrorizer - After World Obliteration.mp3',
      cover: 'files/Terrorizer-After-World-Obliteration.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Phobophile',
      artist: 'Cryptopsy',
      url: 'files/Cryptopsy - Phobophile.mp3',
      cover: 'files/Cryptopsy---Phobophile.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Through The Eye Of Terror',
      artist: 'Bolt Thrower',
      url: 'files/Bolt Thrower - Through The Eye Of Terror.mp3',
      cover: 'files/Bolt-Thrower---Through-the-Eye-of-Terror.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: '... for Victory [Album]',
      artist: 'Bolt Thrower',
      url: 'files/Bolt Thrower - ...for Victory.mp3',
      cover: 'files/Victory.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'The Burning Pits Of The Duat',
      artist: 'Nile',
      url: 'files/Nile - The Burning Pits Of The Duat.mp3',
      cover: 'files/Nile---The-Burning-Pits-of-the-Duat.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Kafir!',
      artist: 'Nile',
      url: 'files/Nile - Kafir!.mp3',
      cover: 'files/Nile-Kafir.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Wings',
      artist: 'Vader',
      url: 'files/Vader - Wings.mp3',
      cover: 'files/Vader---Wings.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Persecution Mania [album]',
      artist: 'Sodom',
      url: 'files/Sodom - Persecution Mania [album].mp3',
      cover: 'files/Persecution.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Left Hand Path [album]',
      artist: 'Entombed',
      url: 'files/Entombed - Left Hand Path [album].mp3',
      cover: 'files/Left-Hand-Path.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Cause Of Death',
      artist: 'Obituary',
      url: 'files/Obituary - Cause Of Death.mp3',
      cover: 'files/Cause-Of-Death.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    },
    {
      name: 'Slowly We Rot',
      artist: 'Obituary',
      url: 'files/Obituary - Slowly We Rot.mp3',
      cover: 'files/Slowly-We-Rot.jpg',
      lrc: '[00:00.00]Selamat datang\n[00:04.01]Ony Music | 08155509153\n[00:08.02]bisa request lagu\n[00:12.03]Online Music Streaming',
      theme: '#46718b'
    }
  ]
});