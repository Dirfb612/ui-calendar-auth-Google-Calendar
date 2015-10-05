/**
 * calendarDemoApp - 0.9.0
 */
(function () {
   'use strict';

   angular
      .module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
      .controller('CalendarCtrl', CalendarCtrl);

   CalendarCtrl.$inject = ['$scope', '$compile', '$timeout', 'uiCalendarConfig'];

   function CalendarCtrl($scope, $compile, $timeout, uiCalendarConfig, $log) {

      var date = new Date(),
         d = date.getDate(),
         m = date.getMonth(),
         y = date.getFullYear(),
         eventsList = [],
         url;
      var eventsSour = [];


      var apiKey = 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI';
      var clientId = '1020443454327-r6ev6jep74mtqb1pp9aentg75v1l5j4n.apps.googleusercontent.com';
      var scopes = 'https://www.googleapis.com/auth/calendar';



      function handleAuthResult(authResult) {
         console.log(authResult);
         var authorizeButton = document.getElementById('authorize-button');
         if (authResult && !authResult.error) {
            // authorizeButton.style.visibility = 'hidden';
            var returnEvent = makeApiCall();

            console.log('--- returnEvent ---');
            console.log(returnEvent);
         } else {
            authorizeButton.style.visibility = '';
            authorizeButton.onclick = handleAuthClick;
         }
      }

      $scope.handleAuthClick = function (event) {
         gapi.auth.authorize(
            {
               client_id: clientId,
               scope: scopes,
               immediate: false
            }, handleAuthResult);
         return false;
      };

      function makeApiCall() {

         gapi.client.load('calendar', 'v3', function () {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function (resp) {
               $.each(resp.items, function (key, value) {
                  console.log(resp.items[key].id);
               });
            });
            var request1 = gapi.client.calendar.events.list({
               'calendarId': 'qv8rv593gn5g8pumu0bid6bco0@group.calendar.google.com'
            });
            request1.execute(function (resp) {
               $.each(resp.items, function (key, value) {
                  url = value.htmlLink;

                  eventsList.push({
                     id: value.id,
                     title: value.summary,
                     start: value.start.dateTime || value.start.date, // try timed. will fall back to all-day
                     end: value.end.dateTime || value.end.date, // same
                     url: url,
                     location: value.location,
                     description: value.description
                  });

               });

               getEventList(eventsList);
               // console.log(resp.items[key].id);// here you give all events from google calendar

            });

         });
      }

      $scope.events = [

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
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d + 4, 16, 0),
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

      $scope.uiConfig = {
         calendar: {
            lang: 'es',
            height: 450,
            editable: true,
            selectable: true,

            header: {
               left: 'title',
               center: '',
               right: 'today prev,next'
            }
         }
      };



      function eventSources(eventsList) {
         console.log('--- entro ---');
         console.log(eventsList);

         eventsSour = [$scope.events, eventsList];

         console.log('---  eventsSour dddds---');
         console.log(eventsSour);

         //init();
      }

     // $scope.eventSources =  [$scope.events];

      //  $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
   }
}());
/* EOF */
