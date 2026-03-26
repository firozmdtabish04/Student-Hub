function Calendar() {
  const today = new Date();

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="font-bold">Calendar</h2>
      <p>{today.toDateString()}</p>
    </div>
  );
}

export default Calendar;
