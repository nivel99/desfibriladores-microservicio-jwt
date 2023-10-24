import { getRepository, Repository } from 'typeorm'; // Importa funciones para trabajar con la base de datos utilizando TypeORM
import Reservation from '../entities/Reservation.entity'; // Importa la entidad Reservation

class ReservationService {
  // Instancia estática de ReservationService
  private static reservationServiceInstance: ReservationService;

  // Repositorio para la entidad Reservation
  private reservationRepository: Repository<Reservation>;

  static async getInstance() {
    if (!ReservationService.reservationServiceInstance) {
      // Si no existe una instancia de ReservationService, crea una nueva
      ReservationService.reservationServiceInstance = new ReservationService();
      ReservationService.reservationServiceInstance.reservationRepository = getRepository(
        Reservation,
      );
    }
    // Devuelve la instancia de ReservationService
    return ReservationService.reservationServiceInstance;
  }

  async getAll() {
    return this.reservationRepository.find({
      relations: ['user', 'course'],
    });
  }

  async getOne(uuid: string) {
    return this.reservationRepository.findOne({
      where: {
        uuid,
      },
    });
  }

  async update(
    uuid: string,
    paymentStatus?: boolean,
    paymentImageUrl?: string,
  ): Promise<Reservation> {
    if (!paymentStatus || !paymentImageUrl) {
      throw new Error('Missing parameters');
    }
    const reservation = await this.getOne(uuid);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    reservation.paymentStatus = paymentStatus || reservation.paymentStatus;
    reservation.paymentImageUrl = paymentImageUrl || reservation.paymentImageUrl;
    reservation.paymentDate = new Date();

    return this.reservationRepository.save(reservation);
  }

  async delete(uuid: string): Promise<Reservation> {
    const reservation = await this.getOne(uuid);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    return this.reservationRepository.remove(reservation);
  }
}
// Exporta la clase ReservationService
export default ReservationService;
