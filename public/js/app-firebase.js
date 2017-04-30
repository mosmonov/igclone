(() => {  // protect the lemmings!
        const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

        const uploadFiles = (
            fileSelectSel = validate(),
            fileElemSel = validate(),
            onFileChanged = validate()
        ) => {
            // select anchor tag and file input
            const fileSelect = document.querySelector(fileSelectSel);
            const fileElem = document.querySelector(fileElemSel);

            if (fileSelect === null || fileElem === null) {
                throw new Error('Required DOM elements not found by querySelector');
            }

            // click handler for fileElem
            fileSelect.addEventListener('click', (e) => {
                e.preventDefault();
                fileElem && fileElem.click();
            });

            // change handler for fileSelect
            fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
        } // uploadFiles


        // Initialize Firebase
        const config = {
          apiKey: "AIzaSyDMqXCxiPIfyB9wXlvE0YH4mKrOPHzmfSI",
          authDomain: "ig-clone-5c7ab.firebaseapp.com",
          databaseURL: "https://ig-clone-5c7ab.firebaseio.com",
          projectId: "ig-clone-5c7ab",
          storageBucket: "ig-clone-5c7ab.appspot.com",
          messagingSenderId: "409957841465"
        };
        // Name of file storage ref "folder"
        const FILE_STORAGE_REF = 'images';

        // initialize firebase
        firebase.initializeApp(config);
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

        uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
            if (!storageRef) {
                throw new Error('Storage Ref not set!');
            }
            const fileUploads = Array.from(files).map((currFile) => {
                // we store the name of the file as a storage ref
                const fileRef = storageRef.child(currFile.name);
                // we return a promise where we first "put" or upload the file
                // and then once the upload is complete, we return promise with
                // download URL string of the file we uploaded
                return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
            });

            Promise.all(fileUploads).then((items) => {
                // IMAGE PREVIEW, RETURN TO THIS
                document.querySelector('.js-previewImage').setAttribute("src",`${items[0]}`);
                document.querySelector('.js-fbUrl').value = items[0]
                console.log(items);
            });
        }); // upload files
})();