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

        var date = new Date(),
            d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();

        //$scope.changeTo = 'Hungarian';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            googleCalendarApiKey: 'AIzaSyDvbmZLQjDm_qrkvpUl1kTTMhDnpokNmrI',
            url: "https://www.google.com/calendar/feeds/qv8rv593gn5g8pumu0bid6bco0%40group.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Bogota', // an option!
            color: 'red'
        };

        /* event source that contains custom events on the scope */
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

        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000,
                e = new Date(end).getTime() / 1000,
                m = new Date(start).getMonth(),
                events = [{
                    title: 'Feed Me ' + m,
                    start: s + (50000),
                    end: s + (100000),
                    allDay: false,
                    className: ['customFeed']
                }];
            callback(events);
        };

        $scope.calEventsExt = {
            color: 'red',
            textColor: 'red',
            events: [
                {
                    type: 'party',
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
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
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };

        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };

        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };

        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
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
/*
        /!* add custom event*!/
        $scope.addEvent = function () {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };*/

        /* remove event */
        $scope.remove = function (index) {
            $scope.events.splice(index, 1);
        };

        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };

        /* Change View */
        $scope.renderCalender = function (calendar) {
            $timeout(function () {
                if (uiCalendarConfig.calendars[calendar]) {
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };

        $scope.select = function (start, end, calendar) {
            var title = prompt('Event Title:');
            if (title) {
                var newEvent = {
                    title: title,
                    start: start,
                    end: end
                };
                uiCalendarConfig.calendars[calendar].fullCalendar('renderEvent', newEvent, true);
            }

        },

        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };

        /* config object */
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
                },

                selectHelper: true,
                eventClick: function (event) {
                    window.open(event.url, 'gcalevent', 'width=700,height=600');
                    return false;
                },
                loading: function (bool) {
                    $('#loading').toggle(bool);
                },


                //  eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                select: $scope.select
            }
        };
/*
        $scope.select = function (start, end) {
            var title = prompt('Hola:');
            if (title) {
                $scope.events.push({
                    title:'Open Sesame',
                    start: start,/!*new Date(y, m, 28)*!/
                    end:end, /!*new Date(y, m, 29)*!/
                    className: ['openSesame']
                });
            }
        };*/

        ///* add custom event*/
        //$scope.addEvent = function () {
        //    $scope.events.push({
        //        title: 'Open Sesame',
        //        start: new Date(y, m, 28),
        //        end: new Date(y, m, 29),
        //        className: ['openSesame']
        //    });
        //};

        // This function is called to change the event source. When
        // ever user selects some source in the UI
        $scope.setEventSource = function (locationId) {
        // remove the event source.
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('removeEventSource', $scope.eventSource);
        // Create the new event source url
            $scope.eventSource = {url: "./api/ev/event/calendarByLocationId?locationId=" + locationId};
        // add the new event source.
            uiCalendarConfig.calendars['myCalendar'].fullCalendar('addEventSource', $scope.eventSource);
        };

            /* event sources array*/
            $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
    }
}());
/* EOF */
