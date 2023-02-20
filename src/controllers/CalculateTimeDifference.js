
        function removeColon( s)
        {
            if (s.length == 4)
                s= s.replace(":", "");
             
            if (s.length == 5)
                s= s.replace(":", "");
             
            return parseInt(s);
        }
         
        export function diff( s1,  s2)
        {
         
           
             let time1 = removeColon(s1);
            
             let time2 = removeColon(s2);
             
         
            // difference between hours
             let hourDiff = parseFloat(time2 / 100 - time1 / 100 - 1);
             let hourDiff2 = parseInt(time2 / 100 - time1 / 100 - 1);
             
            
             let check;
           
             let minDiff = parseInt(time2 % 100 + (60 - time1 % 100));
             
         
            if (minDiff >= 60) {
                if(hourDiff.toString().split('-')[0]!=""){
                  
                    hourDiff2++
                    check=true
                }                
                minDiff = minDiff - 60;
            }
            if(minDiff===0){
                hourDiff2=hourDiff2+1
            }
          
            
            let res = (check?hourDiff2:Math.ceil(hourDiff)).toString() + ':' + (minDiff).toString();
            return res;
        }
         
function diff_hours(dt1, dt2) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  
  let minute2=dt2.toTimeString();
  minute2=minute2.substr(0,5);
  minute2=removeColon(minute2);

  let minute1=dt1.toTimeString();
  minute1=minute1.substr(0,5);
  minute1=removeColon(minute1);

  let totalMinute=parseInt(minute2%100+(60-minute1%100));
  
  
  if(totalMinute>=60){
    totalMinute=totalMinute-60

  }

  let check=diff.toString();
  check=check.split(".");

  if(check[0]==='0'){
    diff=0
  }
  return check[0]+":"+(totalMinute).toString();
  
 }
       
            

             
export default diff_hours;

