var moment = require('moment');
module.exports = function(){
  //Set weeks of nfl
  var week1 = moment().isBetween('2015-09-02','2015-09-14');
  var week2 = moment().isBetween('2015-09-15','2015-09-21');
  var week3 = moment().isBetween('2015-09-22','2015-09-28');
  var week4 = moment().isBetween('2015-09-29','2015-10-05');
  var week5 = moment().isBetween('2015-10-06','2015-10-12');
  var week6 = moment().isBetween('2015-10-13','2015-10-19');
  var week7 = moment().isBetween('2015-10-20','2015-10-26');
  var week8 = moment().isBetween('2015-10-27','2015-11-02');
  var week9 = moment().isBetween('2015-11-03','2015-11-09');
  var week10 = moment().isBetween('2015-11-10','2015-11-16');
  var week11 = moment().isBetween('2015-11-17','2015-11-23');
  var week12 = moment().isBetween('2015-11-24','2015-11-30');
  var week13 = moment().isBetween('2015-12-01','2015-12-07');
  var week14 = moment().isBetween('2015-12-08','2015-12-14');
  var week15 = moment().isBetween('2015-12-15','2015-12-21');
  var week16 = moment().isBetween('2015-12-22','2015-12-28');
  var week17 = moment().isBetween('2015-12-29','2015-01-03');

  //place weeks in a schedule
  var schedule = [
    week1,
    week2,
    week3,
    week4,
    week5,
    week6,
    week7,
    week8,
    week9,
    week10,
    week11,
    week12,
    week13,
    week14,
    week15,
    week16,
    week17
  ];

  return schedule;
}();
