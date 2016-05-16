/**
 * calendarDemoApp - 0.1.3
 */
angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
   .controller('CalendarCtrl', CalendarCtrl);

CalendarCtrl.$inject = [];

function CalendarCtrl() {

   var self = this;
   var date = new Date();
   var m = date.getMonth();
   var d = date.getDate();
   var y = date.getFullYear();

   var calendarId = {calendarId: 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com'};
   var clientId = '1020443454327-r6ev6jep74mtqb1pp9aentg75v1l5j4n.apps.googleusercontent.com';
   var scopes = 'https://www.googleapis.com/auth/calendar';

   checkAuth();
   function checkAuth() {
      gapi.auth.authorize(
         {
            'client_id': clientId,
            'scope': scopes,
            'immediate': true
         }, handleAuthResult);
   }

   function handleAuthResult(authResult) {
      console.log('--- authResult ---');
      console.log(authResult);

      if (authResult && !authResult.error) {
         //makeApiCall();
         loadCalendarApi();
      } else {
         console.log('--- error ---');
         console.log(authResult);
      }
   }


   function loadCalendarApi() {
      gapi.client.load('calendar', 'v3');
   }

  /* /!**
    * Print the summary and start datetime/date of the next ten events in
    * the authorized user's calendar. If no events are found an
    * appropriate message is printed.
    *!/
   function listUpcomingEvents() {
      var request = gapi.client.calendar.events.list({
         'calendarId': 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com',
         'timeMin': (new Date()).toISOString(),
         'showDeleted': false,
         'singleEvents': true,
         'maxResults': 10,
         'orderBy': 'startTime'
      });

      request.execute(function (resp) {
         console.log('--- resp ---');
         console.log(resp);
         var events = resp.items;

         if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
               var event = events[i];
               var when = event.start.dateTime;
               if (!when) {
                  when = event.start.date;
               }

            }
         } else {
            console.log('--- no events ---');
         }
         console.log('--- events ---');
         console.log(events);
         self.events = events;
      });
   }*/


   /*function makeApiCall() {
      // gapi.client.load('calendar', 'v3', function () {


      //var request = gapi.client.calendar.calendarList.list();
      var request = gapi.client.calendar.calendarList.get(calendarId);
      //var request = gapi.client.calendar.calendarList.list();
      request.execute(function (resp) {
         $.each(resp.items, function (key, value) {
            console.log(resp.items[key].id);
         });
      });
      var request1 = gapi.client.calendar.events.list({
         'calendarId': 'primary',
         'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
      });
      request1.execute(function (resp) {
         $.each(resp.items, function (key, value) {
            console.log(resp.items[key].id);// here you give all events from google calendar
         });
      });
      // });
   }*/


   self.changeTo = 'Hungarian';
   /* event source that pulls from google.com */
   self.eventSource = {
      /*      url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
       className: 'gcal-event',           // an option!
       currentTimezone: 'America/Chicago' // an option!*/
      googleCalendarApiKey: 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI',
      googleCalendarId : 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com',
      // US Holidays
      //events: 'usa__en@holiday.calendar.google.com',
      //url: 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com'
   };
   /* event source that contains custom events on the scope */
   /*self.events = [
      {title: 'All Day Event', start: new Date(y, m, 1)},
      {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
      {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
      {id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false},
      {title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false},
      {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
   ];*/
   /* event source that calls a function on every view switch */
   self.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{
         title: 'Feed Me ' + m,
         start: s + (50000),
         end: s + (100000),
         allDay: false,
         className: ['customFeed']
      }];
      callback(events);
   };
   
   self.calEventsExt = {
      color: '#f00',
      textColor: 'yellow',
      events: [
         {type: 'party', title: 'Lunch', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false},
         {
            type: 'party',
            title: 'Lunch 2',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
         },
         {
            type: 'party',
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
         }
      ]
   };
   /* alert on eventClick */
   self.alertOnEventClick = function (event, allDay, jsEvent, view) {
      self.alertMessage = (event.title + ' was clicked ');
   };
   /* alert on Drop */
   self.alertOnDrop = function (event, revertFunc, jsEvent, ui, view) {
      self.alertMessage = ('Event Droped on ' + event.start.format());
   };
   /* alert on Resize */
   self.alertOnResize = function (event, jsEvent, ui, view) {
      self.alertMessage = ('Event end date was moved to ' + event.end.format());
   };
   /* add and removes an event source of choice */
   self.addRemoveEventSource = function (sources, source) {
      var canAdd = 0;
      angular.forEach(sources, function (value, key) {
         if (sources[key] === source) {
            sources.splice(key, 1);
            canAdd = 1;
         }
      });
      if (canAdd === 0) {
         sources.push(source);
      }
   };
   /* add custom event*/
   self.addEvent = function () {
      self.events.push({
         title: 'Open Sesame',
         start: new Date(y, m, 28),
         end: new Date(y, m, 29),
         className: ['openSesame']
      });
   };
   /* remove event */
   self.remove = function (index) {
      self.events.splice(index, 1);
   };
   /* Change View */
   self.changeView = function (view, calendar) {
      calendar.fullCalendar('changeView', view);
   };
   /* Change View */
   self.renderCalender = function (calendar) {
      if (calendar) {
         calendar.fullCalendar('render');
      }
   };
   /* config object */
   self.uiConfig = {


      calendar: {
         //height: 450,
         editable: true,
         header: {
            left: 'title',
            center: '',
            right: 'today prev,next'
         },
         eventClick: self.alertOnEventClick,
         eventDrop: self.alertOnDrop,
         eventResize: self.alertOnResize
      }
   };
   
   self.changeLang = function () {
      if (self.changeTo === 'Hungarian') {
         self.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
         self.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
         self.changeTo = 'English';
      } else {
         self.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
         self.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
         self.changeTo = 'Hungarian';
      }
   };
   /* event sources array*/
   self.eventSources = [self.events, self.eventSource, self.eventsF];
   self.eventSources2 = [self.calEventsExt, self.eventsF, self.events];
}
/* EOF */