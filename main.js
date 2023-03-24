const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      eventsFiltered: [],
      searchText: "",
      categories: [],
      categoryEvents: [],
    };
  },
  created() {
    this.fetchingData();
  },
  mounted() {},
  methods: {
    fetchingData() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          events = data.events;
          this.events = events;
          console.log(events);
          this.eventsFiltered = this.events;
          this.fetchingCategories(events);
        })
        .catch((error) => console.log(error.message));
    },
    fetchingCategories(array) {
      array.forEach((element) => {
        if (!this.categories.includes(element.category)) {
          this.categories.push(element.category);
        }
      });
    },
  },
  computed: {
    searchFilter() {
      this.events = this.eventsFiltered.filter((event) =>
        event.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    categoryFilter() {
      if (this.categoryEvents.length > 0) {
        this.events = this.eventsFiltered.filter((event) =>
          this.categoryEvents.includes(event.category)
        );
      } else {
        this.events = this.eventsFiltered;
      }
    },
  },
}).mount("#app");
