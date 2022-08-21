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
    mail: String,
    password: String,
    mailhash: String
});

const dataScheme = new mongoose.Schema({
    id: String,
    pass: String,
    mail: String,
    xaxis: [String],
    yaxis: [String],
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

const User = new mongoose.model("User", userSchema);

const Data = new mongoose.model("Data", dataScheme);

const API = new mongoose.model("API", apiSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}))
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
        res.render("login");
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
        res.redirect("/login");
    }
});

app.get("/data/store/api", (req, res) => {
    const UTCTime = new Date();
    const time = UTCTime.toTimeString();
    console.log(req.query.xval);
    if (req.query.xval == undefined && req.query.yval == undefined) {
        res.send("Upload Error. Please send a min of 1 input");
    }  else {
        let xaxsval,yaxsval;
        if (req.query.xval == undefined) {
            xaxsval = null;
            yaxsval = req.query.yval;
        } else if (req.query.yval == undefined) {
            yaxsval = null;
            xaxsval = req.query.xval;
        } else {
            xaxsval = req.query.xval;
            yaxsval = req.query.yval;
        }
        Data.find({id: req.query.id}, (err, dat) => {
            if (err) {
                res.redirect("/error");
            } else if (dat.length != 0) {
                if (req.query.way == dat[0].pass) {
                    Data.updateOne({id: req.query.id}, {$push: {xaxis: xaxsval,yaxis: yaxsval,timeStamp:time}}, (err, tres) => {
                        if (err) {
                            res.redirect("/login");
                        } else {
                            res.send("Suii");
                        }
                    });
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
                            const newdata = new Data({
                                id: req.query.id,
                                pass: req.query.way,
                                mail: lol[0].mail,
                                xaxis: [xaxsval],
                                yaxis: [yaxsval],
                                timeStamp: [time],
                                title: req.query.title,
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

// http://localhost:59/data/store/api?id=12345&way=67890&xval=10&yval=90

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
                            res.redirect("/stored-data");
                        });
                    }
                  });
            } else {
                res.redirect("/limit-reached");
            }
        });
    } else{
        res.redirect("/login");
    }
});

app.get("/limit-reached", (req,res) => {
    res.render("limit-details");
});

app.get("/error", (req,res) => {
    res.render("error-files/error");
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
                                mail: req.body.regname,
                                password: hash,
                                mailhash: hashmail
                            });
                            newuser.save();
                            res.redirect('/?id=' + hashmail);
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
            res.redirect("/login");
        } else {
            if (found.length == 0) {
                res.render("error-files/login-error");
            } else {
                bcrypt.compare(req.body.logpass, found[0].password, function (err, resu) {
                    if (err) {
                        res.redirect("/login?id=" + found[0].mailhash);
                    } else if (resu == true) {
                        req.session.userId = found[0].mail;
                        res.redirect("/stored-data");
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
        res.redirect("/login");
    }
});

app.post("/download-data", (req,res) => {
    if (req.session.userId) {
        Data.find({id:req.body.usrid}, (err,uno) => {
            if (err) {
                res.redirect("/stored-data");
            } else if (uno.length != 0) {
                
                var xval = uno[0].xaxis;
                var yval = uno[0].yaxis;
                var len = [];
                for(var c=1; c <= xval.length;c++) {
                    len.push(c);
                }
                const csvWriter = createCsvWriter({
                    path: 'data.csv',
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
                    console.log('...Done');
                    res.redirect("/stored-data");
                });
            } else {
                res.redirect("/login");
            }
        });
    } else {
        res.redirect("/login");
    }
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 59;
}

app.listen(port, () => {
    console.log("Server started on port", port)
});