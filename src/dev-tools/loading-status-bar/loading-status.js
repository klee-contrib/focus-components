export default function LoadingStatus() {
  return (
      <div data-focus='loading-status'>
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
        <div className='content'>{'Loading'}</div>
      </div>
  );
}
