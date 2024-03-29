import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      return await this.patientService.create(createPatientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'มีข้อมูลในระบบแล้ว' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to retrieve all patients' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('sample-data')
  async countQueuePerDay(): Promise<{ [key: string]: number }> {
    try {
      const countPerDay = await this.patientService.countByGender();
      return countPerDay;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'เกิดข้อผิดพลาดในการนับจำนวนคิวต่อวัน',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search')
  async searchDoctorsByName(@Query('name') name?: string): Promise<Patient[]> {
    try {
      if (name) {
        return await this.patientService.findOneByName(name);
      } else {
        return await this.patientService.findAll();
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to search doctors by name' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      return await this.patientService.update(id, updatePatientDto);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to update patient' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'Failed to remove patient' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
