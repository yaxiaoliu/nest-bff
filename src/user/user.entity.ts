import {
  Entity,
  Column,
  Index,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsEmail,
  IsNumber,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserSex {
  MAN = 0,
  WOMEN,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    select: false,
  })
  @Index({ unique: true })
  @MaxLength(18)
  @MinLength(18)
  cardId: string;

  @Column()
  @Length(3, 50)
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({ update: false })
  createTime: Date;

  @UpdateDateColumn({ update: false })
  modifiedTime: Date;

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.MAN,
  })
  @IsNumber()
  sex: UserSex;
}
