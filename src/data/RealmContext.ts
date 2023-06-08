import {createRealmContext} from '@realm/react';
import {AiTool} from './ItemSchema';

export const realmContext = createRealmContext({
  schema: [AiTool],
});
