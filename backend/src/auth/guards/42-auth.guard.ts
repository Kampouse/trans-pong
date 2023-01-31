import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Calls the strategy 42 based on the Passport documentation (invoked in module -> Providers).
@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') {}