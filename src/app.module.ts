import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BirthdaysModule } from './birthdays/birthdays.module';
import { User } from './users/user.entity';
import { Birthday } from './birthdays/birthday.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [User, Birthday], // Include all your entities here
      synchronize: true, // Only use synchronize for development
    }),
    UsersModule, // Import UsersModule
    AuthModule,  // Import AuthModule
    BirthdaysModule, // Import BirthdaysModule
  ],
})
export class AppModule {}
