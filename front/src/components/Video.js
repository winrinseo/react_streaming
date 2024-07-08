import { useEffect, useRef, useState } from "react";
import { debounce } from 'lodash';
import Ratio from "react-ratio"

import flvjs from 'flv.js';




  function Video(props){
    
    var videoSrc = `http://localhost:8000/live/${props.id}.flv`;

    var videoParentRef = useRef();
    var videoRef = useRef();
    var flvPlayerRef = useRef();

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
        if (flvjs.isSupported()) {
          const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: videoSrc
          });
          flvPlayerRef.current = flvPlayer;
          flvPlayer.attachMediaElement(videoRef.current);
          flvPlayer.load();
          videoRef.current.muted = true;

          flvPlayer.on(flvjs.Events.LOADED_METADATA, () => {
            flvPlayer.play().catch(error => {
              console.error('Error attempting to play', error);
            });
          });

          flvPlayer.on(flvjs.Events.ERROR, (errorType, errorDetail) => {
            console.error('FLV.js error:', errorType, errorDetail);
            // setError('Stream not available');
          });

        }
        return () => {
            if (flvPlayerRef.current) {
              flvPlayerRef.current.destroy();
            }
        };
      }, [props.activeStream]);

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