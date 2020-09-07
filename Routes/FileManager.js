var multer = require("multer");
var storage = multer.diskStorage({

    destination: function (req, file ,cb){
        cb(null,"public/upload");

    },
    filename:function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, cb){
        console.log(file);
        if(file.mimetype=="image/bmp" ||  
        file.mimetype=="image/png" || 
        file.mimetype=="image/jpeg" || 
        file.mimetype=="image/jpg" )
        {
            cb(null, true);
        }
        else {
            return cb(new Error ("You file is no image"));
        }
    }
}).single("hinhdaidien");

module.exports = function(app){
    app.get("/testUpload", function(req,res){
        res.render("testUpload");
    });

    app.post("/uploadFile", function(req,res){
        upload(req,res ,function(err){
            if(err instanceof multer.MulterError){
                res.json({kq:0, errMsg:err});
            }
            else if(err){
                res.json({kq:0, errMsg:err});
            } else{
                res.json({kq:1 , urlFile: req.file});
            }
        });
    });
}