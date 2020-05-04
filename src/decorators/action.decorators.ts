import { SetMetadata } from '@nestjs/common';

import { ActionType } from '../constant/action-type';
import { ACCESS } from '../constant/api-features';

export const Action = (...a: ActionType[]) => SetMetadata('action', a);
export const Feature = (...f: ACCESS[]) => SetMetadata('feature', f);
