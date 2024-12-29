import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RecentTasks = () => {
  // Tasks data
  const tasks = [
    {
      id: "Task-001",
      title: "Update marketing campaign assets",
      dueDate: "January 5, 2025",
      status: "In Progress",
      priority: "High",
      assigneeTo: "JD",
    },
    {
      id: "Task-002",
      title: "Prepare quarterly financial reports",
      dueDate: "February 15, 2025",
      status: "Done",
      priority: "Medium",
      assigneeTo: "AL",
    },
    {
      id: "Task-003",
      title: "Fix UI bugs in the dashboard",
      dueDate: "March 10, 2025",
      status: "Todo",
      priority: "Urgent",
      assigneeTo: "RK",
    },
    {
      id: "Task-004",
      title: "Draft proposal for new project",
      dueDate: "April 22, 2025",
      status: "In Review",
      priority: "Low",
      assigneeTo: "ML",
    },
    {
      id: "Task-005",
      title: "Conduct team performance reviews",
      dueDate: "May 1, 2025",
      status: "Todo",
      priority: "High",
      assigneeTo: "SG",
    },
  ];

  // Scalable component
  return (
    <div className="flex flex-col space-y-6">
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            {/* Task Info */}
            <div className="flex flex-col space-y-1 flex-grow">
              <span className="text-sm text-gray-600 font-medium">
                {task.id}
              </span>
              <p className="text-md font-semibold text-gray-800 truncate">
                {task.title}
              </p>
              <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
            </div>

            {/* Task Status */}
            <div className="text-sm font-medium ">
              <span
                className={`px-2 py-1 rounded ${
                  task.status === "Done"
                    ? "bg-green-100 text-green-600"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : task.status === "In Review"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {task.status}
              </span>
            </div>

            {/* Task Priority */}
            <div className="text-sm ml-2">
              <span
                className={`px-2 py-1 rounded ${
                  task.priority === "Critical"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "High"
                    ? "bg-orange-100 text-orange-600"
                    : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* Assignee */}
            <div className="flex items-center space-x-2 ml-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={`/avatars/${task.assigneeTo.toLowerCase()}.png`}
                  alt={task.assigneeTo}
                />
                <AvatarFallback>{task.assigneeTo}</AvatarFallback>
              </Avatar>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTasks;

// const RecentTasks = () => {
//   const tasks = [
//     {
//       id: "Task-12",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-13",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-14",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-15",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//     {
//       id: "Task-16",
//       title: "You can't compress the program without quanti",
//       date: "December 29, 2024",
//       assigneeTo: "EM",
//     },
//   ];
//   return (
//     <div className="flex flex-col pt-2">
//       <ul role="list" className="space-y-2">
//         {tasks.map((item, index) => (
//           <li
//             key={index}
//             role="listitem"
//             className="shadow-none border-0 py-2 hover:bg-[#fbfbfb] transition-colors ease-in-out "
//           >
//             <div className="grid grid-cols-7 gap-1 p-0">
//               <div className="shrink">
//                 <p>{item.id}</p>
//               </div>
//               <div className="col-span-2">
//                 <p className="text-sm font-medium leading-none">{item.title}</p>
//               </div>
//               <div>dueDate</div>
//               <div>Todo</div>
//               <div>High</div>
//               <div className="flex items-center gap-4 place-self-end">
//                 <span className="text-sm text-gray-500">Assigned To</span>
//                 <Avatar className="hidden h-9 w-9 sm:flex">
//                   <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                   <AvatarFallback>{item.assigneeTo}</AvatarFallback>
//                 </Avatar>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RecentTasks;
