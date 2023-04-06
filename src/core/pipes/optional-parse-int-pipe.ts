import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe
  implements PipeTransform<string | undefined, number | undefined | null>
{
  constructor(private readonly options?: { required?: boolean }) {}

  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): number | null | undefined {
    if (
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '') ||
      (typeof value === 'string' && !/^\d+$/.test(value.trim()))
    ) {
      if (this.options?.required) {
        throw new BadRequestException(
          `${metadata.data} is required and must be a number.`,
        );
      } else {
        return undefined;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parsed = parseInt(value!.trim(), 10);
    if (isNaN(parsed)) {
      throw new BadRequestException(`${metadata.data} must be a number.`);
    }
    return parsed;
  }
}
