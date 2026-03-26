function Card({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="font-bold mb-2 dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

export default Card;
