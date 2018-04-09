
var mySwiper = new Swiper('.swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    }
})
 





// let content=document.querySelector(".content");
// var myScroll = new IScroll(content
// //     ,{
// //     click:true,
// //     mouseWheel:true

// // }
// );







//手指滑动事件
function addTouchEvent(){
    $(".itemlist>li").each(function(index,ele){
        var hammerobj=new Hammer(ele);
        let state="start";
        let sx,movex;
        let flag=true;//手指离开需不需要动画
        let max=window.innerWidth/5;
        hammerobj.on("panstart",function(e){
            sx=e.center.x;
            ele.style.transition="none";
        })

        hammerobj.on("panmove",function(e){
            let cx=e.center.x;
            movex=cx-sx;
            // console.log(movex);
            // console.log(state);
            if(movex>0&&state==="start"){//开始不能右
                flag=false;
                return;
            }
            if(movex<0&&state==="end"){//结束不能左
                flag=false;
                return;
            }
            if(Math.abs(movex)>max){
                flag=false;
                state=state==="start"?"end":"start";
                if(state==="end"){
                    $(ele).css("x",-max)
                }else{
                    $(ele).css("x","0")
                }
                return;
            }
            if(state==="end"){
                movex=cx-sx-max;
            }
            flag=true;
            $(ele).css("x",movex)

        })
        hammerobj.on("panend",function(e){
            if(!flag){return;}
            ele.style.transition="all 0.5s";
            if(Math.abs(movex)<max/2){
             $(ele).transition({x:0});
             state="start"

            }else{
             $(ele).transition({x:-max});
             state="end"
            }

        })
        
    })

}