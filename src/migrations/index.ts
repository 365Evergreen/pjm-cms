import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261014_152724 from './20261014_152724';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261014_152724.up,
    down: migration_20261014_152724.down,
    name: '20261014_152724'
  },
];
