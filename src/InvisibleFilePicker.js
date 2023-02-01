import React, {
  useRef,
  useCallback,
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect
} from "react";
import useIsMounted from "./useIsMounted.hook";

/**
 * FilePickerContext can be used by child components
 * to receive current files selection, any pending file
 * loading errors and to display file selection dialog
 */
const FilePickerContext = createContext({
  /**
   * successfully loaded files
   * items schema:
   * {
   *    file : File - JS file blob,
   *    data: encoded file data
   * }
   */
  files: [],

  /**
   * list of file loading errors
   * items schema:
   * {
   *    file: file blob - file we attempted to ,
   *    error: string
   * }
   */
  errors: [],
  pick: () => {} // callback to display file picker dialog
});

const InvisibleFilePicker = ({ accept, multiple, children }) => {
  const fileInputRef = useRef(null);
  const isMounted = useIsMounted();
  const [selection, setSelection] = useState([]);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);

  const onChange = useCallback(
    (e) => {
      const fileList = e.target.files;
      const newSelection = fileList ? Array.from(fileList) : [];

      setSelection(newSelection);
    },
    [setSelection]
  );

  useEffect(() => {
    if (!isMounted) return;

    /**
     * loads file asyncronously
     * resolves on success, rejects on error
     */
    const loadFile = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          resolve({
            file,
            data: reader.result
          });
        });

        reader.addEventListener("error", () => {
          reject({
            file,
            error: `Error reading file ${file.name} ${reader.error}`
          });
        });

        reader.readAsDataURL(file);
      });

    /**
     * load all selected files asynchronously
     * and updates files and errors states
     * as load status for each file changesz
     */
    const loadFiles = () => {
      const newFiles = [];
      const newErrors = [];

      /**
       * this is an array of my selected file blobs
       */
      selection
        .map((file) => loadFile(file))
        .forEach((promise) => {
          promise
            .then((f) => {
              if (!isMounted) return;

              newFiles.push(f);
              setFiles([...newFiles]);
            })
            .catch((e) => {
              console.log("failed", e);

              if (!isMounted) return;

              newErrors.push(e);
              setErrors([...newErrors]);
            });
        });
    };

    // reset files and errors
    setFiles([]);
    setErrors([]);

    // begin loading files asyncronously
    loadFiles();
  }, [selection, setFiles, setErrors, isMounted]);

  /**
   * Callback to display file picker dialog
   */
  const pick = useCallback(() => {
    fileInputRef.current.click();
  }, [fileInputRef]);

  const value = useMemo(
    () => ({
      files,
      errors,
      pick
    }),
    [files, errors, pick]
  );

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        multiple={multiple}
        accept={accept}
        style={{ display: "none" }}
        onChange={onChange}
      />
      <FilePickerContext.Provider value={value}>
        {children}
      </FilePickerContext.Provider>
    </>
  );
};

export const useFilePickerContext = () => useContext(FilePickerContext);
export default InvisibleFilePicker;
