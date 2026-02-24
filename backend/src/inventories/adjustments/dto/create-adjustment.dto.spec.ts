import 'reflect-metadata';
import { validate } from 'class-validator';
import { CreateAdjustmentDto } from './create-adjustment.dto';

describe('CreateAdjustmentDto', () => {
  // PAC-393: Add tests for required adjustment reason
  it('should fail validation if reason is missing', async () => {
    const dto = new CreateAdjustmentDto();
    dto.storeId = 1;
    // reason is intentionally omitted

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    const reasonError = errors.find((e) => e.property === 'reason');
    expect(reasonError).toBeDefined();
    expect(reasonError?.constraints?.isNotEmpty).toBeDefined();
  });

  it('should pass validation if reason is provided', async () => {
    const dto = new CreateAdjustmentDto();
    dto.storeId = 1;
    dto.reason = 'Hư hỏng';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
