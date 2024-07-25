import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/tasks/prisma.service';
import { Prisma, Project } from '@prisma/client';


@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(projectData: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data: projectData,
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`No se encontró el proyecto con el ID ${id}.`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: Prisma.ProjectUpdateInput): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}