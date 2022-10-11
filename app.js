const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const crypto = require("crypto");
const { StringDecoder } = require("string_decoder");
const { isNull } = require("util");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");
var bson = require("bson");
const sendmail = require("./mail.js");

const saltRounds = 12;
const sR = 2;

const app = express();

const {
    threehrs = 1000 * 60 * 60 * 3,
        SESSION_ID = "SID",
        SESSION_EXP = threehrs
} = process.env

app.use(session({
    name: SESSION_ID,
    secret: "My session secret is",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: SESSION_EXP,
        sameSite: true
    }
}));

mongoose.connect("mongodb+srv://hemanth:hemanth1234@cluster0.zqpnh.mongodb.net/sensorCloud?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true
});

const userSchema = new mongoose.Schema({
    name: String,
    organisation: String,
    mail: String,
    password: String,
    mailhash: String,
    verification: String
});

const dataScheme = new mongoose.Schema({
    id: String,
    pass: String,
    mail: String,
    para1: [String],
    para2: [String],
    para3: [String],
    para4: [String],
    timeStamp: [String],
    title: String,
    xLabel:String,
    yLabel:String
});

const apiSchema = new mongoose.Schema({
    mail: String,
    apikey: String,
    apipass: String
});

const verifyToken = new mongoose.Schema({
    mail:String,
    token: String,
},
{timestamps: true}
);

verifyToken.index({createdAt: 1},{expireAfterSeconds: 600});

const User = new mongoose.model("User", userSchema);

const Data = new mongoose.model("Data", dataScheme);

const API = new mongoose.model("API", apiSchema);

const Token = new mongoose.model("Token", verifyToken);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    if (req.session.userId) {
        res.render("home2");
    } else {
        res.render("home");
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/stored-data");
    } else {
        if (req.query.gateway === "newRegistration") {
            res.render("login",{new_user:true,kk:"stored-data"});
        } else {
            let lop;
            if (req.query.forward == undefined) {
                lop = "stored-data";
            } else {
                lop = req.query.forward;
            }
            res.render("login",{new_user:false,kk:lop});
        }
    }
});

app.get("/register", (req, res) => {
    if (req.session.userId) {
        res.render("register",{reg:true});
    } else {
        res.render("register",{reg:false});
    }
});

app.get("/forgot-password", (req, res) => {
    res.render("forgotpassword");
});

app.get("/stored-data", (req, res) => {
    if (req.session.userId) {
        Data.find({mail:req.session.userId}, (err,kl) => {
            res.render("storeddata",{dat:kl});
        });
    } else {
        res.redirect("/login?forward=stored-data");
    }
});

app.get("/data/store/api", (req, res) => {
    const UTCTime = new Date();
    const time = UTCTime.toTimeString();
    if (req.query.para1 == undefined && req.query.para2 == undefined) {
        res.send("Upload Error. Please send a min of 1 input");
    }  else {
        Data.find({id: req.query.id}, (err, dat) => {
            if (err) {
                res.redirect("/error");
            } else if (dat.length != 0) {
                if (req.query.way == dat[0].pass) {
                    if (!(bson.calculateObjectSize(dat) > 7000000)) {
                        Data.updateOne({id: req.query.id}, {$push: {para1: req.query.para1,para2: req.query.para2,para3: req.query.para3,para4: req.query.para4,timeStamp:time}}, (err, tres) => {
                            if (err) {
                                res.redirect("/login");
                            } else {
                                res.send("Suii");
                            }
                        });
                    } else {
                        res.send("Storage limit reached. Upgrade your plan.");
                    }
                } else{
                    res.send("Error1")
                }
            } else {
                API.find({apikey:req.query.id}, (err,lol) => {
                    if (err) {
                        res.redirect("/error");
                    } else {
                        if (lol.length === 0) {
                            res.send("You had no valid API Key");
                        } else if(lol[0].apipass == req.query.way){
                            let ttl
                            if (req.query.title == undefined) {
                                ttl = "No_Title";
                            } else {
                                ttl = req.query.title;
                            }
                            const newdata = new Data({
                                id: req.query.id,
                                pass: req.query.way,
                                mail: lol[0].mail,
                                para1: [req.query.para1],
                                para2: [req.query.para2],
                                para3: [req.query.para3],
                                para4: [req.query.para4],
                                timeStamp: [time],
                                title: ttl,
                                xLabel: req.query.xLabel,
                                yLabel: req.query.yLabel
                            });
                            newdata.save();
                            res.send("Suii");
                        } else {
                            res.send("API verification failed");
                        }
                    }
                });
            }
        });
    }
});

app.get("/api-key", (req,res) => {
    if (req.session.userId) {
        API.find({mail:req.session.userId}, (err,found4) => {
            if (err) {
                res.redirect("/error");
            } else if (found4.length < 4) {
                crypto.randomBytes(16, function(err, key) {
                    if(err) {
                        res.redirect("/error");
                    } else{
                        crypto.randomBytes(18, function(err, pass) {
                            var token1 = key.toString('hex');
                            var token = pass.toString('hex');
                            const newapi = new API({
                                mail:req.session.userId,
                                apikey: token1,
                                apipass: token
                            });
                            newapi.save();
                            res.redirect("/your-keys");
                        });
                    }
                  });
            } else {
                res.redirect("/limit-reached");
            }
        });
    } else{
        res.redirect("/login?forward=your-keys");
    }
});

app.get("/limit-reached", (req,res) => {
    res.render("limit-details");
});

app.get("/error", (req,res) => {
    res.render("error-files/error");
});

app.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect("/login?forward="+req.query.forward);
});

