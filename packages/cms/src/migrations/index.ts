import * as migration_20260602_063713_ikagai_init from './20260602_063713_ikagai_init';

export const migrations = [
  {
    up: migration_20260602_063713_ikagai_init.up,
    down: migration_20260602_063713_ikagai_init.down,
    name: '20260602_063713_ikagai_init'
  },
];
