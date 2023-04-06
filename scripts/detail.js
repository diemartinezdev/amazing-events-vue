const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: undefined,
      id: undefined,
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
        this.urlParameter = location.search;
        this.parameter = new URLSearchParams(this.urlParameter);
        this.id = this.parameter.get("id");
        this.detailCard = this.urlApi.find((event) => event._id == this.id);
        console.log(detailCard);
      })

      .catch((error) => console.log(error.message));
  },
  methods: {},
}).mount("#app");
