
class StringTools{

  skipNum(string, n){
    if(n==0) return string

    let numCount = 0
    let writingStarted=false
    for(var pos=0; pos<string.length; pos++){
      if(writingStarted){
        if(!((string[pos]>="0" && string[pos]<="9")||string[pos]=="." || string[pos]==",")){
         if(numCount<n-1){
           numCount++
           writingStarted = false
         }
         else {
           return string.substr(pos,string.length-pos)
         }
        }
      }
      else if(string[pos]>="0" && string[pos]<="9"){
        writingStarted=true
      }
    }

    if(numCount<n-1){
      return 'error'
    }
    else {
      return ''
    }
  }

  getNthNum(string, n=0){
    string = this.skipNum(string,n)
    return parseFloat(this.getFirstNumberAsString(string))
  }

  getFirstNumberAsString(string){
    var writingStarted=false;
    var result = '';
    for(var char of string){
      if(writingStarted){
        if((char>="0" && char<="9")||char=="." ){
          result+=char;
        }
        else if(char==",");
        else break;
      }
      else if(char>="0" && char<="9"){
        writingStarted=true;
        result+=char;
      }
    }
    if(result!='')return result;
    else return null;
  }

  distructWords(string){
    if(!string)return []
    string = string.split("'").join('')
    string = string.split('"').join('')
    string = string.toUpperCase()
    return  string.split(' ')
  }

}

export default StringTools
