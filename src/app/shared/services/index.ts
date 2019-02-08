import { InvenioConfigService } from './invenio-config/invenio-config.service';
import { RecordService } from './record.service';
import { RecordMockService } from './record.mock.service';
import { RecordResolver } from './record.resolver';

export const SHARED_SERVICES = [
  InvenioConfigService,
  RecordService,
  RecordMockService,
  RecordResolver,
];

export { InvenioConfigService, RecordService, RecordMockService, RecordResolver };
