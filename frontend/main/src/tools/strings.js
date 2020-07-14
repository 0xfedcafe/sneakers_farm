"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toLink = toLink;
exports.toArr = toArr;
exports.toLine = toLine;

function toLink(arr){
  var link = "";
  for(var i=0;i<arr.length-1;i++){
    link+=arr[i] + "-";
  }
  link+=arr[arr.length-1];
  return link;
}
function toLine(arr){
  var link = "";
  for(var i=0;i<arr.length-1;i++){
    link+=arr[i].toUpperCase() + " ";
  }
  link+=arr[arr.length-1].toUpperCase();
  return link;
}
function toArr(line){
  var arr=[];
  var word="";
  line=line.toLowerCase();
  for(var i=0;i<line.length;i++){
    if((line[i]>='a' && line[i]<='z') || (line[i]>='0' && line[i]<='9'))word+=line[i];
    else{
      if(word!=""){
        arr.push(word);
        word="";
      }
    }
  }
  if(word!=""){
    arr.push(word);
  }
  console.log(arr);
  return arr;
}
