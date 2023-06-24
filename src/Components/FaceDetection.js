import React from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '93e7b7bb5a16477591dbb0f9be440ae0'
});

class FaceDetection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            urlInput: "https://media.istockphoto.com/id/1270066890/photo/multiethnic-parents-giving-children-piggyback-ride.jpg?s=612x612&w=0&k=20&c=8af-giLRvOhM2VL9VBBcYDfqRxJtU_uvdoHhw86UIew=",
            url: "https://media.istockphoto.com/id/1270066890/photo/multiethnic-parents-giving-children-piggyback-ride.jpg?s=612x612&w=0&k=20&c=8af-giLRvOhM2VL9VBBcYDfqRxJtU_uvdoHhw86UIew="
        }
    }

    componentDidMount() {
        this.handleSubmit();
    }

    calculateFaceLocation = (data) => {
        const image = document.getElementById('url-image');
        const width = Number(image.width);
        const height = Number(image.height);
        const boxData = {
            left: data.left_col * width,
            top: data.top_row * height,
            width: (data.right_col - data.left_col) * width,
            height: (data.bottom_row - data.top_row) * height
        }
        return boxData;
    }


    handleSubmit = () => {
        const { urlInput } = this.state;

        this.setState({ url: urlInput, boundingBox: [] });

        app.models.predict('face-detection', urlInput).then(response => {

            const boundingBox = response?.rawData?.outputs?.[0]?.data?.regions;
            this.setState({ boundingBox });
            this.props.setTotalFaces(boundingBox?.length || "-");
            // this.calculateFaceLocation(boundingBox);
        }).catch(err => console.log("err", err));
    }
    render() {
        const { url = "", boundingBox = [] } = this.state;

        return <div className='face-detection-container'>
            <div className='face-detection'>
                <div className='url-container'>
                    <input className='url-input' onChange={(event) => this.setState({ urlInput: event.target.value })} placeholder='Enter Image URL (jpg)'></input>
                    <button className='url-button' onClick={this.handleSubmit}>Detect</button>
                </div>
                {url.length > 0 && <div style={{ width: "auto", height: "350px", position: "relative", marginTop: "10px" }}>
                    <img src={url} alt="face" className='face' id='url-image'></img>
                    {boundingBox.map(el => {
                        const boxData = this.calculateFaceLocation(el?.region_info?.bounding_box);
                        return <div style={{ width: boxData?.width || 0, height: boxData?.height || 0, position: "absolute", top: boxData?.top || 0, left: boxData?.left || 0, border: "2px solid #1b950f" }}></div>
                    })}


                </div>
                }
            </div>
        </div>
    }
}

export default FaceDetection;