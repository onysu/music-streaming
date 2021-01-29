(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.PriorityQueue = f();
  }
})(function () {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw ((f.code = "MODULE_NOT_FOUND"), f);
        }
        var l = (n[o] = {
          exports: {}
        });
        t[o][0].call(
          l.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          r
        );
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
  })({
      1: [
        function (_dereq_, module, exports) {
          var AbstractPriorityQueue,
            ArrayStrategy,
            BHeapStrategy,
            BinaryHeapStrategy,
            PriorityQueue,
            extend = function (child, parent) {
              for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
              }

              function ctor() {
                this.constructor = child;
              }
              ctor.prototype = parent.prototype;
              child.prototype = new ctor();
              child.__super__ = parent.prototype;
              return child;
            },
            hasProp = {}.hasOwnProperty;

          AbstractPriorityQueue = _dereq_(
            "./PriorityQueue/AbstractPriorityQueue"
          );

          ArrayStrategy = _dereq_("./PriorityQueue/ArrayStrategy");

          BinaryHeapStrategy = _dereq_("./PriorityQueue/BinaryHeapStrategy");

          BHeapStrategy = _dereq_("./PriorityQueue/BHeapStrategy");

          PriorityQueue = (function (superClass) {
            extend(PriorityQueue, superClass);

            function PriorityQueue(options) {
              options || (options = {});
              options.strategy || (options.strategy = BinaryHeapStrategy);
              options.comparator ||
                (options.comparator = function (a, b) {
                  return (a || 0) - (b || 0);
                });
              PriorityQueue.__super__.constructor.call(this, options);
            }

            return PriorityQueue;
          })(AbstractPriorityQueue);

          PriorityQueue.ArrayStrategy = ArrayStrategy;

          PriorityQueue.BinaryHeapStrategy = BinaryHeapStrategy;

          PriorityQueue.BHeapStrategy = BHeapStrategy;

          module.exports = PriorityQueue;
        },
        {
          "./PriorityQueue/AbstractPriorityQueue": 2,
          "./PriorityQueue/ArrayStrategy": 3,
          "./PriorityQueue/BHeapStrategy": 4,
          "./PriorityQueue/BinaryHeapStrategy": 5
        }
      ],
      2: [
        function (_dereq_, module, exports) {
          var AbstractPriorityQueue;

          module.exports = AbstractPriorityQueue = (function () {
            function AbstractPriorityQueue(options) {
              var ref;
              if ((options != null ? options.strategy : void 0) == null) {
                throw "Must pass options.strategy, a strategy";
              }
              if ((options != null ? options.comparator : void 0) == null) {
                throw "Must pass options.comparator, a comparator";
              }
              this.priv = new options.strategy(options);
              this.length =
                (options != null ?
                  (ref = options.initialValues) != null ?
                  ref.length :
                  void 0 :
                  void 0) || 0;
            }

            AbstractPriorityQueue.prototype.queue = function (value) {
              this.length++;
              this.priv.queue(value);
              return void 0;
            };

            AbstractPriorityQueue.prototype.dequeue = function (value) {
              if (!this.length) {
                throw "Empty queue";
              }
              this.length--;
              return this.priv.dequeue();
            };

            AbstractPriorityQueue.prototype.peek = function (value) {
              if (!this.length) {
                throw "Empty queue";
              }
              return this.priv.peek();
            };

            AbstractPriorityQueue.prototype.clear = function () {
              this.length = 0;
              return this.priv.clear();
            };

            return AbstractPriorityQueue;
          })();
        },
        {}
      ],
      3: [
        function (_dereq_, module, exports) {
          var ArrayStrategy, binarySearchForIndexReversed;

          binarySearchForIndexReversed = function (array, value, comparator) {
            var high, low, mid;
            low = 0;
            high = array.length;
            while (low < high) {
              mid = (low + high) >>> 1;
              if (comparator(array[mid], value) >= 0) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return low;
          };

          module.exports = ArrayStrategy = (function () {
            function ArrayStrategy(options) {
              var ref;
              this.options = options;
              this.comparator = this.options.comparator;
              this.data =
                ((ref = this.options.initialValues) != null ?
                  ref.slice(0) :
                  void 0) || [];
              this.data.sort(this.comparator).reverse();
            }

            ArrayStrategy.prototype.queue = function (value) {
              var pos;
              pos = binarySearchForIndexReversed(
                this.data,
                value,
                this.comparator
              );
              this.data.splice(pos, 0, value);
              return void 0;
            };

            ArrayStrategy.prototype.dequeue = function () {
              return this.data.pop();
            };

            ArrayStrategy.prototype.peek = function () {
              return this.data[this.data.length - 1];
            };

            ArrayStrategy.prototype.clear = function () {
              this.data.length = 0;
              return void 0;
            };

            return ArrayStrategy;
          })();
        },
        {}
      ],
      4: [
        function (_dereq_, module, exports) {
          var BHeapStrategy;

          module.exports = BHeapStrategy = (function () {
            function BHeapStrategy(options) {
              var arr, i, j, k, len, ref, ref1, shift, value;
              this.comparator =
                (options != null ? options.comparator : void 0) ||
                function (a, b) {
                  return a - b;
                };
              this.pageSize =
                (options != null ? options.pageSize : void 0) || 512;
              this.length = 0;
              shift = 0;
              while (1 << shift < this.pageSize) {
                shift += 1;
              }
              if (1 << shift !== this.pageSize) {
                throw "pageSize must be a power of two";
              }
              this._shift = shift;
              this._emptyMemoryPageTemplate = arr = [];
              for (
                i = j = 0, ref = this.pageSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j
              ) {
                arr.push(null);
              }
              this._memory = [];
              this._mask = this.pageSize - 1;
              if (options.initialValues) {
                ref1 = options.initialValues;
                for (k = 0, len = ref1.length; k < len; k++) {
                  value = ref1[k];
                  this.queue(value);
                }
              }
            }

            BHeapStrategy.prototype.queue = function (value) {
              this.length += 1;
              this._write(this.length, value);
              this._bubbleUp(this.length, value);
              return void 0;
            };

            BHeapStrategy.prototype.dequeue = function () {
              var ret, val;
              ret = this._read(1);
              val = this._read(this.length);
              this.length -= 1;
              if (this.length > 0) {
                this._write(1, val);
                this._bubbleDown(1, val);
              }
              return ret;
            };

            BHeapStrategy.prototype.peek = function () {
              return this._read(1);
            };

            BHeapStrategy.prototype.clear = function () {
              this.length = 0;
              this._memory.length = 0;
              return void 0;
            };

            BHeapStrategy.prototype._write = function (index, value) {
              var page;
              page = index >> this._shift;
              while (page >= this._memory.length) {
                this._memory.push(this._emptyMemoryPageTemplate.slice(0));
              }
              return (this._memory[page][index & this._mask] = value);
            };

            BHeapStrategy.prototype._read = function (index) {
              return this._memory[index >> this._shift][index & this._mask];
            };

            BHeapStrategy.prototype._bubbleUp = function (index, value) {
              var compare, indexInPage, parentIndex, parentValue;
              compare = this.comparator;
              while (index > 1) {
                indexInPage = index & this._mask;
                if (index < this.pageSize || indexInPage > 3) {
                  parentIndex = (index & ~this._mask) | (indexInPage >> 1);
                } else if (indexInPage < 2) {
                  parentIndex = (index - this.pageSize) >> this._shift;
                  parentIndex += parentIndex & ~(this._mask >> 1);
                  parentIndex |= this.pageSize >> 1;
                } else {
                  parentIndex = index - 2;
                }
                parentValue = this._read(parentIndex);
                if (compare(parentValue, value) < 0) {
                  break;
                }
                this._write(parentIndex, value);
                this._write(index, parentValue);
                index = parentIndex;
              }
              return void 0;
            };

            BHeapStrategy.prototype._bubbleDown = function (index, value) {
              var childIndex1, childIndex2, childValue1, childValue2, compare;
              compare = this.comparator;
              while (index < this.length) {
                if (index > this._mask && !(index & (this._mask - 1))) {
                  childIndex1 = childIndex2 = index + 2;
                } else if (index & (this.pageSize >> 1)) {
                  childIndex1 = (index & ~this._mask) >> 1;
                  childIndex1 |= index & (this._mask >> 1);
                  childIndex1 = (childIndex1 + 1) << this._shift;
                  childIndex2 = childIndex1 + 1;
                } else {
                  childIndex1 = index + (index & this._mask);
                  childIndex2 = childIndex1 + 1;
                }
                if (childIndex1 !== childIndex2 && childIndex2 <= this.length) {
                  childValue1 = this._read(childIndex1);
                  childValue2 = this._read(childIndex2);
                  if (
                    compare(childValue1, value) < 0 &&
                    compare(childValue1, childValue2) <= 0
                  ) {
                    this._write(childIndex1, value);
                    this._write(index, childValue1);
                    index = childIndex1;
                  } else if (compare(childValue2, value) < 0) {
                    this._write(childIndex2, value);
                    this._write(index, childValue2);
                    index = childIndex2;
                  } else {
                    break;
                  }
                } else if (childIndex1 <= this.length) {
                  childValue1 = this._read(childIndex1);
                  if (compare(childValue1, value) < 0) {
                    this._write(childIndex1, value);
                    this._write(index, childValue1);
                    index = childIndex1;
                  } else {
                    break;
                  }
                } else {
                  break;
                }
              }
              return void 0;
            };

            return BHeapStrategy;
          })();
        },
        {}
      ],
      5: [
        function (_dereq_, module, exports) {
          var BinaryHeapStrategy;

          module.exports = BinaryHeapStrategy = (function () {
            function BinaryHeapStrategy(options) {
              var ref;
              this.comparator =
                (options != null ? options.comparator : void 0) ||
                function (a, b) {
                  return a - b;
                };
              this.length = 0;
              this.data =
                ((ref = options.initialValues) != null ?
                  ref.slice(0) :
                  void 0) || [];
              this._heapify();
            }

            BinaryHeapStrategy.prototype._heapify = function () {
              var i, j, ref;
              if (this.data.length > 0) {
                for (
                  i = j = 1, ref = this.data.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j
                ) {
                  this._bubbleUp(i);
                }
              }
              return void 0;
            };

            BinaryHeapStrategy.prototype.queue = function (value) {
              this.data.push(value);
              this._bubbleUp(this.data.length - 1);
              return void 0;
            };

            BinaryHeapStrategy.prototype.dequeue = function () {
              var last, ret;
              ret = this.data[0];
              last = this.data.pop();
              if (this.data.length > 0) {
                this.data[0] = last;
                this._bubbleDown(0);
              }
              return ret;
            };

            BinaryHeapStrategy.prototype.peek = function () {
              return this.data[0];
            };

            BinaryHeapStrategy.prototype.clear = function () {
              this.length = 0;
              this.data.length = 0;
              return void 0;
            };

            BinaryHeapStrategy.prototype._bubbleUp = function (pos) {
              var parent, x;
              while (pos > 0) {
                parent = (pos - 1) >>> 1;
                if (this.comparator(this.data[pos], this.data[parent]) < 0) {
                  x = this.data[parent];
                  this.data[parent] = this.data[pos];
                  this.data[pos] = x;
                  pos = parent;
                } else {
                  break;
                }
              }
              return void 0;
            };

            BinaryHeapStrategy.prototype._bubbleDown = function (pos) {
              var last, left, minIndex, right, x;
              last = this.data.length - 1;
              while (true) {
                left = (pos << 1) + 1;
                right = left + 1;
                minIndex = pos;
                if (
                  left <= last &&
                  this.comparator(this.data[left], this.data[minIndex]) < 0
                ) {
                  minIndex = left;
                }
                if (
                  right <= last &&
                  this.comparator(this.data[right], this.data[minIndex]) < 0
                ) {
                  minIndex = right;
                }
                if (minIndex !== pos) {
                  x = this.data[minIndex];
                  this.data[minIndex] = this.data[pos];
                  this.data[pos] = x;
                  pos = minIndex;
                } else {
                  break;
                }
              }
              return void 0;
            };

            return BinaryHeapStrategy;
          })();
        },
        {}
      ]
    }, {},
    [1]
  )(1);
});

