function BackButton(props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

    <button {...props} className={'with-text'} style={{ padding: '8px 16px', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="6 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
      </svg>
      <span style={{ fontSize: '20px', lineHeight: '1.2', verticalAlign: 'middle' }}>Back</span>
    </button>
    </div>
  );
}

export default BackButton;