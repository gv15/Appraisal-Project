const utils = {
    firstWordSmall(str){
        return str.toLowerCase();
    },
     minuteToMilli(min){
         return min*60000;
    },
    calculateTestTime(questions){
        let timeInMs = 0
        questions.forEach(question => {
            
            if (question.level == "Easy") {
                timeInMs += 900000

            }
            if (question.level == "Medium") {
                timeInMs += 1800000

            }
            if (question.level == "Hard") {
                timeInMs += 2700000

            }
        });
        return timeInMs;
    }
}
module.exports = utils;