(function () {
  var canvas = document.getElementById("canvas");
  var container = document.getElementById("container");
  sizing();

  function sizing() {
    canvas.height = container.offsetHeight;
    canvas.width = container.offsetWidth;
  }

  window.addEventListener("resize", function () {
    !window.requestAnimationFrame ?
      setTimeout(sizing, 300) :
      window.requestAnimationFrame(sizing);
  });
})();

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var w = cvs.width,
  h = cvs.height;

var gInput =
  //[[0,7,40],[0,14,7],[1,0,28],[1,10,26],[2,14,3],[3,0,47],[3,6,8],[3,12,43],[3,14,38],[5,8,38],[6,7,35],[6,9,43],[6,14,38],[7,4,20],[7,5,11],[7,6,46],[7,11,37],[7,14,10],[8,3,9],[8,11,37],[10,1,18],[10,14,3],[11,8,23],[11,14,0],[12,0,24],[12,4,5],[12,7,33],[13,2,2],[13,6,20],[14,0,37]];
  [
    [0, 1, 7],
    [0, 2, 9],
    [1, 2, 10],
    [1, 3, 15],
    [2, 3, 11],
    [2, 5, 2],
    [3, 4, 6],
    [4, 5, 9],
    [0, 5, 14]
  ];
var V = 6,
  vs = [],
  s = 0,
  MAX_V = 100000;
