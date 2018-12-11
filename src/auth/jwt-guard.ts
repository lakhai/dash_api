import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    super.logIn(request);
    return super.canActivate(context); 
    
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

export class SessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    try {
      if (request.session.passport.user) {
        return true;
      }
    } catch (e) {
      throw new HttpException('User not in session', 401);
    }
  }
}