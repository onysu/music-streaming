function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
} // impor audio.

const library = [{
    name: "Vox",
    url: "http://cdn.mos.musicradar.com/audio/samples/carnival-rave-demo-loops/The%20lowdown%20Bar%205.mp3"
  },
  {
    name: "... - Origin",
    url: "https://dub.center/uploads/files/2016-01/1453756880_jaykode-x-party-thieves-origin.mp3"
  },
  {
    name: "Imagine Dragons - Thunder",
    url: "http://mus3.alternativo.fm/3346124a-5291-4f4b-b6be-92736cd34ed16700.mp3"
  }
];



// Pengaturan

const progressbarWidth = 400,
  volumebarWidth = 150;

// Aplikasi

class ControlButton extends React.Component {
  render() {
    return /*#__PURE__*/ (
      React.createElement("button", {
          key: typeof this.props.playing === "boolean" ? {
            true: '1',
            false: '0'
          } [this.props.playing] : '2',
          className: "controls_control",
          onClick: () => this.props.onClick(this.props.role)
        }, /*#__PURE__*/
        React.createElement("i", {
          className: typeof this.props.playing === "boolean" ?
            this.props.playing ? "fas fa-pause" : "fas fa-play" : this.props.icon
        })));
  }
}

class ControlSlider extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "startDrag",
      event => {
        this.setState({
          dragable: true
        }, () => {
          this.setValue(event);
        });
      });
    _defineProperty(this, "setValue",

      (event, role = null) => {
        if (this.props.activeRole === "progress" && (this.props.progress <= 0 || this.props.progress >= 100)) {
          return false;
        }
        if (this.state.dragable || role !== null) { // XXX
          if (role !== null) this.setState({
            dragable: true
          });
          let a = event.nativeEvent.offsetX,
            b = 100 / (this.props.width / a);
          this.setState({
            value: b
          });

          this.props.onSet(this.props.activeRole, b);
        }
      });
    this.state = {
      dragable: false,
      value: typeof this.props.progress !== "undefined" ? this.props.progress : this.props.defaultValue
    };
  }
  componentWillReceiveProps(newProps) {
    if (typeof newProps.progress !== "undefined") {
      this.setState({
        value: newProps.progress
      });
    }
  }

  render() {
    return /*#__PURE__*/ (
      React.createElement("div", {
          className: this.props.className,
          onMouseDown: e => this.setValue(e, 'sampler'),
          onMouseUp: () => this.setState({
            dragable: false
          }),
          onMouseMove: this.setValue
        }, /*#__PURE__*/

        React.createElement("div", {
          style: {
            width: this.state.value + '%'
          },
          className: `controls_fill${this.state.dragable ? " dragable" : ""}`
        })));
  }
}


