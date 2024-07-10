import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';
import Ratio from "react-ratio"

import Hls from "hls.js";




  function Video(props){
    
    var videoSrc = `http://localhost:4000/live/${props.id}/index.m3u8`;

    var videoParentRef = useRef();
    var videoRef = useRef();
    var hlsPlayerRef = useRef();

    const updateSize = debounce(() => {
        videoRef.current.width = videoParentRef.current?.offsetWidth
        videoRef.current.height = videoParentRef.current?.offsetHeight
    } , 50)

    
    
    useEffect(() => {
        updateSize()
        /* 화면 크기가 변경 될 때마다 함수 실행 */
        window.addEventListener("resize", updateSize);
        
        return () => {
            window.removeEventListener("resize", updateSize);
        }
      }, []);

    useEffect(() => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          

          hls.on(Hls.Events.ERROR,  (event, data) =>{
            console.log("error : " , data.details)
            switch (data.details) {
                //영상을 가지고 오는것에 실패한 경우
              case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                    //일정 시간 후에 다시 로드한다
                    // media server에서 영상을 만들 시간이 필요함
                    setTimeout(()=>{
                        hls.loadSource(videoSrc);
                    } , 2000);
                break;
              default:
                break;
            }
          });

          hlsPlayerRef.current = hls;

          hls.loadSource(videoSrc);
          hls.attachMedia(videoRef.current);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const lastSegmentIndex = hls.levels[0].details.fragments.length - 1;
            // 가장 마지막 세그먼트를 재생한다.
            videoRef.current.currentTime = hls.levels[0].details.fragments[lastSegmentIndex].start;
            videoRef.current.play();
          });
          
          videoRef.current.muted = false;
        }
        //레퍼런스가 이미 있다면 종료해준다
        return () => {
            if(hlsPlayerRef.current){
                hlsPlayerRef.current.destroy();
                hlsPlayerRef.current = null;
            };
        }
      }, []);

    return(
        <>
            <div ref={videoParentRef} style={{backgroundColor:"blue"}} >
                <Ratio ratio = { 16/9 }>
                    <video ref={videoRef} controls muted autoPlay/>
                </Ratio>
            </div>
                      
        </>
    );
  }

  export default Video;