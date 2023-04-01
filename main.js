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
    getParams() {
      const title = document.title.split(" ")[0].toLowerCase();
      if (title.includes("past") || title.includes("upcoming")) return "?time=" + title;
      if (title.includes("details")) return "/" + this.extractIdFromUrl();
      if (title.includes("stats")) return "stats";
      return "";
  },
    extractIdFromUrl: () => new URLSearchParams(window.location.search).get("_id"),
        selectEvent() {
            this.contactContent.event = this.events.find((e) => e._id == this.extractIdFromUrl())?.name || "not-selected"; //Si no se encuentra, no se accede a name, y entonces se asigna "not-selected"
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
