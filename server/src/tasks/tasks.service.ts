// import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-tasks.dto';
import { ValidationsUtil } from '../common/utils/validations-util';
import { UpdateTaskDto } from './dto/update-task-dto';
import { TASK } from './constants/task-constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  //this method is for db storage

  private DEFAULT_LIMIT: number = 10;
  private DEFAULT_PAGE: number = 1;
  getAllTasks(
    user: User,
    filterTaskDto?: FilterTaskDto,
    search?: string,
    limit: number = this.DEFAULT_LIMIT,
    page: number = this.DEFAULT_PAGE,
  ): Promise<Task[]> {
    const query: SelectQueryBuilder<Task> =
      this.taskRepository.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (!ValidationsUtil.isObjectEmpty<FilterTaskDto>(filterTaskDto)) {
      const { title, description, status } = filterTaskDto;
      if (status) {
        query.andWhere('task.status = :status', { status });
      }
      if (title) {
        query.andWhere('task.title LIKE :title', { title: `%${title}%` });
      }
      if (description) {
        query.andWhere('task.description LIKE :description', {
          description: `%${description}%`,
        });
      }
    }

    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search OR task.status ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    query.skip((page - 1) * limit);
    query.take(limit);

    return query.getMany();
  }

  async getTaskById(taskId: number, user: User): Promise<Task> {
    const task: Task = await this.taskRepository.findOne({
      where: { id: taskId, userId: user.id },
    });

    ValidationsUtil.checkIfExists<Task>(task, TASK, taskId);

    return task;
  }

  async getTasksCount(): Promise<number> {
    return await this.taskRepository.count();
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<{ task: Task; message: string }> {
    const task: Task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
      user: user,
    });

    await task.save();

    delete task.user;

    return { task, message: 'Task created successfully' };
  }

  async deleteTask(taskId: number, user: User): Promise<Task[]> {
    await this.getTaskById(taskId, user);
    await this.taskRepository.delete({ id: taskId });

    return await this.taskRepository.find({ where: { userId: user.id } });
  }

  async deleteAllTasks(user: User): Promise<Task[]> {
    await this.taskRepository.delete({ userId: user.id });

    return await this.taskRepository.find({ where: { userId: user.id } });
  }

  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<{ task: Task; message: string }> {
    const { title, status, description } = updateTaskDto;
    const task = await this.getTaskById(taskId, user);
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    await task.save();
    return { task, message: 'Task updated successfully' };
  }

  // this method is for disk storage
  // private tasks: Task[] = [];
  // private DEFAULT_LIMIT: number = 10;
  // private DEFAULT_PAGE: number = 1;
  // getAllTasks(
  //   filterTaskDto?: FilterTaskDto,
  //   limit: number = this.DEFAULT_LIMIT,
  //   page: number = this.DEFAULT_PAGE,
  // ): Task[] {
  //   let filteredTasks: Task[] = this.tasks;
  //   if (!ValidationsUtil.isObjectEmpty<FilterTaskDto>(filterTaskDto)) {
  //     const { title, description, status } = filterTaskDto;
  //     if (status) {
  //       filteredTasks = filteredTasks.filter(
  //         (task: Task) => task.status === status,
  //       );
  //     }
  //     if (title) {
  //       filteredTasks = filteredTasks.filter((task: Task) =>
  //         task.title.includes(title),
  //       );
  //     }
  //     if (description) {
  //       filteredTasks = filteredTasks.filter((task: Task) =>
  //         task.description.includes(description),
  //       );
  //     }
  //   }
  //   return filteredTasks.slice((page - 1) * limit, page * limit);
  // }
  // getTaskById(taskId: string): Task {
  //   const task: Task = this.tasks.find((task: Task) => task.id === taskId);
  //   ValidationsUtil.checkIfExists<Task>(task, TASK, taskId);
  //   return task;
  // }
  // getTasksCount() {
  //   return this.tasks.length;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(taskId: string): Task[] {
  //   this.getTaskById(taskId);
  //   this.tasks = this.tasks.filter((task: Task) => task.id !== taskId);
  //   return this.tasks;
  // }
  // updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Task {
  //   const { title, status, description } = updateTaskDto;
  //   const task: Task = this.getTaskById(taskId);
  //   if (title) {
  //     task.title = title;
  //   }
  //   if (status) {
  //     task.status = status;
  //   }
  //   if (description) {
  //     task.description = description;
  //   }
  //   return task;
  // }
}
