const { createApp } = Vue;

createApp({
  data() {
    return {
        urlApi: "",
        events: [],
      _id: "",
      urlParameter: "",
      parameter: undefined,
      detailCard: undefined,
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((response) => response.json())
      .then((data) => {
          this.urlApi = data.events;
          this.events = events;
        this.urlParameter = location.search;
        this.parameter = new URLSearchParams(this.urlParameter);
        this._id = this.parameter.get("_id");
        this.detailCard = this.urlApi.find((event) => event._id == this._id);
      })

      .catch((error) => console.log(error.message));
  },
  methods: {},
}).mount("#app");
