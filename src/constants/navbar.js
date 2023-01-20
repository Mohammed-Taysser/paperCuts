import { BsCart4, BsBookmarkHeart, BsPersonBoundingBox } from 'react-icons/bs';
import { FaBoxes } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { RiCalendarEventFill, RiFilePaper2Line } from 'react-icons/ri';
import { FiPhoneCall, FiUsers } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';

const USER_DROPDOWN_LINK = [
	{
		title: 'setting',
		path: '/profile',
		icon: GrUserSettings,
	},
	{
		title: 'profile',
		path: '/authors',
		icon: BsPersonBoundingBox,
	},
	{
		title: 'cart',
		path: '/cart',
		icon: BsCart4,
	},
	{
		title: 'orders',
		path: '/orders',
		icon: FaBoxes,
	},
	{
		title: 'checkout',
		path: '/checkout',
		icon: IoIosCheckboxOutline,
	},
	{
		title: 'wishlist',
		path: '/wishlist',
		icon: BsBookmarkHeart,
	},
];

const MORE_DROPDOWN_LINK = [
	{
		title: 'category',
		path: '/category',
		icon: BiCategoryAlt,
	},
	{
		title: 'authors',
		path: '/authors',
		icon: FiUsers,
	},
	{
		title: 'events',
		path: '/events',
		icon: RiCalendarEventFill,
	},
	{
		title: 'about us',
		path: '/about-us',
		icon: RiFilePaper2Line,
	},
	{
		title: 'contact us',
		path: '/contact-us',
		icon: FiPhoneCall,
	},
];

export { USER_DROPDOWN_LINK, MORE_DROPDOWN_LINK };
