


const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');

function delegationFunc(e){
    
    let elem = e.target; //클릭한대상

    console.log(elem);

    while(!elem.getAttribute('data-name')){
        elem = elem.parentNode;

        if(elem.nodeName === 'BODY'){
            elem = null;
            return;
        }
    }

    if(elem.matches('[data-name="heartbeat"]')){

        console.log('하트');

        let pk = elem.getAttribute('name');
 
        $.ajax({
            type:'POST',                                                          //경로를 생략해서 보냄
            url:'data/like.json',                                                 
            data:{pk},                                                            
            dataType:'json',
            success: function(response){                                          //받아온 데이터

                let likeCount = document.querySelector('#like-count-37');
                likeCount.innerHTML = '좋아요' + response.like_count + '개';

            },
            error:function(request,status,error){
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        })



    }else if(elem.matches('[data-name="bookmark"]')){

        console.log('북마크');

        let pk = elem.getAttribute('name');

        $.ajax({

            type:'POST',
            url:'data/bookmark.json',
            data:{pk},
            dataType:'json',
            success:function(response){
                let bookmarkCount = document.querySelector('#bookmark-count-37');
                bookmarkCount.innerHTML = '북마크' + response.bookmark_count + '개';
            },
            error:function(request,status,error){
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        });

    }else if(elem.matches('[data-name="comment"]')){

        let content = document.querySelector('#add-comment-post-37>input[type=text]').value;
        console.log(content);

        if(content.length > 140){
            alert('댓글은 최대 140자까지 입력이 가능합니다. 현재 글자수 :"' + content.length);
            return;
        }

        $.ajax({

            type:'POST',
            url:'./comment.html',
            data:{
                'pk' : 37,
                'content':content,
            },
            dataType:'html',
            success:function(data){
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin', data);
            },
            error:function(request,status,error){
                alert('문제가 발생했습니다.');
            }
        });

        document.querySelector('#add-comment-post-37>input[type=text]').value = ''; //작성 후 공백처리

    }else if(elem.matches('[data-name="comment-delete"')){

        $.ajax({
            type:'POST',
            url:'data/delete.json',
            data:{
                'pk':37,
            },
            dataType:'json',
            success:function(response){
                if(response.status){
                    let comt =document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error:function(request,status,error){
                alert('문제가 발생했습니다.');
            }
        });

    }else if(elem.matches('[data-name="follow')){

        $.ajax({
            type:'POST',
            url:'data/follow.json',
            data:{
                'pk':37,
            },
            dataType:'json',
            success:function(response){
                if(response.status){
                    document.querySelector('input.follow').value = "팔로잉";
                }else{
                    document.querySelector('input.follow').value = "팔로워";
                }
            },
            error:function(request,status,error){
                alert('문제가 발생했습니다.');
            }
        });

    }else if(elem.matches('[data-name="share"]')){

        console.log('공유');
    }else if(elem.matches('[data-name="more"]')){

        console.log('더보기');
    }

    elem.classList.toggle('on');

}
function resizeFunc(){
    if(pageYOffset >= 10){

        let calcWidth = (window.innerWidth *0.5) + 167;    //사이드 박스 고정위치 설정
        

        sidebox.style.left = calcWidth + 'px';
    }


    if(matchMedia('screen and (max-width : 800px)').matches){
        
        for(let i=0; i<variableWidth.length; i++){
            variableWidth[i].style.width = window.innerWidth -20 + 'px';  //컨텐츠 width값 조정 //i 모든 컨텐츠
        }

    }else{

        for(let i=0; i<variableWidth.length; i++){

            if(window.innerWidth > 600 ){
                
                variableWidth[i].removeAttribute('style');

            }
            
        }
        
    }
    
}

function scrollFunc(){

    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    console.log(scrollHeight);
    console.log(documentHeight);

 

    if(pageYOffset >= 10){
        header.classList.add('on');        //헤더 위치고정
        
        if(sidebox){
            sidebox.classList.add('on');   //사이드박스 위치고정
        }

        resizeFunc();

    }else{
        header.classList.remove('on');
        
        if(sidebox){
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style'); //사이드박스 고정위치 제거
        }
    }

}



setTimeout(function(){                      //새로고침하면 첫 화면으로
    scrollTo(0,0)
},100)

if(delegation){

    delegation.addEventListener('click', delegationFunc);

}


window.addEventListener('resize',resizeFunc);
window.addEventListener('scroll',scrollFunc);


