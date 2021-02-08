import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';
import { customStyles } from '../../helpers/modal-custom-styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalAction } from '../../actions/uiActions';
import {
   addEventAction,
   clearActiveAction,
   updateEventAction,
} from '../../actions/calendarActions';

// Si estan corriendo los test no se ejecutará
if (process.env.NODE_ENV !== 'test') {
   Modal.setAppElement('#root');
}

let now = moment().minutes(0).seconds(0).add(1, 'hours');
let final = now.clone().add(1, 'hours');
let initialState = {
   title: '',
   notes: '',
   start: now.toDate(),
   end: final.toDate(),
};

const CalendarModal = () => {
   const dispatch = useDispatch();
   const { modalOpen } = useSelector((state) => state.ui);
   const { activeEvent } = useSelector((state) => state.calendar);

   const [dateStart, setDateStart] = useState(now.toDate());
   const [dateEnd, setDateEnd] = useState(final.toDate());
   const [isValid, setIsValid] = useState(false);

   const [formValues, setFormValues] = useState(initialState);
   const { notes, title, start, end } = formValues;

   const handleInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value,
      });
   };

   useEffect(() => {
      if (activeEvent) {
         setFormValues(activeEvent);
      } else {
         setFormValues(initialState);
      }
   }, [activeEvent, setFormValues]);

   const closeModal = () => {
      dispatch(closeModalAction());
      dispatch(clearActiveAction());
   };

   // Cambiamos la fecha al DateTimePicker
   const handleStartDate = (e) => {
      setDateStart(e);
      setFormValues({
         ...formValues,
         start: e,
      });
   };
   const handleFinalizeDate = (e) => {
      setDateEnd(e);
      setFormValues({
         ...formValues,
         end: e,
      });
   };

   const handleSubmitForm = (e) => {
      e.preventDefault();

      let momentStart = moment(start);
      let momentEnd = moment(end);

      if (momentStart.isSameOrAfter(momentEnd)) {
         return Swal.fire(
            'Error',
            'La fecha final debe ser mayor a la fecha inicial',
            'error'
         );
      }

      if (!title.trim()) {
         return setIsValid(true);
      }

      if (activeEvent) {
         dispatch(updateEventAction(formValues));
      } else {
         dispatch(addEventAction(formValues));
      }
      setIsValid(false);
      setFormValues(initialState);
      closeModal();
   };

   return (
      <Modal
         isOpen={modalOpen}
         onRequestClose={closeModal}
         style={customStyles}
         className="modal"
         closeTimeoutMS={200}
         overlayClassName="modal-fondo"
         ariaHideApp={!process.env.NODE_ENV === 'test'}
      >
         <h1> {!activeEvent ? 'Nuevo Evento' : 'Modifica el Evento'} </h1>
         <hr />
         <form className="container" onSubmit={handleSubmitForm}>
            <div className="form-group">
               <label>Fecha y hora inicio</label>
               <DateTimePicker
                  onChange={handleStartDate}
                  value={dateStart}
                  className="form-control"
               />
            </div>

            <div className="form-group">
               <label>Fecha y hora fin</label>
               <DateTimePicker
                  onChange={handleFinalizeDate}
                  value={dateEnd}
                  minDate={dateStart}
                  className="form-control"
               />
            </div>

            <hr />
            <div className="form-group">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${isValid && 'is-invalid'}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={handleInputChange}
               />
               <small id="emailHelp" className="form-text text-muted">
                  Una descripción corta
               </small>
            </div>

            <div className="form-group">
               <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
               ></textarea>
               <small id="emailHelp" className="form-text text-muted">
                  Información adicional
               </small>
            </div>

            <button type="submit" className="btn btn-outline-primary btn-block">
               <i className="far fa-save"></i>
               <span> Guardar</span>
            </button>
         </form>
      </Modal>
   );
};

export default CalendarModal;
