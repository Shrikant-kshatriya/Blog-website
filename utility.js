module.exports.truncString = function(string){

    if(string.length > 100){
        let str = string.substring(0,101) + "...";
        return str;
    }
    else return string;

}