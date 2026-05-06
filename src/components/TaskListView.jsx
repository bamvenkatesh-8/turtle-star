import TaskCard from './TaskCard'

export default function TaskListView({ tasks, completedIds, onToggle, theme }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          completed={completedIds.includes(task.id)}
          onToggle={onToggle}
          theme={theme}
          compact
        />
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <div className="text-5xl mb-3">📋</div>
          <p className="font-medium">No tasks yet. Add some in Settings.</p>
        </div>
      )}
    </div>
  )
}
