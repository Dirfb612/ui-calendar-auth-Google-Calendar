/**
 * calendarDemoApp - 0.1.3
 */
angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap'])
   .controller('CalendarCtrl', CalendarCtrl);

CalendarCtrl.$inject = [];

function CalendarCtrl() {

   var self = this;

   self.eventSource = {
      googleCalendarApiKey: 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI',
      googleCalendarId: 'm8lu1jllnie840ei5lhlihr1tc@group.calendar.google.com'

   };

   /* config object */
   self.uiConfig = {

      calendar: {
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

   /* event sources array*/
   self.eventSources = [self.eventSource];
}
/* EOF */