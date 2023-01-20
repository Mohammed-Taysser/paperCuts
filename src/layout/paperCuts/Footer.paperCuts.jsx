import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';
import favicon from '../../assets/images/icons/favicon.png';
import dottedShape from '../../assets/images/shapes/dotted-shape.svg';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.Sitemap = this.Sitemap.bind(this);
		this.QuickLinks = this.QuickLinks.bind(this);
	}

	renderLinks(arr) {
		return arr.map((link, index) => {
			return (
				<li key={index}>
					<Link to={link.href}>{link.label}</Link>
				</li>
			);
		});
	}

	Sitemap() {
		const links_arr = [
			{ label: 'authors', href: '/authors' },
			{ label: 'events', href: '/events' },
			{ label: 'login', href: '/login' },
			{ label: 'register', href: '/register' },
			{ label: 'checkout', href: '/checkout' },
		];

		return (
			<div className='col-lg-3 col-6 my-3'>
				<div className='widget links mt-3'>
					<h4 className='mb-3 fw-bolder'>sitemap</h4>
					<ul className='list-unstyled'>{this.renderLinks(links_arr)}</ul>
				</div>
			</div>
		);
	}

	QuickLinks() {
		const links_arr = [
			{ label: 'home', href: '/' },
			{ label: 'About Us', href: '/about-us' },
			{ label: 'Contact Us', href: '/contact-us' },
			{ label: 'books', href: '/books' },
			{ label: 'category', href: '/category' },
		];

		return (
			<div className='col-lg-3 col-6 my-3'>
				<div className='widget links mt-3'>
					<h4 className='mb-3 fw-bolder'>quick links</h4>
					<ul className='list-unstyled'>{this.renderLinks(links_arr)}</ul>
				</div>
			</div>
		);
	}

	render() {
		return (
			<footer className='pb-3 pt-5 footer'>
				<div className='shapes'>
					<img className='website-logo' src={favicon} alt='website favicon' />
					<img className='dotted-shape' src={dottedShape} alt='dotted-shape' />
				</div>
				<div className='container pt-3'>
					<div className='row'>
						<div className='col-lg-3 col-md-6 my-3'>
							<div className='widget'>
								<Link className='logo' to='/'>
									<img
										className='img-fluid'
										src={favicon}
										alt='website favicon'
									/>
								</Link>
								<p className='mt-3'>
									paperCuts is a site that lists free eBooks and online books
								</p>
							</div>
						</div>
						<div className='col-lg-3 col-md-6 my-3'>
							<div className='widget mt-3'>
								<h4 className='mb-3 fw-bolder'>contact us</h4>
								<ul className='list-unstyled'>
									<li className='my-2 small'>
										<span className='d-flex align-items-center'>
											<FaMapMarkerAlt className='me-2' /> Ad Daqahliyah, Egypt
										</span>
									</li>
									<li className='my-2 small'>
										<a href='tel:01015081861'>
											<FaPhoneAlt className='me-2' /> 00100100100
										</a>
									</li>
									<li className='my-2 small'>
										<a href='mailto:mohamedtaysser983@gmail.com'>
											<FaRegEnvelope className='me-2' /> paperCuts@info.com
										</a>
									</li>
								</ul>
							</div>
						</div>
						<this.QuickLinks />
						<this.Sitemap />
					</div>
				</div>
				<hr className='' />
				<div className='container'>
					<div className='copyRight py-2'>
						Copyright &copy;
						<span className='mx-1' id='js-current-year'>
							2022 - {new Date().getFullYear()}
						</span>
						<Link to='/'>paperCuts</Link>. All Rights Reserved.
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
