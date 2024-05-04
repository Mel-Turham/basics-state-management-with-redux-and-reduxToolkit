import { clearCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';
import { useDispatch } from 'react-redux';

const Modal = () => {
	const dispatch = useDispatch();
	return (
		<aside className='modal-container'>
			<div className='modal'>
				<h4>remove all items from your shopping cart?</h4>
				<div className='btn-container'>
					<button
						type='button'
						className='btn confirm-btn'
						onClick={() => {
							dispatch(closeModal());
							dispatch(clearCart());
						}}
					>
						confirm
					</button>
					<button
						type='button'
						className='btn clear-btn'
						onClick={() => {
							dispatch(closeModal());
						}}
					>
						cancel
					</button>
				</div>
			</div>
		</aside>
	);
};
export default Modal;
