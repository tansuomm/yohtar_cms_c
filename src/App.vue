<template>
  <div id="app">
    <div id="particles"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted: function () {
      let data = {
        "particles": {
          "number": {
            "value": 10,
            "density": {
              "enable": true,
              "value_area": 300
            }
          },
          "color": {
            "value": "#2ba3ff"
          },
          "shape": {
            "type": "image",
            "stroke": {
              "width": 1,
              "color": "#d9ff50"
            },
            "polygon": {
              "nb_sides": 1
            },
            "image": {
              // "src": "img/github.svg",
              "src": "./static/img/bg-npy.png",
              "width": 200,
              "height": 200
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": .5,
              "opacity_min": .2,
              "sync": false
            }
          },
          "size": {
            "value": 20,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 15,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 2
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 1
            },
            "remove": {
              "particles_nb": 1
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#b61924",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      };
      particlesJS('particles', data);
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    padding: 8% 6%;
  }
  #particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #000025;
    /*background: url("./assets/images/background.jpg") no-repeat;*/
    background-size: 100% 100%;
  }
  canvas{
    display:block;
    vertical-align:bottom;
  }
</style>
