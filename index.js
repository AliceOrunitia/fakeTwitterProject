const express = require("express");
const { rmSync } = require("fs");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const override = require("method-override");
const functions = require("./functions.js");

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/node_modules/@fortawesome/fontawesome-free/css/')));
app.use(express.static("C:/Users/alice/Coding/JS_Files/fakeTwitter/public"));
app.use(express.urlencoded({ extended: true }));
app.use(override("_method"));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'C:/Users/alice/Coding/JS_Files/fakeTwitter/images')));

const alicePostDate = new Date();
alicePostDate.setTime(1675247134373);
const alicePostDate2 = new Date();
alicePostDate2.setTime(1675247262672);
const deanPostDate = new Date();
deanPostDate.setTime(1675335118344);
const anniePostDate = new Date();
anniePostDate.setTime(1675330118344);


let breets = [
    {
        breetText: "Who wants olives?",
        id: "4",
        likes: [1],
        userAcc: "DeanMachine",
        postDate: deanPostDate,
        pfp: "https://i.postimg.cc/MGVzDmDc/MV5-BMj-E2-OTYx-ODAx-NV5-BMl5-Ban-Bn-Xk-Ft-ZTcw-ODQ5-NTMw-Nw-V1-UY1200-CR587-0-630-1200-AL-1.jpg",
        username: "Deansdale's Dean",
        userID: "c",
        likesCount: 0
    },
    {
        breetText: "I can't find my pen!",
        id: "3",
        likes: [1],
        userAcc: "AdderallIsFun",
        postDate: anniePostDate,
        pfp: "https://i.postimg.cc/rs35hmpF/maxresdefault-1.jpg",
        username: "Annie <3",
        userID: "b",
        likesCount: 0

    },
    {
        breetText: "breeting all day long",
        id: "1",
        likes: [1],
        userAcc: "AliceinWunderl",
        postDate: alicePostDate2,
        pfp: "https://i.postimg.cc/HWXLdbyW/PXL-20220607-164726019-PORTRAIT.jpg",
        username: "Alice in Wunderland",
        userID: "a",
        likesCount: 0

    },
    {
        breetText: "getting britty with it",
        id: "2",
        likes: [1],
        userAcc: "AliceinWunderl",
        postDate: alicePostDate,
        pfp: "https://i.postimg.cc/HWXLdbyW/PXL-20220607-164726019-PORTRAIT.jpg",
        username: "Alice in Wunderland",
        userID: "a",
        likesCount: 0

    },


];

let users = [
    {
        userAcc: "AliceinWunderl",
        username: "Alice in Wunderland",
        pfp: "https://i.postimg.cc/HWXLdbyW/PXL-20220607-164726019-PORTRAIT.jpg",
        pfpOld: "C:/Users/alice/Pictures/PXL_20220607_164726019.PORTRAITCompressed.jpg",
        memberSince: "forever",
        userBio: "Not much to say, pay attention to the rest",
        id: "a",
        following: [{ AliceInWunderl: "AliceinWunderl", id: "a" }, { AdderallIsFun: "AdderallIsFun", id: "b" }, { DeanMachine: "DeanMachine", id: "c" }]
    },
    {
        userAcc: "AdderallIsFun",
        username: "Annie <3",
        pfp: "https://i.postimg.cc/rs35hmpF/maxresdefault-1.jpg",
        memberSince: "I saw Troy do a keg flip",
        userBio: "ANNIE'S GOT A GUN",
        id: "b",
        following: [{ AliceInWunderl: "AliceinWunderl", id: "a" }, { AdderallIsFun: "AdderallIsFun", id: "b" }, { DeanMachine: "DeanMachine", id: "c" }]
    },
    {
        userAcc: "DeanMachine",
        username: "Deansdale's Dean",
        pfp: "https://i.postimg.cc/MGVzDmDc/MV5-BMj-E2-OTYx-ODAx-NV5-BMl5-Ban-Bn-Xk-Ft-ZTcw-ODQ5-NTMw-Nw-V1-UY1200-CR587-0-630-1200-AL-1.jpg",
        memberSince: "I went to a real college, so after that",
        userBio: "A good Dean",
        id: "c",
        following: [{ AliceInWunderl: "AliceinWunderl", id: "a" }, { AdderallIsFun: "AdderallIsFun", id: "b" }, { DeanMachine: "DeanMachine", id: "c" }]
    }
];



