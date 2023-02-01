/* eslint-disable react/jsx-props-no-spreading */
// Disabling linter rule to allow free form properties forwarding to the custom UI

import React, { useMemo, createContext } from "react";
import { useFilePickerContext } from "./InvisibleFilePicker";
import { Box } from "grommet";

const SingleImagePickerContext = createContext();

const SingeImagePickerUI = ({
  CustomUIComponent,
  customUIProps,
  children,
  ...other
}) => {
  const { files, errors, pick } = useFilePickerContext();
  const dataUrl = useMemo(() => files[0] && files[0].data, [files]);

  const value = useMemo(
    () => ({
      dataUrl,
      pick
    }),
    [dataUrl, pick]
  );

  const renderCustomUI = children && children.length > 0;
  console.log("renderCustomUI", renderCustomUI);
  return renderCustomUI ? (
    <SingleImagePickerContext.Provider value={value}>
      {children}
    </SingleImagePickerContext.Provider>
  ) : (
    <Box width={"200px"} height={"200px"} border={1} onClick={pick}>
      <img width="100%" alt="" height="100%" src={dataUrl} {...other} />
    </Box>
  );
};
export default SingeImagePickerUI;

/* eslint-enable react/jsx-props-no-spreading */
