import { useDispatch } from 'react-redux';
import { deleteEventAction } from '../../actions/calendarActions';

const DeleteEventFab = () => {
   const dispatch = useDispatch();

   const handleDeleteEvent = () => {
      dispatch(deleteEventAction());
   };

   return (
      <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
         <i className="fas fa-trash"></i>
         <span> Borrar Evento</span>
      </button>
   );
};

export default DeleteEventFab;