let currUser = users.find(u => u.userAcc === "AliceinWunderl");



app.get("/breeta", (req, res) => {
    res.render("./home.ejs", { breets, users, currUser, functions })
})

app.get("/tests", (req, res) => {
    res.render("./tests.ejs")
})

app.get("/breeta/new", (req, res) => {
    res.render("./new.ejs", { users, currUser, functions })
})

app.get("/breeta/newUser", (req, res) => {
    res.render("./newUser.ejs", { users, currUser, functions })
})

app.get("/brittaicon.png", (req, res) => {
    console.log("Hello")
    res.render("./images/brittaicon.png")
})

app.get("/breeta/explore", (req, res) => {
    res.render("./explore.ejs", { breets, users, functions, currUser });
})

app.get("/breeta/show/:id", (req, res) => {
    const { id } = req.params;
    const breet = breets.find(b => b.id === id);
    res.render("./show.ejs", { breet, users, currUser, functions });
})

app.get("/breeta/:id/edit", (req, res) => {
    const { id } = req.params;
    const breet = breets.find(c => c.id === id);
    res.render("./edit.ejs", { breet, currUser, users, functions });
})

app.get("/breeta/users/:userAcc", (req, res) => {
    const { userAcc } = req.params;
    const user = users.find(u => u.userAcc === userAcc);
    const userBreets = breets.filter(b => b.userAcc === user.userAcc);
    res.render("./profile.ejs", { userBreets, users, currUser, user, functions });
})

app.get("/breeta/follow", (req, res) => {
    const follow = req.query;
    const foll = users.find(u => u.userAcc === follow.followAcc);
    const user = users.find(u => u.userAcc === follow.currAcc);
    if (user.following.find((e) => e.id !== foll.id && e.id !== currUser.id)) {
        user.following.push({ [foll.userAcc]: foll.userAcc, id: foll.id })
    };
    res.redirect("/breeta");
})

app.get("/breeta/unfollow", (req, res) => {
    const unfollow = req.query;
    const unfoll = users.find(u => u.userAcc === unfollow.followAcc);
    const user = users.find(u => u.userAcc === unfollow.currAcc);
    const i = users.findIndex(u => u.userAcc === unfollow.followAcc);
    if (user.following.find(e => e.id === unfoll.id && e.id !== currUser.id)) {
        user.following.splice(i, 1)
    };
    res.redirect("/breeta");
})

app.get("/breeta/like", (req, res) => {
    const love = req.query;
    const likor = users.find(u => u.userAcc === love.likorAcc);
    const likee = breets.find(b => b.id === love.breetID);
    if (likee.userAcc !== currUser.userAcc && !likee.likes.find(e => e === likor.userAcc)) {
        likee.likes.push(likor.userAcc);
    } else if (likee.likes.find(e => e === likor.userAcc)) {
        const i = likee.likes.findIndex(i => i.userAcc === likor.userAcc);
        likee.likes.splice(i, 1);
    }
    likee.likesCount = likee.likes.length - 1;
    res.redirect("/breeta");
})

app.post("/breeta/selectUser", (req, res) => {
    const selectUser = req.body;
    currUser = users.find(u => u.userAcc === selectUser.selectUsers)
    res.redirect("/breeta");
})

app.post("/breeta", (req, res) => {
    const { userAcc, breetText, postDate } = req.body;
    breets.unshift({ userAcc: currUser.userAcc, username: currUser.username, pfp: currUser.pfp, breetText, postDate: functions.getDate, id: uuidv4(), userID: currUser.id, likes: [1], likeCount: 0 });
    res.redirect("/breeta");
})

app.post("/breeta/newUser", (req, res) => {
    const { userAcc, username, pfp, userBio } = req.body;
    users.push({ userAcc, username, memberSince: functions.getDate, pfp, userBio, userID: uuidv4() });
    res.redirect("/breeta");
})

app.delete("/breeta/:id", (req, res) => {
    const { id } = req.params;
    const breet = breets.find(b => b.id === id);
    breets = breets.filter(b => b.id !== id);
    res.redirect("/breeta");
})

app.patch("/breeta/:id", (req, res) => {
    const { id } = req.params;
    const newBreetText = req.body.breetText;
    const foundBreet = breets.find(b => b.id === id);
    foundBreet.breetText = newBreetText;
    res.redirect("/breeta");
})


app.listen(3000, () => {
    console.log("on port 3000");
})