var G = [],
  rG = [];
var undir = true,
  undirN = false;
var osX = 0,
  osY = 0,
  toosX = 0,
  toosY = 0,
  rat = 1,
  torat = 1,
  frat = 1;

var prvE = Number.POSITIVE_INFINITY,
  kQ = 200,
  kE = 0.003,
  mu = 0.95;
var fl = true;

document.getElementById("editbox").style.visibility = document.getElementById(
  "button"
).style.visibility = "hidden";

function initG() {
  vs = [];
  G = [];
  rG = [];
  for (var i = 0; i < V; ++i)(G[i] = []), (rG[i] = []);

  for (var i = 0; i < V; ++i) {
    var randX = w / 2 + Math.random() * 500 - 250,
      randY = h / 2 + Math.random() * 400 - 200;
    vs[i] = {
      x: (w * (i + 1)) / (V + 1),
      y: randY,
      tox: (w * (i + 1)) / (V + 1),
      toy: randY,
      vx: 0,
      vy: 0
    };
  }

  for (var i = 0; i < gInput.length; ++i) {
    var gi = gInput[i];
    G[gi[0]].push({
      to: gi[1],
      cost: gi[2]
    });
    (undir ? G[gi[1]] : rG[gi[1]]).push({
      to: gi[0],
      cost: gi[2]
    });
  }
}

