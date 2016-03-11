(function () {
   'use strict';

   angular
      .module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
      .controller('CalendarCtrl', CalendarCtrl);

   CalendarCtrl.$inject = ['calendarFactory'];

   function CalendarCtrl(calendarFactory) {

      var self = this,
      //Global variables to access the calendar
         clientId = '1020443454327-r6ev6jep74mtqb1pp9aentg75v1l5j4n.apps.googleusercontent.com',
         scopes = 'https://www.googleapis.com/auth/calendar',
         apiKey = 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI';

      //Title of module
      self.title = 'Calendario';

      self.events = [];
      self.eventData = [];

      //Start the auth
<<<<<<< HEAD
      //checkAuth();
=======
      handleClientLoad();

      function handleClientLoad() {
         gapi.client.setApiKey(apiKey);
         window.setTimeout(checkAuth, 1);

      }
>>>>>>> test

      //authorization in google
      function checkAuth() {
         gapi.auth.authorize(
            {
               'client_id': clientId,
               'scope': scopes,
               'immediate': true
            }, handleAuthResult);
      }

      //checks if authorized
      function handleAuthResult(authResult) {

         if (authResult && !authResult.error) {
            console.log('--- loadCalendar ---');
            console.log(authResult);
            calendarFactory.loadCalendarApi();

         } else {
            console.log('--- authResult ---');
            console.log(authResult);
         }
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
<<<<<<< HEAD

         console.log('--- start.format ---');
         console.log(start.format());
         console.log('--- end format ---');
         console.log(start.format());
      //   calendarFactory.makeRpcRequest(self.eventData);
=======
         calendarFactory.makeRpcRequest(self.eventData);
         console.log('--- entro tarea ---');
         console.log(self.eventData);
>>>>>>> test

      }

      // config object
      self.uiConfig = {
         calendar: {

            editable: true,
            //Header Calendar
            lang: 'es',
            width: 1000,
            height: 700,
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

<<<<<<< HEAD
=======

>>>>>>> test
      self.eventSources = [self.events];
   }

}());