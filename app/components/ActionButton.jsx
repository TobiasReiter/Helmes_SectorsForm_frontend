export default function ActionButton({ onClick, children, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
