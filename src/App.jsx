import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

const App = () => {
	const { isOpen } = useSelector((store) => store.modal);
	const dispatch = useDispatch();
	const { cart, isLoading , isError} = useSelector((store) => store.cart);

	useEffect(() => {
		dispatch(calculateTotal());
	}, [cart]);

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	if (isLoading) {
		return (
			<div className='loading'>
				<h1>Loading...</h1>
			</div>
		);
	}

	if(isError){
		return(
			<div className="loading">
				<h1>Something went wrong please try again!</h1>
			</div>
		)
	}

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	);
};
export default App;
