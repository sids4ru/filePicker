import React from "react";
import InvisibleFilePicker from "./InvisibleFilePicker";
import SingleImagePickerUI from "./SingleImagePickerUI";

const SingleImagePicker = () => (
  <InvisibleFilePicker>
    <SingleImagePickerUI />
  </InvisibleFilePicker>
);

export default SingleImagePicker;
