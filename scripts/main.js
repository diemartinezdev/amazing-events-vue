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
      id: "",
      urlParameter: "",
      parameter: "",
      detailCard: "",
    };
  },
  created() {
    this.fetchingData();
  },
  methods: {
    fetchingData() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          events = data.events;
          this.events = events;
          console.log(data);
          this.eventsFiltered = this.events;
          this.fetchingCategories(events);
          // details
          this.urlParameter = location.search;
          this.parameter = new URLSearchParams(this.urlParameter);
          this.id = this.parameter.get("id");
          this.detailCard = this.events.find((event) => event._id == this.id);
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
    // searchFilter() {
    //   this.events = this.eventsFiltered.filter((event) =>
    //     event.name.toLowerCase().includes(this.searchText.toLowerCase())
    //   );
    // },
    // categoryFilter() {
    //   if (this.categoryEvents.length > 0) {
    //     this.events = this.eventsFiltered.filter((event) =>
    //       this.categoryEvents.includes(event.category)
    //     );
    //   } else {
    //     this.events = this.eventsFiltered;
    //   }
    //   },
    checkboxAndBarFilter() {
      let searchFilter = this.eventsFiltered.filter((event) =>
        event.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      if (this.categoryEvents.length > 0) {
        this.events = searchFilter.filter((event) =>
          this.categoryEvents.includes(event.category)
        );
      } else {
        this.events = searchFilter;
      }
    },
  },
}).mount("#app");
