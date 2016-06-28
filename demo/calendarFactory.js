(function () {
   'use strict';

   angular
      .module('calendarDemoApp')
      .factory('calendarFactory', calendarFactory);

   calendarFactory.$inject = ['uiCalendarConfig'];

   function calendarFactory(uiCalendarConfig) {

      //Global variables to access the calendar
      var requestList,
         calendarId = 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com',
         apiKey = 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI',
         eventsList = [],
         url,
         request;

      self.events = [];

      return {

         loadCalendarApi: loadCalendarApi,
         makeApiCall: makeApiCall,
         makeRpcRequest: makeRpcRequest

      };

      function loadCalendarApi() {
         gapi.client.load('calendar', 'v3', makeApiCall);
      }


      function makeApiCall(start, end) {
         
         console.log('--- start ---');
         console.log(start);
         console.log('--- end ---');
         console.log(end);
         //insert into calendar

         requestList = gapi.client.calendar.events.list({
            'key': apiKey,
            'calendarId': calendarId,
            //'timeMin': (new Date()).toISOString(),
           // 'timeMax': (new Date()).toISOString(),
            //'showDeleted': false,
            'singleEvents': true,
            'maxResults': 9999,
            'orderBy': 'startTime'
         });

         console.log('--- eventsList ---');
         console.log(eventsList);
         //uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSource', eventsList);

         eventsList = [];
         // Step 6: Execute the API request
         requestList
            .then(function (resp) {

               if (resp.result.error) {

                  reportError('Google Calendar API: ' + data.error.message, data.error.errors);

               } else if (resp.result.items) {

                  console.log('--- resp.result.items what?? ---');
                  console.log(resp.result);


                  resp.result.items.forEach(function (entry, index) {
                     var color;

                     if (entry.colorId == 9) {
                        color = "#5484ED";
                     } else if (entry.colorId == 10) {
                        color = "#51B749";
                     }

                     eventsList.push({
                        color: color,
                        id: entry.id,
                        title: entry.summary,
                        start: entry.start.dateTime || entry.start.date, // try timed. will fall back to all-day
                        end: entry.end.dateTime || entry.end.date, // same
                        url: url,
                        location: entry.location,
                        description: entry.description
                     });
                  });

               }
               console.log('--- eventsList ---');
               console.log(eventsList);

               if (eventsList.length > 0) {
                  uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', eventsList, true);
                  // getEventList(eventsList);
                  // loadCalendarColors();
               }

            }, function (reason) {
               console.log('Error: ' + reason.result.error.message);
            });
      }

      function makeRpcRequest(eventData) {

         gapi
            .client
            .load('calendar', 'v3')
            .then(function () {
               request = gapi.client.calendar.events.insert({
                  'calendarId': calendarId,
                  'resource': eventData
               });

               request.then(function (resp) {

                  if (resp.result.error) {
                     reportError('Google Calendar API: ' + data.error.message, data.error.errors);
                  } else {

                     //makeApiCall();
                     console.log(resp);
                     var creator = resp.result.creator.email;
                     var calendarEntry = resp.result.htmlLink;

                     console.log('--- Calendar entry successfully created by---');
                     console.log(creator);
                     console.log('--- dd ---');
                     console.log(calendarEntry);
                  }
               }, function (reason) {
                  console.log('Error: ' + reason.result.error.message);

               });
            });
      }

   }

}());


