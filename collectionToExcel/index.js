// index.js
const admin = require("firebase-admin");
const ExcelJS = require("exceljs");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json"))
});
admin.firestore().settings({
  ignoreUndefinedProperties: true,
  databaseId: 'csendesnapdb', // Here you change your DB
});
const db = admin.firestore();
async function exportCollectionToExcel(collectionName, outputFile) {
  const snapshot = await db.collection(collectionName).get();

  if (snapshot.empty) {
    console.log("Nincs adat ebben a collection-ben:", collectionName);
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(collectionName);

  // első dokumentum mezőnevei
  const firstDoc = snapshot.docs[0].data();
  const headers = Object.keys(firstDoc);

  worksheet.addRow(headers);

  snapshot.forEach(doc => {
    const data = doc.data();
    const row = headers.map(h => data[h] ?? "");
    worksheet.addRow(row);
  });

  await workbook.xlsx.writeFile(outputFile);
  console.log(`✅ Siker! Excel mentve ide: ${outputFile}`);
}

// Használat:
exportCollectionToExcel("participants", "participants.xlsx");
