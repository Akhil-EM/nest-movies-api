import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Token } from '../database/entities/token.entity';
import { verifyJwtToken } from '../helpers/encryption.helper';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    try {
      const tokenVerificationRes = verifyJwtToken(token);

      //check database also
      const tokenDbCheck = await Token.findOne({
        where: {
          token: token,
        },
        raw: true,
      });
      if (!tokenDbCheck) return false;

      req.user = tokenVerificationRes;
      req.token = token;

      return true;
    } catch (e) {
      return false;
    }
  }
}
