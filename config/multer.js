import multer from "multer";

const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "_" + Date.now() + file.originalname);
		//cb stands for callback
		//null stands for errors: null
		//Date.now()( serving as time stamp)
		//1:37:07
	},
});

export { storage };
