// past events
// this.pastEvents = this.events.filter((item) => item.date < data.currentDate);
// this.filterPastEvents = [...this.pastEvents];
// this.pastCategories = [
//   ...new Set(this.pastEvents.map((element) => element.category)),
// ];

const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      events: [],
      pastEvents: [],
      searchText: "",
      categories: [],
      categoryEvents: [],
      searchText: "",
      filterEvents: [],
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
          this.pastEvents = this.events.filter(
            (item) => item.date < data.currentDate
          );
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
      let searchFilter = this.pastEvents.filter((event) =>
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
