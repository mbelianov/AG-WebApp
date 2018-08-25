    var ga_dating_functions = {
      bpd2ga: {
        f1: {
          title: "ACOG",
          description: "McGregor, S, Sabbagha, R, Glob. libr. women's med.",
          calc: function(x) {
            var ga_table = [13.6, 13.8, 14, 14.2, 14.4, 14.7,15,15.2,15.4,15.7,16,16.3,16.7,17,17.3,17.7,18,18.3,18.7,19,19.3,19.7,20,20.3,20.7,21,
                           21.3,21.6,21.8,22,22.3,22.7,23,23.3,23.7,24,24.3,24.7,25,25.3,25.7,26,26.3,26.7,27,27.3,27.7,28,28.3,28.7,29,29.4,30,
                           30.4,31,31.4,32,32.3,32.7,33,33.4,34,34.6,35.3,36,36.4,37.3,37.7,39,40,40.3,40.7,41,41.7,42.3];
            var ga = ga_table[x-26];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga-ga_weeks)*7);
            return ga_weeks + " + " + ga_days;
          }
        }
      },
      ofd2ga: {
        f1: {
          title: "STD",
          description: "",
          calc: function(ofd){
            return ofd;
          }
        }
      },
      hc2ga: {
        f1: {
          title: "BMUS",
          description: "<a href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x){
            var ga = Math.pow(Math.E, (0.010611*x - 0.000030321*x*x + 0.43498E-7*x*x*x + 1.84));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            return ga_weeks + " + " + ga_days;
          }
        }
      },
      fl2ga: {
        f1: {
          title: "BMUS",
          description: "<a href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x){
            var ga = Math.pow(Math.E, (0.034375*x - 0.0037254*x*Math.log(x) + 2.306));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            return ga_weeks + " + " + ga_days;
          }
        }
      }      
    };