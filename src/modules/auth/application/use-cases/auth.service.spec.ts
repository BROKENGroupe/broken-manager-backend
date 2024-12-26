import { Test, TestingModule } from '@nestjs/testing';
import { AuthUseCaseService } from './auth.uses-case.service';

describe('AuthService', () => {
  let service: AuthUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUseCaseService],
    }).compile();

    service = module.get<AuthUseCaseService>(AuthUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
