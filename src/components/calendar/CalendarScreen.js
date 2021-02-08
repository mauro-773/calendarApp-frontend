import CalendarModal from './CalendarModal';
import CalendarEvent from './CalendarEvent';
import NavBar from '../ui/NavBar';
import moment from 'moment';
import AddNewFab from '../ui/AddNewFab';

import { useState } from 'react';
import { messages } from '../../helpers/calendar-messages-es';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../../actions/uiActions';
import {
   clearActiveAction,
   loadEventsAction,
   setActiveAction,
} from '../../actions/calendarActions';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DeleteEventFab from '../ui/DeleteEventFab';
import { useEffect } from 'react';

const localizer = momentLocalizer(moment);
moment.locale('es');

const CalendarScreen = () => {
   const dispatch = useDispatch();
   const { events, activeEvent } = useSelector((state) => state.calendar);
   const { uid } = useSelector((state) => state.auth);

   const [lastView, setLastView] = useState(
      localStorage.getItem('lastView') || 'month'
   );

   useEffect(() => {
      dispatch(loadEventsAction());
   }, [dispatch]);

   const onDoubleClick = () => dispatch(openModalAction());
   const onSelectEvent = (event) => dispatch(setActiveAction(event));
   const onSelectSlot = () => dispatch(clearActiveAction());

   const onViewChange = (e) => {
      setLastView(e);
      localStorage.setItem('lastView', e);
   };

   const eventStyleGetter = (event) => {
      let style = {
         backgroundColor: uid === event.user._id ? '#367CF7' : '#465660',
         borderRadius: '0px',
         opacity: 0.8,
         display: 'block',
         color: 'white',
      };

      return {
         style,
      };
   };

   return (
      <div className="calendar-screen">
         <NavBar />
         <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={lastView}
            components={{
               event: CalendarEvent,
            }}
         />
         <AddNewFab />
         {activeEvent && <DeleteEventFab />}
         <CalendarModal />
      </div>
   );
};

export default CalendarScreen;
