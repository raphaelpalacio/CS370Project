function PlayButton(props) {
  return (
    <button {...props}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '5px' }}> {/* Adjust marginLeft as needed */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-12" viewBox="1 1 14 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
      </div>
    </button>
  );
}

export default PlayButton;