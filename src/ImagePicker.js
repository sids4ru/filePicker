import React from "react";
import { Box, Image } from "grommet";
import { useFilePicker } from "react-sage";

const ImagePicker = ({ source, target, placeHolder }) => {
  const { files, errors, onClick, HiddenFileInput } = useFilePicker();
  return (
    <Box height="small" width="small" onClick={onClick}>
      <HiddenFileInput />
      <Image
        onClick={onClick}
        fit="cover"
        src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
      />
    </Box>
  );
};

export default ImagePicker;
