import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const { amount } = useSelector((store) => store.cart);
	console.log('Nav bar re-render');
	return (
		<nav>
			<div className='nav-center'>
				<h3>Redux toolkit</h3>
				<div className='nav-container'>
					<div className='nav-container'>
						<CartIcon />
						<div className='amount-container'>
							<p className='amount'>{amount}</p>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
