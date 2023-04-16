// past events
this.pastEvents = this.events.filter(
    (item) => item.date < data.currentDate
  );
  this.filterPastEvents = [...this.pastEvents];
  this.pastCategories = [
    ...new Set(this.pastEvents.map((element) => element.category)),
  ];
  // upcoming events
  this.upcomingEvents = this.events.filter(
    (item) => item.date > data.currentDate
  );
  this.filterUpcomingEvents = [...this.upcomingEvents];
  this.upcomingCategories = [
    ...new Set(this.upcomingEvents.map((element) => element.category)),
];
  
const {createApp} = Vue;

createApp({
  data(){
    return{
      urlApi: "https://mindhub-xj03.onrender.com/api/amazing",
      categories: [],
      checked:[],
      valueOfSearch:"",
      filterEvents:[]
    }
  },
  created() {
    this.fetchingData();
    // fetch('https://mindhub-xj03.onrender.com/api/amazing')
    //   .then(res => res.json())
    //   .then(res =>{
    //     this.apiInfo = res.events.filter(item => item.date < res.currentDate)
    //     this.filterEvents =[...this.apiInfo] 
    //     this.categories = [ ...new Set( this.apiInfo.map( element => element.category ) ) ]
    //   }
        
        
    //   ).catch(err=>console.log(err))
  }, 
  methods: {
    fetchingData() {
      fetch(this.urlApi)
        .then((response) => response.json())
        .then((data) => {
          events = data.events;
          this.pastEvents = this.events.filter((item) => item.date < data.currentDate);
          this.filterPastEvents = [...this.pastEvents];
          this.pastCategories = [...new Set(this.pastEvents.map((element) => element.category)),
          ];
        }
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
  //   crossFilter: function(){
  //     let filterBySearch = this.apiInfo.filter( event => event.name.toLowerCase().includes( this.valueOfSearch.toLowerCase()))
  //     if( this.checked.length === 0 ){
  //         this.filterEvents = filterBySearch
  //     }else{
  //         let filterByCheck = filterBySearch.filter( event => this.checked.includes( event.category ))
  //         this.filterEvents = filterByCheck 
  // } 
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
  }
}).mount("#app")