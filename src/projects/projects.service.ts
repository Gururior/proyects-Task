import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/tasks/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProjectsService {
  constructor(private database: PrismaService) {}

  async create(projectData: Prisma.ProjectCreateInput) {
    return this.database.project.create({
      data: projectData,
    });
  }

  async findAll() {
    return this.database.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.database.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException('No se encontró el proyecto.');
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.database.project.update({
      data: { ...updateProjectDto } as any,
      where: { id },
    });
  }

  async remove(id: number) {
    return this.database.project.delete({
      where: { id },
    });
  }
}
