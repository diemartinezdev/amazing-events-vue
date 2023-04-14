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