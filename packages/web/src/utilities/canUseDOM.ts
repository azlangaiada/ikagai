// Checks if the window object is available to determine if the code is running in a browser environment
export default !!(typeof window !== 'undefined' && window.document && window.document.createElement)