initG();

console.log(G);

var INF = Number.POSITIVE_INFINITY / 4;
var d = new Array(MAX_V).fill(INF);

function* dijkstra(s) {
  var pque = new PriorityQueue({
    comparator: (a, b) => {
      if (a.dist != b.dist) return a.dist - b.dist;

      return a.v - b.v;
    }
  });
  d[s] = 0;
  pque.queue({
    dist: 0,
    v: s
  });

  while (pque.length != 0) {
    var p = pque.dequeue();

    if (d[p.v] < p.dist) continue;

    yield {
      type: "focus",
      v: p.v
    };

    yield {
      type: "trans",
      v: p.v
    };

    for (var e of G[p.v]) {
      if (d[e.to] > d[p.v] + e.cost) {
        d[e.to] = d[p.v] + e.cost;
        pque.queue({
          dist: d[e.to],
          v: e.to
        });
        yield {
          type: "upd",
          v: p.v,
          to: e.to
        };
      }
    }
  }
}

function morph(f, t, d) {
  return f + (t - f) / d;
}

var dijk;
var auto = true;

var state,
  tim = 0;
var states,
  pStates = 0;

function initS(s) {
  d.fill(INF);
  states = [{
    state: {
      type: "null",
      v: -1
    },
    dist: [].concat(d)
  }];

  dijk = dijkstra(s);

  while (true) {
    var itr = dijk.next();

    states.push({
      state: itr.value,
      dist: [].concat(d)
    });

    if (itr.done) break;
  }

  pStates = 0;
  state = states[0].state;
  d = states[0].dist;
}

