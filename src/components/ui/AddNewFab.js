import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../../actions/uiActions';

const AddNewFab = () => {
   const dispatch = useDispatch();
   const { activeEvent } = useSelector((state) => state.calendar);

   const handleOpenModal = () => dispatch(openModalAction());

   return (
      <button
         className={`btn ${activeEvent ? 'btn-warning' : 'btn-primary'} fab`}
         onClick={handleOpenModal}
      >
         {activeEvent ? (
            <i className="fas fa-edit"></i>
         ) : (
            <i className="fas fa-plus"></i>
         )}
      </button>
   );
};

export default AddNewFab;
