module.exports=function(archive){
    console.log('extracting '+archive.zip.cyan,'to ' +archive.path.cyan);
    var AdmZip=require('adm-zip')
    var zip = new AdmZip(archive.zip);
    zip.extractAllTo(archive.path,true); //overwrite
}
    