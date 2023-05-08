Vue.component("componente-header", {
  data: function () {
    return {
      menu: [
        {
          texto: "Home",
          navegacion: "#home",
        },
        {
          texto: "Calculadora",
          navegacion: "#calculadora",
        },
      ],
    };
  },
  template: `
        <header class="fixed-top bg-white shadow-lg py-3">
            <div class="container d-flex align-items-center justify-content-between">
                <img src="img/logo.png" alt="Logo" class="me-2 ms-3" height="24" />
                <ul class="nav menu">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/calculadora">Calculadora</router-link>
                    </li>
                </ul>
            </div>
        </header>
    `,
});

Vue.component("componente-home", {
  data: function () {
    return {
      titulo: "¡Usá Propinapp!",
      descripcion:
        "Calcula la propina perfecta en segundos con nuestra herramienta fácil de usar",
    };
  },
  template: `
  <div>
    <section class="container d-flex vh-100" id="home">
        <div class="row mx-auto align-items-center">
            <div class="col">
                <img src="img/blob.svg" alt="Imagen de hero de Propinapp" />
            </div>
            <div class="col text-end">
                <h2 class="display-5 mb-4">{{titulo}}</h2>
                <h4 class="text-muted fs-4 mb-4">{{descripcion}}</h4>
                <button class="btn btn-success">
                    <a href="#info" class="nav-link">↓ Más info</a>
                </button>
            </div>
        </div>
        </section>
    <componente-info></componente-info>
  </div>
    `,
});

Vue.component("componente-info", {
  data: function () {
    return {
      titulo: "Calculá la propina ideal con nuestra app.",
      descripcion: "Calculá con propinapp.",
      features: [
        {
          titulo: "Fácil y rápida de usar",
          descripcion:
            "Calculá la cantidad exacta de propina en cuestión de segundos.",
        },
        {
          titulo: "Personalizada y precisa",
          descripcion:
            "Personaliza el porcentaje de propina y calculá la cantidad exacta que debes poner.",
        },
        {
          titulo: "División de cuenta",
          descripcion:
            "Dividí la cuenta entre varios y calculá la propina por persona.",
        },
        {
          titulo: "Multifunción y adaptable",
          descripcion: "Adaptable a diferentes situaciones, monedas e idiomas.",
        },
      ],
    };
  },
  template: `
    <section
        class="container-fluid vh-100 d-flex align-items-center"
        id="info"
    >
    <div class="container">
        <div
            class="row align-items-md-center g-5 mt-3"
        >
        <div class="col d-flex flex-column align-items-start gap-2">
            <h3 class="fw-bold">{{titulo}}</h3>
            <p class="text-muted">{{descripcion}}</p>
            <router-link class="btn btn-lg btn-success" to="/calculadora">Ir a la calculadora</router-link>
        </div>
        <div class="col">
            <div class="row row-cols-1 row-cols-sm-2 g-4">
                <div
                    class="col d-flex flex-column gap-2"
                    v-for="item in features"
                >
                    <div
                        class="feature-icon-small d-inline-flex align-items-center justify-content-center bg-success py-3 fs-4 rounded-3"
                    >
                        <img src="img/blob.svg" alt="Favicon" height="100px" />
                        </div>
                        <h4 class="fw-semibold mb-0 fs-5">
                        {{item.titulo}}
                        </h4>
                        <p>{{item.descripcion}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
    `,
});

