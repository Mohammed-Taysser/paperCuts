import React from 'react';

function SingleMember(props) {
  const { member } = props;

  const rounded_svg = () => {
    return (
      <svg>
        <path d='M221.5,57.7c-9.5-11.2-21.5-20-33.7-28.2C172.3,19,156.1,9,138.1,3.8C101-6.8,58.8,5.4,32,33.1 C5.2,60.8-5.6,102.5,2.8,140.1c8.5,37.6,35.5,70.2,70.2,87c10,4.8,20.8,8.5,31.9,9.2c20.4,1.3,40.2-7.4,57.2-18.7 C212.8,184.1,269.8,114.7,221.5,57.7z'></path>
      </svg>
    );
  };

  const line_svg = () => {
    return (
      <svg>
        <path d='M0.2,14.6C13.5,9.4,27,4.4,41.2,2s29-2.2,42.4,2.9c10.2,3.8,19.2,10.2,28.7,15.4s20.2,9.4,31,8.3 c8.7-0.9,16.7-5.2,25.2-7.2c8.7-2,17.8-1.6,26.4-3.7c4.5-1.1,8.8-2.8,13.1-4.5c6.8-2.7,13.6-5.4,20.4-8.1c5.3-2.1,11.3-4.2,16.6-2'></path>
      </svg>
    );
  };

  const plus_shape = () => {
    return (
      <>
        <span className='animate-plus'>+</span>
        <span className='animate-plus'>+</span>
        <span className='animate-plus'>+</span>
        <span className='animate-plus'>+</span>
        <span className='animate-plus'>+</span>
      </>
    );
  };

  return (
    <div className='col-md-6 col-lg-3 my-3'>
      <div className='single-member-wrapper'>
        <div className='member-image-container'>
          <img
            src={member.avatar}
            className='member-image'
            alt={member.name}
            width='200'
            height='200'
          />
          <div className='rounded-shape'>{rounded_svg()}</div>
          <div className='line-shape'>{line_svg()}</div>
          <div className='plus-shape'>{plus_shape()}</div>
          <div className='member-signature'>
            <img
              src={member.signature}
              alt='username signature'
              width={120}
              height={50}
            />
          </div>
        </div>
        <div className='member-info'>
          <h6 className='member-position'>{member.position}</h6>
          <h4 className='member-name text-aurora'>{member.name}</h4>
        </div>
      </div>
    </div>
  );
}

SingleMember.defaultProps = {
  name: 'member name',
  position: 'position',
  signature:
    'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/signatures/signature-2.png',
  avatar:
    'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-2.png',
};

export default SingleMember;
