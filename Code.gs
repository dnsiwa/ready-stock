const folder = DriveApp.getFolderById('1yxw6JJIhSST_ZEZf5Sow_zBcV1ZgUkeB') //change
const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data') //change
const data = ss.getDataRange().getDisplayValues()

function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .setTitle("Ready Stock")
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

function include(file){
  return HtmlService.createHtmlOutputFromFile(file).getContent()
}

// function getScriptURL(){
//   return ScriptApp.getService.getUrl();
// }

// function getUser(obj){
//   let output
//   const datauser = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('userData').getDataRange().getDisplayValues();
//   datauser.forEach(r =>{
//     r[0] === obj.user && r[1] === obj.pwd ? output = r[2] : output = ""
//   })
//   return output
// }

function getData() {
 return data.slice(1)
}

function readId(id) {
  let rowID = data.find(r => {
    return r[0] == id
  })
  return rowID
}


function saveData(obj){
  Logger.log(obj)
  let myPic
  let file
  let rowID = data.findIndex (r=> r[0]== obj.numSTD)+1
    if(rowID > 1){
        if(obj.myFile.length == 0){
              // file = folder.createFile(obj.myFile).getId()
              // myPic = "https://lh3.googleusercontent.com/d/"+file
              myPic = ss.getRange(rowID,24).getValue()
        }else{
              file = folder.createFile(obj.myFile).getId()
              myPic = "https://lh3.googleusercontent.com/d/"+file
          // let arr=data[rowID-1][23].split('/')
          // let filex = DriveApp.getFileById(arr[4])
          //     filex.setTrashed(true)
        }     
        
        ss.getRange(rowID,1).setValue(obj.numSTD); 
        ss.getRange(rowID,2).setValue(obj.skuID); 
        ss.getRange(rowID,3).setValue(obj.namaBaju);  
        ss.getRange(rowID,4).setValue(obj.status); 
        ss.getRange(rowID,5).setValue(obj.warna); 
        ss.getRange(rowID,6).setValue(obj.jenisBaju); 
        ss.getRange(rowID,7).setValue(obj.size); 
        ss.getRange(rowID,8).setValue(obj.lingkarDada); 
        ss.getRange(rowID,9).setValue(obj.panjangLengan); 
        ss.getRange(rowID,10).setValue(obj.panjangBaju); 
        ss.getRange(rowID,11).setValue(obj.etalase);
        ss.getRange(rowID,12).setValue(obj.namaUser); 
        // ss.getRange(rowID,9).setValue(obj.tanggal); 
        ss.getRange(rowID,13).setValue(Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss"));
        // ss.getRange(rowID,11).setValue(myPic); 
        ss.getRange(rowID,14).setValue(obj.kain); 
        ss.getRange(rowID,15).setValue(obj.pola); 
        ss.getRange(rowID,16).setValue(obj.jahit); 
        ss.getRange(rowID,17).setValue(obj.qcAwal); 
        ss.getRange(rowID,18).setValue(obj.bordir); 
        ss.getRange(rowID,19).setValue(obj.jelujur); 
        ss.getRange(rowID,20).setValue(obj.payet); 
        ss.getRange(rowID,21).setValue(obj.qcPayet); 
        ss.getRange(rowID,22).setValue(obj.qcAkhir); 
        ss.getRange(rowID,23).setValue(obj.readystock);
        ss.getRange(rowID,24).setValue(myPic);
        ss.getRange(rowID,25).setValue(obj.katBaju);
        ss.getRange(rowID,26).setValue(obj.statKain);
        ss.getRange(rowID,27).setValue(obj.catatan);
        ss.getRange(rowID,28).setValue(obj.store);
    }else{
        if(obj.myFile.length == 0){
              myPic = ""
        }else{
              file = folder.createFile(obj.myFile).getId()
              myPic = "https://lh3.googleusercontent.com/d/"+file
        }   
        // file = folder.createFile(obj.myFile).getId()
        // myPic = "https://lh3.googleusercontent.com/d/"+file
        ss.appendRow([
        Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss"),
        // Date.now().toString(),
        obj.skuID,
        obj.namaBaju, 
        obj.status, 
        obj.warna, 
        obj.jenisBaju, 
        obj.size, 
        obj.lingkarDada,
        obj.panjangLengan,
        obj.panjangBaju,
        obj.etalase, 
        obj.namaUser,
        // obj.lastEdit,
        Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss"),
        // myPic,
        obj.kain,
        obj.pola,
        obj.jahit,
        obj.qcAwal,
        obj.bordir,
        obj.jelujur,
        obj.payet,
        obj.qcPayet,
        obj.qcAkhir,
        obj.readystock,
        myPic,
        obj.katBaju,
        obj.statKain,
        obj.catatan,
        obj.store,
        obj.lamaHari,
        ])
    }
  }

function deleteData(id) {
  Logger.log("id"+id)
  let rowID = data.findIndex(r => r[0] == id) + 1
  Logger.log("row"+rowID)
  if (rowID > 1) {
    let arr=data[rowID-1][23].split('/')
    let file = DriveApp.getFileById(arr[4])
    file.setTrashed(true)
    ss.deleteRow(rowID);
  }
  return true;
}