    var ga_dating_functions = {
      bpd2ga: {
        f1: {
          title: "SAB",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Sabbagha RE., Hughey M.</a>",
          calc: function(x) {
            var ga_table = [13.6, 13.8, 14, 14.2, 14.4, 14.7,15,15.2,15.4,15.7,16,16.3,16.7,17,17.3,17.7,18,18.3,18.7,19,19.3,19.7,20,20.3,20.7,21,
                           21.3,21.6,21.8,22,22.3,22.7,23,23.3,23.7,24,24.3,24.7,25,25.3,25.7,26,26.3,26.7,27,27.3,27.7,28,28.3,28.7,29,29.4,30,
                           30.4,31,31.4,32,32.3,32.7,33,33.4,34,34.6,35.3,36,36.4,37.3,37.7,39,40,40.3,40.7,41,41.7,42.3];
            var ga = ga_table[x-26];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga-ga_weeks)*7);
            if (Number.isNaN(ga_days) || Number.isNaN(ga_weeks)){
              ga_days = 0;
              ga_weeks = 0;
            }
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
          description: "<a target='_blank' href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x){
            var ga = Math.pow(Math.E, (0.010611*x - 0.000030321*x*x + 0.43498E-7*x*x*x + 1.84));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            return ga_weeks + " + " + ga_days;
          }
        },
        f2:{
          title: "HAD",
          description:"<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function (x){
            var ga_table = [13.4,13.7,14,14.3,14.6,15,15.3,15.6,15.9,16.3,16.6,17,17.3,17.7,18.1,18.4,18.8,19.2,19.6,20,20.4,20.8,21.2,21.6,22.1,
                            22.5,23,23.4,23.9,24.4,24.9,25.4,25.9,26.4,26.9,27.5,28,28.1,29.2,29.8,30.3,31,31.6,32.2,32.8,33.5,34.2,34.9,35.5,36.3,
                            37,37.7,38.5,39.2,40,40.8,41.6];
            var ga = ga_table[Math.round(x/5.0)-16];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)){
              ga_weeks=0;
              ga_days=0;
            }
            return ga_weeks + " + " + ga_days;
          }
        }
      },
      fl2ga: {
        f1: {
          title: "BMUS",
          description: "<a target='_blank' href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x){
            var ga = Math.pow(Math.E, (0.034375*x - 0.0037254*x*Math.log(x) + 2.306));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga)){
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },
        f2: {
          title: "HAD",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function(x){
            var ga_table = [12.8,13.1,13.4,13.6,13.9,14.2,14.5,14.8,15.1,15.4,15.7,16,16.3,16.6,16.9,17.2,17.6,17.9,18.2,18.6,18.9,19.2,
                            19.6,19.9,20.3,20.7,21.0,21.4,21.8,22.1,22.5,22.9,23.3,23.7,24.1,24.5,24.9,25.3,25.7,26.1,26.5,27,27.4,27.8,
                            28.2,28.7,29.1,29.6,30.0,30.5,30.9,31.4,31.9,32.3,32.8,33.3,33.8,34.2,34.7,35.2,35.7,36.2,36.7,37.2,37.7,38.3,
                            38.8,39.3,39.8,40.4];
            var ga = ga_table[x-10];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga-ga_weeks)*7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)){
              ga_weeks=0;
              ga_days=0;
            }
            return ga_weeks + " + " + ga_days;
          }
        }
      },
      ac2ga:{
        f1: {
          title:"HAD",
          description:"<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function (x){
            var ga_table = [15.6,16.1,16.5,16.9,17.3,17.8,18.2,18.6,19.1,19.5,20.0,20.4,20.8,21.3,21.7,22.2,22.6,23.1,23.6,24.0,24.5,24.9,25.4,25.9,26.3,26.8,27.3,
                           27.7,28.2,28.7,29.2,29.7,30.1,30.6,31.1,31.6,32.1,32.6,33.1,33.6,34.1,34.6,35.1,35.6,36.1,36.6,37.1,37.6,38.1,38.7,39.2,39.7,40.2,40.8];
            var ga = ga_table[Math.round(x/5.0)-20];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)){
              ga_weeks=0;
              ga_days=0;
            }
            return ga_weeks + " + " + ga_days;
          }

        }
      },
      tcd2ga:{
        f1:{
          title:"IJLSMR",
          description: "<a target='_blank' href='https://www.researchgate.net/publication/237299201_Fetal_Transverse_Cerebellar_Diameter_Measurement_for_Prediction_of_Gestational_Age_in_Pregnant_Sudanese_Ladies'>International Journal of Life Science and Medical Research  Jun. 2013, Vol. 3 Iss. 3</a>",
          calc: function(x){
            var ga = 1.9098 + 0.8683 * x;
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga)){
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        }
      }
    };