const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      upcomingEvents: [],
      upcomingEventsFiltered: [],
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
          upcomingEvents = events.filter(
            (item) => item.date > data.currentDate
          );
          this.upcomingEvents = upcomingEvents;
          this.upcomingEventsFiltered = this.upcomingEvents;
          this.fetchingCategories(upcomingEvents);
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
      let searchFilter = this.upcomingEventsFiltered.filter((event) =>
        event.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      if (this.categoryEvents.length > 0) {
        this.upcomingEvents = searchFilter.filter((event) =>
          this.categoryEvents.includes(event.category)
        );
      } else {
        this.upcomingEvents = searchFilter;
      }
    },
  },
}).mount("#app");
