(function () {
   'use strict';

   angular
      .module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
      .controller('CalendarCtrl', CalendarCtrl);

   CalendarCtrl.$inject = ['calendarFactory', '$window'];

   function CalendarCtrl(calendarFactory, $window) {

      var self = this,
      //Global variables to access the calendar
         clientId = 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com',
         scopes = 'https://www.googleapis.com/auth/calendar';

      //Title of module
      self.title = 'Calendario';

      self.events = [];
      self.eventData = [];

      //Start the auth
      checkAuth();

      //authorization in google
      function checkAuth() {
         $window.gapi.auth.authorize(
            {
               'client_id': clientId,
               'scope': scopes,
               'immediate': true
            }, handleAuthResult);
      }

      //checks if authorized
      function handleAuthResult(authResult) {

         if (authResult && !authResult.error) {
            calendarFactory.loadCalendarApi();
         } else {
            handleAuthClick();
         }
      }

      //request credentials
      function handleAuthClick() {
         $window.gapi.auth.authorize(
            {
               client_id: clientId,
               scope: scopes,
               immediate: false
            }, handleAuthResult);
         return false;
      }

      //Start Events
      function addEvent(start, end) {
         var title = prompt('Event Title:');
         self.events.push({
            title: title,
            start: start.format(),
            end: end.format(),
            color: '#51B749',
            allDay: true,
            className: ['openSesame']
         });

         self.eventData = {
            "colorId": 10,
            "summary": title,
            "location": "Somewhere",
            "start": {
               "date": start.format()
            },
            "end": {
               "date": end.format()
            }
         };

         console.log('--- start.format ---');
         console.log(start.format());
         console.log('--- end format ---');
         console.log(start.format());
         //   calendarFactory.makeRpcRequest(self.eventData);

      }

      // config object
      self.uiConfig = {
         calendar: {

            editable: true,
            //Header Calendar
            lang: 'es',
            //width: 1000,
            //height: 700,
            header: {
               left: 'prev,next today',
               center: 'title',
               right: 'agendaDay,agendaWeek,month'
            },
            selectHelper: true,
            selectable: true,

            //Events Calendar
            eventClick: calendarFactory.eventClick,
            eventResize: calendarFactory.alertOnResize,
            //  eventRender: calendarFactory.eventRender,
            select: addEvent
         }
      };

      self.eventSources = [self.events];
   }

}());