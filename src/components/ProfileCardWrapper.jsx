import { BsCheck2Circle } from 'react-icons/bs';
import { RiHashtag } from 'react-icons/ri';
import Spinner from './bootstrap/Spinner';
import { slugify } from './ManipulateData';

const ProfileCardWrapper = (props) => {
  const { card } = props;

  const RenderSaveButton = () => {
    if (card.onSaveClick) {
      if (props.isLoading) {
        return <Spinner />;
      } else {
        return (
          <button
            className='btn btn-aurora btn-sm px-3'
            aria-label='save changes'
            onClick={card.onSaveClick}
          >
            Save
          </button>
        );
      }
    }
    return <></>;
  };

  return (
    <div className={`card my-4 ${card.dangerBorder ? 'border-danger' : ''}`}>
      <div className='card-body'>
        <div className='d-flex justify-content-between'>
          <h3 className='h4 card-title' id={slugify(card.label)}>
            <a href={`#${slugify(card.label)}`}>
              <RiHashtag />
            </a>
            {card.label}
          </h3>
          {props.isSaved === true ? (
            <small className='text-muted'>
              <BsCheck2Circle className='h6 mb-1' /> <span>saved</span>
            </small>
          ) : null}
        </div>
        {card.cardText && <p className='card-text'>{card.cardText}</p>}
        <div className='row'>{card.children}</div>
      </div>
      <div className='card-footer bg-light'>
        <div className='d-flex justify-content-between align-items-center'>
          <p className='m-0 small text-dark'>{card.footerText}</p>
          <RenderSaveButton />
        </div>
      </div>
    </div>
  );
};

ProfileCardWrapper.defaultProps = {
  isSaved: {},
  loading: {},
};

export default ProfileCardWrapper;
