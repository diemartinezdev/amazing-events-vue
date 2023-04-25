const { createApp } = Vue;

createApp({
  data() {
    return {
      urlApi: undefined,
      maxMinPercentage: [],
      upcomingFiltered: undefined,
      pastFiltered: undefined,
    };
  },
  created() {
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
      .then((response) => response.json())
      .then((data) => {
        this.urlApi = data;
        this.upcomingFiltered = this.urlApi.events.filter((event) => event.date > this.urlApi.currentDate);
        this.pastFiltered = this.urlApi.events.filter((event) => event.date < this.urlApi.currentDate);
        let percentageList = this.newPropertyPercentage(this.urlApi);
        this.maxCapacity(this.urlApi.events);
        this.morePercentage(percentageList);
        this.minPercentage(percentageList);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    percentageOfAttendance: function (capacity, aprox) {
      let percentage = (aprox / (capacity / 100)).toFixed(2);
      return percentage;
    },

    newPropertyPercentage: function (data) {
      let list = [];
      let filteredAssistance = data.events.filter((event) => event.assistance);

      for (let i = 0; i < filteredAssistance.length; i++) {
        list.push(filteredAssistance[i]);
        list[i].percentage = this.percentageOfAttendance(
          list[i].capacity,
          list[i].assistance
        );
      }
      return [...list.sort((a, b) => b.percentage - a.percentage)];
      },
    
    revenues: function (price, aprox) {
      let revenue = price * aprox;
      return revenue.toLocaleString();
    },

    morePercentage: function (events2) {
      let sortedMax = [...events2.sort((a, b) => b.percentage - a.percentage)];
      this.maxMinPercentage[0] = {
        name: sortedMax[0].name + " : ",
        percentage: sortedMax[0].percentage,
      };
    },

    minPercentage: function (events2) {
      let sortedMin = [...events2.sort((a, b) => a.percentage - b.percentage)];
      this.maxMinPercentage[1] = {
        name: sortedMin[0].name + " : ",
        percentage: sortedMin[0].percentage,
      };
    },
    maxCapacity: function (events) {
      let maximCapacity = events.sort((a, b) => b.capacity - a.capacity);
      this.maxMinPercentage[2] = {
        name: maximCapacity[0].name + " : ",
        capacity: maximCapacity[0].capacity.toLocaleString() + " people",
      };
    },
  },
}).mount("#app");
