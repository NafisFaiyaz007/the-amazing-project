import React, { Component } from 'react';

export class CameraFeed extends Component {
    /**
     * Processes available devices and identifies one by the label
     * @memberof CameraFeed
     * @instance
     */
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    /**
     * Sets the active device and starts playing the feed
     * @memberof CameraFeed
     * @instance
     */
    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    /**
     * On mount, grab the users connected devices and process them
     * @memberof CameraFeed
     * @instance
     * @override
     */
    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    /**
     * Handles taking a still image from the video feed on the camera
     * @memberof CameraFeed
     * @instance
     */
    takePhoto = () => {
        const { sendFile } = this.props;
        const context = this.canvas.getContext('2d');
        context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        this.canvas.toBlob(sendFile);
    };

    render() {
        return (
          <div className="c-camera-feed min-h-screen pt-20 flex-col text-white w-auto min-h-screen m-auto text-center grid h-screen place-items-center ">
            <h1>Take a picture for authentication</h1>
            <div className="c-camera-feed__viewer ">
              <video
                ref={(ref) => (this.videoPlayer = ref)}
                width="680"
                heigh="360"
              />
            </div>
            <button
              className="bg-primary  rounded-full text-2xl pt-10 px-6 md:px-10 lg:py-6 lg:px-12 
          font-bold uppercase cursor-pointer hover:opacity-75 duration-150"
              onClick={this.takePhoto}
            >
              Take photo!
            </button>
            <div className="c-camera-feed__stage">
              <canvas
                width="680"
                height="360"
                ref={(ref) => (this.canvas = ref)}
              />
            </div>
          </div>
        );
    }
}