Vue.component("componente-calculadora", {
  data: function () {
    return {
      cantidadGasto: null,
      cantidadComensales: null,
      propinaPais: "",
      calidadMozo: null,
      arr: [],
      errores: [],
      enviado: false,
      calificaciones: [
        {
          detalle: "Excelente",
          multiplicador: 5,
        },
        {
          detalle: "Bueno",
          multiplicador: 2,
        },
        {
          detalle: "Regular",
          multiplicador: 1,
        },
      ],
      paises: [
        {
          id: 1,
          nombre: "🇦🇷 Argentina",
          propina: 10,
        },
        {
          id: 2,
          nombre: "🇺🇸 Estados Unidos",
          propina: 15,
        },
        {
          id: 3,
          nombre: "🇪🇸 España",
          propina: 5,
        },
        {
          id: 4,
          nombre: "🇲🇽 México",
          propina: 10,
        },
        {
          id: 5,
          nombre: "🇨🇱 Chile",
          propina: 10,
        },
        {
          id: 6,
          nombre: "🇨🇴 Colombia",
          propina: 10,
        },
        {
          id: 7,
          nombre: "🇵🇪 Perú",
          propina: 10,
        },
        {
          id: 8,
          nombre: "🇧🇷 Brasil",
          propina: 10,
        },
        {
          id: 9,
          nombre: "🇺🇾 Uruguay",
          propina: 10,
        },
        {
          id: 10,
          nombre: "🇵🇾 Paraguay",
          propina: 10,
        },
        {
          id: 11,
          nombre: "🇧🇴 Bolivia",
          propina: 10,
        },
        {
          id: 12,
          nombre: "🇻🇪 Venezuela",
          propina: 10,
        },
      ],
    };
  },
  computed: {
    hayErrores: function () {
      return this.errores.length;
    },
  },
  template: `
    <section
          class="container vh-100 d-flex align-items-center"
          id="calculadora"
        >
          <form
            v-on:submit.prevent="guardar"
            novalidate
            class="mx-auto text-center"
          >
            <div class="d-grid gap-4">
              <div class="d-grid gap-2">
                <label>¿Cuánto gastaste o gastaron en total?</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="cantidadGasto"
                  />
                  <span class="input-group-text">.00</span>
                </div>
              </div>
              <div class="d-grid gap-2">
                <label
                  >¿Entre qué cantidad de personas tiene que dividirse la
                  cuenta?</label
                >
                <input
                  type="number"
                  class="form-control"
                  v-model="cantidadComensales"
                />
              </div>
              <div class="d-grid gap-2">
                <label>¿En qué pais está el lugar al que fueron a comer?</label>
                <select class="form-select" v-model="propinaPais">
                  <option value="" selected disabled>
                    Seleccioná un país de la lista
                  </option>
                  <option v-for="pais in paises" :value="pais.id">
                    {{pais.nombre}}
                  </option>
                </select>
              </div>
              <div class="d-grid gap-2">
                <label
                  >¿Qué tan bien considerás que estuvo el mozo que te
                  atendió?</label
                >
                <div class="d-flex gap-2">
                  <div class="form-check mx-auto" v-for="item in calificaciones">
                    <label class="form-check-label">
                      <input
                        class="form-check-input"
                        v-model="calidadMozo"
                        :value="item.multiplicador"
                        type="radio"
                      />
                      {{item.detalle}}
                    </label>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-5">
                <input
                  type="submit"
                  class="btn btn-success"
                  value="Calcular propina"
                />
              </div>
            </div>
          </form>
          <div class="col-6">
            <div class="mt-5" v-if="enviado === true">
                <div v-if="hayErrores">
                  <div class="alert alert-danger py-1" v-for="error in errores">
                    {{error}}
                  </div>
                </div>
                <div class="col-8 mx-auto" v-else v-for="(item, index) in arr" :key="index">
                  <div class="card mb-4 rounded-3 shadow-sm" v-if="index == arr.length - 1">
                    <div class="card-header py-3">
                      <h4 class="my-0 fw-normal">Propina sugerida</h4>
                    </div>
                    <div class="card-body">
                      <h1 class="card-title pricing-card-title">$ {{item.propina.toFixed()}}</h1>
                        <ul class="list-unstyled mt-3 mb-4">
                          <li>Cada uno de los comensales deben poner $ {{item.propinaPorComensal.toFixed()}}</li>
                          <li>Habitualmente en este país se deja el {{item.porcentajePropina}}% de propina</li>
                          <li>El gasto total es de $ {{item.total}}</li>
                        </ul>
                      <button type="button" class="w-100 btn btn-lg btn-outline-success">
                        <router-link class="nav-link" to="/calculos">Ver cálculos anteriores</router-link>
                      </button>
                    </div>
                  </div>
                </div>  
            </div>
            <div v-else class="d-flex justify-content-center">
			        <p>¡Calculá la propina para conocer cuánto hay que pagar!</p>
		        </div>
          </div>
    </section>
    `,
  methods: {
    obtenerPropinaPorId: function (id) {
      let propina = this.paises.find((pais) => pais.id === id);
      return propina.propina;
    },
    guardar: function () {
      this.enviado = true;
      this.errores = [];

      if (!this.cantidadGasto || isNaN(this.cantidadGasto)) {
        this.errores.push(
          "Por favor, completa el dato de cuánto gastaste con información válida para que el cálculo sea preciso."
        );
      }

      if (!this.cantidadComensales || isNaN(this.cantidadComensales)) {
        this.errores.push(
          "Por favor, completá la cantidad de comensales con información válida."
        );
      }

      if (!this.propinaPais) {
        this.errores.push(
          "Por favor, completá el país en donde está ubicado el restaurante al que fuiste a comer."
        );
      }

      if (!this.calidadMozo) {
        this.errores.push(
          "Por favor, completá este dato cómo estuvo el mozo que te atendió en tu visita."
        );
      }

      if (this.errores.length === 0) {
        nuevoObj = {
          cantidadGasto: parseInt(this.cantidadGasto),
          cantidadComensales: parseInt(this.cantidadComensales),
          idPais: this.propinaPais,
          calidadMozo: this.calidadMozo,
          porcentajePropina: this.obtenerPropinaPorId(this.propinaPais),
          total:
            parseInt(this.cantidadGasto) +
            parseInt(this.cantidadGasto) *
              (this.obtenerPropinaPorId(this.propinaPais) / 100),
          propina:
            parseInt(this.cantidadGasto) *
            (this.obtenerPropinaPorId(this.propinaPais) / 100),
          propinaPorComensal:
            (parseInt(this.cantidadGasto) *
              (this.obtenerPropinaPorId(this.propinaPais) / 100)) /
            parseInt(this.cantidadComensales),
          propinaSugeridaAdicional:
            parseInt(this.cantidadGasto) *
            (this.obtenerPropinaPorId(this.propinaPais) / 100) *
            (this.calidadMozo / 100),
        };

        if (!localStorage.dato) {
          this.arr = [];
        } else {
          this.arr = JSON.parse(localStorage.getItem("dato"));
        }

        this.arr.push(nuevoObj);
        localStorage.setItem("dato", JSON.stringify(this.arr));

        this.cantidadGasto = null;
        this.cantidadComensales = null;
        this.propinaPais = "";
        this.calidadMozo = null;
      }
    },
  },
  mounted: function () {
    this.arr = JSON.parse(localStorage.getItem("dato")) || [];
  },
});

