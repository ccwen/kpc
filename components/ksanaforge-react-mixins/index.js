
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};
var kse=require("../kse")
var YaseMixin = {
  componentWillMount:function() {
    this.$yase=function() {
      return kse.$yase.apply(this,arguments);
    }
  }
}
module.exports=[YaseMixin,SetIntervalMixin]