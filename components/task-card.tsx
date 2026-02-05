'use client';

import { Task } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'todo':
        return 'To Do';
      default:
        return status;
    }
  };

  return (
    <Card className="p-5 bg-card border-border hover:border-accent transition-all duration-200 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base text-foreground flex-1 leading-snug">{task.title}</h3>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onDelete(task._id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant={getPriorityColor(task.priority)} className="capitalize">
            {task.priority}
          </Badge>
          <Badge variant="outline" className="bg-secondary/50 border-border capitalize">
            {getStatusLabel(task.status)}
          </Badge>
          {task.category && (
            <Badge variant="outline" className="bg-accent/10 border-accent/30 capitalize">
              {task.category}
            </Badge>
          )}
        </div>

        {task.dueDate && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
