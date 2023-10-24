const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        const fileType = file.mimetype.split('/')[0]

        if(fileType === 'application'){
            cb(null,'../backend/pdf')
        } else if(fileType === 'image'){
            cb(null,'../backend/img')
        }
    },
    filename : function (req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);    
    }
})

const upload = multer({ storage: storage})

module.exports = upload.fields([{ name : 'project_img_file',maxCount : 1},{ name : 'project_pdf_file' ,maxCount : 1}])