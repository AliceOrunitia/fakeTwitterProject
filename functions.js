

// Likes function
// Each time a breet is liked, push userAcc to an array
//ensure that name isn't already there
// Count array length for number of likes
//function to turn heart red if currUser has already liked it
//Unlikes function
//function to find the index of currUser.userAcc
//splice array with that.

function likeCounter(arr) {
    return arr.length;
}

function isS(num) {
    return num > 1 ? "s " : " ";
}

function timeAgo(mill) {
    let string = "";
    const seconds = Math.floor(mill / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    return string = days ? `${days} day${isS(days)}ago` : hours ? `${hours} hour${isS(hours)}ago`
        : minutes ? `${minutes} minute${isS(minutes)}ago` : `${seconds} second${isS(seconds)}ago`;
}


function timeCall(postDate) {
    const now = new Date();
    return timeAgo(parseInt(now.getTime() - postDate.getTime()));
}

module.exports.likeCounter = likeCounter;
module.exports.isS = isS;
module.exports.timeAgo = timeAgo;
module.exports.getDate = new Date();
module.exports.timeCall = timeCall;

