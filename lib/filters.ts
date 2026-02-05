import { Task } from './api';

export interface FilterOptions {
  status?: string;
  priority?: string;
  search?: string;
  category?: string;
  dueDate?: {
    from?: Date;
    to?: Date;
  };
}

export const applyFilters = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter((task) => {
    // Status filter
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    // Category filter
    if (filters.category && task.category !== filters.category) {
      return false;
    }

    // Search filter (title and description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    // Date range filter
    if (filters.dueDate) {
      if (!task.dueDate) {
        return false;
      }

      const taskDate = new Date(task.dueDate);

      if (filters.dueDate.from && taskDate < filters.dueDate.from) {
        return false;
      }

      if (filters.dueDate.to && taskDate > filters.dueDate.to) {
        return false;
      }
    }

    return true;
  });
};

export const sortTasks = (
  tasks: Task[],
  sortBy: 'date' | 'priority' | 'title' = 'date'
): Task[] => {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'priority': {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      sorted.sort(
        (a, b) =>
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
      );
      break;
    }

    case 'title': {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    }

    case 'date':
    default: {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    }
  }

  return sorted;
};

export const getTaskStats = (tasks: Task[]) => {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  };
};
