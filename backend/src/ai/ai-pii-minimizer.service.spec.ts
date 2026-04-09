import { Test, TestingModule } from '@nestjs/testing';
import { AiPiiMinimizerService } from './ai-pii-minimizer.service';

describe('AiPiiMinimizerService', () => {
  let service: AiPiiMinimizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiPiiMinimizerService],
    }).compile();

    service = module.get<AiPiiMinimizerService>(AiPiiMinimizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('minimize', () => {
    it('should replace valid phone numbers with [PHONE]', () => {
      expect(service.minimize('Contact me at 0901234567')).toEqual(
        'Contact me at [PHONE]',
      );
      expect(service.minimize('My number is +84901234567')).toEqual(
        'My number is [PHONE]',
      );
    });

    it('should not replace invalid phone numbers', () => {
      expect(service.minimize('Number is 0901234')).toEqual(
        'Number is 0901234', // too short
      );
    });

    it('should replace emails with [EMAIL]', () => {
      expect(service.minimize('Email test@example.com for info')).toEqual(
        'Email [EMAIL] for info',
      );
    });

    it('should replace ID card numbers with [ID_CARD]', () => {
      expect(service.minimize('My CMND is 123456789')).toEqual(
        'My CMND is [ID_CARD]',
      );
      expect(service.minimize('My CCCD is 001090123456')).toEqual(
        'My CCCD is [ID_CARD]',
      );
    });

    it('should handle null or empty strings gracefully', () => {
      expect(service.minimize('')).toEqual('');
      expect(service.minimize(null as any)).toEqual(null);
    });
  });

  describe('minimizeObject', () => {
    it('should recursively minimize string values in objects', () => {
      const input = {
        userId: 'user-1',
        alertContext: 'User 0901234567 reported an issue',
        medicines: ['Paracetamol'],
        details: {
          email: 'user@example.com',
          nested: {
            phone: '+84901234567',
          },
        },
      };

      const result = service.minimizeObject(input);

      expect(result.alertContext).toEqual('User [PHONE] reported an issue');
      expect(result.details.email).toEqual('[EMAIL]');
      expect(result.details.nested.phone).toEqual('[PHONE]');
      expect(result.userId).toEqual('user-1'); // not matching patterns
      expect(result.medicines).toEqual(['Paracetamol']);
    });
  });
});
