import React from 'react';
import AwardsImage from '../../assets/images/background/awards.png';
import SkewedShape from '../../assets/images/shapes//skewed-shape.png';
import Client1 from '../../assets/images/icons/sponsors/sponsor-1.png';
import Client2 from '../../assets/images/icons/sponsors/sponsor-2.png';
import Client3 from '../../assets/images/icons/sponsors/sponsor-3.png';

function Awards() {
	return (
		<section className='awards-section my-5 py-5'>
			<div className='container'>
				<div className='row justify-content-between'>
					<div className='col-md-6 my-3'>
						<div className='writer-container'>
							<img src={AwardsImage} alt='awards' className='img-fluid' />
						</div>
					</div>
					<div className='col-md-6 my-3'>
						<img
							src={SkewedShape}
							alt='skewed-shape'
							className='img-fluid d-block ms-auto mb-4'
							width={220}
							height={55}
						/>
						<small className='special-small-title'>writhers</small>
						<h3 className='mb-3'>Awards & nominations</h3>
						<p className='text-muted'>
							This open access wide-ranging collation of papers examines a host
							of issues in studying immigrant.
						</p>
						<div className='clients mt-4'>
							<img
								src={Client1}
								alt='client-1'
								width={75}
								height={75}
								className='img-fluid me-3'
							/>
							<img
								src={Client2}
								alt='client-2'
								width={75}
								height={75}
								className='img-fluid mx-3'
							/>
							<img
								src={Client3}
								alt='client-3'
								width={75}
								height={75}
								className='img-fluid ms-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Awards;
