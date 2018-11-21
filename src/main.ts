import { get } from 'lodash';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import * as passport from 'passport';
import * as session from 'express-session';
import { User } from 'user/user.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  passport.serializeUser((user, done) => {
    done(null, get(user, 'id', null));
  });
  passport.deserializeUser((id, done) => {
    return User.findOne(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
  app.use(session({
    secret: 'secret-key',
    name: 'sess-tutorial',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