initS(0);

function keyProcLR(keyEvent) {
  switch (keyEvent.keyCode) {
    case 37: // <-
      if (!auto && pStates > 0) {
        state = states[--pStates].state;
        d = states[pStates].dist;
      }
      --curV;

      break;
    case 39: // ->
      if (!auto) {
        if (pStates != states.length - 1) {
          state = states[++pStates].state;
          d = states[pStates].dist;
        }
      }
      ++curV;

      break;
  }
}

var isShift = false;

document.getElementById("button").onclick = () => {
  var lines = document.getElementById("editbox").value.trim().split("\n");

  gInput = [];

  for (var i = 0; i < lines.length; ++i) {
    var xs = lines[i].split(" ");

    if (i == 0) {
      V = xs[0];
      s = xs[2];
    } else
      (gInput[i - 1] = xs.map(parseFloat)), console.log(xs.map(parseFloat));
  }

  undir = undirN;

  initG();
  initS(s);
};

document.onkeydown = (event) => {
  var keyEvent = event || window.event;

  switch (keyEvent.keyCode) {
    case 16: // Shift
      isShift = true;

      break;
  }

  if (isShift) keyProcLR(keyEvent);
};

document.onkeyup = (event) => {
  var keyEvent = event || window.event;

  switch (keyEvent.keyCode) {
    case 90: // Z
      /*state = dijk.next().value;

      for( var dist of d )
        console.log(dist);*/
      pStates = 0;
      state = states[pStates].state;
      d = states[pStates].dist;

      break;
    case 65: // A
      auto ^= true;

      break;
    case 16: // Shift
      isShift = false;

      break;
    case 17: // Ctrl
      if (document.getElementById("editbox").style.visibility == "visible")
        document.getElementById(
          "editbox"
        ).style.visibility = document.getElementById(
          "button"
        ).style.visibility = "hidden";
      else
        document.getElementById(
          "editbox"
        ).style.visibility = document.getElementById(
          "button"
        ).style.visibility = "visible";

      break;
    case 68: // d
      undirN ^= true;

      break;
  }

  keyProcLR(keyEvent);
};

var mX, mY;
document.onmousemove = (event) => {
  mX = event.clientX;
  mY = event.clientY;
};

var clickN = -1;
document.onmousedown = (event) => {
  for (var i = 0; i < V; ++i) {
    var v = vs[i];

    if (
      clickN == -1 &&
      (mX - ((v.x + osX - w / 2) * rat + w / 2)) ** 2 +
      (mY - ((v.y + osY - h / 2) * rat + h / 2)) ** 2 <
      (50 * frat) ** 2
    ) {
      clickN = i;
      break;
    }
  }
};

document.onmouseup = (event) => {
  clickN = -1;
};

var curV = 0;

