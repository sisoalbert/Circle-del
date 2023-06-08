import {BSON} from 'realm';

export class AiTool extends Realm.Object<AiTool> {
  _id?: Realm.BSON.ObjectId;
  icons?: Realm.List<string>;
  isFavorite?: boolean;
  name?: string;
  owner_id?: string;
  public?: boolean;
  url?: string;

  static schema: Realm.ObjectSchema = {
    name: 'AiTool',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId?', default: () => new BSON.ObjectId()},
      icons: 'string[]',
      isFavorite: {type: 'bool?', default: false},
      name: 'string?',
      owner_id: 'string?',
      public: 'bool?',
      url: 'string?',
    },
  };
}
