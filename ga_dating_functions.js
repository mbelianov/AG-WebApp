    var ga_dating_functions = {
      bpd2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },
        f2: {
          title: "SAB",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Sabbagha RE., Hughey M.</a>",
          calc: function(x) {
            var ga_table = [13.6, 13.8, 14, 14.2, 14.4, 14.7, 15, 15.2, 15.4, 15.7, 16, 16.3, 16.7, 17, 17.3, 17.7, 18, 18.3, 18.7, 19, 19.3, 19.7, 20, 20.3, 20.7, 21,
              21.3, 21.6, 21.8, 22, 22.3, 22.7, 23, 23.3, 23.7, 24, 24.3, 24.7, 25, 25.3, 25.7, 26, 26.3, 26.7, 27, 27.3, 27.7, 28, 28.3, 28.7, 29, 29.4, 30,
              30.4, 31, 31.4, 32, 32.3, 32.7, 33, 33.4, 34, 34.6, 35.3, 36, 36.4, 37.3, 37.7, 39, 40, 40.3, 40.7, 41, 41.7, 42.3
            ];
            var ga = ga_table[x - 26];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_days) || Number.isNaN(ga_weeks)) {
              ga_days = 0;
              ga_weeks = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },        
        f3: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[28,31,44]],
              ["15+0 - 15+6",[31,34,37]],
              ["16+0 - 16+6",[34,37,40]],
              ["17+0 - 17+6",[36,40,43]],
              ["18+0 - 18+6",[39,43,47]],
              ["19+0 - 19+6",[42,46,50]],
              ["20+0 - 20+6",[45,49,54]],
              ["21+0 - 21+6",[48,52,57]],
              ["22+0 - 22+6",[51,56,61]],
              ["23+0 - 23+6",[54,59,64]],
              ["24+0 - 24+6",[57,62,68]],
              ["25+0 - 25+6",[60,66,71]],
              ["26+0 - 26+6",[63,69,75]],
              ["27+0 - 27+6",[66,72,78]],
              ["28+0 - 28+6",[69,75,81]],
              ["29+0 - 29+6",[72,78,85]],
              ["30+0 - 30+6",[74,81,88]],
              ["31+0 - 31+6",[77,83,90]],
              ["32+0 - 32+6",[79,86,93]],
              ["33+0 - 33+6",[81,88,96]],
              ["34+0 - 34+6",[83,90,98]],
              ["35+0 - 35+6",[85,92,100]],
              ["36+0 - 36+6",[86,94,102]],
              ["37+0 - 37+6",[87,95,103]],
              ["38+0 - 38+6",[88,96,104]],
              ["39+0 - 39+6",[89,97,105]]
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }        
      },
      ofd2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "STD",
          description: "",
          calc: function(ofd) {
            return "";
          }
        }
      },
      hc2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "BMUS",
          description: "<a target='_blank' href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x) {
            var ga = Math.pow(Math.E, (0.010611 * x - 0.000030321 * x * x + 0.43498E-7 * x * x * x + 1.84));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            return ga_weeks + " + " + ga_days;
          }
        },
        f3: {
          title: "HAD",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function(x) {
            var ga_table = [13.4, 13.7, 14, 14.3, 14.6, 15, 15.3, 15.6, 15.9, 16.3, 16.6, 17, 17.3, 17.7, 18.1, 18.4, 18.8, 19.2, 19.6, 20, 20.4, 20.8, 21.2, 21.6, 22.1,
              22.5, 23, 23.4, 23.9, 24.4, 24.9, 25.4, 25.9, 26.4, 26.9, 27.5, 28, 28.1, 29.2, 29.8, 30.3, 31, 31.6, 32.2, 32.8, 33.5, 34.2, 34.9, 35.5, 36.3,
              37, 37.7, 38.5, 39.2, 40, 40.8, 41.6
            ];
            var ga = ga_table[Math.round(x / 5.0) - 16];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)) {
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },
        f4: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[102,110,118]],
              ["15+0 - 15+6",[111,120,129]],
              ["16+0 - 16+6",[120,130,140]],
              ["17+0 - 17+6",[130,141,152]],
              ["18+0 - 18+6",[141,152,164]],
              ["19+0 - 19+6",[151,163,176]],
              ["20+0 - 20+6",[162,175,189]],
              ["21+0 - 21+6",[173,187,201]],
              ["22+0 - 22+6",[184,198,214]],
              ["23+0 - 23+6",[195,210,227]],
              ["24+0 - 24+6",[206,222,240]],
              ["25+0 - 25+6",[217,234,252]],
              ["26+0 - 26+6",[227,245,264]],
              ["27+0 - 27+6",[238,256,277]],
              ["28+0 - 28+6",[248,267,288]],
              ["29+0 - 29+6",[257,277,299]],
              ["30+0 - 30+6",[266,287,309]],
              ["31+0 - 31+6",[274,296,319]],
              ["32+0 - 32+6",[282,304,328]],
              ["33+0 - 33+6",[288,311,336]],
              ["34+0 - 34+6",[294,317,342]],
              ["35+0 - 35+6",[299,323,348]],
              ["36+0 - 36+6",[303,327,353]],
              ["37+0 - 37+6",[306,330,356]],
              ["38+0 - 38+6",[308,332,358]],
              ["39+0 - 39+6",[309,333,359]],
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }        
      },
      fl2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "BMUS",
          description: "<a target='_blank' href='https://www.bmus.org/static/uploads/resources/Aug_2009_Fetal_Measurements_D3NApK5.pdf'>https://www.bmus.org</a>",
          calc: function(x) {
            var ga = Math.pow(Math.E, (0.034375 * x - 0.0037254 * x * Math.log(x) + 2.306));
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga)) {
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },
        f3: {
          title: "HAD",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function(x) {
            var ga_table = [12.8, 13.1, 13.4, 13.6, 13.9, 14.2, 14.5, 14.8, 15.1, 15.4, 15.7, 16, 16.3, 16.6, 16.9, 17.2, 17.6, 17.9, 18.2, 18.6, 18.9, 19.2,
              19.6, 19.9, 20.3, 20.7, 21.0, 21.4, 21.8, 22.1, 22.5, 22.9, 23.3, 23.7, 24.1, 24.5, 24.9, 25.3, 25.7, 26.1, 26.5, 27, 27.4, 27.8,
              28.2, 28.7, 29.1, 29.6, 30.0, 30.5, 30.9, 31.4, 31.9, 32.3, 32.8, 33.3, 33.8, 34.2, 34.7, 35.2, 35.7, 36.2, 36.7, 37.2, 37.7, 38.3,
              38.8, 39.3, 39.8, 40.4
            ];
            var ga = ga_table[x - 10];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)) {
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },
        f4: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[14,17,19]],
              ["15+0 - 15+6",[17,19,22]],
              ["16+0 - 16+6",[19,22,25]],
              ["17+0 - 17+6",[21,24,28]],
              ["18+0 - 18+6",[24,27,30]],
              ["19+0 - 19+6",[26,30,33]],
              ["20+0 - 20+6",[29,32,36]],
              ["21+0 - 21+6",[32,35,39]],
              ["22+0 - 22+6",[34,38,42]],
              ["23+0 - 23+6",[37,41,45]],
              ["24+0 - 24+6",[39,43,47]],
              ["25+0 - 25+6",[42,46,50]],
              ["26+0 - 26+6",[44,48,53]],
              ["27+0 - 27+6",[47,51,55]],
              ["28+0 - 28+6",[49,53,58]],
              ["29+0 - 29+6",[51,56,60]],
              ["30+0 - 30+6",[53,58,63]],
              ["31+0 - 31+6",[55,60,65]],
              ["32+0 - 32+6",[57,62,67]],
              ["33+0 - 33+6",[59,64,69]],
              ["34+0 - 34+6",[61,66,71]],
              ["35+0 - 35+6",[63,68,73]],
              ["36+0 - 36+6",[64,69,74]],
              ["37+0 - 37+6",[66,71,76]],
              ["38+0 - 38+6",[67,72,77]],
              ["39+0 - 39+6",[68,73,78]]
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }        
      },
      ac2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "HAD",
          description: "<a target='_blank' href='http://www.glowm.com/section_view/heading/Assessment+of+Gestational+Age+by+Ultrasound/item/206%20'>Hadlock FP., Deter RL., Harrist RB., Park SK.</a>",
          calc: function(x) {
            var ga_table = [15.6, 16.1, 16.5, 16.9, 17.3, 17.8, 18.2, 18.6, 19.1, 19.5, 20.0, 20.4, 20.8, 21.3, 21.7, 22.2, 22.6, 23.1, 23.6, 24.0, 24.5, 24.9, 25.4, 25.9, 26.3, 26.8, 27.3,
              27.7, 28.2, 28.7, 29.2, 29.7, 30.1, 30.6, 31.1, 31.6, 32.1, 32.6, 33.1, 33.6, 34.1, 34.6, 35.1, 35.6, 36.1, 36.6, 37.1, 37.6, 38.1, 38.7, 39.2, 39.7, 40.2, 40.8
            ];
            var ga = ga_table[Math.round(x / 5.0) - 20];
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga_weeks) || Number.isNaN(ga_days)) {
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }

        },
        f3: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[80,90,102]],
              ["15+0 - 15+6",[88,99,112]],
              ["16+0 - 16+6",[96,108,122]],
              ["17+0 - 17+6",[105,118,133]],
              ["18+0 - 18+6",[114,128,144]],
              ["19+0 - 19+6",[123,139,156]],
              ["20+0 - 20+6",[133,149,168]],
              ["21+0 - 21+6",[143,161,181]],
              ["22+0 - 22+6",[153,172,193]],
              ["23+0 - 23+6",[163,183,206]],
              ["24+0 - 24+6",[174,195,219]],
              ["25+0 - 25+6",[184,207,233]],
              ["26+0 - 26+6",[195,219,246]],
              ["27+0 - 27+6",[205,231,259]],
              ["28+0 - 28+6",[216,243,272]],
              ["29+0 - 29+6",[226,254,285]],
              ["30+0 - 30+6",[237,266,298]],
              ["31+0 - 31+6",[246,277,310]],
              ["32+0 - 32+6",[256,287,322]],
              ["33+0 - 33+6",[265,297,334]],
              ["34+0 - 34+6",[274,307,345]],
              ["35+0 - 35+6",[282,316,355]],
              ["36+0 - 36+6",[289,324,364]],
              ["37+0 - 37+6",[295,332,372]],
              ["38+0 - 38+6",[302,339,380]],
              ["39+0 - 39+6",[307,345,387]],
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }        
      },
      tcd2ga: {
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "IJLSMR",
          description: "<a target='_blank' href='https://www.researchgate.net/publication/237299201_Fetal_Transverse_Cerebellar_Diameter_Measurement_for_Prediction_of_Gestational_Age_in_Pregnant_Sudanese_Ladies'>International Journal of Life Science and Medical Research  Jun. 2013, Vol. 3 Iss. 3</a>",
          calc: function(x) {
            var ga = 1.9098 + 0.8683 * x;
            var ga_weeks = Math.floor(ga);
            var ga_days = Math.floor((ga - ga_weeks) * 7);
            if (Number.isNaN(ga)) {
              ga_weeks = 0;
              ga_days = 0;
            }
            return ga_weeks + " + " + ga_days;
          }
        },
        f3: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6", [12, 14, 15]],
              ["15+0 - 15+6", [13, 15, 17]],
              ["16+0 - 16+6", [14, 16, 18]],
              ["17+0 - 17+6", [15, 17, 19]],
              ["18+0 - 18+6", [16, 18, 21]],
              ["19+0 - 19+6", [17, 20, 22]],
              ["20+0 - 20+6", [19, 21, 24]],
              ["21+0 - 21+6", [20, 22, 25]],
              ["22+0 - 22+6", [21, 24, 27]],
              ["23+0 - 23+6", [22, 25, 28]],
              ["24+0 - 24+6", [24, 26, 30]],
              ["25+0 - 25+6", [25, 28, 31]],
              ["26+0 - 26+6", [26, 29, 33]],
              ["27+0 - 27+6", [27, 31, 34]],
              ["28+0 - 28+6", [29, 32, 36]],
              ["29+0 - 29+6", [30, 33, 37]],
              ["30+0 - 30+6", [31, 35, 39]],
              ["31+0 - 31+6", [32, 36, 40]],
              ["32+0 - 32+6", [34, 37, 42]],
              ["33+0 - 33+6", [35, 39, 43]],
              ["34+0 - 34+6", [36, 40, 44]],
              ["35+0 - 35+6", [37, 41, 46]],
              ["36+0 - 36+6", [38, 42, 47]],
              ["37+0 - 37+6", [39, 43, 48]],
              ["38+0 - 38+6", [40, 44, 49]],
              ["39+0 - 39+6", [41, 45, 51]]
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
            
            return ga;
          }
        }
      },
      cm2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[1.9, 3.5, 5.3]],
              ["15+0 - 15+6",[2.1, 3.8, 5.7]],
              ["16+0 - 16+6",[2.4, 4.1, 6.0]],
              ["17+0 - 17+6",[2.6, 4.3, 6.3]],
              ["18+0 - 18+6",[2.8, 4.6, 6.6]],
              ["19+0 - 19+6",[3.1, 4.9, 6.9]],
              ["20+0 - 20+6",[3.3, 5.1, 7.2]],
              ["21+0 - 21+6",[3.5, 5.4, 7.5]],
              ["22+0 - 22+6",[3.7, 5.6, 7.7]],
              ["23+0 - 23+6",[3.9, 5.8, 8.0]],
              ["24+0 - 24+6",[4.1, 6.0, 8.2]],
              ["25+0 - 25+6",[4.3, 6.2, 8.5]],
              ["26+0 - 26+6",[4.4, 6.4, 8.7]],
              ["27+0 - 27+6",[4.6, 6.6, 8.9]],
              ["28+0 - 28+6",[4.7, 6.8, 9.1]],
              ["29+0 - 29+6",[4.9, 6.9, 9.3]],
              ["30+0 - 30+6",[5.0, 7.0, 9.4]],
              ["31+0 - 31+6",[5.1, 7.2, 9.6]],
              ["32+0 - 32+6",[5.2, 7.3, 9.7]],
              ["33+0 - 33+6",[5.3, 7.4, 9.8]],
              ["34+0 - 35+6",[5.3, 7.5, 10.0]],
              ["36+0 - 39+6",[5.4, 7.6, 10.1]]
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }
      },
      vp2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        },        
        f2: {
          title: "NICO",
          description: "<a target='_blank' href='https://sonoworld.com/client/fetus/html/appendix-03/normal_fetal_biometry/appendix-03.htm'>Pilu, Nicolaides, Ximenes & Jeanty</a>",
          calc: function(x) {
            var ga_table = [
              ["0+0 - 0+0", [0, 0, 0]],
              ["14+0 - 14+6",[5.1,6.7,8.4]],
              ["15+0 - 15+6",[5.1,6.8,8.5]],
              ["16+0 - 16+6",[5.2,6.9,8.6]],
              ["17+0 - 17+6",[5.3,7.0,8.7]],
              ["18+0 - 18+6",[5.4,7.1,8.8]],
              ["19+0 - 20+6",[5.5,7.2,8.9]],
              ["21+0 - 21+6",[5.6,7.3,9.0]],
              ["22+0 - 22+6",[5.7,7.4,9.1]],
              ["23+0 - 23+6",[5.8,7.5,9.2]],
              ["24+0 - 24+6",[5.9,7.6,9.3]],
              ["25+0 - 26+6",[6.0,7.7,9.4]],
              ["27+0 - 27+6",[6.1,7.8,9.5]],
              ["28+0 - 28+6",[6.2,7.9,9.6]],
              ["29+0 - 29+6",[6.3,8.0,9.7]],
              ["30+0 - 30+6",[6.4,8.1,9.8]],
              ["31+0 - 31+6",[6.5,8.2,9.9]],
              ["32+0 - 33+6",[6.6,8.3,10.0]],
              ["34+0 - 34+6",[6.7,8.4,10.1]],
              ["35+0 - 35+6",[6.8,8.5,10.2]],
              ["36+0 - 36+6",[6.9,8.6,10.3]],
              ["37+0 - 37+6",[7.0,8.7,10.4]],
              ["38+0 - 39+6",[7.1,8.8,10.5]]
            ];
            var ga;
            var mid;
            var lo = 0;
            var hi = ga_table.length - 1;
            while (hi - lo > 1) {
              mid = Math.floor((lo + hi) / 2);
              if (ga_table[mid][1][1] < x)
                lo = mid;
              else
                hi = mid;
            }
            if (x - ga_table[lo][1][1] <= ga_table[hi][1][1] - x)
              ga = ga_table[lo][0];
            else
              ga = ga_table[hi][0];
            
            if (x - ga_table[lo][1][1] == ga_table[hi][1][1] - x)
              ga = ga_table[lo][0].split("-")[0] + "-" + ga_table[hi][0].split("-")[1];
              
            return ga;
          }
        }
      },
      nf2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        }
      },
      nb2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        }
      },
      apad2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        }
      },
      tad2ga:{
        f1: {
          title: "EXT",
          description: "Външна калкулация",
          calc: function(x) {
            return null;
          }
        }
      }       
    };