class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 0,
      progress: 0
    };
  }

  componentWillReceiveProps(newProps) {
    let a = newProps.globalTimestamp,
      b = newProps.currentTimestamp;

    if (b <= a) {
      this.setState({
        duration: a,
        progress: b
      });

    } else {
      this.setState({
        duration: 0,
        progress: 0
      });

    }
  }

  convertTime(value) {
    function fa(v) {
      return Math.floor(v);
    }

    function fb(v) {
      let a = v ? v : "00";
      return a;
    }

    let a = value,
      b = fa(a / 60),
      c = fa(a % 60);
    b = fb(b);
    c = fb(c);
    c = c.toString().length === 1 ? "0" + c : c;

    return b + ":" + c;
  }

  render() {
    return /*#__PURE__*/ (
      React.createElement("div", {
          className: "controls"
        }, /*#__PURE__*/
        React.createElement("div", {
            className: "controls_material"
          }, /*#__PURE__*/
          React.createElement(ControlButton, {
            icon: "fas fa-step-backward",
            activeRole: "back",
            onClick: () => this.props.onMultiButton("back")
          }), /*#__PURE__*/

          React.createElement(ControlButton, {
            playing: this.props.playing,
            activeRole: "pause",
            onClick: () => this.props.onMultiButton("play")
          }), /*#__PURE__*/

          React.createElement(ControlButton, {
            icon: "fas fa-step-forward",
            activeRole: "forward",
            onClick: () => this.props.onMultiButton("forward")
          })), /*#__PURE__*/


        React.createElement("div", {
            className: "controls-control"
          }, /*#__PURE__*/
          React.createElement("div", {
              className: "controls-control-titlebox",
              style: {
                width: progressbarWidth + "px"
              }
            }, /*#__PURE__*/
            React.createElement("span", null, this.convertTime(this.props.currentTimestamp)), /*#__PURE__*/
            React.createElement("span", {
                className: "controls-control-title",
                style: {
                  width: progressbarWidth - 150 + "px"
                }
              },
              this.props.songName.length ? this.props.songName : "Pilih lagu"), /*#__PURE__*/

            React.createElement("span", null, this.convertTime(this.props.globalTimestamp))), /*#__PURE__*/

          React.createElement(ControlSlider, {
            className: "controls_progress",
            width: progressbarWidth,
            activeRole: "progress",
            progress: (100 / (this.state.duration / this.state.progress)).toString() === "NaN" ?
              0 : 100 / (this.state.duration / this.state.progress)
              // x2? StringToString? QUESTION XXX
              ,
            defaultValue: 0,
            onSet: this.props.onSubmitSlider
          })), /*#__PURE__*/

        React.createElement("div", {
            className: "controls-control"
          }, /*#__PURE__*/
          React.createElement("p", null, "Volume"), /*#__PURE__*/
          React.createElement(ControlSlider, {
            className: "controls_volume",
            width: volumebarWidth,
            activeRole: "volume",
            defaultValue: 100,
            onSet: this.props.onSubmitSlider
          }))));
  }
}

class Search extends React.Component {
  render() {
    return /*#__PURE__*/ (
      React.createElement("input", {
        className: "search",
        type: "search",
        onChange: e => this.props.onSearch(e.target.value),
        defaultValue: "",
        placeholder: "Search"
      }));
  }
}

class Song extends React.Component {
  constructor(props) { // PERTANYAAN: Apakah "Return-Function" (yang digunakan sebagai innerHTML) harus segera mengembalikan (nilai)?
    super(props);
    _defineProperty(this, "calculateDuration",
      () => { // Biasanya, durasi trek dihitung di server, tetapi saya akan menggunakan fungsi dalam kasus ini.
        let a = new Audio(this.props.information.url);
        a.onloadedmetadata = () => {
          let b = Math.floor(a.duration / 60), // minutes
            c = Math.floor(a.duration % 60), // seconds
            d = (b.toString().length === 1 ? "0" + b : b) + ":" + (c.toString().length === 1 ? "0" + c : c); // XXX: APAKAH ITU? Bagaimana cara memperbaiki omong kosong ini?
          this.setState({
            duration: d
          });
        };
      });
    this.state = {
      duration: "" // XXX: Saya pikir, bisa lebih baik.
    };
  }
  componentWillMount() {
    this.calculateDuration();
  }

  render() {
    return /*#__PURE__*/ (
      React.createElement("div", {
          className: "list-song",
          onClick: () => this.props._onWantPlay(this.props.information.name, this.props.information.url, this.props.index)
        }, /*#__PURE__*/

        React.createElement("span", null, this.props.information.name), /*#__PURE__*/
        React.createElement("span", null, this.state.duration)));
  }
}

