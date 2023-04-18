const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      pastEvents: [],
      pastEventsFiltered: [],
      searchText: "",
      categories: [],
      categoryEvents: [],
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
          pastEvents = events.filter(
            (item) => item.date < data.currentDate
          );
          this.pastEvents = pastEvents;
          this.pastEventsFiltered = this.pastEvents;
          console.log(pastEvents);
          this.fetchingCategories(pastEvents);
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
    checkboxAndBarFilter() {
      let searchFilter = this.pastEventsFiltered.filter((event) =>
        event.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      if (this.categoryEvents.length > 0) {
        this.pastEvents = searchFilter.filter((event) =>
          this.categoryEvents.includes(event.category)
        );
      } else {
        this.pastEvents = searchFilter;
      }
    },
  },
}).mount("#app");