Vue.component("componente-calculosanteriores", {
  data: function () {
    return {
      recupLocalStorage: JSON.parse(localStorage.getItem("dato"))
    }
  },
  template: `
  <section class="container vh-100 mt-5" id="calculos-anteriores" v-if="this.recupLocalStorage !== null">
      <div class="d-flex justify-content-center">
        <div class="row row-cols-auto justify-content-center mt-5">
          <div class="col" v-for="item in recupLocalStorage">
              <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3">
                  <h4 class="my-0 fw-normal">Propina sugerida</h4>
                </div>
                <div class="card-body">
                  <h1 class="card-title pricing-card-title">$ {{item.propina.toFixed()}}</h1>
                    <ul class="list-unstyled mt-3 mb-1">
                      <li>Cada uno de los comensales deben poner $ {{item.propinaPorComensal.toFixed()}}</li>
                      <li>Habitualmente en este país se deja el {{item.porcentajePropina}}% de propina</li>
                      <li>El gasto total es de $ {{item.total}}</li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
  </section>
  <div v-else class="container-fluid d-flex vh-100">
      <div class="mx-auto row align-items-center">
        <h4 class="text-center"> Parece que no realizaste cálculos anteriormente. ¡Andá a nuestra calculadora y hacelo!</h4>
        <router-link class="w-50 mx-auto btn btn-lg btn-success" to="/calculadora">Ir a la calculadora</router-link>
      </div>
  </div>
  `,
});

const home = { template: `<componente-home></componente-home>`, name: "home" };
const info = { template: `<componente-info></componente-info>`, name: "info" };
const calculadora = { template: `<componente-calculadora></componente-calculadora>`, name: "calculadora" };
const calculosanteriores = { template: `<componente-calculosanteriores></componente-calculosanteriores>`, name: "calculosanteriores" };

const routes = [
  { path: '/', component: home },
  { path: '/info', component: info },
  { path: '/calculadora', component: calculadora },
  { path: '/calculos', component: calculosanteriores },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

var app = new Vue({
  el: ".contenedor",
    router
});