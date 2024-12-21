import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-tasks.dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { QueryParamsEnum } from '../common/constants/query-params-constants';
import { ValidateQueryParamPipe } from 'src/common/pipes/validate-query-param.pipe';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //this method is for db storage

  @Get()
  @ApiOkResponse({
    description: 'Get all tasks as response',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of tasks to return per page (default is 10)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number of the tasks to retrieve (default is 1)',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term to filter tasks by title or description',
  })
  @HttpCode(HttpStatus.OK)
  getAllTasks(
    @GetUser() user: User,
    @Query() filterTaskDto?: FilterTaskDto,

    @Query(
      QueryParamsEnum.LIMIT,
      new ParseIntPipe({ optional: true }),
      new ValidateQueryParamPipe(QueryParamsEnum.LIMIT),
    )
    limit = 10,

    @Query(
      QueryParamsEnum.PAGE,
      new ParseIntPipe({ optional: true }),
      new ValidateQueryParamPipe(QueryParamsEnum.PAGE),
    )
    page = 1,
    @Query('search') search?: string,
  ): Promise<Task[]> {
    return this.tasksService.getAllTasks(
      user,
      filterTaskDto,
      search,
      limit,
      page,
    );
  }

  @Get('count')
  @ApiOkResponse({
    description: 'Get number of tasks as response',
  })
  @HttpCode(HttpStatus.OK)
  getTasksCount(): Promise<number> {
    return this.tasksService.getTasksCount();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get a task as response',
    type: Task,
  })
  @ApiNotFoundResponse({
    description: 'Task not found. Try again',
  })
  @HttpCode(HttpStatus.OK)
  getTaskById(
    @Param('id', ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(taskId, user);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create and get new task as response',
    type: Task,
  })
  @ApiBadRequestResponse({
    description: 'Task cannot created. Try again',
  })
  @HttpCode(HttpStatus.CREATED)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<{ task: Task; message: string }> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Delete a task and get all tasks as response',
  })
  @ApiNotFoundResponse({
    description: 'Task not found. Try again',
  })
  @HttpCode(HttpStatus.OK)
  async deleteTask(
    @Param('id', ParseIntPipe) taskId: number,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.deleteTask(taskId, user);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'Update a task and get the updated task as response',
  })
  @ApiNotFoundResponse({
    description: 'Task not found. Try again',
  })
  @HttpCode(HttpStatus.OK)
  updateTask(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto | null,
    @GetUser() user: User,
  ): Promise<{ task: Task; message: string }> {
    return this.tasksService.updateTask(taskId, updateTaskDto, user);
  }

  @Delete('')
  @ApiOkResponse({
    description: 'Delete all tasks as response',
  })
  @HttpCode(HttpStatus.OK)
  async deleteAllTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.deleteAllTasks(user);
  }

  // this method is for disk storage
  // @Get()
  // @ApiOkResponse({
  //   description: 'Get all tasks as response',
  // })
  // @ApiQuery({
  //   name: 'limit',
  //   required: false,
  //   type: Number,
  //   description: 'Maximum number of tasks to return per page (default is 10)',
  // })
  // @ApiQuery({
  //   name: 'page',
  //   required: false,
  //   type: Number,
  //   description: 'Page number of the tasks to retrieve (default is 1)',
  // })
  // @HttpCode(HttpStatus.OK)
  // getAllTasks(
  //   @Query() filterTaskDto?: FilterTaskDto,

  //   @Query(
  //     LIMIT,
  //     new ParseIntPipe({ optional: true }),
  //     new ValidateQueryParamPipe(LIMIT),
  //   )
  //   limit = 10,

  //   @Query(
  //     PAGE,
  //     new ParseIntPipe({ optional: true }),
  //     new ValidateQueryParamPipe(PAGE),
  //   )
  //   page = 1,
  // ): Task[] {
  //   return this.tasksService.getAllTasks(filterTaskDto, limit, page);
  // }

  // @Get('count')
  // @ApiOkResponse({
  //   description: 'Get number of tasks as response',
  // })
  // @HttpCode(HttpStatus.OK)
  // getTasksCount() {
  //   return this.tasksService.getTasksCount();
  // }

  // @Get('/:id')
  // @ApiOkResponse({
  //   description: 'Get a task as response',
  //   type: Task,
  // })
  // @ApiNotFoundResponse({
  //   description: 'Task not found. Try again',
  // })
  // @HttpCode(HttpStatus.OK)
  // getTaskById(@Param('id') taskId: string): Task {
  //   return this.tasksService.getTaskById(taskId);
  // }

  // @Post()
  // @ApiCreatedResponse({
  //   description: 'Create and get new task as response',
  //   type: Task,
  // })
  // @ApiBadRequestResponse({
  //   description: 'Task cannot created. Try again',
  // })
  // @HttpCode(HttpStatus.CREATED)
  // createTask(@Body() createTaskDto: CreateTaskDto | null): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // @ApiOkResponse({
  //   description: 'Delete a task and get all tasks as response',
  // })
  // @ApiNotFoundResponse({
  //   description: 'Task not found. Try again',
  // })
  // @HttpCode(HttpStatus.OK)
  // deleteTask(@Param('id') taskId: string): Task[] {
  //   return this.tasksService.deleteTask(taskId);
  // }

  // @Put('/:id')
  // @ApiOkResponse({
  //   description: 'Update a task and get the updated task as response',
  // })
  // @ApiNotFoundResponse({
  //   description: 'Task not found. Try again',
  // })
  // @HttpCode(HttpStatus.OK)
  // updateTask(
  //   @Param('id') taskId: string,
  //   @Body() updateTaskDto: UpdateTaskDto | null,
  // ): Task {
  //   return this.tasksService.updateTask(taskId, updateTaskDto);
  // }
}
