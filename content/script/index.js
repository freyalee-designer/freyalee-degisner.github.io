import Vue from "vue";
import axios from "axios";
import $ from "jquery";
$(window).on("mousemove", function() {
  if (!$(".brush").hasClass("active")) {
    setTimeout(function() {
      $(".brush").addClass("active");
    }, 200);
  }
});

var app = new Vue({
  el: "#app",
  data() {
    return {
      workData: {},
    };
  },
  methods: {},
  created() {
    const vm = this;
    vm.$nextTick(function() {
      axios.get("content/json/data.json").then((response) => {
        console.log(response);
        vm.workData = response.data.data;
      });
      createBrush();
    });
  },
});

// function createBackground() {
//   const app = new PIXI.Application({ backgroundColor: 0xffffff });
//   document.body.appendChild(app.view);

//   app.loader.load(build);

//   function build() {
//     // Create a new texture
//     // const texture = app.loader.resources.bg_grass.texture;

//     // Create the simple plane
//     const verticesX = 10;
//     const verticesY = 10;
//     // const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);

//     // plane.x = 100;
//     // plane.y = 100;

//     // app.stage.addChild(plane);

//     const filters = new PIXI.filters.NoiseFilter();
//     app.filters = [filters];
//     console.log(filters);
//     app.start();

//     // Get the buffer for vertice positions.
//     // const buffer = plane.geometry.getBuffer("aVertexPosition");
//     app.ticker.add((delta) => {
//       filters.seed = Math.random();
//       //   for (let i = 0; i < 10; i++) {
//       //     filters.seed = i / 10;
//       //     console.log(filters.seed);
//       //   }
//     });
//   }
// }
function noise(amount) {
  gl.noise =
    gl.noise ||
    new Shader(
      null,
      "\
        uniform sampler2D texture;\
        uniform float amount;\
        varying vec2 texCoord;\
        float rand(vec2 co) {\
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\
        }\
        void main() {\
            vec4 color = texture2D(texture, texCoord);\
            \
            float diff = (rand(texCoord) - 0.5) * amount;\
            color.r += diff;\
            color.g += diff;\
            color.b += diff;\
            \
            gl_FragColor = color;\
        }\
    "
    );

  simpleShader.call(this, gl.noise, {
    amount: clamp(0, amount, 1),
  });

  return this;
}

function createBrush() {
  const app = new PIXI.Application();
  $(app.view).addClass("brush");
  var _container = $(".container").get(0);
  _container.appendChild(app.view);

  const trailTexture = PIXI.Texture.from("content/img/pink.png");
  const historyX = [];
  const historyY = [];
  const historySize = 10;
  const ropeSize = 10;
  const points = [];

  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }
  // Create rope points.
  for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
  }

  // Create the rope
  const rope = new PIXI.SimpleRope(trailTexture, points);

  // Set the blendmode
  rope.blendmode = PIXI.BLEND_MODES.ADD;

  app.stage.addChild(rope);

  // Listen for animate update
  app.ticker.add((delta) => {
    // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
    // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
    const mouseposition = app.renderer.plugins.interaction.mouse.global;

    // Update the mouse values to history
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    // Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
      const p = points[i];

      // Smooth the curve with cubic interpolation to prevent sharp edges.
      const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
      const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

      p.x = ix;
      p.y = iy;
    }
  });
}

/**
 * Cubic interpolation based on https://github.com/osuushi/Smooth.js
 */
function clipInput(k, arr) {
  if (k < 0) k = 0;
  if (k > arr.length - 1) k = arr.length - 1;
  return arr[k];
}

function getTangent(k, factor, array) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function cubicInterpolation(array, t, tangentFactor) {
  if (tangentFactor == null) tangentFactor = 1;

  const k = Math.floor(t);
  const m = [
    getTangent(k, tangentFactor, array),
    getTangent(k + 1, tangentFactor, array),
  ];
  const p = [clipInput(k, array), clipInput(k + 1, array)];
  t -= k;
  const t2 = t * t;
  const t3 = t * t2;
  return (
    (2 * t3 - 3 * t2 + 1) * p[0] +
    (t3 - 2 * t2 + t) * m[0] +
    (-2 * t3 + 3 * t2) * p[1] +
    (t3 - t2) * m[1]
  );
}
