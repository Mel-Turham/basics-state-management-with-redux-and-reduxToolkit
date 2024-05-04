import { removeItem, increase, decrease } from '../features/cart/cartSlice';
import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';

const CartItem = ({ id, img, title, price, amount }) => {
	const dispatch = useDispatch();
	const handleIncrease = useCallback(
		(id) => {
			dispatch(increase(id));
		},
		[id],
	);
	console.log('cart renter');
	return (
		<article className='cart-item'>
			<img src={img} alt={title} loading='lazy' title={title} />
			<div>
				<h4>{title}</h4>
				<h4 className='item-price'>${price}</h4>
				<button className='remove-btn' onClick={() => dispatch(removeItem(id))}>
					remove
				</button>
			</div>
			<div>
				<button className='amount-btn' onClick={() => handleIncrease(id)}>
					<ChevronUp />
				</button>
				<p className='amount'>{amount}</p>
				<button
					className='amount-btn'
					onClick={() => {
						if (amount === 1) {
							dispatch(removeItem(id));
							return;
						}

						dispatch(decrease(id));
					}}
				>
					<ChevronDown />
				</button>
			</div>
		</article>
	);
};

CartItem.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	img: PropTypes.string,
	price: PropTypes.string,
	amount: PropTypes.number,
};
export default memo(CartItem);
