import Dexie from 'dexie';

const db = new Dexie('rtaa');
db.version(1).stores({
	dashboards: '++id, name, short, track, follow'
});

export { db };