app.get("/your-keys", (req,res) => {
    if (req.session.userId) {
        var consu = [];
        API.find({mail:req.session.userId}, (err,foundKeys) => {
            if(err) {
                res.redirect("/login");
            } else {
                Data.find({mail:req.session.userId}, (er,kl) => {
                    kl.forEach(element => {
                        consu.push(bson.calculateObjectSize(element))
                    });
                    res.render("yourKeys", {dat:foundKeys,consumption:consu});
                });
            }
        });
    } else {
        res.redirect("/login?forward=your-keys");
    }
});

app.get("/profile", (req,res) => {
    if (req.session.userId) {
        User.find({mail:req.session.userId}, (err,foundUser) => {
            if (err) {
                res.redirect("/login");
            } else {
                API.find({mail:req.session.userId}, (er,fo) => {
                    if (er) {
                        res.redirect("/login");
                    } else {
                        res.render("profile",{profile:foundUser,api:fo});
                    }
                });
            }
        });
    } else {
        res.redirect("/login?forward=profile");
    }
});

app.get("/verifyaccount", (req,res) => {
    if (req.session.userId) {
        crypto.randomBytes(30, function(err, pass) {
            var token = pass.toString('hex');
            const verifytoken = new Token({
                mail:req.session.userId,
                token: token
            });
            verifytoken.save();
            sendmail(req.session.userId,token);
            res.sendStatus(200);
        });
    } else {
        res.redirect("/login?forward=profile");
    }
});

app.get("/accountVerification", (req,res) => {
    Token.find({token:req.query.verifyid}, (err,ok) => {
        if (err) {
            res.redirect("/login");
        } else if(ok.length !=0) {
            User.updateOne({mail:ok[0].mail},{$set:{verification:"verified"}}, (err,tk) => {
                Token.deleteOne({mail:ok[0].mail},(errr,okk) => {
                    res.redirect("/login");
                });
            });
        } else {
            res.redirect("/error");
        }
    });
});

app.post("/register", (req, res) => {
    if (req.body.name.length == 0 || req.body.regname.length ==0) {
        res.redirect("/register");
    } else {
        User.find({
            mail: req.body.regname
        }, (err, yep) => {
            if (yep.length === 0) {
                if (req.body.regpass1 == req.body.regpass2) {
                    bcrypt.hash(req.body.regpass1, saltRounds, function (err, hash) {
                        bcrypt.hash(req.body.regname, sR, function (err, hashmail) {
                            const newuser = new User({
                                name: req.body.name,
                                organisation: req.body.organisation,
                                mail: req.body.regname,
                                password: hash,
                                mailhash: hashmail,
                                verification: "Unverified"
                            });
                            newuser.save();
                            res.redirect('/login?gateway=newRegistration');
                        });
                    });
                }
            } else {
                res.render("userfound");
            }
        });
    }
});

app.post("/login", (req, res) => {
    User.find({
        mail: req.body.logmail
    }, (err, found) => {
        if (err) {
            res.redirect("/login?forward=" + req.query.forward);
        } else {
            if (found.length == 0) {
                res.render("error-files/login-error");
            } else {
                bcrypt.compare(req.body.logpass, found[0].password, function (err, resu) {
                    if (err) {
                        res.redirect("/login");
                    } else if (resu == true) {
                        req.session.userId = found[0].mail;
                        if(req.query.forward != undefined) {
                            res.redirect("/" + req.query.forward);
                        } else {
                            res.redirect("/stored-data");
                        }
                    } else {
                        res.redirect("/login");
                    }
                });
            }
        }
    });
});

app.post("/labelchange", (req,res) => {
    if (req.session.userId) {
        Data.updateOne({id:req.body.id},{$set: {title:req.body.title,xLabel:req.body.xlabel,yLabel:req.body.ylabel}}, (err,resp) => {
            if (err) {
                res.redirect("/stored-data");
            } else {
                res.redirect("/stored-data");
            }
        });
    } else {
        res.redirect("/login?forward=stored-data");
    }
});

app.post("/download-data", (req,res) => {
    if (req.session.userId) {
        Data.find({id:req.body.usrid}, (err,uno) => {
            if (err) {
                res.redirect("/stored-data");
            } else if (uno.length != 0) {
                if(!fs.existsSync(__dirname + "/download-data/" + uno[0]._id)) {
                    fs.mkdir(__dirname + "/download-data/" + uno[0]._id, (err) => {
                        if (err) {
                            res.redirect("/stored-data");
                        }
                    });
                }
                var xval = uno[0].para1;
                var yval = uno[0].para2;
                var len = [];
                for(var c=1; c <= xval.length;c++) {
                    len.push(c);
                }
                const csvWriter = createCsvWriter({
                    path:__dirname + "/download-data/" + uno[0]._id + "/" + uno[0].title + ".csv",
                    header: [
                        {id: 'number', title: 'S.No'},
                        {id: 'xValue', title: 'xValue'},
                        {id: 'yValue', title: 'yValue'}
                    ]
                });
                const records = [];
                for (let l = 0; l < xval.length; l++) {
                    var sub = {number:len[l],xValue:xval[l],yValue:yval[l]}
                    records.push(sub);
                }
                csvWriter.writeRecords(records) 
                .then(() => {
                    res.download(__dirname + "/download-data/" + uno[0]._id + "/" + uno[0].title + ".csv");
                });
            }
        })
    } else {
        res.redirect("/login?forward=stored-data");
    }
});

app.post("/delete-data", (req,res) => {
    if (req.session.userId) {
        API.deleteOne({apikey:req.body.delid}, (err) => {
            if (err) {
                console.log(err);
            } 
            Data.deleteOne({id:req.body.delid}, () => {
                res.redirect("/" + req.query.forward);
            });
        });
    } else {
        res.redirect("/login?forward=" + req.query.forward);
    }
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 59;
}

app.listen(port, () => {
    console.log("Server started on port", port)
});