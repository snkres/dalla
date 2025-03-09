export function GoalsSection({ goals }: { goals: string[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-medium text-gray-800">Company Goals</h3>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="rounded-xl bg-[#BEDDF1]/10 p-4 transition-colors duration-200 hover:bg-[#BEDDF1]/15"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#BEDDF1]/30">
                <GoalIcon goal={goal} />
              </div>
              <h4 className="mb-1 text-xs font-medium text-gray-800">{goal}</h4>
              <p className="text-xs text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GoalIcon({ goal }: { goal: string }) {
  const iconClass = 'h-4 w-4 text-[#3A97A0]'

  switch (goal.toLowerCase()) {
    case 'innovation':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M12 2v6"></path>
          <path d="M12 22v-6"></path>
          <path d="M4.93 4.93l4.24 4.24"></path>
          <path d="M14.83 14.83l4.24 4.24"></path>
          <path d="M2 12h6"></path>
          <path d="M22 12h-6"></path>
          <path d="M4.93 19.07l4.24-4.24"></path>
          <path d="M14.83 9.17l4.24-4.24"></path>
        </svg>
      )
    case 'customer satisfaction':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      )
    case 'digital transformation':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      )
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
  }
}
