// Mock Firebase Admin setup
// import * as admin from 'firebase-admin';

let dbMock: any = null;

export const getFirestoreDb = () => {
  // If we had real credentials, we would initialize here.
  // For now, we mock it.
  if (!dbMock) {
    dbMock = {
      collection: (col: string) => ({
        doc: (id: string) => ({
          set: async (data: any) => { console.log(`Mock Firestore SET ${col}/${id}`, data); return true; },
          get: async () => ({ exists: true, data: () => ({ statusPembayaran: 'pending', rincianBiaya: { total: 250000 } }) }),
          update: async (data: any) => { console.log(`Mock Firestore UPDATE ${col}/${id}`, data); return true; }
        }),
        where: (field: string, op: string, val: any) => ({
          get: async () => ({ empty: true, docs: [] })
        })
      })
    };
  }
  return dbMock;
};
