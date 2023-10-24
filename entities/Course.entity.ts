import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Administrator from './Administrator.entity';
import Reservation from './Reservation.entity';

// La decoración @Entity indica que esta clase representa una entidad en la base de datos.
@Entity()
class Course {
  // La decoración @PrimaryGeneratedColumn() indica que esta columna es la clave primaria y se genera automáticamente.
  @PrimaryGeneratedColumn()
  id: number;

  // La decoración @Column() define una columna en la base de datos.
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'date' })
  endInscriptionDate: Date;

  @Column({ type: 'varchar', array: true })
  themes: string[];

  @Column({ type: 'decimal' })
  price: number;

  // La decoración @OneToMany() indica una relación uno a muchos con la entidad Reservation.
  @OneToMany(() => Reservation, (reservation) => reservation.course, { cascade: true })
  reservations: Reservation[];

  // La decoración @ManyToOne() indica una relación muchos a uno con la entidad Administrator.
  @ManyToOne(() => Administrator, (administrator) => administrator.courses)
  administrator: Administrator;
}

export default Course;
