import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger/dist';
import { responseModel } from './common/helpers/response-model';

@ApiTags('root')
@Controller()
export class AppController {
  @ApiOkResponse({
    description: 'server up and running',
  })
  @Get()
  getHello(): any {
    return responseModel('server up and running');
  }
}
