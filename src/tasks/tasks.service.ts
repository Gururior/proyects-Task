import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export type Task = {
  id: number,
  projectId: number, 
  date: Date,
  description: string,
  completed: boolean,
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      projectId: 1,
      date: new Date(),
      description: 'Crear proyecto',
      completed: false,
    },
    {
      id: 2,
      projectId: 1,
      date: new Date(),
      description: 'Agregar módulo Tasks',
      completed: false,
    },
    {
      id: 3,
      projectId: 2,
      date: new Date(),
      description: 'Agregar controlador y servicio a módulo Task',
      completed: false,
    }
  ];

  create(task: Task): Task {
    const taskData = {
      id: this.tasks.length + 1,
      ...task,
    };

    this.tasks.push(taskData);
    return taskData;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  getTasksByProjectId(projectId: number): Task[] {
    const tasks = this.tasks.filter((task) => task.projectId === projectId);
    if (tasks.length === 0) {
      throw new NotFoundException(`Tasks for project ID ${projectId} not found`);
    }
    return tasks;
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): string {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const updatedTask = { ...this.tasks[taskIndex], ...updateTaskDto };
    this.tasks[taskIndex] = updatedTask;
    return "ok";
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    this.updateTask(id, updateTaskDto);
    return this.findOne(id);
  }

  remove(id: number): string {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return `Task with ID ${id} removed successfully`;
  }

  deleteTask(id: number): string {
    return this.remove(id);
  }
}
