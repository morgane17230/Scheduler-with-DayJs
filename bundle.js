(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var dayjs = require("dayjs");
var locale = require("dayjs/locale/fr");
var weekday = require("dayjs/plugin/weekday");
var toObject = require("dayjs/plugin/toObject");
dayjs.extend(weekday);
dayjs.extend(toObject);

const app = {
  init: () => {
    year = dayjs().format("YYYY");
    app.getCurrentYear();
    app.getMonths();
    document
      .getElementById("prevYear")
      .addEventListener("click", app.getPrevYear);
    document
      .getElementById("prevMonth")
      .addEventListener("click", app.getPrevMonth);
    document
      .getElementById("nextYear")
      .addEventListener("click", app.getNextYear);
    document
      .getElementById("nextMonth")
      .addEventListener("click", app.getNextMonth);
    document
      .getElementById("current-month")
      .addEventListener("click", app.returnMonths);
  },

  getCurrentYear: () => {
    const currentYear = document.getElementById("current-year");
    currentYear.textContent = year;
    currentYear.setAttribute("year", year);
  },

  getMonths: () => {
    for (var i = 0; i < 12; i++) {
      const months = dayjs().month(i);
      app.monthsInDOM(months);
    }
  },
  returnMonths: () => {
    document.getElementById("year").style.display = "flex";
    document.getElementById("month").style.display = "none";
    document.querySelector(".week").style.display = "none";
    document.querySelector(".months").style.display = "flex";
  },

  monthsInDOM: (months) => {
    const template = document.getElementById("add-month");
    const clone = template.content.cloneNode(true);
    const parent = document.querySelector(".months");
    const monthContent = clone.querySelector(".month");
    monthContent.setAttribute("month", months.format("M"));
    monthContent.textContent = months.locale(locale).format("MMM");
    clone.querySelector(`.month`).addEventListener("click", app.getDays);
    document.getElementById("month").style.display = "none";
    document.querySelector(".week").style.display = "none";
    parent.appendChild(clone);
  },

  getDays: (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    let monthNum = target.getAttribute("month");
    const headerYear = document
      .getElementById("current-year")
      .getAttribute("year");
    headerDate = dayjs(headerYear)
      .month(monthNum - 1)
      .locale(locale)
      .format("YYYY-M");
    const header = document.querySelector("#current-year");
    header.setAttribute("month", monthNum);
    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },

  daysInDOM: (headerDate, i) => {
    const template = document.getElementById("add-day");
    const clone = template.content.cloneNode(true);
    const parent = document.querySelector(".week");
    const monthGrid = document.querySelector(".months");
    monthGrid.style.display = "none";
    parent.style.display = "flex";
    document.getElementById("year").style.display = "none";
    document.getElementById("month").style.display = "flex";
    document.getElementById("current-month").textContent = dayjs(
      `${headerDate}-${i}`
    )
      .locale(locale)
      .format("MMMM YYYY");
    clone
      .querySelector(".day-content")
      .setAttribute("day", dayjs(`${headerDate}-${i}`).format());
    clone.querySelector("#dateName").textContent = dayjs(`${headerDate}-${i}`)
      .locale(locale)
      .format("ddd DD");
    const moments = clone.querySelectorAll(".moment");
    for (const moment of moments) {
      moment.addEventListener("click", app.getMoment);
    }
    parent.appendChild(clone);
  },

  getPrevYear: (event) => {
    event.preventDefault();
    currentYear = document.getElementById("current-year").getAttribute("year");
    const prev = dayjs(`${currentYear}-01-01`)
      .subtract(1, "year")
      .format("YYYY");
    yearHeader = document.getElementById("current-year");
    yearHeader.setAttribute("year", prev);
    yearHeader.textContent = prev;
  },

  getPrevMonth: (event) => {
    event.preventDefault();

    currentYear = document.getElementById("current-year").getAttribute("year");
    currentMonth = document
      .querySelector("#current-year")
      .getAttribute("month");

    const prev = currentMonth - 1;
    monthHeader = document.getElementById("current-year");
    monthHeader.setAttribute("month", prev);

    const currentDate = document.getElementById("current-month");
    currentDate.setAttribute(
      "year",
      dayjs(currentYear).month(prev).locale(locale).format("YYYY")
    );
    currentDate.setAttribute(
      "month",
      dayjs(currentYear).month(prev).locale(locale).format("M")
    );

    document.getElementById("current-month").textContent = dayjs(currentYear)
      .month(prev)
      .locale(locale)
      .format("MMMM YYYY");

    headerDate = dayjs(currentYear).month(prev).locale(locale).format("YYYY-M");

    const oldDays = document.querySelectorAll(".day-content");
    for (const oldDay of oldDays) {
      oldDay.remove();
    }

    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },

  getNextYear: (event) => {
    event.preventDefault();
    currentYear = document.getElementById("current-year").getAttribute("year");
    const prev = dayjs(`${currentYear}-01-01`).add(1, "year").format("YYYY");
    yearHeader = document.getElementById("current-year");
    yearHeader.setAttribute("year", prev);
    yearHeader.textContent = prev;
  },

  getNextMonth: (event) => {
    event.preventDefault();

    currentYear = document.getElementById("current-year").getAttribute("year");
    currentMonth = document
      .querySelector("#current-year")
      .getAttribute("month");

    const next = Number(currentMonth) + 1;

    monthHeader = document.getElementById("current-year");
    monthHeader.setAttribute("month", next);

    const currentDate = document.getElementById("current-month");
    currentDate.setAttribute(
      "year",
      dayjs(currentYear).month(next).locale(locale).format("YYYY")
    );
    currentDate.setAttribute(
      "month",
      dayjs(currentYear).month(next).locale(locale).format("M")
    );

    document.getElementById("current-month").textContent = dayjs(currentYear)
      .month(next)
      .locale(locale)
      .format("MMMM YYYY");

    headerDate = dayjs(currentYear).month(next).locale(locale).format("YYYY-M");

    const oldDays = document.querySelectorAll(".day-content");
    for (const oldDay of oldDays) {
      oldDay.remove();
    }

    const daysMonth = dayjs(`${headerDate}`).daysInMonth();
    for (var i = 1; i < daysMonth + 1; i++) {
      app.daysInDOM(headerDate, i);
    }
  },

  getMoment: (event) => {
    event.preventDefault();
    const target = event.currentTarget;
    let date = target.closest("div").parentNode.getAttribute("day");
    const momentContent = target.getAttribute("id");
    moment = target.getAttribute("value");

    switch (moment) {
      case null:
        target.style.color = "green";
        target.classList.replace("mdi-help", "mdi-check");

        target.setAttribute("value", true);
        break;
      case "true":
        target.removeAttribute("value");
        target.setAttribute("value", false);
        target.style.color = "red";
        target.classList.replace("mdi-check", "mdi-window-close");
        break;
      case "false":
        target.removeAttribute("value");
        target.setAttribute("value", true);
        target.style.color = "green";
        target.classList.replace("mdi-window-close", "mdi-check");
        break;
    }
    momentChanged = target.getAttribute("value");

    // VARIABLES A RECUPERER

    console.log(date, momentContent, momentChanged);
  },
};

document.addEventListener("DOMContentLoaded", app.init);

},{"dayjs":2,"dayjs/locale/fr":3,"dayjs/plugin/toObject":4,"dayjs/plugin/weekday":5}],2:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});

},{}],3:[function(require,module,exports){
!function(e,_){"object"==typeof exports&&"undefined"!=typeof module?module.exports=_(require("dayjs")):"function"==typeof define&&define.amd?define(["dayjs"],_):e.dayjs_locale_fr=_(e.dayjs)}(this,function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;var _={name:"fr",weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(e){return""+e+(1===e?"er":"")}};return e.locale(_,null,!0),_});

},{"dayjs":2}],4:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs_plugin_toObject=e()}(this,function(){"use strict";return function(t,e){e.prototype.toObject=function(){return{years:this.$y,months:this.$M,date:this.$D,hours:this.$H,minutes:this.$m,seconds:this.$s,milliseconds:this.$ms}}}});

},{}],5:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_weekday=t()}(this,function(){"use strict";return function(e,t){t.prototype.weekday=function(e){var t=this.$locale().weekStart||0,n=this.$W,i=(n<t?n+7:n)-t;return this.$utils().u(e)?i:this.subtract(i,"day").add(e,"day")}}});

},{}]},{},[1]);
