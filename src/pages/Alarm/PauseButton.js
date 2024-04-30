function PauseButton(props) {
  return (
    <button {...props}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '20px' }}> {/* Adjust marginLeft as needed */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-8" viewBox="2 5 20 15" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      </div>
    </button>
  );
}

export default PauseButton;