class List extends React.Component {
  render() {
    return /*#__PURE__*/ (
      React.createElement("div", {
          className: "listbox"
        }, /*#__PURE__*/
        React.createElement(Search, {
          onSearch: this.props.onSearch
        }), /*#__PURE__*/
        React.createElement("div", {
            className: "list"
          },

          Object.keys(this.props.library).map((session, index) => {
            let a = this.props.library[index];
            return /*#__PURE__*/ React.createElement(Song, {
              key: index,
              index: index,
              information: {
                name: a.name,
                url: a.url
              },

              _onWantPlay: this.props.onChangeMusic
            });

          }))));
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "setMusic",
      (name, url, index) => {
        if (url === this.state.song.src && this.state.song.currentTime < this.state.song.duration) {
          this.controlMusic("play");
          return false;
        }

        clearInterval(this.state.progressInterval);
        this.state.song.pause();

        let a = new Audio(url);
        a.volume = this.state.volume;
        this.setState({
            song: a,
            songName: name,
            playing: true,
            songIndex: index,
            progressInterval: setInterval(() => {
              if (this.state.song.currentTime >= this.state.song.duration) {
                clearInterval(this.state.progressInterval);
                a = index + 1;
                let b = this.state.query[a];
                if (b !== undefined) {
                  this.setMusic(b.name, b.url, a);
                } else if (this.state.query[0] !== undefined && this.state.songIndex !== 0) {
                  a = 0;
                  b = this.state.query[0];
                  this.setMusic(b.name, b.url, 0);
                } else {
                  this.setState({
                    playing: false
                  });

                }
              }

              this.setState({
                song: a
              });

            }, 5) /* was 1000 */
          },
          () => {
            this.state.song.play();
          });
      });
    _defineProperty(this, "controlMusic",

      (submiter, value = void 0) => {
        let a = this.state.song,
          b = null;
        switch (submiter) {
          case 'progress':
            // Get timestamp by %
            b = a.duration / 100 * value;
            b = isNaN(b) || !isFinite(b) ? 0 : b;
            a.currentTime = b;
            this.setState({
              song: a
            });

            break;
          case 'volume':
            b = value / 100;
            a.volume = b > 1 || b < 0 ? b > 1 ? 1 : 0 : b;
            this.setState({
              song: a,
              volume: a.volume
            });

            break;
          case 'back':
            a = this.state.songIndex - 1;
            b = this.state.query[a];
            if (b === undefined && this.state.query[0] !== undefined) {
              a = 0;
              b = this.state.query[0];
              this.setMusic(b.name, b.url, a);
              return false;
            }

            this.setState({
                songIndex: a
              },
              function () {
                this.setMusic(b.name, b.url, a);
              });
            break;
          case 'play':
            if (this.state.songIndex === -1) {
              a = this.state.songIndex + 1;
              b = this.state.query[a];
              if (b !== undefined) {
                this.setMusic(b.name, b.url, a);
              }
            } else {
              this.state.playing ? a.pause() : a.play();
              this.setState({
                playing: !this.state.playing
              });

            }
            break;
          case 'forward':
            a = this.state.songIndex + 1;
            b = this.state.query[a];
            if (b === undefined) {
              a = 0;
              b = this.state.query[0];
              if (b === undefined) {
                this.setMusic(b.name, b.url, a);
                return false;
              }
            }

            this.setState({
                songIndex: a
              },
              function () {
                this.setMusic(b.name, b.url, a);
              });
            break;
          default:
            break; // default diperlukan.
        }
      });
    _defineProperty(this, "searchTrack",

      request => {
        let a = [];
        for (let k = 0; k < library.length; k++) {
          let b = library[k];
          if (b.name.toUpperCase().indexOf(request.toUpperCase()) !== -1) {
            a.push(b);
          }
        }
        this.setState({
          query: a,
          songIndex: 0
        });

      });
    this.state = {
      query: library,
      song: new Audio(),
      progressInterval: null,
      volume: 1,
      playing: false,
      songName: "",
      songIndex: -1
    };
  }

  render() {
    return /*#__PURE__*/ (
      React.createElement(React.Fragment, null, /*#__PURE__*/
        React.createElement(Controls, {
          onSubmitSlider: this.controlMusic,
          onMultiButton: this.controlMusic // PERTANYAAN: Dapatkah saya menggabungkan pendengar dan menggunakan satu fungsi untuk mereka? bahasa inggris 11/10
            ,
          currentTimestamp: this.state.song.currentTime,
          globalTimestamp: this.state.song.duration,
          playing: this.state.playing,
          songName: this.state.songName
        }), /*#__PURE__*/

        React.createElement(List, {
          onSearch: this.searchTrack,
          onChangeMusic: this.setMusic,
          library: this.state.query
        })));
  }
}

ReactDOM.render( /*#__PURE__*/ React.createElement(App, null), document.getElementById('root'));