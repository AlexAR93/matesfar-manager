import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent, isLoadingEvents } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/eventos/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            } 
    
            // Creando
            const { data } = await calendarApi.post('/eventos', calendarEvent );
            
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.savedEvent.id, user }) );

        } catch (error) {
            console.error(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

       
        
    }

    const startDeletingEvent = async() => {
        // Todo: Llegar al backend
        try {
            await calendarApi.delete(`/eventos/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.error(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingEvents = async() => {
        try {      
            const { data } = await calendarApi.get('/eventos');
            const events = convertEventsToDateEvents( data.events );
            dispatch( onLoadEvents( events ) );

        } catch (error) {
          console.error('Error cargando eventos'+error);
        }
    }
    


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        isLoadingEvents,
        //* Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}