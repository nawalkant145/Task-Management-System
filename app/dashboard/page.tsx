'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { taskAPI, Task } from '@/lib/api';
import { getTaskStats, sortTasks } from '@/lib/filters';
import { TaskCard } from '@/components/task-card';
import { TaskForm } from '@/components/task-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, LogOut, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const stats = getTaskStats(tasks);

  // Load tasks
  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    loadTasks();
  }, [token, router]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = tasks;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered = sortTasks(filtered, sortBy);

    setFilteredTasks(filtered);
  }, [tasks, statusFilter, priorityFilter, searchQuery, sortBy]);

  const loadTasks = async () => {
    try {
      if (!token) return;
      const data = await taskAPI.getTasks(token, {
        status: statusFilter !== 'all' ? statusFilter : undefined,
        priority: priorityFilter !== 'all' ? priorityFilter : undefined,
        search: searchQuery || undefined,
      });
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: Partial<Task>) => {
    try {
      if (!token) return;
      const newTask = await taskAPI.createTask(token, data as any);
      setTasks([newTask, ...tasks]);
      setFormOpen(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (data: Partial<Task>) => {
    try {
      if (!token || !selectedTask) return;
      const updated = await taskAPI.updateTask(token, selectedTask._id, data);
      setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
      setSelectedTask(undefined);
      setFormOpen(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      if (!token) return;
      await taskAPI.deleteTask(token, id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Task Manager</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, {user?.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-5 border-border bg-card/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
          </Card>
          <Card className="p-5 border-border bg-card/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
            </div>
          </Card>
          <Card className="p-5 border-border bg-card/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
            </div>
          </Card>
          <Card className="p-5 border-border bg-card/50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.highPriority}</p>
            </div>
          </Card>
        </div>

        {/* Top Controls */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button onClick={() => { setSelectedTask(undefined); setFormOpen(true); }} size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create Task
          </Button>
        </div>

        {/* Filters Section */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-4">Filters & Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Search Tasks</label>
              <Input
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sort By</label>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Newest First</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <Card className="p-16 text-center border-border">
              <p className="text-muted-foreground text-lg">No tasks found. Create one to get started!</p>
            </Card>
          ) : (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        open={formOpen}
        task={selectedTask}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        onClose={() => {
          setFormOpen(false);
          setSelectedTask(undefined);
        }}
      />
    </div>
  );
}
