import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Calls the strategy jwt-2fa.
@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {}