import { applyFilters, sortTasks, getTaskStats, FilterOptions } from '../lib/filters';
import { Task } from '../lib/api';

const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-12-31',
    category: 'work',
    userId: 'user1',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    _id: '2',
    title: 'Task 2',
    description: 'Description 2',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2024-12-25',
    category: 'personal',
    userId: 'user1',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
  {
    _id: '3',
    title: 'Task 3',
    description: 'Description 3',
    status: 'completed',
    priority: 'low',
    dueDate: '2024-12-20',
    category: 'work',
    userId: 'user1',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
  },
];

describe('Filters', () => {
  describe('applyFilters', () => {
    it('should filter by status', () => {
      const filters: FilterOptions = { status: 'todo' };
      const result = applyFilters(mockTasks, filters);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe('1');
    });

    it('should filter by priority', () => {
      const filters: FilterOptions = { priority: 'high' };
      const result = applyFilters(mockTasks, filters);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe('1');
    });

    it('should filter by search term', () => {
      const filters: FilterOptions = { search: 'Task 2' };
      const result = applyFilters(mockTasks, filters);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe('2');
    });

    it('should apply multiple filters', () => {
      const filters: FilterOptions = { status: 'todo', priority: 'high' };
      const result = applyFilters(mockTasks, filters);

      expect(result).toHaveLength(1);
      expect(result[0]._id).toBe('1');
    });

    it('should return all tasks when no filters applied', () => {
      const result = applyFilters(mockTasks, {});
      expect(result).toHaveLength(3);
    });
  });

  describe('sortTasks', () => {
    it('should sort by date', () => {
      const result = sortTasks(mockTasks, 'date');
      expect(result[0]._id).toBe('3');
      expect(result[1]._id).toBe('2');
    });

    it('should sort by priority', () => {
      const result = sortTasks(mockTasks, 'priority');
      expect(result[0]._id).toBe('1'); // high
      expect(result[1]._id).toBe('2'); // medium
      expect(result[2]._id).toBe('3'); // low
    });

    it('should sort by title', () => {
      const result = sortTasks(mockTasks, 'title');
      expect(result[0].title).toBe('Task 1');
      expect(result[1].title).toBe('Task 2');
      expect(result[2].title).toBe('Task 3');
    });
  });

  describe('getTaskStats', () => {
    it('should return correct statistics', () => {
      const stats = getTaskStats(mockTasks);

      expect(stats.total).toBe(3);
      expect(stats.completed).toBe(1);
      expect(stats.inProgress).toBe(1);
      expect(stats.todo).toBe(1);
      expect(stats.highPriority).toBe(1);
    });
  });
});
