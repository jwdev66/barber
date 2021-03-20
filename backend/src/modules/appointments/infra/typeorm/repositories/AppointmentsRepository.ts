import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRespository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRespository {
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
