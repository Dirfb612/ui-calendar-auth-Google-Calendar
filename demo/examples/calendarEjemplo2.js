/**
 * calendarDemoApp - 0.9.0
 */
(function () {
   'use strict';
   
   angular
      .module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
      .controller('CalendarCtrl', CalendarCtrl);
   
   CalendarCtrl.$inject = ['$scope', '$compile', '$timeout', 'uiCalendarConfig'];
   
   function CalendarCtrl($scope, $compile, $timeout, uiCalendarConfig) {
      
      console.log('--- uiCalendarConfig ---');
      console.log(uiCalendarConfig);
      
      var self = this,
         date = new Date(),
         d = date.getDate(),
         m = date.getMonth(),
         y = date.getFullYear();
      
      console.log('--- this---');
      console.log(this);
      
      
      //$scope.changeTo = 'Hungarian';
      /* event source that pulls from google.com */
      self.eventSource = {
         googleCalendarApiKey: 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI',
         url: "https://www.google.com/calendar/feeds/3jga9d7ljn5j54ukbhkbpmimuo%40group.calendar.google.com/public/basic",
         className: 'gcal-event',           // an option!
         currentTimezone: 'America/Bogota', // an option!
         color: 'red'
         
      };
      
      console.log('--- self.eventSource ---');
      console.log(self.eventSource);
      
      
      /* alert on eventClick */
      //with this you can handle the events that generated by droping any event to different position in the calendar
      self.alertOnEventClick = function (date, jsEvent, view, event) {
         self.alertMessage = (date.title + ' was clicked ');
         return false;
      };
      
      /* alert on Drop */
      self.alertOnDrop = function (event, delta, revertFunc) {
         self.alertMessage = ('Evento ' + event.title + 'Movido a ' + event.start.format());
      };
      
      /* Event eventResize */
      //with this you can handle the events that generated by resizing any event to different position in the calendar
      self.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
         self.alertMessage = ('Inicio del evento ' + event.start.format()
         + ' Evento alargado:' + event.end.format());
         if (!confirm("Es correcto?")) {
            revertFunc();
         }
         
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
      
      /* Render Tooltip */
      self.eventRender = function (event, element, view) {
         element.attr({
            'tooltip': event.title,
            'tooltip-append-to-body': true
         });
         $compile(element)($scope);
      };
      
      self.events = [];
      /*Event to add */
      self.addEvent = function (start, end) {
         
         var title = prompt('Event Title:');
         self.events.push({
            title: title,
            start: start,
            end: end,
            className: ['openSesame']
         });
      };
      
      /* remove event */
      self.remove = function (index) {
         self.events.splice(index, 1);
      };
      
      /* Change View */
      self.changeView = function (view, calendar) {
         uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
      };
      
      /* Change View */
      self.renderCalender = function (calendar) {
         $timeout(function () {
            if (uiCalendarConfig.calendars[calendar]) {
               uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
         });
      };
      
      self.events = [
         
         {
            title: 'All Day Event',
            start: new Date(y, m, 1)
         },
         {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2)
         },
         {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d - 3, 16, 0),
            allDay: false
         },
         {
            title: 'All Day Event',
            start: new Date('Thu Oct 17 2015 09:00:00 GMT+0530 (IST)')
         },
         {
            title: 'Long Event',
            start: new Date('Thu Oct 17 2013 10:00:00 GMT+0530 (IST)'),
            end: new Date('Thu Oct 17 2015 17:00:00 GMT+0530 (IST)')
         },
         {
            id: 999,
            title: 'Repeating Event',
            start: new Date('Thu Oct 15 2013 09:00:00 GMT+0530 (IST)'),
            allDay: false
         },
         {
            id: 998,
            title: 'Repeating Event2',
            start: new Date(y, m, d + 15, 16, 0),
            allDay: false
         },
         {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false
         },
         {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
         }
      ];
      console.log('--- events ---');
      console.log(self.events);
      
      /* config object */
      self.uiConfig = {
         calendar: {
            lang: 'es',
            height: 450,
            editable: true,
            
            
            header: {
               left: 'title',
               center: '',
               right: 'today prev,next'
            },
            selectHelper: true,
            selectable: true,
            
            eventClick: self.alertOnEventClick,
            eventDrop: self.alertOnDrop,
            eventResize: self.alertOnResize,
            eventRender: self.eventRender,
            select: self.addEvent
            
            //  eventClick: self.addRemoveEventSource
         }
      };
      
      // adding a every monday and wednesday events:
      uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource',
         function (start, end, callback) {
            // When requested, dynamically generate virtual
            // events for every monday and wednesday.
            self.events = [];
            
            for (var loop = start.getTime();
                 loop <= end.getTime();
                 loop = loop + (24 * 60 * 60 * 1000)) {
               
               var test_date = new Date(loop);
               
               if (test_date.is().monday()) {
                  // we're in Moday, create the event
                  self.events.push({
                     title: 'I hate mondays - Garfield',
                     start: test_date
                  });
               }
               
               if (test_date.is().wednesday()) {
                  // we're in Wednesday, create the Wednesday event
                  self.events.push({
                     title: 'It\'s the middle of the week!',
                     start: test_date
                  });
               }
            } // for loop
            
            // return events generated
            callback(self.events);
         }
      );
      
      // This function is called to change the event source. When
      // ever user selects some source in the UI
      self.setEventSource = function (locationId) {
         // remove the event source.
         uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSource', self.eventSource);
         // Create the new event source url
         self.eventSource = {url: "./api/ev/event/calendarByLocationId?locationId=" + locationId};
         // add the new event source.
         uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', self.eventSource);
      };
      
      /* event sources array*/
      self.eventSources = [self.eventSource, self.events];
      
   }
}());
/* EOF */
