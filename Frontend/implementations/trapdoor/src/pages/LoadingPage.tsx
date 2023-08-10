import React, { useContext, useEffect } from 'react';
import StageLogo from '../components/StageLogo';
import LoadingScreen from '../components/LoadingScreen';
import { StreamStatusContext } from '../contexts/StreamStatusContext';
import { useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../contexts/UserAuthContext';

const LoadingPage = () => {
  const { streamStatusData, setStreamStatusData } = useContext(StreamStatusContext);
  const { userAuth } = useContext(UserAuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getStreamStatus = (isFirst: boolean = false) => {
      const uid = userAuth.currentUser?.auth?.uid;
      if (uid) {
        fetch(`https://test-stream.stage3d.app/streaming?uid=${uid}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${'D5WXUGagAEW33fJTBXsGgwmeRQsy5uLUS1jfr4Vze_WQwl563EAxQEGCylX6d1J0yw=='}`
            },
          }
        )
        .then((res) => {
          console.log("Response: ", res)
          if (res.status === 200) {
            return res.json();
          }
          else if (res.status === 201) { }
          else if (res.status === 202) { }
          else if (res.status === 401) {
            alert('Unauthorized');
            (window as any).location("/");
          }
          else if (res.status === 500) {
            alert('Internal Server Error');
          }
          else throw(res);

        })
        .then((data) => {
          if (data && data.msg) {
            console.log('Data: ', data);
            setStreamStatusData({type: 'UPDATE_STREAM_URL', url: data.msg});
            navigate('/start');
          }
          else {
            if (isFirst) {
                getStreamStatus();
            }
            else {
              setTimeout(() => {
                getStreamStatus();
              }, 10000);
            }
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
          alert('There was a problem setting up your streaming session. Please try again later.');
          navigate('/');
        })
      }
    }
    getStreamStatus(true);
    // setTimeout(() => {
    //   setStreamStatusData({type: 'UPDATE_STREAM_URL', url: 'ws://localhost:80'})
    //   navigate('/start')
    // }, 5000)
  }, [])
  return (
    <div className='loading-page'>
      <div className='loading-page__content'>
        <div className='loading-page__logo'>
          <StageLogo
            includeText={true}
            orientation='vertical'
            logoSize='small'
            mode='light'
            loading={true}
          />
        </div>
        <div className='loading-page__text'>
          <h1>Setting up your<br/>personalized experience</h1>
          <p>Looks like all Stage resources are currently in use.<br/>We'll start an additional Stage session for you right away.<br/>Thanks for your patience as this could take a minute or two.</p>
        </div>
      </div>
      <LoadingScreen />
    </div>
  )
}
export default LoadingPage;