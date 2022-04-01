import { useEffect } from 'react';

/**
 * hook for change page title
 * @param {String} title page title
 * @returns {Array} [title, setTitle]
 */
function usePageTitle(title = 'title 🎉') {
  useEffect(() => {
    let oldTitle = document.title;

    setPageTitle(title);

    return () => {
      setPageTitle(oldTitle);
    };
  }, [title]);

  const setPageTitle = (newPageTitle) => {
    document.title = `paperCuts | ${newPageTitle}`;
  };

  return [title, setPageTitle];
}
export default usePageTitle;
