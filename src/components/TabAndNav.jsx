import React from 'react';
import 'bootstrap/js/src/tab';

function TabAndNav(props) {
  const { currentBook } = props;

  const Navs = () => {
    return (
      <ul
        className='nav nav-pills justify-content-center'
        id='additional-details-tabs'
        role='tablist'
      >
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='description-tap'
            data-bs-toggle='pill'
            data-bs-target='#description-container'
            type='button'
            role='tab'
            aria-controls='description-container'
            aria-selected='true'
          >
            Description
          </button>
        </li>

        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='additional-info-tap'
            data-bs-toggle='pill'
            data-bs-target='#additional-info-container'
            type='button'
            role='tab'
            aria-controls='additional-info-container'
            aria-selected='true'
          >
            Additional Information
          </button>
        </li>
      </ul>
    );
  };

  const TableTap = () => {
    return (
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <tbody>
            {currentBook.pages && (
              <tr>
                <th scope='row'>pages</th>
                <td>{currentBook.pages}</td>
              </tr>
            )}
            {currentBook.language && (
              <tr>
                <th scope='row'>language</th>
                <td>{currentBook.language}</td>
              </tr>
            )}
            {currentBook.pdfSize && (
              <tr>
                <th scope='row'>pdf Size</th>
                <td>{currentBook.pdfSize}MB</td>
              </tr>
            )}
            {currentBook.publishAt && (
              <tr>
                <th scope='row'>publish date</th>
                <td>{currentBook.publishAt}</td>
              </tr>
            )}
            {currentBook.types && (
              <tr>
                <th scope='row'>types</th>
                <td>{currentBook.types.join(' , ')}</td>
              </tr>
            )}
            {!currentBook.pages &&
              !currentBook.language &&
              !currentBook.pdfSize &&
              !currentBook.publishAt &&
              !currentBook.types && (
                <tr>
                  <td colSpan={2}>no data provide</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    );
  };

  const NavsContent = () => {
    return (
      <div className='tab-content' id='additional-details-tabsContent'>
        <div
          className='tab-pane fade active show'
          id='description-container'
          role='tabpanel'
          aria-labelledby='description-tap'
        >
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='content p-1 mt-3'>
                <p className='text-muted m-0'>
                  {currentBook.extraInfo
                    ? currentBook.extraInfo
                    : 'no extra info provide'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='additional-info-container'
          role='tabpanel'
          aria-labelledby='additional-info-tap'
        >
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='content p-1 mt-3'>
                <TableTap />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='additional-details my-5'>
      <Navs />
      <NavsContent />
    </div>
  );
}

TabAndNav.defaultProps = {
  reviews_ref: React.createRef(),
};

export default TabAndNav;