function render() {
  ctx.clearRect(0, 0, w, h);

  var E = 0;

  if (fl) {
    for (var i = 0; i < V; ++i) {
      var v = vs[i];
      var f = [0, 0];

      for (var j = 0; j < V; ++j)
        if (i != j) {
          var u = vs[j];

          var rsq = (v.tox - u.tox) ** 2 + (v.toy - u.toy) ** 2;
          f[0] += (kQ * (v.tox - u.tox)) / rsq;
          f[1] += (kQ * (v.toy - u.toy)) / rsq;
        }

      //console.log(f);

      for (var j = 0; j < G[i].length; ++j) {
        var u = vs[G[i][j].to];

        f[0] += kE * (u.tox - v.tox);
        f[1] += kE * (u.toy - v.toy);
      }

      for (var j = 0; j < rG[i].length; ++j) {
        var u = vs[rG[i][j].to];

        f[0] += kE * (u.tox - v.tox);
        f[1] += kE * (u.toy - v.toy);
      }

      //console.log(f);

      v.vx = (v.vx + 2 * f[0]) * mu;
      v.vy = (v.vy + 2 * f[1]) * mu;
      v.tox += 2 * v.vx;
      v.toy += 2 * v.vy;

      E += v.vx ** 2 + v.vy ** 2;

      //console.log(v);
    }
  }

  tim = (tim + 1) % 30;
  if (auto && tim == 0 && (pStates != 0 || E < 1e-2)) {
    if (pStates != states.length - 1) {
      state = states[++pStates].state;
      d = states[pStates].dist;
    }
  }

  for (var v of vs) {
    v.x = morph(v.x, v.tox, 1);
    v.y = morph(v.y, v.toy, 1);
  }

  //if( E < 1 )
  {
    var minX = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY;

    for (var i = 0; i < V; ++i) {
      minX = Math.min(minX, vs[i].x - 50);
      maxX = Math.max(maxX, vs[i].x + 50);
      minY = Math.min(minY, vs[i].y - 70);
      maxY = Math.max(maxY, vs[i].y + 110);
    }

    torat = Math.min(w / (maxX - minX), h / (maxY - minY));
    toosX = (w - (maxX - minX)) / 2 - minX;
    toosY = (h - (maxY - minY)) / 2 - minY;
  }

  osX = morph(osX, toosX, 10);
  osY = morph(osY, toosY, 10);
  if (torat < 1) rat = morph(rat, torat, 10);
  else rat = 1;

  frat = Math.max(rat, 0.2);

  var used = [],
    usedP = [];

  for (var i = 0; i < V; ++i)
    for (var j = 0; j < G[i].length; ++j)
      usedP.push(i.toString() + "," + G[i][j].to.toString());

  for (var i = 0; i < V; ++i)
    for (var j = 0; j < G[i].length; ++j) {
      var tag =
        Math.min(i, G[i][j].to).toString() +
        "," +
        Math.max(i, G[i][j].to).toString();

      if (undir && used.indexOf(tag) != -1) continue;

      var fx = (vs[i].x + osX - w / 2) * rat + w / 2,
        fy = (vs[i].y + osY - h / 2) * rat + h / 2;
      var tx = (vs[G[i][j].to].x + osX - w / 2) * rat + w / 2,
        ty = (vs[G[i][j].to].y + osY - h / 2) * rat + h / 2;
      var norm = Math.sqrt((tx - fx) ** 2 + (ty - fy) ** 2);

      ctx.fillStyle = "rgb(40,40,40)";
      ctx.font = "normal " + Math.floor(30 * rat) + "px 'Yu Gothic'";
      ctx.textAlign = "center";
      var prvBaseLine = ctx.textBaseline;
      ctx.textBaseline = "middle";
      ctx.fillText(
        G[i][j].cost.toString(),
        (fx + tx) / 2 - ((ty - fy) / norm) * 30 * rat,
        (fy + ty) / 2 + ((tx - fx) / norm) * 30 * rat
      );
      ctx.textBaseline = prvBaseLine;

      if (!undir) {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(40,40,40)";
        if (
          state != undefined &&
          state.type != "focus" &&
          (i == state.v || (undir && G[i][j].to == state.v))
        )
          ctx.strokeStyle = "rgb(229,107,45)";
        var arrX = tx - ((tx - fx) / norm) * 50 * frat,
          arrY = ty - ((ty - fy) / norm) * 50 * frat;
        var vecX = ((fx - tx) / norm) * 10 * Math.max(rat, 0.8),
          vecY = ((fy - ty) / norm) * 10 * Math.max(rat, 0.8);
        ctx.moveTo(arrX, arrY);
        ctx.lineTo(
          arrX + (vecX * Math.cos(Math.PI / 6) - vecY * Math.sin(Math.PI / 6)),
          arrY + (vecY * Math.cos(Math.PI / 6) + vecX * Math.sin(Math.PI / 6))
        );
        ctx.moveTo(arrX, arrY);
        ctx.lineTo(
          arrX +
          (vecX * Math.cos(-Math.PI / 6) - vecY * Math.sin(-Math.PI / 6)),
          arrY + (vecY * Math.cos(-Math.PI / 6) + vecX * Math.sin(-Math.PI / 6))
        );
        ctx.stroke();
        ctx.closePath();
      }

      if (used.indexOf(tag) == -1) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(40,40,40)";
        if (
          state != undefined &&
          state.type != "focus" &&
          (i == state.v ||
            (undir && G[i][j].to == state.v) ||
            (!undir &&
              usedP.indexOf(G[i][j].to.toString() + "," + i.toString()) != -1 &&
              G[i][j].to == state.v))
        )
          ctx.strokeStyle = "rgb(229,107,45)";

        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.closePath();
      }

      used.push(tag);
    }

  for (var i = 0; i < V; ++i) {
    var v = vs[i];
    ctx.beginPath();
    ctx.fillStyle = "rgb(40,40,40)";
    if (
      i ==
      curV /*state != undefined && ( i == state.v || state.type == "upd" && state.to == i )*/
    )
      ctx.fillStyle = "rgb(229,107,45)";
    ctx.arc(
      (v.x + osX - w / 2) * rat + w / 2,
      (v.y + osY - h / 2) * rat + h / 2,
      50 * frat,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "normal " + Math.floor(40 * frat) + "px 'Yu Gothic'";
    ctx.textAlign = "center";
    ctx.fillText(
      i.toString(),
      (v.x + osX - w / 2) * rat + w / 2,
      (v.y + osY - h / 2) * rat + h / 2 + 16 * frat
    );
    ctx.fillStyle = "rgb(40,40,40)";

    if (
      state != undefined &&
      (i == state.v || (state.type == "upd" && state.to == i))
    )
      ctx.fillStyle = "rgb(229,107,45)";

    ctx.font = "normal " + Math.floor(30 * frat) + "px 'Yu Gothic'";
    ctx.fillText(
      "d=" + (d[i] == INF ? "∞" : d[i].toString()),
      (v.x + osX - w / 2) * rat + w / 2,
      (v.y + osY - h / 2) * rat + h / 2 + 80 * frat
    );
  }

  ctx.font = "normal 40px 'Yu Gothic'";
  ctx.fillStyle = "rgb(40,40,40)";
  ctx.textAlign = "left";
  //ctx.fillText( "E = "+E.toString(), 20, 60 );
  ctx.fillText(
    (pStates + 1).toString() + " / " + states.length.toString() + " steps",
    20,
    60
  );
  ctx.fillText("Undirected: " + (undirN ? "true" : "false"), 20, 115);

  if (auto) ctx.fillText("auto", 20, 160);
  //if( E > prvE )
  //fl = false;

  if (clickN != -1) {
    vs[clickN].x = vs[clickN].tox = (mX - w / 2) / rat - (osX - w / 2);
    vs[clickN].y = vs[clickN].toy = (mY - h / 2) / rat - (osY - h / 2);
  }

  prvE = E;
}

setInterval(render, 1000 / 60);