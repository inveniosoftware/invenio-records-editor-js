import { RecordService } from './record.service';
import { RecordMockService } from './record.mock.service';
import { RecordResolver } from './record.resolver';

export const SHARED_SERVICES = [RecordService, RecordMockService, RecordResolver];

export { RecordService, RecordMockService, RecordResolver };
