import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ImageUpload extends Component {
  state = {
    files: [],
    urls: [],
    fileNames: [],
    duplicateFilesError: null,
    largeFilesError: null,
    smallFilesError: null,
    height: null,
    width: null,
  };

  async getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = async function () {
      await callback(this.width, this.height);
    };
  }

  setFileUrls = (e) => {
    var that = this;
    var files = [...this.state.files];
    const urls = [...this.state.urls];
    const fileNames = [...this.state.fileNames];

    var selectedFiles = e.target.files;
    selectedFiles = [...selectedFiles].filter(function (file) {
      var MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        that.setState({
          largeFilesError: "Image must not exceed 5 MB",
        });
      } else if (file.size <= MAX_FILE_SIZE) {
        that.setState({
          largeFilesError: null,
        });
        return file;
      }
    });

    selectedFiles = [...selectedFiles].filter(function (file) {
      if (![...fileNames].includes(file.name)) {
        that.setState({
          duplicateFilesError: null,
        });

        return file;
      } else {
        that.setState({
          duplicateFilesError: "Already added photos excluded",
        });
      }
    });

    [...selectedFiles].forEach(function (file) {
      that.getMeta(URL.createObjectURL(file), function (width, height) {
        if (height >= 600 || width >= 600) {
          files.push(file);
          fileNames.push(file.name);
          urls.push(URL.createObjectURL(file));

          that.setState({ files });
          that.setState({ fileNames });

          if (that.state.urls.length > 0) {
            that.state.urls.forEach((url) => URL.revokeObjectURL(url));
          }
          that.setState({ urls, smallFilesError: null });
          that.props.handleCarPhotos(files);
        } else {
          that.setState({
            smallFilesError: "Height and Width must at least be 600 px",
          });
        }
      });
    });
  };

  deleteFile = (index) => {
    const newFileList = [...this.state.files];
    const newUrlList = [...this.state.urls];
    const newFileNamesList = [...this.state.fileNames];
    if (index > -1) {
      newFileList.splice(index, 1);
      newUrlList.splice(index, 1);
      newFileNamesList.splice(index, 1);
    }
    this.setState({
      files: newFileList,
      urls: newUrlList,
      fileNames: newFileNamesList,
    });
  };

  render() {
    const errorText = {
      fontSize: "12px",
      margin: "0px",
      Padding: "0px",
      marginTop: "10px",
    };
    const noteText = {
      fontSize: "12px",
      margin: "0px",
      Padding: "0px",
    };
    return (
      <div>
        <div>
          <p className="text-dark font-weight-bold" style={noteText}>
            Add at least 5 photos are required.
          </p>
          <p className="text-dark" style={noteText}>
            First picture - is the title picture. You can change the order of
            photos: just select your photos and open
          </p>

          <label for="files" className="btn rounded-circle btn-round-add">
            <FontAwesomeIcon icon="plus-circle" />
          </label>
          <input
            type="file"
            id="files"
            multiple
            accept=".jpg, .png, .gif, .jpeg"
            onChange={this.setFileUrls}
          />

          {
            <div className="row">
              {this.state.urls.map((url, index) => (
                <div key={index}>
                  <div className="image">
                    <div className="overlay">
                      <button
                        className="btn rounded-circle btn-round-remove shadow border-1"
                        onClick={this.deleteFile.bind(this, index)}
                      >
                        <FontAwesomeIcon icon="minus-circle" />
                      </button>
                    </div>
                    <div key={url}>
                      <img src={url} alt="" className="rounded car-images" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>

        <p className="text-dark" style={noteText}>
          Each picture must not exceed 5 Mb
        </p>

        <p className="text-dark" style={noteText}>
          supported formats are *.jpg,*jpeg,*png,*gif supported
        </p>

        <p className="text-danger" style={errorText}>
          {this.state.duplicateFilesError}
          {" ."}
          {this.state.smallFilesError}
          {" ."}
          {this.state.largeFilesError}
        </p>
      </div>
    );
  }
}
export default ImageUpload;
