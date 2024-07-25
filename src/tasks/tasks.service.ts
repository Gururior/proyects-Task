import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from './prisma.service';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(taskData: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
      data: taskData,
    });
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`No se encontró la tarea con el ID ${id}.`);
    }

    return task;
  }

  async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}